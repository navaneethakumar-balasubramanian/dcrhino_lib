import DcAutocomplete from "dcui/src/components/core/Forms/Components/DcAutocomplete";
import DcDatePicker from "dcui/src/components/core/Forms/Components/DcDatePicker";
import DcInputTextField from "dcui/src/components/core/Forms/Components/DcInputTextField";
export default {
    name: 'EmployeeForm',
    data(){
       return {
           form_data: {
           },
       }
    },
    components: {
       DcAutocomplete,
       DcDatePicker,
       DcInputTextField,
    },
    props: {
   value: {
       default: ''
       },
   edit: {
       default: ''
       }
   },
   mounted()
       {
       this.form_data = this.value.form;
       },
       methods: {
       updated()
   {
       this.$emit('input', this.form_data)
   }
   }
}
