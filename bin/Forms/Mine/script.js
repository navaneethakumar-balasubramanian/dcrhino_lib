import DcInputTextField from "dcui/src/components/core/Forms/Components/DcInputTextField";
import DcSelect from "dcui/src/components/core/Forms/Components/DcSelect";
export default {
    name: 'MineForm',
    data(){
       return {
           form_data: {
           },
       }
    },
    components: {
       DcInputTextField,
       DcSelect,
    },
    props: {
       status_types:{
       default:() => { return  ['Active','Inactive'] }
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
