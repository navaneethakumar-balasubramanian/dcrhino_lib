import ConfigParser
import argparse
import os, sys
import numpy as np
import pdb
from dcrhino3.models.metadata import Metadata

def update_structure(old,reference):
    new = old

    for section in new.sections():
        for option in new.options(section):
            if reference.has_option(section,option):
                pass
            else:
                new.remove_option(section,option)
                print("Removed {} in {} Section".format(option,section))
        if section in reference.sections():
            pass
        else:
            new.remove_section(section)
            print("Removed {} Section".format(section))


    for section in reference.sections():
        if section in new.sections():
            pass
        else:
            new.add_section(section)
            print("Added {} Section".format(section))
        for option in reference.options(section):
            if new.has_option(section,option):
                pass
            else:
                value = reference.get(section,option)
                new.set(section,option,value)
                print("Added {}={} in {} Section".format(option,value,section))
    return new


def update_options(old,reference):
    new = old
    for section in reference.sections():
        if section in new.sections():
            pass
        else:
            new.add_section(section)
            print("Added {} Section".format(section))
        for option in reference.options(section):
            if new.has_option(section,option):
                if new.get(section,option) != reference.get(section,option):
                    value = reference.get(section,option)
                    new.set(section,option,value)
                    print("Updated {}={} in {} Section".format(option,value,section))
            else:
                value = reference.get(section,option)
                new.set(section,option,value)
                print("Added {}={} in {} Section".format(option,value,section))
    return new

def extract_config_file_from_h5_file(h5f):
    config = ConfigParser.ConfigParser()
    for key,value in h5f.attrs.items():
        #print(key,value)
        section = key.split("/")[0]
        param_name = key.split("/")[1]
        #pdb.set_trace()
        if config.has_section(section):
            config.set(section,param_name,value)
        else:
            config.add_section(section)
            config.set(section,param_name,value)
    return config

def extract_metadata_from_h5_file(h5f):
    config = ConfigParser.ConfigParser()
    for key,value in h5f.attrs.items():
        #print(key,value)
        section = key.split("/")[0]
        param_name = key.split("/")[1]
        #pdb.set_trace()
        if config.has_section(section):
            config.set(section,param_name,value)
        else:
            config.add_section(section)
            config.set(section,param_name,value)
    m =Metadata(config)
    return m


def config_file_to_attrs(config_parser,_h5f):
    m=""
    for section in config_parser.sections():
        for option in config_parser.options(section):
            value = config_parser.get(section,option)
            _h5f.attrs[str(section) + "/" + str(option)] = value
            m += str(section) + "/" + str(option)+","+value +"\n"
            #print (str(section) + "/" + str(option),value)
    return _h5f,m

def update_h5f_key(h5f,key,value):
    try:
        #pdb.set_trace()
        if key in h5f.keys():
            if h5f[key] != value:
                h5f[key].resize(value.shape)
                h5f[key][:] = value
        else:
            raise KeyError("{} not found in the file Keys".format(key))
        return h5f
    except:
        print("Error updating h5f key")
        print (sys.exc_info())


def update_h5f_headers(h5f,updated_cfg):

    config = extract_config_file_from_h5_file(h5f)
    config = update_options(config,updated_cfg)
    h5f,attributes = config_file_to_attrs(config,h5f)

    sensor_type = config.getint('INSTALLATION', 'sensor_type')

    if sensor_type == 1 or sensor_type == 3:
        sensitivity = np.array([config.getfloat('PLAYBACK', 'ide_multiplier')],dtype=np.float32)
    else:
        sensitivity = np.array([config.getfloat('PLAYBACK', 'x_sensitivity'),config.getfloat('PLAYBACK', 'y_sensitivity'),config.getfloat('PLAYBACK', 'z_sensitivity')],dtype=np.float32)
    axis = np.array([config.getfloat('INSTALLATION', 'sensor_axial_axis'),config.getfloat('INSTALLATION', 'sensor_tangential_axis')],dtype=np.float32)
    h5f = update_h5f_key(h5f,"sensitivity",sensitivity)
    h5f = update_h5f_key(h5f,"axis",axis)
    print ("Sensitivity: {}".format(h5f["sensitivity"][:]))
    print ("Axis: {}".format(h5f["axis"][:]))
    print ("Done")
    return h5f




if __name__ == "__main__":
    argparser = argparse.ArgumentParser(description="Update Structure of Config File -  Copyright (c) 2018 DataCloud")
    argparser.add_argument('-old', '--old_file', help="Path to the old config file", default=None)
    argparser.add_argument('-ref', '--reference_file', help="Path to the new config file", default=None)

    args = argparser.parse_args()

    old = ConfigParser.ConfigParser()
    old.read(str(args.old_file))
    reference = ConfigParser.ConfigParser()
    reference.read(str(args.reference_file))

    new = update_structure(old,reference)

    output_name = "updated_"+os.path.basename(str(args.old_file))

    with open(os.path.join(os.path.dirname(str(args.old_file)),output_name), 'w') as configfile:
        new.write(configfile)
