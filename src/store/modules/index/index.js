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
        recom: [],
        flag: true,//控制底部导航和搜索页面css z-index属性
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
        getBanner(conText,payload) {
            getBannerData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_BANNER', {
                        img: res.data
                    });
                    if(payload.success){
                        payload.success();
                    }
                }
            }).catch(()=>{})
        },
        getNav(conText, payload) {
            getNavData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_NAV', {
                        navData: res.data
                    });
                    if (payload.success) {
                        payload.success();
                    }
                }
            }).catch(()=>{})
        },
        getProduct(conText, payload) {
            getProducts().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_PRODUCTS', {
                        products: res.data
                    });
                    if (payload.success) {
                        payload.success();
                    }
                }
            }).catch(()=>{})
        },
        getRecom(conText, payload) {
            getRecomData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_RECOM', res.data);
                    if (payload.success) {
                        payload.success();
                    }
                }
            }).catch(()=>{})
        },
    }
}