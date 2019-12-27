import config from '../../config'
import {
    request
} from "../../axios.js";
//检测图文验证码是否正确
export function checkVcodeData(vcode) {
    return request(config.baseApi + "/home/user/checkvcode?token=" + config.token, "post", {
        vcode: vcode
    })
}
//检测手机号是否注册
export function isRegisterData(username) {
    return request(config.baseApi + "/home/user/isreg?token=" + config.token, "post", {
        username: username
    })
}
//会员注册
export function registerData(data) {
    return request(config.baseApi + "/home/user/reg?token=" + config.token, "post", data)
}
//会员登录
export function loginData(data) {
    return request(config.baseApi + "/home/user/pwdlogin?token=" + config.token, "post", data)
}
//会员安全认证
export function safeUserData(data) {
    return request(config.baseApi + "/home/user/safe?token=" + config.token, "post", data)
}
//获取会员信息
export function getUserData(uid) {
    return request(config.baseApi + "/user/myinfo/userinfo/uid/" + uid + "?token=" + config.token)
}
//安全退出
export function safeOutLoginData(data) {
    return request(config.baseApi + "/home/user/safeout?token=" + config.token, "post", data)
}