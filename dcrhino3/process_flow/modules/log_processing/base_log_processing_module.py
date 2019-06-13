from dcrhino3.process_flow.modules.base_module import BaseModule

class BaseLogProcessingModule(BaseModule):
    def __init__(self, json, output_path,process_flow,order):
        """
        @ivar id: data_processing_stage_designator
        """
        BaseModule.__init__(self, json, output_path, process_flow,order)
        self.id = "base_log_processing_module"

    def process_trace(self,trace):
        return self.process_trace_data(trace)

    def process_trace_data(self, trace):
        df = trace.dataframe.copy()
        for col in df.columns:
            if 'boolean' in col:
                df[col] = df[col].astype(bool)

        trace_config = trace.global_config_by_index(trace.dataframe['acorr_file_id'].values[0])
        transformed_args = self.get_transformed_args(trace_config)

        output_df = self.process_df(df,transformed_args)

        trace.dataframe = output_df

        trace.add_applied_module(self.applied_module_string(self.args))

        if self.output_to_file:
            trace.save_to_csv(self.output_file_basepath())

        return trace

    def process_df(self,df,transformed_args):
        return df