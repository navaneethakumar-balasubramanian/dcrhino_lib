from dcrhino3.process_flow.modules.base_module import BaseModule
from dcrhino3.plotters.rhino_display_v3.rhino_display import RhinoDisplay
from dcrhino3.plotters.rhino_display_v3.rhino_display_panel import Header, Heatmap, Curve
from dcrhino3.models.drill_types import DrillTypes
from dcrhino3.models.bit_types import BitTypes
from dcrhino3.models.sensor_installation_locations import SensorInstallationLocations
import pandas as pd

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
            "padding_right": 0,
            "padding_left": 0,
        }

    def get_plot_title(self,transformed_args, trace):
        process_flow_id = self.process_flow.id
        drill_type = DrillTypes(transformed_args.drill_type).name
        bit_type = BitTypes(transformed_args.bit_type).name
        sensor_location = SensorInstallationLocations(transformed_args.sensor_installation_location).name

        title_line1 = r"$\bf{"+ "SENSOR"+"}$"+": LOCATION: {}".format(sensor_location) +", SERIAL NUMBER: {}".format(transformed_args.sensor_serial_number)+'\n'+"SENSITIVITY: {}, ORIENTATION: <> ".format(transformed_args.sensor_saturation_g)
        title_line2 = r"$\bf{"+ "RIG/BIT/DRILLSTRING"+"}$"+": RIG TYPE: <>, DRILL TYPE: {},".format(drill_type)+'\n'+"BIT SIZE: {}/".format(transformed_args.bit_size)+" Type:{}".format(bit_type)+"/Model:{}".format(transformed_args.bit_model)+"/Tooth Length:<>,"+'\n'+" DRILL STRING LENGTH:{}".format(transformed_args.drill_string_total_length)
        title_line3 = "DISTANCE FROM BIT TO SENSOR: {}".format(transformed_args.sensor_distance_to_source,transformed_args.rig_id)
        title_line4 = r"$\bf{"+"PROCESSFLOW"+"}$"+": "+process_flow_id+"\n"+r"$\bf{"+"MINE"+"}$"+": {},".format(transformed_args.mine_name)+ r"$\bf{"+"DATE:"+"}$"+ "{},".format(pd.to_datetime(trace.dataframe.start_time.iloc[0]),format='%Y%m%d.0')+'\n'+r"$\bf{"+" BENCH:"+"}$"+"{},".format(trace.dataframe.bench_name.iloc[0])+ r"$\bf{"+"HOLE:"+"}$"+ "{}" .format(trace.dataframe.hole_name.iloc[0])

        plot_title = [title_line4, title_line2+' '+title_line3, title_line1]

        return plot_title


    def process_trace(self, trace):
        rhino_display = RhinoDisplay()
        transformed_args = self.get_transformed_args(trace.first_global_config)
        rhino_display.padding_left = transformed_args.padding_left
        rhino_display.padding_right = transformed_args.padding_right
        panels = []
        for panel in transformed_args.panels:
            if panel["type"] == "curves":
                curves = []
                if "curves" in panel.keys():
                    for curve in panel['curves']:
                        curves.append(self.create_curve(curve))
                panel = Header(trace_data=trace, curves=curves)
                panels.append(panel)
            elif panel['type'] == "heatmap":
                curves = []
                if "curves" in panel.keys():
                    for curve in panel['curves']:
                        curves.append(self.create_curve(curve))

                panel = Heatmap(trace_data=trace, component=panel["component"],
                                    wavelet_windows_to_show=panel["wavelet_windows_to_show"],curves=curves)

                panels.append(panel)
        rhino_display.panels = panels
        output_path = False
        if self.output_to_file:
            output_path = self.output_file_basepath(extension=".png")
        plot_title = self.get_plot_title(transformed_args,trace)
        rhino_display.plot(output_path,title=plot_title)


        return trace

    def create_curve(self,_obj):
        if isinstance(_obj, basestring):
            return Curve(column_label=_obj, x_axis_label='depth')
        else:
            return Curve(**_obj)