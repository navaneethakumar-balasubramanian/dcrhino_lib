# -*- coding: utf-8 -*-

from dcrhino3.process_flow.modules.base_module import BaseModule

class BaseTraceModule(BaseModule):
    def __init__(self):
        self.id = "base_trace_module"