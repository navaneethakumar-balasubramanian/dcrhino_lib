# -*- coding: utf-8 -*-


import pdb
import pandas as pd
import numpy as np



#import json
from dcrhino3.process_flow.modules.base_module import BaseModule
from dcrhino3.plotters.qc_plotter import QCLogPlotter
from dcrhino3.models.drill_types import DrillTypes
from dcrhino3.models.bit_types import BitTypes
from dcrhino3.models.sensor_installation_locations import SensorInstallationLocations
from dcrhino3.feature_extraction.supporting_j1 import get_expected_multiple_times

def decide_what_components_to_plot(transformed_args,axial,tangential,radial):
    """
    use global_config.componets to process via transformed args
    AND uset process flow booleans (heatmaps)
    AND check the all zeros conditons
    and return a list like 
    ['axial', 'radial']
    for example
    
    I HAVE USED EVAL below, but might need a better way for that.
    """
    components_to_plot = {}
    for component_id in transformed_args.components_to_process:
        user_option = 'transformed_args.plot.panels.{}_heatmap_plot'.format(component_id)
        if eval(user_option) is True:
            if component_id is not None:
                var = eval(component_id)
                if (var[~np.isnan(var)]).size !=0:
                    components_to_plot[component_id]=var
#                else:
#                    components_to_plot[component_id]='False'
#    components_to_plot = []#'axial', ... etc
    return components_to_plot

class QCPlotterModule(BaseModule):
    def __init__(self, json, output_path):
        BaseModule.__init__(self, json, output_path)
        self.id = "qc_log_v1"

    def plot_trace_data(self,trace):

        row_of_df = trace.dataframe.iloc[0]
        first_global_conf = trace.global_config_by_index(row_of_df['acorr_file_id'])
        transformed_args = self.get_transformed_args(first_global_conf)


        try:
            sampling_rate = transformed_args.upsample_sampling_rate
        #pdb.set_trace()
        except AttributeError:
            sampling_rate = transformed_args.output_sampling_rate
        axial = trace.component_as_array('axial')
        tangential = trace.component_as_array('tangential')
        radial = trace.component_as_array('radial')


        plot_title = self.get_plot_title(transformed_args, trace)

        noise_threshold = self.get_noise_threshold(transformed_args)
        mult_pos = self.get_multiples(transformed_args,trace)
        mult_win_label = self.get_multiple_win_label(transformed_args)
        plot_panel_comp = transformed_args.plot.panels
        ax_lim = transformed_args.plot.ax_lim

        depth = trace.dataframe['depth']
        if transformed_args.plot.peak_ampl_x_col_name in trace.dataframe.columns:
            peak_ampl_x = trace.dataframe[transformed_args.plot.peak_ampl_x_col_name]
        else:
            peak_ampl_x = False
        if transformed_args.plot.peak_ampl_y_col_name in trace.dataframe.columns:
            peak_ampl_y = trace.dataframe[transformed_args.plot.peak_ampl_y_col_name]
        else:
            peak_ampl_y = False
        if transformed_args.plot.peak_ampl_z_col_name in trace.dataframe.columns:
            peak_ampl_z = trace.dataframe[transformed_args.plot.peak_ampl_z_col_name]
        else:
            peak_ampl_z = False
        reflection_coefficient = trace.dataframe[transformed_args.plot.reflection_coefficient_col_name]
        ax_vel_del = trace.dataframe[transformed_args.plot.ax_vel_del_col_name]
        tangential_RC = trace.dataframe[transformed_args.plot.tangential_RC_col_name]
        tang_vel_del = trace.dataframe[transformed_args.plot.tang_vel_del_col_name]
        # ADD radial_vel_del, radial_rc
#        pdb.set_trace()
        components_to_plot = decide_what_components_to_plot(transformed_args,axial,tangential,radial)
        plotter = QCLogPlotter(axial,tangential,radial,depth,plot_title,
                               sampling_rate,mult_pos,mult_win_label,
                               plot_panel_comp, components_to_plot)

        output_path = None
        if self.output_to_file:
            output_path = self.output_path

        show = True

        plotter.plot(
                 peak_ampl_x,
                 peak_ampl_y,
                 peak_ampl_z,
                 reflection_coefficient,
                 ax_vel_del,
                 tang_vel_del,
                 ax_lim,
                 tangential_RC,
                 noise_threshold,
                 show,
                 output_path
                 )




    def get_multiples(self,transformed_args,trace):
            expected_multiple = get_expected_multiple_times(transformed_args, recipe='J1')



            try:
                ax_1_mult = (trace.dataframe[transformed_args.plot.peak_ampl_x_col_name] + expected_multiple['axial']*1000)
                ax_2_mult =  (trace.dataframe[transformed_args.plot.peak_ampl_x_col_name] + expected_multiple['axial_second_multiple']*1000)

                tang_1_mult = (trace.dataframe[transformed_args.plot.peak_ampl_y_col_name] + expected_multiple['tangential']*1000)
                tang_2_mult = (trace.dataframe[transformed_args.plot.peak_ampl_y_col_name] + expected_multiple['tangential_second_multiple']*1000)
            except KeyError:
                ax_1_mult = (trace.dataframe.axial_primary_peak_time_sample + expected_multiple['axial']*1000)
                ax_2_mult =  (trace.dataframe.axial_primary_peak_time_sample + expected_multiple['axial_second_multiple']*1000)

                tang_1_mult = (trace.dataframe.tangential_primary_peak_time_sample + expected_multiple['tangential']*1000)
                tang_2_mult = (trace.dataframe.tangential_primary_peak_time_sample + expected_multiple['tangential_second_multiple']*1000)

            mult_pos = pd.DataFrame({'ax_1_mult':ax_1_mult, 'ax_2_mult':ax_2_mult, 'tang_1_mult':tang_1_mult, 'tang_2_mult':tang_2_mult})
            return mult_pos



#    def get_ax_lim(self,extracted_features_df):
#        min_ax_RC = min(extracted_features_df['J0_reflection_coefficient'])
#        max_ax_RC = max(extracted_features_df['J0_reflection_coefficient'])
#        min_tang_RC = min(extracted_features_df['J0_tangential_RC'])
#        max_tang_RC = max(extracted_features_df['J0_tangential_RC'])
#        min_peak_x = min(extracted_features_df['J0_axial_primary_peak_sample'])
#        #max_peak_x = max(extracted_features_df['J0_axial_primary_peak_sample'])
#        min_delay = min(extracted_features_df['J0_axial_velocity_delay'])
#        max_delay = max(extracted_features_df['J0_axial_velocity_delay'])
#
#        lower_ax_RC = (min_ax_RC - (min_ax_RC*0.05))
#        upper_ax_RC = (max_ax_RC + (max_ax_RC*0.05))
#
#        lower_peak_x = (min_peak_x - (min_peak_x*0.05))
#        #upper_peak_x = (max_peak_x + (max_peak_x*0.05))
#
#        lower_delay = (min_delay - (min_delay*0.05))
#        upper_delay = (max_delay - (max_delay*0.05))
#
#        lower_tang_RC = (min_tang_RC - (min_tang_RC*0.05))
#        upper_tang_RC = (max_tang_RC + (max_tang_RC*0.05))
#
#        ax_lim = pd.DataFrame({'lower_ax_RC':[lower_ax_RC],'upper_ax_RC':[upper_ax_RC],'lower_peak_x':[lower_peak_x],
#                               'lower_delay':[lower_delay],'upper_delay':[upper_delay],'lower_tang_RC':[lower_tang_RC],
#                               'upper_tang_RC':[upper_tang_RC]})
#        return ax_lim

    def get_plot_title(self,transformed_args, trace):
        drill_type = DrillTypes(transformed_args.drill_type).name
        bit_type = BitTypes(transformed_args.bit_type).name
        sensor_location = SensorInstallationLocations(transformed_args.sensor_installation_location).name

        title_line1 = r"$\bf{"+ "SENSOR"+"}$"+": LOCATION: {}".format(sensor_location) +", SERIAL NUMBER: {}".format(transformed_args.sensor_serial_number)+'\n'+"SENSITIVITY: {}, ORIENTATION: <> ".format(transformed_args.sensor_saturation_g)
        title_line2 = r"$\bf{"+ "RIG/BIT/DRILLSTRING"+"}$"+": RIG TYPE: <>, DRILL TYPE: {},".format(drill_type)+'\n'+"BIT SIZE: {}/".format(transformed_args.bit_size)+" Type:{}".format(bit_type)+"/Model:{}".format(transformed_args.bit_model)+"/Tooth Length:<>,"+'\n'+" DRILL STRING LENGTH:{}".format(transformed_args.drill_string_total_length)
        title_line3 = "DISTANCE FROM BIT TO SENSOR: {}".format(transformed_args.sensor_distance_to_source,transformed_args.rig_id)
        title_line4 = r"$\bf{"+"MINE"+"}$"+": {},".format(transformed_args.mine_name)+ r"$\bf{"+"DATE:"+"}$"+ "{},".format(pd.to_datetime(trace.dataframe.start_time.iloc[0]),format='%Y%m%d.0')+'\n'+r"$\bf{"+" BENCH:"+"}$"+"{},".format(trace.dataframe.bench_name.iloc[0])+ r"$\bf{"+"HOLE:"+"}$"+ "{}" .format(trace.dataframe.hole_name.iloc[0])

        plot_title = [title_line4, title_line2+' '+title_line3, title_line1]

        return plot_title

    def get_noise_threshold(self,transformed_args):
        noise_threshold = transformed_args.sensor_saturation_g/2000.
        return noise_threshold

    def get_multiple_win_label(self,transformed_args):
        mult_title1 = "axial window = {}/{}".format(transformed_args.mult_neg_win,transformed_args.mult_pos_win)
        mult_title2 = "tangential_window = {}/{}".format(transformed_args.mult_neg_win,transformed_args.mult_pos_win)
        mult_title = mult_title1 + '\n' + mult_title2
        return mult_title

