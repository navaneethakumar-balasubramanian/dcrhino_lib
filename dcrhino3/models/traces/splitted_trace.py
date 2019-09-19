import numpy as np

from dcrhino3.helpers.dataframe_helpers import df_component_as_array
from dcrhino3.helpers.general_helper_functions import init_logging
from dcrhino3.helpers.dataframe_helpers import df_component_as_array

logger = init_logging(__name__)



class SplittedTrace(object):
    def __init__(self, df, transformed_args):
        self.dataframe = df
        self.transformed_args = transformed_args

    def component_as_array(self, component_id):
        return df_component_as_array(component_id, self.dataframe)

    def assign_component_from_array(self, component_id, data_array):
        data_list = list(data_array)
        column_label = "{}_trace".format(component_id)
        self.dataframe[column_label] = data_list

    def assign_trace(self, component_id, data_vector, i_row):
        """
        use this to overwrite a trace with a processed one
        """
        column_label = "{}_trace".format(component_id)
        self.dataframe[column_label].iloc[i_row] = data_vector

    @property
    def num_traces(self):
        return len(self.dataframe)
