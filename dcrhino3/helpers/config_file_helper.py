import configparser as ConfigParser
from dcrhino3.models.drill.drill_string_component import DrillStringComponent
from dcrhino3.models.config2 import Config
import json
import string
import sys
from dcrhino3.helpers.general_helper_functions import init_logging, init_logging_to_file
logger = init_logging(__name__)
file_logger = init_logging_to_file(__name__)




def transform_oldconfigjson_to_config2(config_old):
    try:
        if isinstance(config_old, dict) is False:
            config_old = json.loads(config_old)


        c = Config()
        c.set_data_from_json(config_old)
        bpf = dict()
        sensitivities = dict()
        components = list()
        for key in config_old.keys():
            value = config_old[key]
            #print (key,value)
            if key in c.keys():
                if key in ["drill_string_steel_od", "drill_string_total_length", "sensor_position", "bit_size"]:
                    cp_value_items = str(value).split(",")
                    cp_value = cp_value_items[0]
                    if len(cp_value_items) > 1:
                        cp_units = cp_value_items[1]
                    else:
                        cp_units = 3
                    value_dict = {"value": cp_value, "units": cp_units}
                    value = value_dict
                    setattr(c, key, value)
                elif key == "comments":
                    value = filter(lambda x: x in string.printable, value)
                    setattr(c, key, "".join(list(value)))
                else:
                    setattr(c, key, value)
            elif "trapezoidal" in key:
                bpf[key] = value
            elif "sensitivity" in key:
                sensitivities[key] = value
            elif "_string_component" in key:
                dsc = DrillStringComponent(gui_string=value)
                components.append(dsc.to_dict())


        setattr(c, "drill_string_components", components)
        setattr(c, "bpf", bpf)
        setattr(c, "sensor_sensitivity", sensitivities)

        return c
    except:
        print(sys.exc_info())

def transform_configparser_to_config2(config, output_to_file=False):
    try:
        if isinstance(config, ConfigParser.ConfigParser):
            cp = config
            config_path = "config.cfg"
        else:
            config_path = config
            cp = ConfigParser.ConfigParser()
            cp.read(config_path)
        c = Config()
        bpf = dict()
        sensitivities = dict()
        components = list()
        for section in cp.sections():
            for option in cp.options(section):
                if option in c.keys():
                    value = cp.get(section, option).strip()
                    if option in ["drill_string_steel_od", "drill_string_total_length", "sensor_position", "bit_size"]:
                        cp_value_items = value.split(",")
                        cp_value = cp_value_items[0]
                        if len(cp_value_items) > 1:
                            cp_units = cp_value_items[1]
                        else:
                            cp_units = 3
                        value_dict = {"value": cp_value, "units": cp_units}
                        value = value_dict
                        setattr(c, option, value)
                    elif option == "comments":
                        value = filter(lambda x: x in string.printable, value)
                        setattr(c, option, "".join(list(value)))
                    else:
                        setattr(c, option, value)

                elif "trapezoidal" in option:
                    value = cp.get(section, option)
                    bpf[option] = value
                elif "sensitivity" in option:
                    value = cp.get(section, option)
                    sensitivities[option] = value
                elif "_string_component" in option:
                    value = cp.get(section, option)
                    dsc = DrillStringComponent(gui_string=value)
                    components.append(dsc.to_dict())

        setattr(c, "drill_string_components", components)
        setattr(c, "bpf", bpf)
        setattr(c, "sensor_sensitivity", sensitivities)
        if output_to_file:
            output_file = config_path.replace(".cfg", ".json")
            with open(output_file, "w") as fp:
                json.dump(c.pipeline_files_to_dict, fp)
        return c
    except:
        print(sys.exc_info())


def update_global_config(h5f, config, file_id='0'):
    json_global_configs = json.loads(h5f.attrs["global_config_jsons"])
    old_config = json_global_configs[file_id]
    new_config_dict = config.pipeline_files_to_dict
    for key in new_config_dict.keys():
        if key in old_config.keys():
            if old_config[key] != new_config_dict[key]:
                # print(old_config[key], new_config_dict[key])
                tmp = old_config[key]
                old_config[key] = new_config_dict[key]
                logger.info("Updated {} from {} to {}".format(key, tmp, new_config_dict[key]))
        else:
            old_config[key] = new_config_dict[key]
            logger.info("Added {}: {}".format(key, old_config[key]))
    json_global_configs[file_id] = old_config
    h5f.attrs["global_config_jsons"] = json.dumps(json_global_configs)
    return h5f
