# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function
import json
import logging
import pdb
import time
import os

from dcrhino3.helpers.rhino_db_helper import RhinoDBHelper
from dcrhino3.helpers.rhino_sql_helper import RhinoSqlHelper
from dcrhino3.helpers.general_helper_functions import init_logging, create_folders_if_needed

from dcrhino3.process_flow.modules.trace_processing.balance_trace import BalanceModule
from dcrhino3.process_flow.modules.trace_processing.band_pass_filter import BandPassFilterModule
from dcrhino3.process_flow.modules.trace_processing.add_one import AddOneModule
from dcrhino3.process_flow.modules.trace_processing.add_n import AddNModule
from dcrhino3.process_flow.modules.trace_processing.lead_channel_decon import LeadChannelDeconvolutionModule
from dcrhino3.process_flow.modules.trace_processing.trim_trace import TrimTraceModule
from dcrhino3.process_flow.modules.trace_processing.trim_trace_array import TrimTraceArrayModule
from dcrhino3.process_flow.modules.trace_processing.mix_trace_array import TraceMixingArrayModule
from dcrhino3.process_flow.modules.trace_processing.rotate_trace import RotateModule
from dcrhino3.process_flow.modules.trace_processing.unfold_autocorrelation import UnfoldAutocorrelationModule
from dcrhino3.process_flow.modules.trace_processing.upsample import UpsampleModule
from dcrhino3.process_flow.modules.trace_processing.export_segy import ExportSEGYModule
from dcrhino3.process_flow.modules.trace_processing.upsample_sinc import UpsampleSincModule

from dcrhino3.process_flow.modules.features_extraction.j0 import J0FeaturesModule
from dcrhino3.process_flow.modules.features_extraction.j1 import J1FeaturesModule
from dcrhino3.process_flow.modules.features_extraction.j2 import J2FeaturesModule
from dcrhino3.process_flow.modules.features_extraction.k0 import K0FeaturesModule
from dcrhino3.process_flow.modules.features_extraction.b0 import B0FeaturesModule

from dcrhino3.process_flow.modules.log_processing.binning_module import BinningModule
from dcrhino3.process_flow.modules.log_processing.rhino_physics import RhinoPhysicsModule

from dcrhino3.process_flow.modules.plotters.qc_plotter_module import QCPlotterModule
from dcrhino3.process_flow.modules.plotters.rhino_plotter_module import RhinoPlotterModule
from dcrhino3.process_flow.modules.plotters.rhino_boundaries_picker import RhinoPlotterPickerModule
from dcrhino3.process_flow.modules.plotters.rhino_plotter_repicker import RhinoPlotterRepickerModule

from dcrhino3.models.trace_dataframe import TraceData
from dcrhino3.process_flow.modules.hybrid.band_pass_filter_hybrid import BandPassFilterModuleHybrid
from dcrhino3.process_flow.modules.hybrid.columns_to_dataframe_module import ColumnsToDataframeModule
from dcrhino3.process_flow.modules.hybrid.lead_channel_deconvolution import LeadChannelDeconvolutionModuleHybrid
from dcrhino3.process_flow.modules.hybrid.band_pass_filter_hybrid import BandPassFilterModuleHybrid
from dcrhino3.process_flow.modules.hybrid.template_hybrid import TemplateModuleHybrid
from dcrhino3.process_flow.modules.hybrid.trim_trace import TrimTraceModuleHybrid
from dcrhino3.process_flow.modules.hybrid.unfold_autocorrelation import UnfoldAutocorrelationModuleHybrid
from dcrhino3.process_flow.modules.hybrid.upsample_hybrid import UpsampleModuleHybrid

from datetime import datetime

logger = init_logging(__name__)


class ProcessFlow:
    """
    ..: ivar modules: this is basically a catalog (or a registry) of legal operations
    to perform on an element of TraceData()
    """
    def __init__(self, output_path=""):
        self.id = "process_flow"
        self.now = datetime.now()
        self.datetime_str = self.now.strftime("%Y%m%d-%H%M%S")

        self.modules = {
            "binning": BinningModule,
            "rhino_physics": RhinoPhysicsModule,
            "j0": J0FeaturesModule,
            "j1": J1FeaturesModule,
            "j2": J2FeaturesModule,
            "k0": K0FeaturesModule,
            "b0": B0FeaturesModule,
            "qc_log_v1": QCPlotterModule,
            "balance": BalanceModule,
            "band_pass_filter": BandPassFilterModule,
            "band_pass_filter_hybrid": BandPassFilterModuleHybrid,
            "add_one": AddOneModule,
            "add_n": AddNModule,
            "lead_channel_deconvolution": LeadChannelDeconvolutionModule,
            "lead_channel_deconvolution_hybrid": LeadChannelDeconvolutionModuleHybrid,
            "rotate": RotateModule,
            "trim": TrimTraceModule,
            "trim_array": TrimTraceArrayModule,
            "trim_hybrid": TrimTraceModuleHybrid,
            "trace_mixing": TraceMixingArrayModule,
            "unfold": UnfoldAutocorrelationModule,
            "unfold_hybrid": UnfoldAutocorrelationModuleHybrid,
            "upsample": UpsampleModule,
            "upsample_hybrid": UpsampleModuleHybrid,
            "upsample_sinc": UpsampleSincModule,
            "export_segy": ExportSEGYModule,
            "rhino_plotter": RhinoPlotterModule,
            "rhino_plotter_picker":RhinoPlotterPickerModule,
            "rhino_plotter_repicker": RhinoPlotterRepickerModule,
            "columns_to_df": ColumnsToDataframeModule,
            "template": TemplateModuleHybrid
        }


        self.components_to_process = ['axial','tangential']
        self.output_path = output_path
        self.rhino_db_helper = False
        self.rhino_sql_helper = False


    def set_process_flow(self,process_json):
        self.modules_flow = []


        self.save_features_to_file = False
        self.output_to_file = False
        self.output_to_db = False
        self.process_json = process_json

        self.parse_json(process_json)

    def parse_json(self, process_json):
        """
        Parse env_config.json for info on mine/how to run the process. Use dictionary
        "process_json" for what to parse in the json. Only get info on necessary
        modules.

        Parameters:
            process_json (dict): dictionary on output locations & modules to run
        """
        self.id = process_json['id']
        if 'output_to_file' in process_json.keys():
            self.output_to_file = process_json['output_to_file']
        if 'output_to_db' in process_json.keys():
            self.output_to_db = process_json['output_to_db']
        if 'components_to_process' in process_json.keys():
            self.components_to_process = process_json['components_to_process']


        process_flow_output_path = os.path.join(self.output_path, str(self.datetime_str+ "_"+self.id))


        process_counter = 0
        if 'modules' in process_json.keys():
            modules_json = process_json['modules']
            for module in modules_json:
                process_counter += 1
                module_output_path = os.path.join(process_flow_output_path)
                module = self.modules[module['type']](module, module_output_path,self,process_counter)
                module._components_to_process = self.components_to_process
                self.modules_flow.append(module)



    def process(self, trace_data):


        process_flow_output_path = os.path.join(self.output_path, str(self.datetime_str + "_" + self.id))


        logger.info("Processing files to :" + process_flow_output_path)
        create_folders_if_needed(process_flow_output_path)
        """
        Process the trace data. Uses :py:mod:`process_flow.modules.trace_processing.base`

        .. warning:: Will create folders if it can find them. Will save data heavy
            files locally. To test, interrupt after a few h5 files have been saved.

        Parameters:
            trace_data: data to be processed

        Returns:
            processed trace data (other files will be saved to assigned locations
                and folders will be created if needed)
        """
        output_trace = trace_data

        self.modules_to_process = len(self.modules_flow)
        self.actual_module = 0
        while self.actual_module != self.modules_to_process:
            module = self.modules_flow[self.actual_module]
            t0 = time.time()
            logger.info("Applying " + str(module.id) + " with: " + str(module.args))
            output_trace = module.process_trace(output_trace)
            delta_t = time.time() - t0
            logger.info("{} ran in {}s ".format(module.id, delta_t))
            self.actual_module += 1

        if self.output_to_file:
            with open(os.path.join(process_flow_output_path, "process_flow.json"), 'w') as outfile:
                json.dump(self.process_json, outfile)
            output_trace.save_to_h5(os.path.join(process_flow_output_path, "processed.h5"))
            output_trace.save_to_csv(os.path.join(process_flow_output_path, "processed.csv"))

        if self.output_to_db and self.rhino_sql_helper:
            seconds_processed = int(trace_data.max_ts - trace_data.min_ts)
            relative_output_path = "/".join(process_flow_output_path.split('/')[-2:])+"/"
            self.rhino_sql_helper.processed_holes.add(int(self.now.strftime("%s")),seconds_processed,trace_data.hole_id,trace_data.sensor_id,trace_data.bench_name,trace_data.pattern_name,trace_data.hole_name,trace_data.rig_id,trace_data.digitizer_id,trace_data.sensor_accelerometer_type,trace_data.sensor_saturation_g,self.id,relative_output_path)
            #self.rhino_db_helper.save_processed_trace(trace_data, self.id, json.dumps(self.process_json),process_flow_output_path, int(now.strftime("%s")),99999)

        return output_trace


    def process_file(self,process_json, acorr_h5_file_path, env_config = False, seconds_to_process = False,return_dict = dict()):
        logger.info("PROCESSING FILE:" + str(acorr_h5_file_path))


        acorr_trace = TraceData()
        acorr_trace.load_from_h5(acorr_h5_file_path)
        if seconds_to_process is not False:
            acorr_trace.dataframe = acorr_trace.dataframe[:seconds_to_process]
        #filename = os.path.basename(acorr_h5_file_path)
        filename = acorr_trace.hole_h5_filename
        filename_without_ext = filename.replace(".h5","")

        if env_config is not False:
            self.output_path = env_config.get_hole_h5_processed_cache_folder(acorr_trace.mine_name)
            self.output_path = os.path.join(self.output_path,filename_without_ext)

        self.set_process_flow(process_json)
        self.env_config = env_config
        conn = env_config.get_rhino_db_connection_from_mine_name(acorr_trace.mine_name)

        self.rhino_db_helper = RhinoDBHelper(conn=conn)
        sql_conn = env_config.get_rhino_sql_connection_from_mine_name(acorr_trace.mine_name)
        if sql_conn:
            self.rhino_sql_helper = RhinoSqlHelper(sql_conn['host'],sql_conn['user'],sql_conn['password'],str(acorr_trace.mine_name).lower())

        acorr_trace = self.process(acorr_trace)
        return_dict["acorr_trace"] = acorr_trace
        return_dict["process_json"] = process_json
        return acorr_trace, self.process_json
