<template>
</template>
<script>
import HoleCard from "../components/HoleCard.vue";
import ComparisonHoleCard from "../components/ComparisonHoleCard.vue";

export default {
  components: {
    HoleCard,
    ComparisonHoleCard
  },
  data: () => ({
    loading_lp:false,
    notifications: false,
    search: null,
    clicked_processed_hole_id: false,
    show_dialog: false,
    show_dialog_comparison: false,
    selected: [],
    log_process_flows: [],
    pagination: { rowsPerPage: 25 },
    warning: null,
    warning_text: null,
    message: null,
    message_text: null,
    headers: [],
    filtered_data: [],
    process_flows:{},
    select_process_flow: false,
    dateRange: { startDate: "",
                endDate: ""}
  }),
  created() {
    this.get_process_flows(this.mine_name);
  },
  props: ["mine_name"],

  methods: {
      get_process_flows(mine_name){
        let temp = this;
        let payload = {
          mine_name: this.mine_name
        };
        axios.post("/api/process_flows", payload).then(
          response => {
            temp.log_process_flows = response.data.log_process_flows
          }
        );
        this.select_process_flow = true
      }
  }
};
</script>