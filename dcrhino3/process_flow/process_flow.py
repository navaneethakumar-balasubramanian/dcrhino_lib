# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function
import copy
from datetime import datetime
import json
import logging
import pdb
import time
import os
import pandas as pd
import socket

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
from dcrhino3.process_flow.modules.features_extraction.j2 import J2FeaturesModule #replaced by hybrid, July 2019
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
from dcrhino3.process_flow.modules.hybrid.template_hybrid import TemplateModuleHybrid
from dcrhino3.process_flow.modules.hybrid.trim_trace import TrimTraceModuleHybrid
from dcrhino3.process_flow.modules.hybrid.unfold_autocorrelation import UnfoldAutocorrelationModuleHybrid
from dcrhino3.process_flow.modules.hybrid.upsample_hybrid import UpsampleModuleHybrid
from dcrhino3.process_flow.modules.hybrid.phase_balance_trace_hybrid import PhaseBalanceHybridModule
from dcrhino3.process_flow.modules.hybrid.feature_extract_hybrid import FeatureExtractJ2Hybrid

from dcrhino3.unstable.multipass_util import update_acorr_with_resonance_info
#from dcrhino3.unstable.hacks.bma_hack import bma_hack_20190606
from dcrhino3.unstable.multipass_util import get_depths_at_which_steels_change


logger = init_logging(__name__)



class ProcessFlow:
    """
    ..: ivar modules: this is basically a catalog (or a registry) of legal operations
    to perform on an element of TraceData()
    ..: ivar modules_flow: This is a list of the modules to apply in the current
    instance of the process_flow.
    
    Readability/clarity review:
    ..:: ToDo: Lets manage the gigantic collection of modules in another py file
    could be called active_process_flow_modules.py we can import from it and then
    in the __init__ here can say:
        self.modules = active_process_flow_modules
    ..:: ToDo: @Thiago: can we replace self.actual_module with self.i_module?  
    its an integer.  the we can rename module to active_module
    ..:: ToDo: The name 'subsets' is really ambiguous.  Can we replace 
    think up something that says what it is ... subsets of the blasthole to process
    with different parameters because the steels lengths are different ... 
    "drill_config_subsets"??
    """
    def __init__(self, output_path=""):
        self.id = "process_flow"
        self.now = datetime.now()
        self.datetime_str = self.now.strftime("%Y%m%d-%H%M%S")
        self.env_config = None
        self.modules = {
            "binning": BinningModule,
            "rhino_physics": RhinoPhysicsModule,
            "j0": J0FeaturesModule,
            "j1": J1FeaturesModule,
            "j2": FeatureExtractJ2Hybrid,#J2FeaturesModule,
            "k0": K0FeaturesModule,
            "b0": B0FeaturesModule,
            "qc_log_v1": QCPlotterModule,
            "balance": BalanceModule,
            "phase_balance_hybrid": PhaseBalanceHybridModule,
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


    def set_process_flow(self,process_json,subset_index=False):
        self.modules_flow = []


        self.save_features_to_file = False
        self.output_to_file = False
        self.output_to_db = False
        self.process_json = process_json

        self.parse_json(process_json,subset_index)


    @property
    def num_modules_to_process(self):
        return len(self.modules_flow)


    def parse_json(self, process_json,subset_index):
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


        #process_flow_output_path = os.path.join(self.output_path, str(self.datetime_str+ "_"+self.id))
        process_flow_output_path = self.output_path



        process_counter = 0
        if 'modules' in process_json.keys():
            modules_json = process_json['modules']
            for module in modules_json:
                process_counter += 1
                module_output_path = os.path.join(process_flow_output_path)
                module = self.modules[module['type']](module, module_output_path,self,process_counter)
                if subset_index is not False:
                    module.subset_id = subset_index
                module._components_to_process = self.components_to_process
                self.modules_flow.append(module)

    def make_database_connection(self, mine_name):

        conn = self.env_config.get_rhino_db_connection_from_mine_name(mine_name)

        self.rhino_db_helper = RhinoDBHelper(conn=conn)
        sql_conn = self.env_config.get_rhino_sql_connection_from_mine_name(mine_name)
        if sql_conn:
            self.rhino_sql_helper = RhinoSqlHelper(sql_conn['host'], sql_conn['user'], sql_conn['password'],
                                                   str(sql_conn['database']).lower(),port=sql_conn['port'])
        return


    def process(self, trace_data,subset_index=False):
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

        process_flow_output_path = self.output_path
        logger.info("Processing files to :" + process_flow_output_path)
        create_folders_if_needed(process_flow_output_path)
        output_trace = trace_data

        self.actual_module = 0
        while self.actual_module != self.num_modules_to_process:
            module = self.modules_flow[self.actual_module]
            t0 = time.time()
            logger.info("Applying " + str(module.id) + " with: " + str(module.args))
            output_trace = module.process_trace(output_trace)
            delta_t = time.time() - t0
            logger.info("{} ran in {}s ".format(module.id, delta_t))
            self.actual_module += 1

        if self.output_to_file:
            process_flow_json_output_path = os.path.join(process_flow_output_path, "process_flow.json")
            processed_h5_output_path = os.path.join(process_flow_output_path, "processed.h5")
            processed_csv_output_path = os.path.join(process_flow_output_path, "processed.csv")
            if subset_index is not False:
                process_flow_json_output_path = os.path.join(process_flow_output_path, "process_flow_"+str(subset_index)+".json")
                processed_h5_output_path = os.path.join(process_flow_output_path, "processed_"+str(subset_index)+".h5")
                processed_csv_output_path = os.path.join(process_flow_output_path, "processed_"+str(subset_index)+".csv")
            with open(process_flow_json_output_path, 'w') as outfile:
                json.dump(self.process_json, outfile)
            output_trace.save_to_h5(processed_h5_output_path)
            output_trace.save_to_csv(processed_csv_output_path)

        if self.output_to_db and self.rhino_sql_helper and subset_index is False:
            seconds_processed = int(trace_data.max_ts - trace_data.min_ts)
            relative_output_path = "/".join(process_flow_output_path.split('/')[-2:])+"/"
            process_id = int(self.now.strftime("%s"))
            self.rhino_sql_helper.processed_holes.add(int(self.now.strftime("%s")),seconds_processed,trace_data.hole_id,trace_data.sensor_id,trace_data.bench_name,trace_data.pattern_name,trace_data.hole_name,trace_data.rig_id,trace_data.digitizer_id,trace_data.sensor_accelerometer_type,trace_data.sensor_saturation_g,self.id,relative_output_path,process_id=process_id)
            #self.rhino_db_helper.save_processed_trace(trace_data, self.id, json.dumps(self.process_json),process_flow_output_path, int(now.strftime("%s")),99999)

        return output_trace


    def output_folder(self,acorr_trace,process_flow_json,env_config):

        filename = acorr_trace.hole_h5_filename
        filename_without_ext = filename.replace(".h5", "")

        temp_output_path = env_config.get_hole_h5_processed_cache_folder(acorr_trace.mine_name)
        temp_output_path = os.path.join(temp_output_path, filename_without_ext)

        return os.path.join(temp_output_path, str(self.datetime_str + "_" + process_flow_json['id']))


    def process_file(self, process_json, acorr_h5_file_path, env_config = False, 
                     seconds_to_process=False, return_dict=dict()):
        """
        """
        logger.info("PROCESSING FILE:" + str(acorr_h5_file_path))
        acorr_trace = TraceData()
        acorr_trace.load_from_h5(acorr_h5_file_path)

        if 'subsets' not in process_json.keys():
            acorr_trace = update_acorr_with_resonance_info(acorr_trace,
                                                       transition_depth_offset_m=-1.0)
            splits = get_depths_at_which_steels_change(acorr_trace.dataframe)
            print("splits = {}".format(splits))
            process_json['subsets'] = splits
        #</NEW>

        self.output_path = self.output_folder(acorr_trace,process_json,env_config)

        if seconds_to_process is not False:
            acorr_trace.dataframe = acorr_trace.dataframe[:seconds_to_process]
        splitted_subsets = self.split_subsets(process_json,process_json['subsets'],acorr_trace)
        logger.info("FoUnD {} subsets".format(len(splitted_subsets))  )

        for i,subset in enumerate(splitted_subsets):

            self.set_process_flow(subset['process_json'],subset_index=i)
            self.env_config = env_config
            self.make_database_connection(subset['acorr_trace'].mine_name)
            subset['acorr_trace'] = self.process(subset['acorr_trace'],subset_index=i)

        acorr_trace , process_json =  self.merge_results(splitted_subsets)
        return_dict["acorr_trace"] = acorr_trace
        return_dict["process_json"] = process_json
        return_dict["output_path"] = self.output_path

        acorr_trace.save_to_h5(os.path.join(self.output_path,'processed.h5'))
        acorr_trace.save_to_csv(os.path.join(self.output_path,'processed.csv'))
        with open(os.path.join(self.output_path,'process_flow.json'), 'w') as outfile:
            json.dump(process_json, outfile)

        print( self.rhino_sql_helper,self.output_to_db)
        if self.output_to_db and self.rhino_sql_helper:
            print ("Saving processed results to database")
            seconds_processed = int(acorr_trace.max_ts - acorr_trace.min_ts)
            relative_output_path = "/".join(self.output_path.split('/')[-2:]) + "/"
            process_id = int(self.now.strftime("%s"))
            #print(process_id,relative_output_path,seconds_processed)
            self.rhino_sql_helper.processed_holes.add(int(self.now.strftime("%s")), seconds_processed,
                                                      acorr_trace.hole_id, acorr_trace.sensor_id,
                                                      acorr_trace.bench_name, acorr_trace.pattern_name,
                                                      acorr_trace.hole_name, acorr_trace.rig_id,
                                                      acorr_trace.digitizer_id, acorr_trace.sensor_accelerometer_type,
                                                      acorr_trace.sensor_saturation_g, self.id, relative_output_path,
                                                      process_id=process_id)
            # self.rhino_db_helper.save_processed_trace(trace_data, self.id, json.dumps(self.process_json),process_flow_output_path, int(now.strftime("%s")),99999)

        return acorr_trace, process_json, return_dict


    def merge_results(self,subsets):
        process_json = copy.deepcopy(subsets[0]['process_json'])
        process_json['vars'] = []
        trace_data = copy.deepcopy(subsets[0]['acorr_trace'])
        df = pd.DataFrame()

        for subset in subsets:
            process_json['vars'].append(subset['process_json']['vars'])
            df = pd.concat([df,subset['acorr_trace'].dataframe])

        trace_data.dataframe = df.sort_values('measured_depth')

        return trace_data , process_json


    def split_subsets(self, process_json, subsets, trace_data):
        subsets_objs = []
        start_depth = 0
        max_depth = trace_data.dataframe.measured_depth.max()
        for i,subset in enumerate(subsets):
            if (start_depth < max_depth):
                subset_obj = {}
                subset_obj['acorr_trace'] = copy.deepcopy(trace_data)
                subset_obj['acorr_trace'].dataframe = subset_obj['acorr_trace'].dataframe[(subset_obj['acorr_trace'].dataframe.measured_depth > start_depth) & (subset_obj['acorr_trace'].dataframe.measured_depth <= subset)].reset_index(drop=True)
                subset_obj['process_json'] = copy.deepcopy(process_json)

                if 'vars' in subset_obj['process_json'].keys() and isinstance(subset_obj['process_json']['vars'],list) :
                    try:
                        subset_obj['process_json']['vars'] = subset_obj['process_json']['vars'][i]
                    except:
                        subset_obj['process_json']['vars'] = {}

                subsets_objs.append(subset_obj)
                start_depth = subset

        if (start_depth < max_depth):
            subset_obj = {}
            subset_obj['acorr_trace'] = copy.deepcopy(trace_data)
            subset_obj['acorr_trace'].dataframe = subset_obj['acorr_trace'].dataframe[(subset_obj['acorr_trace'].dataframe.measured_depth > start_depth)].reset_index(drop=True)
            subset_obj['process_json'] = copy.deepcopy(process_json)
            if 'vars' in subset_obj['process_json'].keys() and isinstance(subset_obj['process_json']['vars'], list):
                try:
                    subset_obj['process_json']['vars'] = subset_obj['process_json']['vars'][i+1]
                except:
                    subset_obj['process_json']['vars'] = {}
            subsets_objs.append(subset_obj)

        return subsets_objs
