import { loginData, safeUserData, safeOutLoginData } from '../../../utils/api/user'
export default {
    namespaced: true,
    state: {
        isLogin: sessionStorage.getItem('isLogin')?sessionStorage.getItem('isLogin'):false,
        userNews: {}
    },
    mutations: {
        ['GET_USER'](state, payload) {
            state.userNews = payload.userNews;
            state.isLogin = payload.isLogin;
            sessionStorage.setItem('isLogin', payload.isLogin)
            sessionStorage.setItem('userNews', JSON.stringify(payload.userNews))
        }
    },
    actions: {
        userLogin(conText, payload) {
            loginData(payload).then(res => {
                if (res.code == 200) {
                    conText.commit('GET_USER', { userNews: res.data, isLogin: true })
                }
                if (payload.success) {
                    payload.success(res)
                }
            })
        }
    }
}