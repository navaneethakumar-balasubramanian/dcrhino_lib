from dcrhino3.process_flow.modules.trace_processing.autocorrelate import autocorrelate_trace
from dcrhino3.helpers.general_helper_functions import init_logging, df_component_as_array

import numpy as np

logger = init_logging(__name__)



class SplittedTrace(object):
    def __init__(self,df,transformed_args):
        self.dataframe = df
        self.transformed_args = transformed_args

    def component_as_array(self, component_id):
        return df_component_as_array(component_id,self.dataframe)