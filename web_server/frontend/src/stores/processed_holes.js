import Axios from 'axios'


const state = {
    processed : [],
    selected_processed_hole: false
}
const getters = {
   PROCESSED : state => {
     return state.processed;
   },
   SELECTED_PROCESSED_HOLE :state => {
    return state.selected_processed_hole;
  },
}
const mutations = {
  SET_PROCESSED : (state,payload) => {
     state.processed = payload
  },
  SET_SELECTED_PROCESSED_HOLE : (state,payload) => {
    state.selected_processed_hole = payload
 },
}
const actions = {
  GET_PROCESSED : async (context,mine_name) => {
      context.commit('SET_PROCESSED',{})
      let { data } = await Axios.post('http://localhost:5000/api/processed_holes',{
        mine_name: mine_name})
      context.commit('SET_PROCESSED',data)
  },
  GET_PROCESSED_HOLE : async (context,payload) => {
    context.commit('SET_SELECTED_PROCESSED_HOLE',false)
    let { data } = await Axios.post('http://localhost:5000/api/processed_hole',{
      mine_name: payload[0],
      processed_hole_id:payload[1]
    })
    console.log(data)
    context.commit('SET_SELECTED_PROCESSED_HOLE',data)
},
}

export default {
  state,getters,mutations,actions
}