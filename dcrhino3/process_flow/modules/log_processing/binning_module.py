import pdb

from dcrhino3.process_flow.modules.log_processing.base_log_processing_module import BaseLogProcessingModule
from rhino_lp.logs.base import LogCollection


class BinningModule(BaseLogProcessingModule):
    def __init__(self, json, output_path,process_flow,order):
        """
        @ivar id: data_processing_stage_designator
        """
        BaseLogProcessingModule.__init__(self, json, output_path, process_flow,order)
        self.id = "binning"

    def process_df(self, df,transformed_args):
        df = df.drop([c for c in df.columns if 'trace' in c], axis=1)
        log = LogCollection(data=df, hole_length_column='measured_depth')

        # Bin to 5 cm with 10 nearest neighbors (_refresh will be dropped in next versions)
        log._refresh(
            log.binning(transformed_args.interval_in_meters, 'knn', n_neighbors=3)
        )

        return log.dataframe
