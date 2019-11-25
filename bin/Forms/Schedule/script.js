import DcDatePicker from "dcui/src/components/core/Forms/Components/DcDatePicker";
import DcInputTextField from "dcui/src/components/core/Forms/Components/DcInputTextField";
import DcSelect from "dcui/src/components/core/Forms/Components/DcSelect";
export default {
    name: 'ScheduleForm',
    data(){
       return {
           form_data: {
           },
       }
    },
    components: {
       DcDatePicker,
       DcInputTextField,
       DcSelect,
    },
    props: {
       shift_code_types:{
       default:() => { return  ['Day Shift','Night Shift','General'] }
   ,type:Array},
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
