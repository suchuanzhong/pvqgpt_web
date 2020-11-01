
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    loading: false,

  },
  mutations: {
    LOADING(state, value) {
      state.loading = value
    },
  }
})
export {
  store as
  default
};
