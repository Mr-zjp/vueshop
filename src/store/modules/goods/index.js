import {
    getMenuData,
    getGoodsData
} from "../../../utils/api/goods/index";
export default {
    namespaced: true,
    state: {
        menu: [],
        goods: [],
        val: 0
    },
    mutations: {
        ['GET_MENU'](state, payload) {
            state.menu = payload.menu
        },
        ['GET_GOODS'](state, payload) {
            state.goods = payload.goods
        },
        ['SET_VAL'](state, payload) {
            state.val = payload
        }
    },
    actions: {
        getMenu(conText, payload) {
            getMenuData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_MENU', { menu: res.data });
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getGoods(conText, payload) {
            getGoodsData(payload.cid).then(res => {
                if (res.code === 200) {
                    conText.commit("GET_GOODS", { goods: res.data });
                    if (payload.success) {
                        payload.success();
                    }
                } else {
                    conText.commit("GET_GOODS", { goods: [] });
                }
            })
        },
        setVal(conText, payload) {
            conText.commit('SET_VAL', payload)
        }
    }
}