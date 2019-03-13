# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function
import json
import logging
import pdb
import time
import os

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
from dcrhino3.process_flow.modules.features_extraction.k0 import K0FeaturesModule
from dcrhino3.process_flow.modules.features_extraction.b0 import B0FeaturesModule

from dcrhino3.process_flow.modules.log_processing.binning_module import BinningModule
from dcrhino3.process_flow.modules.log_processing.rhino_physics import RhinoPhysicsModule

from dcrhino3.process_flow.modules.plotters.qc_plotter_module import QCPlotterModule

from dcrhino3.models.trace_dataframe import TraceData

logger = init_logging(__name__)


class ProcessFlow:
    """
    """
    def __init__(self, output_path=""):
        self.id = "process_flow"

        self.modules = {
            "binning": BinningModule,
            "rhino_physics": RhinoPhysicsModule,
            "j0": J0FeaturesModule,
            "j1": J1FeaturesModule,
            "k0": K0FeaturesModule,
            "b0": B0FeaturesModule,
            "qc_log_v1": QCPlotterModule,
            "balance": BalanceModule,
            "band_pass_filter": BandPassFilterModule,
            "add_one": AddOneModule,
            "add_n": AddNModule,
            "lead_channel_deconvolution": LeadChannelDeconvolutionModule,
            "rotate": RotateModule,
            "trim": TrimTraceModule,
            "trim_array": TrimTraceArrayModule,
            "trace_mixing": TraceMixingArrayModule,
            "unfold": UnfoldAutocorrelationModule,
            "upsample": UpsampleModule,
            "upsample_sinc": UpsampleSincModule,
            "export_segy": ExportSEGYModule
        }



        self.output_path = output_path


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

        process_flow_output_path = os.path.join(self.output_path, self.id)
        process_counter = 0
        if 'modules' in process_json.keys():
            modules_json = process_json['modules']
            for module in modules_json:
                process_counter += 1
                module_output_path = os.path.join(process_flow_output_path)
                self.modules_flow.append(self.modules[module['type']](module, module_output_path))



    def process(self, trace_data):
        process_flow_output_path = os.path.join(self.output_path, self.id)
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
            
        .. todo:: @Thiago: why are we reassigning name in first line?  do you mean .copy?
        """
        output_trace = trace_data
        for module in self.modules_flow:
            t0 = time.time()
            logger.info("Applying " + str(module.id) + " with: " + str(module.args))

            output_trace = module.process_trace(output_trace)
            delta_t = time.time() - t0
            logger.info("{} ran in {}s ".format(module.id, delta_t))

        if self.output_to_file:
            with open(os.path.join(process_flow_output_path, "process_flow.json"), 'w') as outfile:
                json.dump(self.process_json, outfile)
            output_trace.save_to_h5(os.path.join(process_flow_output_path, "processed.h5"))
            output_trace.save_to_csv(os.path.join(process_flow_output_path, "processed.csv"))


        # if self.output_to_db:
        #    output_trace.save_to_db(self.rhino_db_helper,self.id)

        return output_trace


    def process_file(self,process_json, acorr_h5_file_path, env_config = False, seconds_to_process = False):
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

        acorr_trace = self.process(acorr_trace)
        return acorr_trace