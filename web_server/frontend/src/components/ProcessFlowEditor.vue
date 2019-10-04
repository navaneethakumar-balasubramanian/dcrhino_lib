<template>
  <v-stepper v-model="e6" vertical non-linear @input='changed_stepper'>
    <v-stepper-step :complete="e6 > 1" step="1" editable>
      Select a process flow
      <small>{{process_flow_basename}}</small>
    </v-stepper-step>

    <v-stepper-content step="1" >
          <v-list class="pa-0 pm-0">
                <v-list-tile style='margin:0;padding:0'
                  v-for="(item, i) in log_process_flows"
                  :key="i" ripple>
                  <v-btn block @click="select_flow(item)" style='padding:0;font-size:10px' flat color="light-blue" >{{ item }}</v-btn >
                </v-list-tile>
              </v-list>

    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2" step="2" editable>
        Components to process
        <small>{{components_to_process}}</small>
    </v-stepper-step>

    <v-stepper-content step="2" >
      
      <v-switch style='padding-left:15px' v-model="components_to_process" label="Axial" value="axial"></v-switch>
      <v-switch style='padding-left:15px' v-model="components_to_process" label="Tangential" value="tangential"></v-switch>
      <v-switch style='padding-left:15px' v-model="components_to_process" label="Radial" value="radial"></v-switch>
      <v-btn small color="primary" @click="e6 = 3">Continue</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3" step="3" editable>Number of pipes
        <small>{{subset_counter}} pipes</small>
    </v-stepper-step>

    <v-stepper-content step="3"  >
      <v-slider style='padding:30px'
          v-model="subset_counter"
          always-dirty
          min="1"
          max="10"
          thumb-label="always"
        ></v-slider>
      <v-btn small color="primary" @click="e6 = 4">Continue</v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 4" step="4" editable>Pipes variables
        
    </v-stepper-step>
        <v-stepper-content step="4">
            <v-tabs grow>
            <v-tab  @change='changed_pipe(n)'
            v-for="n in subset_counter"
            :key="n"
            >
            Pipe {{ n }}
            </v-tab>
        </v-tabs>
            <div id="jsoneditor" style="width: 100%; height: 400px;"></div>
            <v-btn small color="primary" @click="e6 = 5">Continue</v-btn>
        </v-stepper-content>
    
    <v-stepper-step step="5" editable>Save</v-stepper-step>
    <v-stepper-content step="5">
        <v-text-field label="Process flow id" :value='new Date().toISOString().slice(0,19).replace("T","_").replace(":","").replace(":","").replace("-","").replace("-","")'></v-text-field>
        <v-btn color="success" block @click="e6 = 5">Save and process</v-btn>
    </v-stepper-content>
    </v-stepper>
</template>

<script>
export default {
    name:'ProcessFlowEditor',
    data () {
      return {
        e6: 1,
        process_flow_basename:'',
        log_process_flows:[],
        subset_counter:1,
        components_to_process:['axial'],
        selected_pipe:1,
        vars:[{
            "deconvolution_filter_duration":0.1,
            "trapezoidal_bpf_corner_4":200,
            "trapezoidal_bpf_corner_3":160,
            "trapezoidal_bpf_corner_2":45,
            "trapezoidal_bpf_corner_1":30,
            "trapezoidal_bpf_duration":0.02,
            "upsample_sampling_rate": 50000.0,
            "tangential_primary": [-0.004, 0.005],
            "axial_primary": [-0.004, 0.005],
            "tangential_multiple_2": [0.0086, 0.0171],
            "tangential_multiple_3": [0.0086, 0.0171],
            "tangential_multiple_1": [0.0086, 0.0171],
            "axial_multiple_3": [0.03, 0.035],
            "axial_multiple_2": [0.03, 0.035],
            "axial_multiple_1": [0.0063, 0.0111]
        },
        {
            "deconvolution_filter_duration":0.1,
            
        }]
      }
    },
    props: ["mine_name"],
    created(){
        this.log_process_selection()
        
    },
    methods:{
        changed_pipe:function(pipe_num){
            this.draw_json_editor(this.vars[pipe_num-1])
        },
        draw_json_editor:function(data){
                const container = document.getElementById("jsoneditor")
                container.innerHTML=''
                const options = {search:false,mainMenuBar:false}
                const editor = new JSONEditor(container, options,data)
                console.log(editor,this.vars)
        },
        changed_stepper:function(input){
            if (input == 4){
                this.draw_json_editor(this.vars[0])
            }
        },
        select_flow:function(filename){
            this.e6 = 2
            this.process_flow_basename = filename
        },
        log_process_selection:function(){
            let temp = this;
            let payload = {
                mine_name: this.mine_name,
                responseType: "arraybuffer"
            };
            axios.post("/api/log_process_flows", payload).then(
                response => {
                    temp.log_process_flows = response.data.log_process_flows
                }
            );
            this.select_process_flow = true
        },
    }
}
</script>