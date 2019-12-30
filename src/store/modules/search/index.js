import {
    getSearchData,
    getResultData
} from "../../../utils/api/search";
export default {
    namespaced: true,
    state: {
        record: sessionStorage.getItem('record') ? sessionStorage.getItem('record').split(',') : [],
        searchHot: [],
        resultData:[],
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
            state.resultData = payload.resultData
        }
    },
    actions: {
        getHotSearch(conText, paylaod) {
            getSearchData().then(res => {
                if (res.code === 200) {
                    conText.commit('GET_HOTSEARCH', res.data)
                }
            }).catch(() => {})
        },
        getResult(conText,payload){
            getResultData(payload).then(res=>{
            }).catch(()=>{})
        }
    },
    getters: {
        getArr(state) {
            let arr = state.searchHot.filter(res => {
                return res.title.length>0
            });
            return arr;
        }
    },
}