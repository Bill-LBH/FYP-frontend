import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isPractice: false, //练习模式标志
        currentPathName: ''
    },
    mutations: {
        setPath (state) {
            state.currentPathName = localStorage.getItem("currentPathName")
        },
        practice(state,status) {
            state.isPractice = status
        },
        toggle(state) {
            state.flag = !state.flag
        },
        changeUserInfo(state,info) {
            state.userInfo = info
        }
    },
    getters : {
        getPracticeStatus(){
            return state.isPractice;
        }

    },
    actions : {
        getUserInfo(context,info) {
            context.commit('changeUserInfo',info)
        },
        getPractice(context,status) {
            context.commit('practice',status)
        }
    }

})

export default store