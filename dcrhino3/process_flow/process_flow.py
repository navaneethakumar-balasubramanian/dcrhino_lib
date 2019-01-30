# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function
import json
import logging
import pdb
import time
import os

from dcrhino3.helpers.general_helper_functions import init_logging

from dcrhino3.process_flow.modules.trace_processing.band_pass_filter import BandPassFilterModule
from dcrhino3.process_flow.modules.trace_processing.add_one import AddOneModule
from dcrhino3.process_flow.modules.trace_processing.add_n import AddNModule
from dcrhino3.process_flow.modules.trace_processing.lead_channel_decon import LeadChannelDeconvolutionModule
from dcrhino3.process_flow.modules.trace_processing.trim_trace import TrimTraceModule
from dcrhino3.process_flow.modules.trace_processing.unfold_autocorrelation import UnfoldAutocorrelationModule

from dcrhino3.process_flow.modules.features_extraction.j1 import J1FeaturesModule
from dcrhino3.process_flow.modules.features_extraction.j0 import J0FeaturesModule

from dcrhino3.process_flow.modules.qc_plotter import QCPlotterModule

logger = init_logging(__name__)

class ProcessFlow:
    def __init__(self,process_json,output_path=""):
        self.id = "process_flow"
        
        self.trace_processing_modules = {
                                            "band_pass_filter":BandPassFilterModule,
                                            "add_one":AddOneModule,
                                            "add_n":AddNModule,
                                            "lead_channel_deconvolution":LeadChannelDeconvolutionModule,
                                            "trim":TrimTraceModule,
                                            "unfold":UnfoldAutocorrelationModule
                                        }
        self.trace_flow = []


        self.features_extraction_modules = {
                                            "j0":J0FeaturesModule,
                                            "j1":J1FeaturesModule,
                                        }

        self.features_flow = []
        self.save_features_to_file = False
        
        self.qc_plotter = None
        
        self.output_path = output_path
        
        self.parse_json(process_json)

    def parse_json(self,process_json):
        self.id = process_json['id']
        
        process_flow_output_path = os.path.join(self.output_path,self.id)
        process_counter = 0
        if 'trace_processing' in process_json.keys():
            trace_processing_json = process_json['trace_processing']
            if 'modules' in trace_processing_json.keys():
                trace_processing_modules_json = trace_processing_json['modules']
                for module in trace_processing_modules_json:
                    process_counter +=1
                    module_file_name = str(process_counter)+"_"+module['type']+".h5"
                    module_output_path = os.path.join(process_flow_output_path,module_file_name)
                    self.trace_flow.append(self.trace_processing_modules[module['type']](module,module_output_path))


        if 'features_extraction' in process_json.keys():
            features_extraction_json = process_json['features_extraction']
            if 'output_to_file' in features_extraction_json.keys():
                self.save_features_to_file = features_extraction_json['output_to_file']
                
            if 'modules' in features_extraction_json.keys():
                features_extraction__modules_json = features_extraction_json['modules']
                for module in features_extraction__modules_json:
                    process_counter +=1
                    module_file_name = str(process_counter)+"_"+module['type']+".csv"
                    module_output_path = os.path.join(process_flow_output_path,module_file_name)
                    self.features_flow.append(self.features_extraction_modules[module['type']](module,module_output_path))
        
        if "qc_plotter" in process_json.keys():
            process_counter +=1
            module_file_name = str(process_counter)+"_"+module['type']+".h5"
            module_output_path = os.path.join(process_flow_output_path,module_file_name)
            qc_plotter_json = process_json['qc_plotter']
            self.qc_plotter = QCPlotterModule(qc_plotter_json,module_output_path)
            


    def process(self, trace_data):
        process_flow_output_path = os.path.join(self.output_path,self.id)
        """
        @Thiago: why are we reassigning name in first line?  do you mean .copy?
        @var module: process_flow.modules.trace_processing.base
        """
        output_trace = trace_data
        for module in self.trace_flow:
            t0 = time.time()
            logger.info("Applying " +str(module.id)+ " with: " + str(module.args))
            #pdb.set_trace()
            output_trace = module.process_trace_data(output_trace)
            delta_t = time.time() - t0
            logger.info("{} ran in {}s ".format(module.id, delta_t))

        for module in self.features_flow:
            t0 = time.time()
            logger.info("Extracting features using module: " +str(module.id)+ " with: " + str(module.args))
            #pdb.set_trace()
            output_trace = module.extract_features(output_trace)
            delta_t = time.time() - t0
            logger.info("{} ran in {}s ".format(module.id, delta_t))
        
        if self.save_features_to_file:
            output_trace.save_to_csv(os.path.join(process_flow_output_path,"extracted_features.csv"))

        return output_trace



