const state = {
  blasthole_observations: [],
  loading: false
};
const getters = {
  BLASTHOLE_OBSERVATIONS: state => {
    return state.blasthole_observations;
  },
  LOADING: state => {
    return state.loading;
  }
};
const mutations = {
  SET_BLASTHOLE_OBSERVATIONS: (state, payload) => {
    state.blasthole_observations = payload.data;
  },
  SET_LOADING: (state, payload) => {
    state.loading = payload;
  }
};
const actions = {
  GET_BLASTHOLE_OBSERVATIONS: async (context, payload) => {
    context.commit("SET_LOADING", true);
    context.commit("SET_BLASTHOLE_OBSERVATIONS", []);
    let { data } = await axios.post("/api/blasthole_observations", payload);
    context.commit("SET_BLASTHOLE_OBSERVATIONS", data);
    context.commit("SET_LOADING", false);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
