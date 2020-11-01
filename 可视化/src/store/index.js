import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const getters = {
    isShow(state) {
        return state.showFooter
    },
    getChangedStaticData() {
        return state.staticData
    }
};
export default new Vuex.Store({
    state: {
        staticData: {
            name: "",
            dataArr: [],
            title:'',
        }
    },
    mutations: {
         setTitle(state,val){
             state.title=val;
         },
        changeStaticData(state, data) {
            state.staticData = data;
        }
    },
    getters: getters,
    actions: {
        getStaticData(ctx, data) {
            ctx.commit('changeStaticData', data)
        }
    },
    modules: {}
})