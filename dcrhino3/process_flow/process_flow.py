# -*- coding: utf-8 -*-

from __future__ import absolute_import, division, print_function
import json
import logging
import pdb
import time

from dcrhino3.helpers.general_helper_functions import init_logging

from dcrhino3.process_flow.modules.trace_processing.band_pass_filter import BandPassFilterModule
from dcrhino3.process_flow.modules.trace_processing.add_one import AddOneModule
from dcrhino3.process_flow.modules.trace_processing.add_n import AddNModule
from dcrhino3.process_flow.modules.trace_processing.lead_channel_decon import LeadChannelDeconvolutionModule
from dcrhino3.process_flow.modules.trace_processing.trim_trace import TrimTraceModule

logger = init_logging(__name__)

class ProcessFlow:
    def __init__(self,process_json):


        self.trace_processing_modules = {
                                            "band_pass_filter":BandPassFilterModule,
                                            "add_one":AddOneModule,
                                            "add_n":AddNModule,
                                            "lead_channel_deconvolution":LeadChannelDeconvolutionModule,
                                            "trim":TrimTraceModule
                                        }
        self.trace_flow = []

        self.parse_json(process_json)

    def parse_json(self,process_json):
        module_output_path = ''
        if 'trace_processing' in process_json.keys():
            trace_processing_json = process_json['trace_processing']
            if 'modules' in trace_processing_json.keys():
                trace_processing_modules_json = trace_processing_json['modules']
                for module in trace_processing_modules_json:
                    self.trace_flow.append(self.trace_processing_modules[module['type']](module,module_output_path))


    def process(self, trace_data):
        """
        why  are we reassigning name in first line?  do you mean .copy?
        """
        output_trace = trace_data
        for module in self.trace_flow:
            t0 = time.time()
            logger.info("Applying " +str(module.id)+ " with: " + str(module.args))
            #pdb.set_trace()
            output_trace = module.process_trace_data(output_trace)
            delta_t = time.time() - t0
            logger.info("{} ran in {}s ".format(module.id, delta_t))

        return output_trace



