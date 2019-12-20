import {
    getMenuData,
    getGoodsData,
} from "../../../utils/api/goods/index";
export default {
    namespaced: true,
    state: {
      menu:[],
      goods:[]
    },
    mutations: {
        ['GET_MENU'](state, payload) {
            state.menu = payload.menu
        },
        ['GET_GOODS'](state, payload) {
            state.goods = payload.goods
            console.log(state.goods)
        },
    },
    actions: {
        getMenu(conText) {
            getMenuData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_MENU', { menu: res.data });
                }
            })
        },
        getGoods(conText,payload) {
            getGoodsData(payload).then(res => {
                if (res.code === 200) {
                    conText.commit('GET_GOODS', { goods: res.data });
                }
            })
        },
    }
}