import DcInputNumber from "dcui/src/components/core/Forms/Components/DcInputNumber";
import DcInputTextField from "dcui/src/components/core/Forms/Components/DcInputTextField";
export default {
    name: 'StopeDesignForm',
    data(){
       return {
           form_data: {
           },
       }
    },
    components: {
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
