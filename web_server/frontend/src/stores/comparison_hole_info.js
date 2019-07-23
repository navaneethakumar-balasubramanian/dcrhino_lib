const state = {
  holes_info: false,
  loading: false
};
const getters = {
  HOLES_INFO: state => {
    return state.holes_info;
  },
  LOADING: state => {
    return state.loading;
  }
};
const mutations = {
  SET_HOLES_INFO: (state, payload) => {
    state.holes_info = payload;
  },
  SET_LOADING: (state, payload) => {
    state.loading = payload;
  }
};
const actions = {
  GET_HOLES_INFO: async (context, payload) => {
    context.commit("SET_LOADING", true);
    context.commit("SET_HOLES_INFO", false);
    let { data } = await axios.post("/api/processed_hole", payload);
    context.commit("SET_HOLES_INFO", data);
    context.commit("SET_LOADING", false);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
