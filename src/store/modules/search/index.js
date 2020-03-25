import {
    getSearchData,
    getResultData,
    getShopAttribute,
} from "../../../utils/api/search";
export default {
    namespaced: true,
    state: {
        record: sessionStorage.getItem('record') ? sessionStorage.getItem('record').split(',') : [],
        searchHot: [],
        resultData:[],
        priceItems:[
            {price1:1,price2:50},
            {price1:51,price2:99},
            {price1:100,price2:300},
            {price1:301,price2:1000},
            {price1:1001,price2:4000},
            {price1:4001,price2:9999}
        ],//价格区间
        minPrice:"",//最低价
        maxPrice:"",//最高价
    },
    mutations: {
        ['SET_RECORD'](state, payload) {
            state.record = payload
            sessionStorage.setItem('record', payload)
        },
        ['REMOVE_RECORD'](state, payload) {
            state.record = []
            sessionStorage.removeItem('record');
        },
        ['GET_HOTSEARCH'](state, payload) {
            state.searchHot = payload
        },
        ['GET_SEARCHRESULT'](state,payload){
            state.resultData = payload
        },
        ['SET_MINPRICE'](state,payload){
            state.minPrice=payload;
        },
        ['SET_MAXPRICE'](state,payload){
            state.maxPrice=payload;
        },
    },
    actions: {
        getHotSearch(conText) {
            getSearchData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_HOTSEARCH', res.data)
                }
            }).catch(() => {})
        },
        getResult(conText,payload){
            getResultData(payload).then(res=>{
                console.log(res.data)
                if(res.code==200){
                    conText.commit("GET_SEARCHRESULT",res.data)
                }
            }).catch(()=>{})
        }
    },
    getters: {
        //过滤空的搜索标签
        getArr(state) {
            let arr = state.searchHot.filter(res => {
                return res.title.length>0
            });
            return arr;
        }
    },
}