import {
    loginData,
    safeOutLoginData,
    checkVcodeData,
    isRegisterData,
    registerData,
    getUserData,
    safeUserData,
} from '../../../utils/api/user'
export default {
    namespaced: true,
    state: {
        //用户id
        uid: sessionStorage.getItem('uid') ? sessionStorage.getItem('uid') : "",
        //用户昵称
        nickname: sessionStorage.getItem('nickname') ? sessionStorage.getItem('nickname') : "",
        //token值
        authToken: sessionStorage.getItem("authToken") ? sessionStorage.getItem("authToken") : "",
        //自定义登录状态
        isLogin: sessionStorage.getItem('isLogin') ? sessionStorage.getItem('isLogin') : false,
        //会员积分
        points: 0,
        //用户头像
        head: ''
    },
    mutations: {
        ['GET_USER'](state, payload) {
            state.uid = payload.uid;
            state.nickname = payload.nickname;
            state.authToken = payload.authToken;
            state.isLogin = payload.isLogin;
            sessionStorage.setItem('uid', payload.uid);
            sessionStorage.setItem('nickname', payload.nickname);
            sessionStorage.setItem('authToken', payload.authToken);
            sessionStorage.setItem('isLogin', payload.isLogin);
        },
        ['GET_USER_DATA'](state, payload) {
            state.points = payload.points;
            state.head = payload.head;
        },
        ['OUT_LOGIN'](state, payload) {
            state.uid = '';
            state.nickname = '';
            state.authToken = '';
            state.isLogin = false;
            state.points=0;
            state.head=''
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("nickname");
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("isLogin");
        },
    },
    actions: {
        //检测验证码是否正确
        checkVcode(conText, payload) {
            return checkVcodeData(payload.vcode).then(res => {
                return res;
            })
        },
        //检测账号是否注册
        isRegister(conText, payload) {
            return isRegisterData(payload.username).then(res => {
                return res;
            })
        },
        //会员注册
        register(conText, payload) {
            return registerData(payload).then(res => {
                return res
            })
        },
        //用户登录
        userLogin(conText, payload) {
            loginData(payload).then(res => {
                if (res.code == 200) {
                    conText.commit('GET_USER', {
                        uid: res.data.uid,
                        nickname: res.data.nickname,
                        isLogin: true,
                        authToken: res.data.auth_token
                    })
                }
                if (payload.success) {
                    payload.success(res)
                }
            })
        },
        //会员认证
        safeUser(conText, payload) {
            safeUserData({
                uid: conText.state.uid,
                auth_token: conText.state.authToken
            }).then(res => {
                console.log(res)
            })
        },
        //获取会员信息
        getUser(conText, payload) {
            getUserData(conText.state.uid).then(res => {
                if (res.code === 200) {
                    conText.commit('GET_USER_DATA', {
                        head: res.data.head,
                        points: res.data.points,
                        nickname: res.data.nickname,
                    })
                }
            })
        },
        //安全退出
        outLogin(conText) {
            safeOutLoginData({
                uid: conText.state.uid
            }).then(res => {
                if (res.code === 200) {
                    conText.commit("OUT_LOGIN");
                }
            });
        },
    }
}