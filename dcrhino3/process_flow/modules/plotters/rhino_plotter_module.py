import datetime
import matplotlib.pyplot as plt
import pandas as pd

from dcrhino3.helpers.general_helper_functions import init_logging, is_string
from dcrhino3.models.drill.drill_types import DrillTypes
from dcrhino3.models.drill.bit_types import BitTypes
from dcrhino3.models.sensor_installation_locations import SensorInstallationLocations
from dcrhino3.process_flow.modules.base_module import BaseModule
from dcrhino3.plotters.rhino_display_v3.rhino_display import RhinoDisplay
from dcrhino3.plotters.rhino_display_v3.rhino_display_panel import Header, Heatmap, Curve, Wiggle

logger = init_logging(__name__)

class RhinoPlotterModule(BaseModule):
    def __init__(self, json, output_path,process_flow,order):
        BaseModule.__init__(self, json, output_path,process_flow,order)
        self.id = "rhino_plotter"

        self.default_args = {
            "rig_id": "|global_config.rig_id|",
            "drill_type": "|global_config.drill_type|",
            "drill_string_total_length": "|global_config.drill_string_total_length|",
            "bit_type": "|global_config.bit_type|",
            "bit_size": "|global_config.bit_size|",
            "bit_model": "|global_config.bit_model|",
            "sensor_installation_location": "|global_config.sensor_installation_location|",
            "sensor_distance_to_source": "|global_config.sensor_distance_to_source|",
            "sensor_distance_to_shocksub": "|global_config.sensor_distance_to_shocksub|",
            "sensor_serial_number": "|global_config.sensor_serial_number|",
            "sensor_saturation_g": "|global_config.sensor_saturation_g|",
            "mine_name": "|global_config.mine_name|",
            "padding_right": 0.03,
            "padding_left": 0,
            "show": False,
            "legend":False,
            "panels": [
                {
                    "type": "curves",
                    "curves": [
                        {
                            "scale": "new",
                            "space": 50,
                            "color": "lime",
                            "spine_side": "right",
                            "label": "timestamp",
                            "column_label": "timestamp"
                        },
                        {
                            "scale": "new",
                            "space": 70,
                            "color": "yellow",
                            "spine_side": "right",
                            "label": "number_of_added_steels",
                            "column_label": "number_of_added_steels"
                        },
                        {
                            "scale": "new",
                            "space": 0,
                            "color": "red",
                            "spine_side": "right",
                            "label": "rate_of_penetration",
                            "column_label": "rate_of_penetration"
                        },
                        {
                            "scale": "new",
                            "space": 40,
                            "color": "purple",
                            "spine_side": "left",
                            "label": "weight_on_bit",
                            "column_label": "weight_on_bit"
                        },
                        {
                            "space": 0,
                            "color": "blue",
                            "spine_side": "left",
                            "label": "packets",
                            "column_label": "packets"
                        },

                    ]
                },
                {
                    "type": "curves",
                    "curves": [
                        {
                            "scale": "new",
                            "space": 50,
                            "color": "purple",
                            "spine_side": "right",
                            "label": "J2-ax-prim-max_time",
                            "column_label": "J2-axial-primary-maximum_time",
                            "formula": "data*10"
                        },
                        {
                            "scale": "current",
                            "space": 0,
                            "color": "red",
                            "spine_side": "left",
                            "label": "J2-ax-prim-int-abs-amp",
                            "column_label": "J2-axial-primary-integrated_absolute_amplitude"
                        },
                        {
                            "color": "blue",
                            "column_label": "J2-axial-reflection_coefficient_1",
                            "spine_side": "right",
                            "scale": "new",
                            "space": 0
                        }
                    ]
                },
                {
                    "component": "axial",
                    "upper_num_ms": [
                        "|process_flow.axial_upper_num_ms|",
                        35
                    ],
                    "manual_time_windows": {
                        "axial": {
                            "multiple_3": "|process_flow.axial_multiple_3|",
                            "multiple_2": "|process_flow.axial_multiple_2|",
                            "multiple_1": "|process_flow.axial_multiple_1|",
                            "primary": "|process_flow.axial_primary|"
                        }
                    },
                    "type": "heatmap",
                    "curves": [
                        {
                            "color": "#FFFFFF",
                            "column_label": "J2-axial-primary-maximum_time",
                            "linewidth": 2,
                            "label": "primary Max",
                            "formula": "data*1000"
                        },
                        {
                            "color": "#FFFFFF",
                            "column_label": "J2-axial-multiple_1-maximum_time",
                            "linewidth": 2,
                            "label": "M1 Zx",
                            "formula": "data*1000"
                        },
                        {
                            "color": "#FFFFFF",
                            "column_label": "J2-axial-multiple_2-maximum_time",
                            "linewidth": 2,
                            "label": "M2 Min",
                            "formula": "data*1000"
                        },
                        {
                            "color": "#FFFFFF",
                            "column_label": "J2-axial-multiple_3-maximum_time",
                            "linewidth": 2,
                            "label": "M3 Zx",
                            "formula": "data*1000"
                        }
                    ],
                    "wavelet_windows_to_show": [
                        "primary",
                        "multiple_1",
                        "multiple_2",
                        "multiple_3"
                    ]
                },
                {
                    "type": "curves",
                    "curves": [
                        {
                            "scale": "current",
                            "space": 0,
                            "color": "red",
                            "spine_side": "left",
                            "label": "J2-tang-prim-int-abs-amp",
                            "column_label": "J2-tangential-primary-integrated_absolute_amplitude"
                        },
                        {
                            "color": "blue",
                            "column_label": "J2-tangential-reflection_coefficient_1",
                            "spine_side": "right",
                            "scale": "new",
                            "space": 0
                        },
                        {
                            "color": "lime",
                            "column_label": "J2-tangential-delay_1",
                            "spine_side": "right",
                            "scale": "new",
                            "space": 60
                        }
                    ]
                },
                {
                    "upper_num_ms": [
                        "|process_flow.tangential_upper_num_ms|",
                        60
                    ],
                    "wavelet_windows_to_show": [
                        "primary",
                        "multiple_1",
                        "multiple_2",
                        "multiple_3"
                    ],
                    "component": "tangential",
                    "curves": [
                        {
                            "color": "#FFFFFF",
                            "column_label": "J2-tangential-primary-maximum_time",
                            "linewidth": 2,
                            "label": "primary Max",
                            "formula": "data*1000"
                        },
                        {
                            "color": "#FFFFFF",
                            "column_label": "J2-tangential-multiple_1-maximum_time",
                            "linewidth": 2,
                            "label": "M1 Zx",
                            "formula": "data*1000"
                        },
                        {
                            "color": "#FFFFFF",
                            "column_label": "J2-tangential-multiple_2-maximum_time",
                            "linewidth": 2,
                            "label": "M2 Min",
                            "formula": "data*1000"
                        },
                        {
                            "color": "#FFFFFF",
                            "column_label": "J2-tangential-multiple_3-maximum_time",
                            "linewidth": 2,
                            "label": "M3 Zx",
                            "formula": "data*1000"
                        }
                    ],
                    "manual_time_windows": {
                        "tangential": {
                            "multiple_3": "|process_flow.tangential_multiple_3|",
                            "multiple_2": "|process_flow.tangential_multiple_2|",
                            "multiple_1": "|process_flow.tangential_multiple_1|",
                            "primary": "|process_flow.tangential_primary|"
                        }
                    },
                    "type": "heatmap"
                }
            ]
        }

    def get_plot_title(self,transformed_args, trace):
        process_flow_id = self.process_flow.id
        drill_type = DrillTypes(transformed_args.drill_type).name
        bit_type = BitTypes(transformed_args.bit_type).name
        sensor_location = SensorInstallationLocations(transformed_args.sensor_installation_location).name

        start_timestamp = trace.dataframe.timestamp.iloc[0]
        hole_start_datetime = datetime.datetime.fromtimestamp(start_timestamp)
        #hole_start_date = hole_start_datetime.date()
        #, format = '%Y%m%d.0'
        title_line1 = r"$\bf{"+ "SENSOR"+"}$"+": LOCATION: {}".format(sensor_location) +", SERIAL NUMBER: {}".format(transformed_args.sensor_serial_number)+'\n'+"SENSITIVITY: {}, ORIENTATION: <> ".format(transformed_args.sensor_saturation_g)
        title_line2 = r"$\bf{"+ "RIG/BIT/DRILLSTRING"+"}$"+": RIG TYPE: <>, RIG ID: {},".format(transformed_args.rig_id) + " DRILL TYPE: {},".format(drill_type)+'\n'+"BIT SIZE: {}/".format(transformed_args.bit_size)+" Type:{}".format(bit_type)+"/Model:{}".format(transformed_args.bit_model)+"/Tooth Length:<>,"+'\n'+" DRILL STRING LENGTH:{}".format(transformed_args.drill_string_total_length)
        title_line3 = "DISTANCE FROM BIT TO SENSOR: {}".format(transformed_args.sensor_distance_to_source,transformed_args.rig_id)
        title_line4 = r"$\bf{"+"PROCESSFLOW"+"}$"+": "+process_flow_id+"\n"+r"$\bf{"+"MINE"+"}$"+": {},".format(transformed_args.mine_name)+ r"$\bf{"+"DATE:"+"}$"+ "{},".format(hole_start_datetime)+'\n'+r"$\bf{"+" BENCH:"+"}$"+"{},".format(trace.dataframe.bench_name.iloc[0])+ r"$\bf{"+"HOLE:"+"}$"+ "{}" .format(trace.dataframe.hole_name.iloc[0])

        plot_title = [title_line4, title_line2+' '+title_line3, title_line1]

        return plot_title


    def process_trace(self, trace):
        rhino_display = RhinoDisplay()
        transformed_args = self.get_transformed_args(trace.first_global_config)
        rhino_display.padding_left = transformed_args.padding_left
        rhino_display.padding_right = transformed_args.padding_right
        panels = []
        n_panels = len(transformed_args.panels)
        for i_panel, panel in enumerate(transformed_args.panels):
            logger.info('Panel {} of {}'.format(i_panel, n_panels))
            if panel.type == "curves":
                have_curve_to_plot = False
                curves = []
                if "curves" in panel._fields:
                    for curve in panel.curves:
                        temp_curve = self.create_curve(curve)
                        curves.append(temp_curve)
                        if temp_curve.column_label in trace.dataframe.columns:
                            have_curve_to_plot = True
                if have_curve_to_plot:
                    if "component" in panel._fields:
                        panel = Header(trace_data=trace, curves=curves, component=panel.component)
                    else:
                        panel = Header(trace_data=trace, curves=curves)
                    panels.append(panel)
            elif panel.type == "heatmap":
                curves = []
                if "curves" in panel._fields:
                    for curve in panel.curves:
                        curves.append(self.create_curve(curve))

                if "wavelet_windows_to_show" not in panel._fields:
                    wavelet_windows_to_show = []
                else:
                    wavelet_windows_to_show = panel.wavelet_windows_to_show

                if "manual_time_windows" not in panel._fields:
                    manual_time_windows = None
                else:
                    manual_time_windows = panel.manual_time_windows

                if "upper_num_ms" not in panel._fields:
                    upper_num_ms = 35
                else:
                    upper_num_ms = panel.upper_num_ms

                if "lower_num_ms" not in panel._fields:
                    lower_num_ms = -5
                else:
                    lower_num_ms = panel.lower_num_ms

                if panel.component in self.components_to_process:
                    panel = Heatmap(trace_data=trace, component=panel.component,
                                        wavelet_windows_to_show=wavelet_windows_to_show
                                        ,curves=curves, manual_time_windows=manual_time_windows,
                                        upper_num_ms=upper_num_ms, lower_num_ms=lower_num_ms)
                    panels.append(panel)
                else:
                    logger.warn("Ignored heatmap panel, this component is not on components_to_process " + str(panel.component))

            elif panel.type == "wiggle":
                have_curve_to_plot = False
                curves = []
                if "curves" in vars(panel):
                    for curve in panel.curves:
                        temp_curve = self.create_curve(curve)
                        curves.append(temp_curve)
                        if temp_curve.column_label in trace.dataframe.columns:
                            have_curve_to_plot = True
                if have_curve_to_plot:
                    panel = Wiggle(trace_data=trace, curves=curves,
                                   component =  panel.component)
                    panels.append(panel)

        if len(panels) == 0:
            return trace

        #Auto Set Right Hand Side Padding
        max_spine_number = 1
        for panel in panels:
            if panel.plot_style == 'header':
                spine_number = len(panel.curves) - 1
                if max_spine_number < spine_number:
                    max_spine_number = spine_number


        rhino_display.panels = panels
        output_path = False
        if self.output_to_file:
            output_path = self.output_file_basepath(extension=".png")
        plot_title = self.get_plot_title(transformed_args,trace)
        rhino_display.padding_bottom = 0.1
        rhino_display.padding_right = max_spine_number * 0.025
        rhino_display.plot(output_path,title=plot_title,show=transformed_args.show, legend=transformed_args.legend)
        return trace



    def create_curve(self,_obj):
        if is_string(_obj):
            return Curve(column_label=_obj, x_axis_label='depth')
        else:
            return Curve(**_obj._asdict())
