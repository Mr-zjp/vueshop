import Vuex from 'vuex'
import Vue from 'vue'
import index from './modules/index/index.js'
import goods from './modules/goods/index.js'
import user from './modules/user/index.js'
import search from './modules/search/index.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
        index,
        goods,
        search,
        user
    }
});
export default store;