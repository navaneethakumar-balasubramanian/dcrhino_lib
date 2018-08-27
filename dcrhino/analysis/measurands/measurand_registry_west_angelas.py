# -*- coding: utf-8 -*-
"""
Created on Fri Jun 15 17:26:02 2018

@author: kkappler

measurand attrs:
self.label = kwargs.get('label', '')
self.data_level = kwargs.get('data_level', None)
self.units = kwargs.get('units', '')
self.parent_measurands = kwargs.get('parent_measurands', [])
self.units = kwargs.get('units', '')
self.operator = kwargs.get('operator', None)
self.description = kwargs.get('description', '')
self.formality = kwargs.get('formality', None)
"""

from __future__ import absolute_import, division, print_function

import pdb

from dcrhino.analysis.measurands.level_0.ide_file_measurand import IdeFileMeasurand
from dcrhino.analysis.measurands.level_1.raw_segy_measurand import RawSgyFromIDE
from dcrhino.analysis.measurands.level_1.drilltimes_measurand import NatalsDrillTimesFromIDE
from dcrhino.analysis.measurands.level_1.master_iterator_csv_measurand import MasterIterator
from dcrhino.analysis.measurands.level_1.mwd_with_mse_measurand import MWDWithMSE
from dcrhino.analysis.measurands.level_1.slamstix_metadata_table_measurand import SlamstixMetadataTable
from dcrhino.analysis.measurands.level_1.resampled_l1_npy_measurand import ResampledL1AccelerometerMeasurand
#from dcrhino.analysis.measurands.level_2.correlated_deconvolved_segy_measurand import CorrelatedDeconvolvedSEGY
from dcrhino.analysis.measurands.level_2.correlated_deconvolved_segy_measurand2 import CorrelatedDeconvolvedSEGY2
from dcrhino.analysis.measurands.level_2.deconvolved_segy_measurand import DeconvolvedSEGY

#from dcrhino.analysis.measurands.level_3.trace_header_features_measurand import TraceHeaderFeaturesMeasurand
from dcrhino.analysis.measurands.level_3.trace_header_features_measurand_v2_EDA import TraceHeaderFeaturesMeasurandEDA
#from dcrhino.analysis.measurands.level_3.binned_trace_header_features_measurand import BinnedTraceHeaderFeaturesMeasurand
#from dcrhino.analysis.measurands.level_3.binned_trace_header_features_measurand_2_WA import BinnedTraceHeaderFeaturesMeasurand
#from dcrhino.analysis.measurands.level_3.rock_properties_log_measurand_20180702_v1 import RockPropertiesLogMeasurand
#from dcrhino.analysis.measurands.level_3.rock_properties_log_measurand_20180716_v2 import RockPropertiesLogMeasurand

from dcrhino.analysis.signal_processing.firls_bandpass import FIRLSFilter

from dcrhino.analysis.util.general_helper_functions import init_logging

logger = init_logging(__name__)

PROJECT_ID = 'west_angelas'
_registry = {}
_hash_dict = {}
for k, v in _hash_dict.iteritems():
    _hash_dict[v] = k
#home = os.path.expanduser("~/")

sensor_types_of_interest = ['piezo',]# 'mems']

#sensor_types_of_interest = ['piezo', 'mems']

def register_measurand(measurand):
    """
    Registers a measurand in the global registry.
    TODO: add type checking and
    TODO: log warning if id_s tring already registered
    TODO: check that parent measurands are already in the regisity
    """
    _registry[measurand.id_string] = measurand

def measurand(id_string):
    """
    Retrieve a measurand by its id string
    """
    return _registry[id_string]

def _create_direct_measurands():
    """
    placeholder.  This is where we will define the fundamental data we digitize
     ... is the MWD a measurand??  ask DS
    """
    pass

def _create_resampled_measurands():
    """
    placeholder; we should resample the data to nominal 3200, 5000, etc.
    """
    pass

def _create_level1_slamstix_table_measurands():
    prototype_measurand = SlamstixMetadataTable(data_level=1,
                                           formality='development',
                                           label='slamstix_metadata',
                                           extension='csv',
                                           project_id=PROJECT_ID)
    register_measurand(prototype_measurand)
def _create_level1_drilltimes_measurands():
    """
    TODO: Ask Natal what is the sensor type /parent ?
    """
    prototype_measurand = NatalsDrillTimesFromIDE(data_level=1,
                                           formality='development',
                                           label='level1_drilltimes',
                                           extension='csv',
                                           project_id=PROJECT_ID)
    #pdb.set_trace()

    copy_of_prototype = prototype_measurand._clone()
    #copy_of_prototype._sensor_type = 'pressure_transducer?'
    copy_of_prototype.parent_measurands = [IdeFileMeasurand(),]
    copy_of_prototype.operator = 'autopick drilltimes'
    copy_of_prototype.description = copy_of_prototype.label
    register_measurand(copy_of_prototype)

def _create_level1_segy_measurands():
    """
    TODO: fix hack with sensor-type ch08, this is not really a sensor type, this
    is a variation on file style... the ch08 files are the big long files ...
    """
    prototype_measurand = RawSgyFromIDE(data_level=1, units='g',
                                           formality='development',
                                           label='level1_sgy',
                                           extension='sgy',
                                           project_id=PROJECT_ID)
    #pdb.set_trace()
    #sampling_rates = [3200.0,]#, 12800.0]
    for sensor_type in sensor_types_of_interest:
        #for sampling_rate in sampling_rates:
        copy_of_prototype = prototype_measurand._clone()
        #copy_of_prototype._sampling_rate = sampling_rate
        copy_of_prototype._sensor_type = sensor_type
        copy_of_prototype.parent_measurands = [IdeFileMeasurand(),]
        copy_of_prototype.operator = 'file format transformation and resampling'
        copy_of_prototype.description = copy_of_prototype.label
        register_measurand(copy_of_prototype)
#    print_measurand_registry()

def _create_level1_npy_measurands():
    """
    TODO: fix hack with sensor-type ch08, this is not really a sensor type, this
    is a variation on file style... the ch08 files are the big long files ...
    """
    prototype_measurand = ResampledL1AccelerometerMeasurand(data_level=1, units='g',
                                                            formality='development',
                                                            label='level1_npy',
                                                            extension='npy',
                                                            project_id=PROJECT_ID)
    #pdb.set_trace()
    #sampling_rates = [3200.0,]#, 12800.0]
    for sensor_type in sensor_types_of_interest:
        #for sampling_rate in sampling_rates:
        copy_of_prototype = prototype_measurand._clone()
        #copy_of_prototype._sampling_rate = sampling_rate
        copy_of_prototype._sensor_type = sensor_type
        copy_of_prototype.parent_measurands = [RawSgyFromIDE(),]
        copy_of_prototype.operator = 'file format transformation'
        copy_of_prototype.description = copy_of_prototype.label
        register_measurand(copy_of_prototype)
#    print_measurand_registry()

def _create_mwd_with_mse_measurand():
    """
    """
    prototype_measurand = MWDWithMSE(data_level=1,
                                     formality='development',
                                     label='mwd_with_mse',
                                     extension='csv',
                                     project_id=PROJECT_ID)
    register_measurand(prototype_measurand)
    return

def _create_master_iterator_measurand():
    """
    """
    prototype_measurand = MasterIterator(data_level=1,
                                     formality='development',
                                     label='master_iterator',
                                     extension='csv',
                                     project_id=PROJECT_ID)
    register_measurand(prototype_measurand)
    return

def _create_deconvolved_segy_measurands():
    """
    #historical parent_measurand_strings = ['level1_sgy_piezo_', 'level1_sgy_mems']
    """
    prototype_measurand = DeconvolvedSEGY(data_level=2, units='g',
                                           formality='development',
                                           label='deconvolved_sgy',
                                           extension='sgy',
                                           deconvolution_filter_duration=0.1,
                                           project_id=PROJECT_ID)

    parent_measurand_strings = []
    for registry_key in _registry.keys():
        candidate_measurand = measurand(registry_key)
        if candidate_measurand.data_level == 1:
            try:
                if candidate_measurand.sensor_type in sensor_types_of_interest:
                    parent_measurand_strings.append(registry_key)
            except AttributeError:
                pass

    for k in parent_measurand_strings:
        copy_of_prototype = prototype_measurand._clone()
        parent_measurand = measurand(k)#an instance of RawSgyFromIDE
        copy_of_prototype.parent_measurands = [parent_measurand,]
        copy_of_prototype.operator = 'deconvolution applied trace-by-trace'
        copy_of_prototype.description = ' '.join([copy_of_prototype.operator,
                                              copy_of_prototype.parent_measurands[0].description])
        register_measurand(copy_of_prototype)



def _create_correlated_segy_measurands2():

    prototype_measurand = CorrelatedDeconvolvedSEGY2(data_level=2, units='g',
                                           formality='development',
                                           label='correlated_bandpassed',
                                           extension='sgy',
                                           project_id=PROJECT_ID)

    #fir_specs = (corners, duration)
    fir_specs = [(None, None), ([80, 100, 300, 350 ], 0.02), ([75, 100, 230, 280 ], 0.02)]
    #fir_specs = [([80, 100, 300, 350 ], 0.02), ]
    min_lag = -0.1; max_lag = 0.1;
    parent_measurand_strings = []
    for registry_key in _registry.keys():
        candidate_measurand = measurand(registry_key)
        if candidate_measurand.data_level == 2:
            try:
                if candidate_measurand.sensor_type in sensor_types_of_interest:
                    parent_measurand_strings.append(registry_key)
            except AttributeError:
                pass
    for fir_spec in fir_specs:
        firls = FIRLSFilter(fir_spec[0], fir_spec[1])

        for k in parent_measurand_strings:
            copy_of_prototype = prototype_measurand._clone()
            parent_measurand = measurand(k)
            copy_of_prototype.parent_measurands = [parent_measurand, parent_measurand.parent_measurands[0]]
            copy_of_prototype.firls = firls
            copy_of_prototype.min_lag = min_lag
            copy_of_prototype.max_lag = max_lag
            copy_of_prototype.operator = 'apply correlation and bandpass'
            copy_of_prototype.description = ' '.join([copy_of_prototype.operator,
                                                  copy_of_prototype.parent_measurands[0].description])
            register_measurand(copy_of_prototype)


def _create_trace_header_measurands():
    """
    """
    prototype_measurand = TraceHeaderFeaturesMeasurand(data_level=3, formality='development',
                                                       label='trace_header_features', extension='csv',
                                                       project_id=PROJECT_ID)
    parent_measurand_strings = []
    for registry_key in _registry.keys():
        candidate_measurand = measurand(registry_key)
        if candidate_measurand.data_level == 2:
            if candidate_measurand.id_string[0:10] == 'correlated':
                parent_measurand_strings.append(registry_key)

#    parent_measurand_strings = ['correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_N65_deconvolved_sgy_100ms_level1_sgy_piezo',
#                                'correlated_minlag-0.1-maxlag0.1_firls_80-100-300-350_N65_deconvolved_sgy_100ms_level1_sgy_piezo']
    #pdb.set_trace()
    for k in parent_measurand_strings:
        copy_of_prototype = prototype_measurand._clone()
        parent_measurand = measurand(k)
        copy_of_prototype.parent_measurands = [parent_measurand,]
        copy_of_prototype.operator = 'extract info from trace headers for algebraic rock properties transformation'
        copy_of_prototype.description = ' '.join([copy_of_prototype.operator,
                                              copy_of_prototype.parent_measurands[0].description])
        register_measurand(copy_of_prototype)
        _hash_dict[copy_of_prototype.id_string] = copy_of_prototype.hash_id_string
        _hash_dict[copy_of_prototype.hash_id_string] = copy_of_prototype.id_string

def _create_trace_header_eda_measurands():
    """
    """
    prototype_measurand = TraceHeaderFeaturesMeasurandEDA(data_level=3, formality='development',
                                                       label='trace_header_features_eda', extension='csv',
                                                       project_id=PROJECT_ID)
    parent_measurand_strings = []
    for registry_key in _registry.keys():
        candidate_measurand = measurand(registry_key)
        if candidate_measurand.data_level == 2:
            if candidate_measurand.id_string[0:10] == 'correlated':
                parent_measurand_strings.append(registry_key)


    for k in parent_measurand_strings:
        copy_of_prototype = prototype_measurand._clone()
        parent_measurand = measurand(k)
        copy_of_prototype.parent_measurands = [parent_measurand,]
        copy_of_prototype.operator = 'extract features from correlated traces'
        copy_of_prototype.description = ' '.join([copy_of_prototype.operator,
                                              copy_of_prototype.parent_measurands[0].description])
        register_measurand(copy_of_prototype)
        _hash_dict[copy_of_prototype.id_string] = copy_of_prototype.hash_id_string
        _hash_dict[copy_of_prototype.hash_id_string] = copy_of_prototype.id_string


def _create_binned_trace_header_measurands():
    """
    """
    prototype_measurand = BinnedTraceHeaderFeaturesMeasurand(data_level=3, formality='development',
                                                       label='binned', extension='csv',
                                                       project_id=PROJECT_ID)
    parent_measurand_strings = []
    for registry_key in _registry.keys():
        candidate_measurand = measurand(registry_key)
        if candidate_measurand.data_level == 3:
            #pdb.set_trace()

            parent_measurand_strings.append(registry_key)
#            pdb.set_trace()
#            if candidate_measurand.id_string[0:10] == 'correlated':
#                parent_measurand_strings.append(registry_key)
    parent_measurand_strings = ['trace_header_features_correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_N65_deconvolved_sgy_100ms_level1_sgy_piezo_3200hz',]
    parent_measurand_strings = ['trace_header_features_correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo']
    #pdb.set_trace()
    #parent_measurand_strings = ['trace_header_features_correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_N257_deconvolved_sgy_100ms_level1_sgy_piezo_12800hz']
    for k in parent_measurand_strings:
        copy_of_prototype = prototype_measurand._clone()
        parent_measurand = measurand(k)
        copy_of_prototype.parent_measurands = [parent_measurand,]
        copy_of_prototype.operator = 'bin trace headers'
        copy_of_prototype.description = ' '.join([copy_of_prototype.operator,
                                              copy_of_prototype.parent_measurands[0].description])
        register_measurand(copy_of_prototype)
        #_hash_dict[copy_of_prototype.id_string] = copy_of_prototype.hash_id_string
        #_hash_dict[copy_of_prototype.hash_id_string] = copy_of_prototype.id_string


def _create_binned_trace_eda_measurands():
    """
    """
    prototype_measurand = BinnedTraceHeaderFeaturesMeasurand(data_level=3, formality='development',
                                                       label='binned_eda', extension='csv',
                                                       project_id=PROJECT_ID)
    parent_measurand_strings = []
    for registry_key in _registry.keys():
        candidate_measurand = measurand(registry_key)
        if candidate_measurand.data_level == 3:
            #pdb.set_trace()

            parent_measurand_strings.append(registry_key)
#            pdb.set_trace()
#            if candidate_measurand.id_string[0:10] == 'correlated':
#                parent_measurand_strings.append(registry_key)
    parent_measurand_strings = ['trace_header_features_correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_N65_deconvolved_sgy_100ms_level1_sgy_piezo_3200hz',]
    parent_measurand_strings = ['trace_header_features_correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo']
    #pdb.set_trace()
    #parent_measurand_strings = ['trace_header_features_correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_N257_deconvolved_sgy_100ms_level1_sgy_piezo_12800hz']
    parent_measurand_strings = ['trace_features_eda_correlated2_minlag-0.1-maxlag0.1_firls_80-100-300-350_20ms_deconvolved_sgy_100ms_level1_sgy_piezo']
    for k in parent_measurand_strings:
        copy_of_prototype = prototype_measurand._clone()
        parent_measurand = measurand(k)
        copy_of_prototype.parent_measurands = [parent_measurand,]
        copy_of_prototype.operator = 'bin trace headers'
        copy_of_prototype.description = ' '.join([copy_of_prototype.operator,
                                              copy_of_prototype.parent_measurands[0].description])
        register_measurand(copy_of_prototype)
        #_hash_dict[copy_of_prototype.id_string] = copy_of_prototype.hash_id_string
        #_hash_dict[copy_of_prototype.hash_id_string] = copy_of_prototype.id_string


def _create_rock_properties_measurands():
    """
    """
    prototype_measurand = RockPropertiesLogMeasurand(data_level=3, formality='development',
                                                       label='rock_properties', extension='csv',
                                                       project_id=PROJECT_ID)
    parent_measurand_strings = ['binned','binned_eda']
    for k in parent_measurand_strings:
        copy_of_prototype = prototype_measurand._clone()
        parent_measurand = measurand(k)
        copy_of_prototype.parent_measurands = [parent_measurand,]
        copy_of_prototype.operator = 'rock_prop_math_group'
        copy_of_prototype.description = ' '.join([copy_of_prototype.operator,
                                              copy_of_prototype.parent_measurands[0].description])
        register_measurand(copy_of_prototype)
        #_hash_dict[copy_of_prototype.id_string] = copy_of_prototype.hash_id_string
        #_hash_dict[copy_of_prototype.hash_id_string] = copy_of_prototype.id_string

def _create_level1_measurands():
    """
    """
    _create_level1_segy_measurands()
    _create_level1_npy_measurands()
    _create_level1_drilltimes_measurands()
    _create_level1_slamstix_table_measurands()
    _create_mwd_with_mse_measurand()
    _create_master_iterator_measurand()


def _create_level2_segy_measurands():
    """
    """
    _create_deconvolved_segy_measurands()
    _create_correlated_segy_measurands2()


def _create_level3_measurands():
    """
    """
#    _create_trace_header_measurands()
    _create_trace_header_eda_measurands()
    #_create_binned_trace_eda_measurands()
    #pdb.set_trace()
    #_create_binned_trace_header_measurands()
    #_create_rock_properties_measurands()

def registered_measurands():
    """
    #sort measurands alphabetically within data level
    """

    for m in sorted(_registry.values(), key=lambda x: str(x.data_level) + x.id_string):
        yield "Level {:02d}: {}".format(m.data_level, m.id_string)

def print_measurand_registry():
    for m in registered_measurands():
        print(m)

def print_hash_dict():
    """
    """
    print("\n\n")
    keys = _hash_dict.keys()
    keys.sort()
    for k in keys:
        print("{} : {}".format(k, _hash_dict[k]))

def register_production_measurands():
    """
    Ensures that all production measurands are in the measurand registry
    """
    #pdb.set_trace()
    #_create_direct_measurands()
    #_create_resampled_measurands()
    _create_level1_measurands()
    #pdb.set_trace()
    _create_level2_segy_measurands()
    #pdb.set_trace()
    _create_level3_measurands()



#make sure the production measurands are registered on import.
register_production_measurands()
print_measurand_registry()
print_hash_dict()
logger.info("OK")

if __name__ == "__main__":
    # nothing specific to do when run directly
    pass


