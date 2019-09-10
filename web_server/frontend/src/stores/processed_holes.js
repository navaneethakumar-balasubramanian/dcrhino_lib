const state = {
  processed_list: [],
  processed_at_ts: [],
  loading: false
};
const getters = {
  PROCESSED_LIST: state => {
    console.log(state.processed_list)
    return state.processed_list;
  },
  LOADING: state => {
    return state.loading;
  }
};
const mutations = {
  SET_PROCESSED_LIST: (state, payload) => {
    
    state.processed_list = payload.data;
    state.processed_at_ts = payload.processed_at_ts;
  },
  SET_LIST_PROCESS_TO_MP: (state, payload) => {
    let processed_hole = state.processed_list.find(
      processed_hole =>
        processed_hole.processed_hole_id === payload.processed_hole_id
    );
    processed_hole.to_mp = payload.to_mp;
  },
  SET_LOADING: (state, payload) => {
    state.loading = payload;
  }
};
const actions = {
  GET_PROCESSED: async (context, payload) => {
    context.commit("SET_LOADING", true);
    context.commit("SET_PROCESSED_LIST", []);
    let { data } = await axios.post("/api/processed_holes", payload);
    
    context.commit("SET_PROCESSED_LIST", data);
    context.commit("SET_LOADING", false);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
