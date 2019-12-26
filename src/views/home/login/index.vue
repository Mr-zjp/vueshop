<template>
  <div class="box">
    <topBar>
      <div class="nav" ref="nav">
        <div @click="$router.go(-1)" class="go-icon"></div>
        <span>登录</span>
      </div>
    </topBar>
    <div class="login">
      <div class="inputs">
        <input type="tel" v-model="iphone" name="cellphone" autocomplete="off" placeholder="手机号" />
      </div>
      <div class="inputs">
        <input
          :type="!checked?'password':'text'"
          v-model="password"
          placeholder="密码"
          name="password"
        />
        <van-switch
          v-model="checked"
          active-color="#07c160"
          inactive-color="#efefef"
          @click="checked=!checked"
        />
      </div>
      <div class="login-btn" @click="login">登录</div>
      <div class="other">
        <div>
          <img src="../../../assets/images/home/index/forget.png" alt />
          <span>忘记密码？</span>
        </div>
        <div>
          <img src="../../../assets/images/home/index/reg.png" alt />
          <span>快速注册</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Switch, Toast } from "vant";
Vue.use(Switch);
Vue.use(Toast);
import topBar from "../../../components/topBar";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    topBar
  },
  props: {},
  data() {
    return {
      iphone: "",
      password: "",
      checked: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    ...mapActions({
      userLogin: "user/userLogin"
    }),
    login() {
      if (this.iphone.match(/^\s*$/)) {
        Toast("请输入手机号");
        return;
      }
      if (!this.iphone.match(/^1[0-9][0-9]\d{8}$/)) {
        Toast("手机号格式不正确");
        return;
      }
      if (this.password.match(/^\s*$/)) {
        Toast("请输入密码");
        return;
      }
      this.userLogin({
        cellphone: this.iphone,
        password: this.password,
        success: (res) => {
            if(res.code==200){
                this.$router.go(-1);
            }else{
                Toast(res.data)
            }
        }
      });
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
}
.login {
  margin-top: 0px;
  width: 100%;
  padding-top: 20px;
  overflow: hidden;
}
.inputs {
  width: 90%;
  height: 84px;
  background: white;
  border: 1px solid #efefef;
  border-radius: 3px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;
  padding-left: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
input {
  height: 100%;
  width: 80%;
}
input {
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 28px;
  line-height: 28px;
  background-color: transparent;
}
.login-btn {
  width: 90%;
  height: 80px;
  background: #eb1625;
  line-height: 80px;
  text-align: center;
  color: #ffffff;
  margin: 0 auto;
  display: block;
  border-radius: 3px;
  font-size: 40px;
}
.other {
  width: 90%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}
.other div {
  display: flex;
  align-items: center;
}
.other div img {
  width: 32px;
  height: 32px;
}
.other div span {
  font-size: 24px;
  color: #323232;
}
</style>
