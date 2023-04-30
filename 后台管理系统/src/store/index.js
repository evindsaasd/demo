import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'

Vue.use(Vuex)

// 创建vuex实例
// 将store实例进行对外暴露
export default new Vuex.Store({
    modules: {
        tab
    }
})