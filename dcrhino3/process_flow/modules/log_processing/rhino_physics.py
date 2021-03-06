import pdb

from dcrhino3.process_flow.modules.log_processing.base_log_processing_module import BaseLogProcessingModule
from rhino_lp.logs.physics import RhinoPhysics


class RhinoPhysicsModule(BaseLogProcessingModule):
    def __init__(self, json, output_path,process_flow,order):
        """
        @ivar id: data_processing_stage_designator
        """
        BaseLogProcessingModule.__init__(self, json, output_path,process_flow,order)
        self.id = "rhino_physics"

    def process_df(self, df,transformed_args):
        df = df.drop([c for c in df.columns if 'trace' in c], axis=1)
        rp = RhinoPhysics(df, config={}, use_recipe=transformed_args.recipe_to_use,components_to_process=self.components_to_process)
        rp._populate()

        return rp.dataframe
