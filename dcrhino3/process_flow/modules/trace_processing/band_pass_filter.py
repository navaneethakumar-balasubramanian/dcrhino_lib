# -*- coding: utf-8 -*-


from dcrhino3.process_flow.modules.trace_processing.base_trace_module import BaseTraceModule

class BandPassFilterModule(BaseTraceModule):
    def __init__(self):
        self.id = "band_pass_filter"