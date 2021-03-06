/***
 * 定义
 */
import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import mutations from './mutations'
import actions from './action'
import getters from './getter'

Vue.use(Vuex)

const state = {
    test: 0,
    master_key: "",
    shopId: null,
    loginInfo: null,
    userInfo: {},
    defaultAddr: {},
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => wx.getStorageSync(key),
                setItem: (key, value) => wx.setStorageSync(key, value),
                removeItem: (key) => { }
            }
        })
    ]
})