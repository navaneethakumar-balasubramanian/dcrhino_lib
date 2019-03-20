from dcrhino3.process_flow.modules.base_module import BaseModule
from dcrhino3.plotters.rhino_display_v3.rhino_display import RhinoDisplay
from dcrhino3.plotters.rhino_display_v3.rhino_display_panel import Header, Heatmap, Curve

class RhinoPlotterModule(BaseModule):
    def __init__(self, json, output_path,process_flow,order):
        BaseModule.__init__(self, json, output_path,process_flow,order)
        self.id = "rhino_plotter"

    def process_trace(self, trace):
        rhino_display = RhinoDisplay()
        header_1_medley_1_label = 'K0_axial_primary_max_amplitude';
        header_1_curve_1 = Curve(column_label=header_1_medley_1_label,
                                 x_axis_label='depth')
        header_1_curves = [header_1_curve_1, ]
        #    header_1_medley_1_labels = ['K0_axial_primary_max_amplitude', 'K0_tangential_primary_max_amplitude']

        #    curve_groups = []
        #    curves_groups.append(['K0_axial_primary_max_amplitude'
        header_1 = Header(trace_data=trace, curves=header_1_curves)
        heatmap_1 = Heatmap(trace_data=trace, component='axial',
                            wavelet_windows_to_show=['primary', 'multiple_1', 'multiple_2'])
        header_2 = Header(trace_data=trace)
        heatmap_2 = Heatmap(trace_data=trace, component='tangential')

        #    rd_dict = {}
        #    rd_dict['1'] = header_1.to_dict()
        #    rd_dict['2'] = heatmap_1.to_dict()
        #    rd_dict['3'] = header_2.to_dict()
        #    rd_dict['4'] = heatmap_2.to_dict()
        #    rd_dict['1'] = header_1
        #    rd_dict['2'] = heatmap_1
        #    rd_dict['3'] = header_2
        #    rd_dict['4'] = heatmap_2

        #    rhino_display.json_dict = rd_dict
        rhino_display.panels = [header_1, heatmap_1, header_2, heatmap_2]
        rhino_display.panels = [header_1, heatmap_1, heatmap_2]
        output_path = False
        if self.output_to_file:
            output_path = self.output_file_basepath(extension=".png")
        rhino_display.plot(output_path)

        return trace