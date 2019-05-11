from dcrhino3.process_flow.modules.plotters.rhino_plotter_module import RhinoPlotterModule
from dcrhino3.plotters.rhino_display_v3.rhino_display_panel import Header, Heatmap, Curve
import matplotlib.pyplot as plt
from dcrhino3.plotters.rhino_display_v3.rhino_display import RhinoDisplay
from dcrhino3.helpers.general_helper_functions import init_logging
from matplotlib.widgets import Button

logger = init_logging(__name__)

class RhinoPlotterRepickerModule(RhinoPlotterModule):
    def __init__(self, json, output_path,process_flow,order):
        RhinoPlotterModule.__init__(self, json, output_path, process_flow, order)
        self.id = "rhino_plotter_repicker"
        self.default_args.update({
            "show": True,
            "picker_module_idx":3,
            "ignore_picker": "|process_flow.ignore_picker|"
        })

    def process_trace(self, trace):

        rhino_display = RhinoDisplay()
        transformed_args = self.get_transformed_args(trace.first_global_config)
        if transformed_args.ignore_picker is not None:
            return trace
        self.picker_module_idx = transformed_args.picker_module_idx
        rhino_display.padding_left = transformed_args.padding_left
        rhino_display.padding_right = transformed_args.padding_right
        panels = []
        for panel in transformed_args.panels:
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

                if panel.component in self.components_to_process:
                    panel = Heatmap(trace_data=trace, component=panel.component,
                                    wavelet_windows_to_show=wavelet_windows_to_show, curves=curves,
                                    manual_time_windows=manual_time_windows, upper_num_ms=upper_num_ms)
                    panels.append(panel)
                else:
                    logger.warn("Ignored heatmap panel, this component is not on components_to_process " + str(
                        panel.component))


        if len(panels) == 0:
            return trace
        rhino_display.panels = panels
        output_path = False
        if self.output_to_file:
            output_path = self.output_file_basepath(extension=".png")
        plot_title = self.get_plot_title(transformed_args, trace)

        #bnext.on_clicked(self.btnext)
        #breset.on_clicked(self.btreset)

        rhino_display.padding_bottom = 0.15
        output_path = False
        if self.output_to_file:
            output_path = self.output_file_basepath(extension=".png")
        fig,ax = rhino_display.plot(output_path, title=plot_title, show=False)


        axnext = plt.axes([0.85, 0.03, 0.1, 0.08])
        bnext = Button(axnext, 'Save')
        bnext.on_clicked(self.save)
        axrepick = plt.axes([0.72, 0.03, 0.1, 0.08])
        btrepick = Button(axrepick, 'Repick')
        btrepick.on_clicked(self.repick)
        axignorenext = plt.axes([0.05, 0.03, 0.2, 0.08])
        bignore = Button(axignorenext, 'Save and use these windows on next picks')
        bignore.on_clicked(self.btnextandignorenexts)

        plt.show(block=True)

        return trace

    def repick(self,event):
        self.process_flow.actual_module = self.picker_module_idx-1
        plt.close()

    def btnextandignorenexts(self, event):
        self.set_prop_process("ignore_picker",True)
        plt.close()

    def save(self, event):
        plt.close()