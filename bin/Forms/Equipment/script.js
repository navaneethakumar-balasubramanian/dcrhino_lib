import DcAutocomplete from "dcui/src/components/core/Forms/Components/DcAutocomplete";
import DcDatePicker from "dcui/src/components/core/Forms/Components/DcDatePicker";
import DcInputTextField from "dcui/src/components/core/Forms/Components/DcInputTextField";
import DcSelect from "dcui/src/components/core/Forms/Components/DcSelect";
export default {
    name: 'EquipmentForm',
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
       DcSelect,
    },
    props: {
       equipment_type_types:{
       default:() => { return  ['Haul Truck','Scoop','Cable Bolter','Drill'] }
   ,type:Array},
       status_types:{
       default:() => { return  ['Active','In Active'] }
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
