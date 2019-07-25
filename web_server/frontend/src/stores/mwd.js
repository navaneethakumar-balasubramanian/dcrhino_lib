const state = {
  mwd: [],
  loading: false
};
const getters = {
  MWD: state => {
    return state.mwd;
  },
  LOADING: state => {
    return state.loading;
  }
};
const mutations = {
  SET_MWD: (state, payload) => {
    state.mwd = payload.data;
  },
  
  SET_LOADING: (state, payload) => {
    state.loading = payload;
  }
};
const actions = {
  GET_MWD: async (context, payload) => {
    context.commit("SET_LOADING", true);
    context.commit("SET_MWD", []);
    let { data } = await axios.post("/api/mwd", payload);
    context.commit("SET_MWD", data);
    context.commit("SET_LOADING", false);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
