import pandas as pd
import os
import numpy as np
import json
from bs4 import BeautifulSoup as bs

import_paths = {
    'DcInputTextField': "dcui/src/components/core/Forms/Components/DcInputTextField",
    'DcSelect': "dcui/src/components/core/Forms/Components/DcSelect",
    'DcDatePicker': "dcui/src/components/core/Forms/Components/DcDatePicker",
    'DcDateTimePicker': "dcui/src/components/core/Forms/Components/DcDateTimePicker",
    'DcInputNumber': "dcui/src/components/core/Forms/Components/DcInputNumber",
    'DcAutocomplete': "dcui/src/components/core/Forms/Components/DcAutocomplete",
    'DcInputTextareaField': "dcui/src/components/core/Forms/Components/DcInputTextareaField"
}

def to_html(row_dict):
    if row_dict['Control Type'] == 'Text Input':
        return text_field(row_dict)
    elif row_dict['Control Type'] in ['Option','Select']:
        return select_field(row_dict)
    elif row_dict['Control Type'] in ['Date','DatePicker','Date Input']:
        return date_picker(row_dict)
    elif row_dict['Control Type'] in ['DateTime','DateTimePicker', 'DateTime Input']:
        return datetime_picker(row_dict)
    elif row_dict['Control Type'] in ['Number Input']:
        return number_field(row_dict)
    elif row_dict['Control Type'] in ['TextArea Input']:
        return textarea_field(row_dict)
    elif row_dict['Control Type'] in ['Link']:
        return autocomplete_field(row_dict)
    else:
        print("Unsupported - {}".format(row_dict['Control Type']))
        return "Unsupported - {}".format(row_dict['Control Type']) , '' , ''


def get_property_name(row_dict):
    if type(row_dict['PG_Column']) == float:
        return row_dict['Field Name'].replace(' ','_').replace("'",'').lower()
    return row_dict['PG_Column']

def get_style_classes(row_dict):
    if str(row_dict['Style Classes']) == 'nan':
        return ''
    styles = np.asarray(row_dict['Style Classes'].split(','))
    prepend = np.full(len(styles), '$style.')
    return ':inputClass="[' + ','.join(prepend.astype(object) + styles.astype(object)) + ']"'


def autocomplete_field(row_dict):
    result = '<dc-autocomplete {} v-model="form_data[\'{}\']" label="{}" endpoint="/{}" nameprop="{}" idprop="{}" @input="updated"/>\n'.format(get_style_classes(row_dict),get_property_name(row_dict),row_dict['Field Name'],row_dict['Reference'].split('\n')[0],row_dict['Reference'].split('\n')[1],row_dict['Reference'].split('\n')[2]  )
    return result, 'DcAutocomplete', None

def text_field(row_dict):
    result = '<dc-input-text-field {} v-model="form_data[\'{}\']"  label="{}" @input="updated"/>\n'.format(get_style_classes(row_dict),get_property_name(row_dict),row_dict['Field Name'])
    return result , 'DcInputTextField' , None

def select_field(row_dict):
    result = '<dc-select {} :items="{}" v-model="form_data[\'{}\']"  label="{}" @input="updated"/>\n'.format(get_style_classes(row_dict),get_property_name(row_dict)+"_types",get_property_name(row_dict),row_dict['Field Name'])
    return result , 'DcSelect' , row_dict['Reference'].split('\n')

def date_picker(row_dict):
    result = '<dc-date-picker {} v-model="form_data[\'{}\']" label="{}" @input="updated"/>\n'.format(get_style_classes(row_dict),get_property_name(row_dict),row_dict['Field Name'])
    return result , 'DcDatePicker' , None

def datetime_picker(row_dict):
    result = '<dc-date-time-picker {} v-model="form_data[\'{}\']" label="{}" @input="updated"/>\n'.format(get_style_classes(row_dict),get_property_name(row_dict),row_dict['Field Name'])
    return result , 'DcDateTimePicker' , None

def datetime_picker(row_dict):
    result = '<dc-date-time-picker {} v-model="form_data[\'{}\']" label="{}" @input="updated"/>\n'.format(get_style_classes(row_dict),get_property_name(row_dict),row_dict['Field Name'])
    return result , 'DcDateTimePicker' , None

def number_field(row_dict):
    result = '<dc-input-number {} v-model="form_data[\'{}\']" label="{}" @input="updated"/>\n'.format(get_style_classes(row_dict), get_property_name(row_dict), row_dict['Field Name'])
    return result, 'DcInputNumber' , None

def textarea_field(row_dict):
    result = '<dc-input-textarea-field {} v-model="form_data[\'{}\']"  label="{}" @input="updated"/>\n'.format(get_style_classes(row_dict),get_property_name(row_dict),row_dict['Field Name'])
    return result , 'DcInputTextareaField' , None


df = pd.read_excel('/home/thiago/Downloads/Datacloud-Underground Mine-Datamodel v1.xlsx', sheet_name="Fields (Columns)")

models = df['Model (Table) Name'].unique()
for model in models:
    components_to_import = []
    modelwithouspaces = model.replace(' ','')
    model_df = df[df['Model (Table) Name'] == model]
    result = model_df.to_dict(orient='records')

    last_row = float('nan')
    last_column = float('nan')
    last_group = float('nan')
    row_open = False
    group_open = False
    row_open = False
    #html = '<template>\n'
    html = '<div>\n'
    props = {}
    for field in result:

        if (str(last_row) != str(field['Row'])) and  (str(field['Row']) != 'nan'):
            html += '  <div :class="$style.row">\n'
            last_row = field['Row']
            row_open = True
        else:
            if row_open and (str(last_row) != str(field['Row'])):
                html += '  </div>\n'
                row_open = False

        if (str(last_group) != str(field['Field Group/Tab'])) and  (str(field['Field Group/Tab']) != 'nan'):
            html += '  <div :class="$style.fieldset">\n'
            html += '  <legend>{}</legend>\n'.format(field['Field Group/Tab'])
            last_group = field['Field Group/Tab']
            group_open = True
        else:
            if group_open and (str(last_group) != str(field['Field Group/Tab'])):
                html += '  </div>\n'
                group_open = False

        html_string, component, data = to_html(field)

        if isinstance(data,list):
            props['{}_types'.format(get_property_name(field))] = {}
            props['{}_types'.format(get_property_name(field))]['default'] = data
        components_to_import.append(component)
        html += "  " + html_string

    html += '</div>\n'
    #html += '</template>\n'


    try:
        os.mkdir("Forms/{}".format(modelwithouspaces))
    except:
        pass
    f = open("Forms/{}/template.html".format(modelwithouspaces), "w")
    f.write(html)
    f.close()

    #html = '<script>\n'
    html = ''
    components_to_import = np.asarray(components_to_import)
    for component in np.unique(components_to_import):
        if component != '':
            html += 'import {} from "{}";\n'.format(component,import_paths[component])
    html += 'export default {\n'
    html += "    name: '{}Form',\n".format(modelwithouspaces)
    html += "    data(){\n"
    html += "       return {\n"
    html += "           form_data: {\n"
    html += "           },\n"
    html += "       }\n"
    html += "    },\n"
    html += "    components: {\n"
    for component in np.unique(components_to_import):
        if component != '':
            html += "       {},\n".format(component)
    html += "    },\n"
    html += "    props: {\n"
    for prop in props.keys():
        html += '       {}:'.format(prop) + "{\n"
        props[prop]['default'] = ["'" + opt + "'" for opt in props[prop]['default']]
        html += '       default:() => { return '+ ' [{}] '.format(','.join(props[prop]['default'])) + '}\n'
        html += "   ,type:Array},\n"
    html += "   value: {\n"
    html += "       default: ''\n"
    html += "       },\n"
    html += "   edit: {\n"
    html += "       default: ''\n"
    html += "       }\n"
    html += "   },\n"
    html += "   mounted()\n"
    html += "       {\n"
    html += "       this.form_data = this.value.form;\n"
    html += "       },\n"
    html += "       methods: {\n"
    html += "       updated()\n"
    html += "   {\n"
    html += "       this.$emit('input', this.form_data)\n"
    html += "   }\n"
    html += "   }\n"
    html += "}\n"

    f = open("Forms/{}/script.js".format(modelwithouspaces), "w")
    f.write(html)
    f.close()

    html = '<template src="./template.html" />\n'
    html += '<style module src = "./../formStyles.css" />\n'
    html += '<script src="./script.js" />\n'
    f = open("Forms/{}/index.vue".format(modelwithouspaces), "w")
    f.write(html)
    f.close()

