import {
    getBannerData,
    getNavData,
    getProducts,
    getRecomData
} from "../../../utils/api/index/index";
export default {
    namespaced: true,
    state: {
        img: [],
        navData: [],
        products: [],
        recom: []
    },
    mutations: {
        ['GET_BANNER'](state, payload) {
            state.img = payload.img
        },
        ['GET_NAV'](state, payload) {
            state.navData = payload.navData
        },
        ['GET_PRODUCTS'](state, payload) {
            state.products = payload.products
        },
        ['GET_RECOM'](state, payload) {
            state.recom = payload
        },
    },
    actions: {
        getBanner(conText) {
            getBannerData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_BANNER', { img: res.data });
                }
            })
        },
        getNav(conText, payload) {
            getNavData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_NAV', { navData: res.data });
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getProduct(conText, payload) {
            getProducts().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_PRODUCTS', { products: res.data });
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        },
        getRecom(conText, payload) {
            getRecomData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_RECOM', res.data);
                    if (payload.success) {
                        payload.success();
                    }
                }
            })
        }
    }
}