# -*- coding: utf-8 -*-


import pdb
import pandas as pd



#import json
from dcrhino3.process_flow.modules.base_module import BaseModule
from dcrhino3.models.drill_types import DrillTypes
from dcrhino3.models.bit_types import BitTypes
from dcrhino3.models.sensor_installation_locations import SensorInstallationLocations
from dcrhino3.feature_extraction.feature_extraction_20181226 import get_expected_multiple_times

class QCPlotterModule(BaseModule):
    def __init__(self, json, output_path):
        BaseModule.__init__(self, json, output_path)
        self.id = "qc_plotter_module"
        
    def plot_trace_data(self,trace):
        
        row_of_df = trace.dataframe.iloc[0]
        first_global_conf = trace.global_config_by_index(row_of_df['acorr_file_id'])
        
        axial = trace.component_as_array('axial')
        tangential = trace.component_as_array('tangential')
        radial = trace.component_as_array('radial')
        
        ax_lim = self.get_ax_lim(trace.dataframe)
        
        plot_title = self.get_plot_title(first_global_conf)
        
        noise_threshold = global_config_tmp.noise_threshold
        
        mult_pos = self.get_multiples(transformed_args)
        
        
        
    
        
    
    def get_multiples(self,transformed_args):
            expected_multiple = get_expected_multiple_times(transformed_args, recipe='J1')
            mult_pos = pd.DataFrame({'axial_first_multiple':[expected_multiple['axial']*1000], 'axial_second_multiple':[expected_multiple['axial_second_multiple']*1000],
                                     'tangential_first_multiple':[expected_multiple['tangential']*1000], 'tangential_second_multiple':[expected_multiple['tangential_second_multiple']*1000]})
#            pdb.set_trace()
            return mult_pos
        

        
    def get_ax_lim(self,extracted_features_df):
        min_ax_RC = min(extracted_features_df['J0_reflection_coefficient'])
        max_ax_RC = max(extracted_features_df['J0_reflection_coefficient'])
        min_tang_RC = min(extracted_features_df['J0_tangential_RC'])
        max_tang_RC = max(extracted_features_df['J0_tangential_RC'])
        min_peak_x = min(extracted_features_df['J0_axial_primary_peak_sample'])
        #max_peak_x = max(extracted_features_df['J0_axial_primary_peak_sample'])
        min_delay = min(extracted_features_df['J0_axial_velocity_delay'])
        max_delay = max(extracted_features_df['J0_axial_velocity_delay'])
        
        lower_ax_RC = (min_ax_RC - (min_ax_RC*0.05))
        upper_ax_RC = (max_ax_RC + (max_ax_RC*0.05))
    
        lower_peak_x = (min_peak_x - (min_peak_x*0.05))
        #upper_peak_x = (max_peak_x + (max_peak_x*0.05))
    
        lower_delay = (min_delay - (min_delay*0.05))
        upper_delay = (max_delay - (max_delay*0.05))
    
        lower_tang_RC = (min_tang_RC - (min_tang_RC*0.05))
        upper_tang_RC = (max_tang_RC + (max_tang_RC*0.05))
    
        ax_lim = pd.DataFrame({'lower_ax_RC':[lower_ax_RC],'upper_ax_RC':[upper_ax_RC],'lower_peak_x':[lower_peak_x],
                               'lower_delay':[lower_delay],'upper_delay':[upper_delay],'lower_tang_RC':[lower_tang_RC],
                               'upper_tang_RC':[upper_tang_RC]})
        return ax_lim

    def get_plot_title(self):
        drill_type = DrillTypes(self.args.drill_type)
        bit_type = BitTypes(self.args.bit_type)
        sensor_location = SensorInstallationLocations(self.args.sensor_installation_location)
            
        title_line1 = r"$\bf{"+ "SENSOR"+"}$"+": LOCATION: {}".format(sensor_location) +", SERIAL NUMBER: {}".format(global_config.sensor_serial_number)+'\n'+"SENSITIVITY: {}, ORIENTATION: <> ".format(global_config.sensor_saturation_g)
        title_line2 = r"$\bf{"+ "RIG/BIT/DRILLSTRING"+"}$"+": RIG TYPE: <>, DRILL TYPE: {},".format(drill_type)+'\n'+"BIT SIZE: {}/".format(global_config.bit_size)+" Type:{}".format(bit_type)+"/Model:{}".format(global_config.bit_model)+"/Tooth Length:<>,"+'\n'+" DRILL STRING LENGTH:{}".format(global_config.drill_string_total_length)
        title_line3 = "DISTANCE FROM BIT TO SENSOR: {}".format(global_config.sensor_distance_to_source,global_config.rig_id)
        title_line4 = ""
        plot_title = [title_line4, title_line2+' '+title_line3, title_line1]
    
        return plot_title