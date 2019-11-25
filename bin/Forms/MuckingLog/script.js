import DcDatePicker from "dcui/src/components/core/Forms/Components/DcDatePicker";
import DcInputNumber from "dcui/src/components/core/Forms/Components/DcInputNumber";
import DcInputTextField from "dcui/src/components/core/Forms/Components/DcInputTextField";
export default {
    name: 'MuckingLogForm',
    data(){
       return {
           form_data: {
           },
       }
    },
    components: {
       DcDatePicker,
       DcInputNumber,
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
