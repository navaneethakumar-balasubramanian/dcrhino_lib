import DcDatePicker from "dcui/src/components/core/Forms/Components/DcDatePicker";
import DcInputNumber from "dcui/src/components/core/Forms/Components/DcInputNumber";
export default {
    name: 'StockpileUpdateForm',
    data(){
       return {
           form_data: {
           },
       }
    },
    components: {
       DcDatePicker,
       DcInputNumber,
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
