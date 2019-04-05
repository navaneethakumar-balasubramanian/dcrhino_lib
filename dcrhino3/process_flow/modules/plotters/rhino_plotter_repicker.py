from dcrhino3.process_flow.modules.plotters.rhino_plotter_module import RhinoPlotterModule

class RhinoPlotterRepickerModule(RhinoPlotterModule):
    def __init__(self, json, output_path,process_flow,order):
        RhinoPlotterModule.__init__(self, json, output_path, process_flow, order)
        self.id = "rhino_plotter_repicker"
        self.default_args.update({
            "show": True
        })