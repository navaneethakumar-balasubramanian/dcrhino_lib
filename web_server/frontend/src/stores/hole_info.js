import Axios from 'axios'


const state = {
    hole_info: false,
    loading : false
}
const getters = {
   
   HOLE_INFO :state => {
    return state.hole_info;
  },
  LOADING :state => {
    return state.loading;
  },
}
const mutations = {
  SET_HOLE_INFO : (state,payload) => {
    state.hole_info = payload
 },
 SET_TO_MP:(state,payload)=> {
   state.hole_info.to_mp = payload
 },
 SET_LOADING : (state,payload) => {
   state.loading = payload
  }
}
const actions = {
 
  GET_HOLE_INFO : async (context,payload) => {
    context.commit('SET_LOADING',true)
    context.commit('SET_HOLE_INFO',false)
    let { data } = await Axios.post('http://localhost:5000/api/processed_hole',payload)
    context.commit('SET_HOLE_INFO',data[0])
    context.commit('SET_LOADING',false)
  },
  UPDATE_HOLE_TO_MP : async (context,payload) => {
    
    context.commit('SET_LOADING',true)
    let { data } = await Axios.post('http://localhost:5000/api/hole_to_mp',payload)
    context.commit('SET_LIST_PROCESS_TO_MP',{processed_hole_id:payload.processed_hole_id,to_mp:payload.to_mp})
    context.commit('SET_TO_MP',payload.to_mp)
    context.commit('SET_LOADING',false)
  }
}

export default {
  state,getters,mutations,actions
}