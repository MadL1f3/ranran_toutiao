import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '../utils/story'
Vue.use(Vuex)
const ranran = '[object Object]'
export default new Vuex.Store({
  state: {
    user:getItem(ranran)
  },
  mutations: {
    setUser(state,data){
      state.user = data
      setItem(state,data)
    }
  },
  actions: {
  },
  modules: {
  }
})
