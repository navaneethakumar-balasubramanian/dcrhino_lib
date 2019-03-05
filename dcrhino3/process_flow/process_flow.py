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

logger = init_logging(__name__)


class ProcessFlow:
    def __init__(self, process_json, output_path=""):
        self.id = "process_flow"

        self.lp_modules = {
            "binning": BinningModule,
            "rhino_physics":RhinoPhysicsModule
        }

        self.plotters_modules = {
            "qc_log_v1": QCPlotterModule
        }

        self.features_extraction_modules = {
            "j0": J0FeaturesModule,
            "j1": J1FeaturesModule,
            "k0": K0FeaturesModule,
            "b0": B0FeaturesModule
        }

        self.trace_processing_modules = {
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
        self.trace_flow = []
        self.features_flow = []
        self.plotters_flow = []
        self.lp_flow = []

        self.output_path = output_path

        self.save_features_to_file = False
        self.output_to_file = False
        self.output_to_db = False
        self.process_json = process_json

        self.parse_json(process_json)

    def parse_json(self, process_json):
        self.id = process_json['id']
        if 'output_to_file' in process_json.keys():
            self.output_to_file = process_json['output_to_file']
        if 'output_to_db' in process_json.keys():
            self.output_to_db = process_json['output_to_db']

        process_flow_output_path = os.path.join(self.output_path, self.id)
        process_counter = 0
        if 'trace_processing' in process_json.keys():
            trace_processing_json = process_json['trace_processing']
            if 'modules' in trace_processing_json.keys():
                trace_processing_modules_json = trace_processing_json['modules']
                for module in trace_processing_modules_json:
                    process_counter += 1
                    module_file_name = str(process_counter) + "_tp_" + module['type'] + ".h5"
                    module_output_path = os.path.join(process_flow_output_path, module_file_name)
                    self.trace_flow.append(self.trace_processing_modules[module['type']](module, module_output_path))

        if 'features_extraction' in process_json.keys():
            features_extraction_json = process_json['features_extraction']
            if 'output_to_file' in features_extraction_json.keys():
                self.save_features_to_file = features_extraction_json['output_to_file']

            if 'modules' in features_extraction_json.keys():
                features_extraction__modules_json = features_extraction_json['modules']
                for module in features_extraction__modules_json:
                    process_counter += 1
                    module_file_name = str(process_counter) + "_features_" + module['type'] + ".csv"
                    module_output_path = os.path.join(process_flow_output_path, module_file_name)
                    self.features_flow.append(
                        self.features_extraction_modules[module['type']](module, module_output_path))

        if "plotters" in process_json.keys():
            plotters_json = process_json['plotters']
            if 'modules' in plotters_json.keys():
                plotters_modules_json = plotters_json['modules']
                for module in plotters_modules_json:
                    process_counter += 1
                    module_file_name = str(process_counter) + "_plot_" + module['type'] + ".png"
                    module_output_path = os.path.join(process_flow_output_path, module_file_name)
                    self.plotters_flow.append(self.plotters_modules[module['type']](module, module_output_path))

        if 'log_processing' in process_json.keys():
            log_processing_json = process_json['log_processing']

            if 'modules' in log_processing_json.keys():
                log_processing_modules_json = log_processing_json['modules']
                for module in log_processing_modules_json:
                    process_counter += 1
                    module_file_name = str(process_counter) + "_lp_" + module['type'] + ".csv"
                    module_output_path = os.path.join(process_flow_output_path, module_file_name)
                    self.lp_flow.append(
                        self.lp_modules[module['type']](module, module_output_path))

    def process(self, trace_data):
        process_flow_output_path = os.path.join(self.output_path, self.id)
        create_folders_if_needed(process_flow_output_path)
        """
        @Thiago: why are we reassigning name in first line?  do you mean .copy?
        @var module: process_flow.modules.trace_processing.base
        """
        output_trace = trace_data
        for module in self.trace_flow:
            t0 = time.time()
            logger.info("Applying " + str(module.id) + " with: " + str(module.args))
            # pdb.set_trace()
            output_trace = module.process_trace_data(output_trace)
            delta_t = time.time() - t0
            logger.info("{} ran in {}s ".format(module.id, delta_t))

        for module in self.features_flow:
            t0 = time.time()
            logger.info("Extracting features using module: " + str(module.id) + " with: " + str(module.args))
            # pdb.set_trace()
            output_trace = module.extract_features(output_trace)
            delta_t = time.time() - t0
            logger.info("{} ran in {}s ".format(module.id, delta_t))

        if self.save_features_to_file:
            output_trace.save_to_csv(os.path.join(process_flow_output_path, "extracted_features.csv"))

        for module in self.plotters_flow:
            t0 = time.time()
            logger.info("Plotting using module: " + str(module.id) + " with: " + str(module.args))
            # pdb.set_trace()
            module.plot_trace_data(output_trace,process_flow_id=self.id)
            delta_t = time.time() - t0
            logger.info("{} ran in {}s ".format(module.id, delta_t))

        for module in self.lp_flow:
            t0 = time.time()
            logger.info("Log processing using module: " + str(module.id) + " with: " + str(module.args))
            # pdb.set_trace()
            module.process_trace_data(output_trace)
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
