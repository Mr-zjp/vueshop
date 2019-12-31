import {
    getMenuData,
    getGoodsData
} from "../../../utils/api/goods/index";
export default {
    namespaced: true,
    state: {
        menu: [],
        goods: [],
        val: 0,//页面离开时存储当前导航的index
        classId:'',//页面离开时存储当前导航的id
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
        },
        ['SET_ID'](state, payload) {
            state.classId = payload
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
            console.log(payload)
            conText.commit('SET_VAL', payload)
        },
        setId(conText, payload) {
            conText.commit('SET_ID', payload)
        }
    }
}