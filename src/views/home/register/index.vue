<template>
  <div class="box">
    <topBar>
      <div class="nav" ref="nav">
        <div @click="$router.go(-1)" class="go-icon"></div>
        <span>会员注册</span>
      </div>
    </topBar>
    <div class="from">
      <div class="inputs">
        <input
          type="text"
          v-model="fromData.vcode"
          name="showCode"
          autocomplete="off"
          placeholder="验证码"
        />
        <div class="vcode-img">
          <img :src="imgCode" alt @click="changVCode($event)" />
        </div>
      </div>
      <div class="inputs message-vcode">
        <div class="input">
          <input type="text" v-model="fromData.cellphone" placeholder="请输入手机号" maxlength="11" />
        </div>
        <div
          :class="{'get-code':true,'bg-color':fromData.cellphone.match(/^1[0-9][0-9]\d{8}$/)?true:false}"
          @click="getCode"
          v-if="count==0"
        >获取手机验证码</div>

        <div class="get-code" v-else>{{"重新发送（"+count+")"}}</div>
      </div>
      <div class="inputs">
        <input type="text" placeholder="请输入短信验证码(暂无接口，忽略)" name />
      </div>
      <div class="inputs">
        <input
          :type="!checked?'password':'text'"
          v-model="fromData.password"
          placeholder="请输入密码"
          name="password"
        />
        <van-switch
          v-model="checked"
          active-color="#07c160"
          inactive-color="#efefef"
          @click="checked=!checked"
        />
      </div>
      <div class="reg-btn" @click="submit">注册</div>
      <div class="login-btn" @click="$router.push('/login')">已有账号？登录</div>
    </div>
  </div>
</template>

<script>
import topBar from "../../../components/topBar";
import { mapState, mapActions } from "vuex";
/* import { registerData } from "../../../utils/api/user"; */
import Vue from "vue";
import { Switch, Toast } from "vant";
Vue.use(Switch);
Vue.use(Toast);
export default {
  components: {
    topBar
  },
  props: {},
  data() {
    return {
      checked: false,
      imgCode:
        this.$config.baseApi + "/vcode/chkcode?token=" + this.$config.token,
      fromData: {
        vcode: "",
        cellphone: "",
        password: ""
      },
      count: 0,
      timer: null
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
      document.title=this.$route.meta.title
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    ...mapActions({
      checkVCode: "user/checkVcode",
      isRegister: "user/isRegister",
      register: "user/register"
    }),
    //图形验证码刷新
    changVCode(e) {
      e.target.src =
        this.$config.baseApi +
        "/vcode/chkcode?token=" +
        this.$config.token +
        "&random=" +
        new Date().getTime();
    },
    //获取短信验证码
    async getCode() {
      if (!this.fromData.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
        return false;
      }
      if (this.fromData.vcode.match(/^\s*$/)) {
        Toast("请输入图形验证码");
        return;
      }
      let statusVcode = await this.checkVCode({ vcode: this.fromData.vcode });
      if (statusVcode.code !== 200) {
        Toast("图形验证码不正确");
        return;
      }
      let statusReg = await this.isRegister({
        username: this.fromData.cellphone
      });
      if (statusReg.data.isreg === "1") {
        Toast("该手机号码已注册！请登录");
        return;
      }
      let num = 10;
      this.count = num;
      this.timer = setInterval(() => {
        if (this.count > 0) {
          this.count--;
        } else {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    //注册
    async submit() {
      if (this.fromData.vcode.match(/^\s*$/)) {
        Toast("请输入图形验证码");
        return;
      }
      if (this.fromData.cellphone.match(/^\s*$/)) {
        Toast("请输入手机号码");
        return;
      }
      if (!this.fromData.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
        Toast("请输入正确手机号码");
        return;
      }
      if (this.fromData.password.match(/^\s*$/)) {
        Toast("请输入密码");
        return;
      }
      let statusVcode = await this.checkVCode({ vcode: this.fromData.vcode });
      if (statusVcode.code !== 200) {
        Toast("图形验证码不正确");
        return;
      }
      let statusReg = await this.isRegister({
        username: this.fromData.cellphone
      });
      if (statusReg.data.isreg === "1") {
        Toast("该手机号码已注册！请登录");
        return;
      }
      //会员注册
      /* registerData(this.fromData).then(res => {
        if (res.code === 200) {
          Toast("注册成功！");
          this.$router.push("/login?from=reg");
        } else {
          Toast(res.data);
        }
      }); */
      let register = await this.register(this.fromData);
      if (register.code === 200) {
        Toast("注册成功！");
        this.$router.push("/login?from=reg");
      } else {
        Toast(res.data);
      }
    }
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100vh;
  background: white;
}
.from {
  height: auto;
  width: 100%;
  padding-top: 20px;
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
.inputs .vcode-img {
  height: 46px;
  width: 20%;
  padding: 5px;
  border-left: 2px solid #b1a4a4;
}
.inputs .vcode-img img {
  height: 100%;
  width: 100%;
}
input {
  height: 100%;
  width: 80%;
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 28px;
  line-height: 28px;
  background-color: transparent;
}
.inputs.message-vcode {
  padding: 0;
  display: flex;
  justify-content: space-between;
  border: 0;
}
.message-vcode .input {
  padding-left: 20px;
  box-sizing: border-box;
  width: 62%;
  height: 84px;
  border: 1px solid #efefef;
  border-radius: 3px;
}
.get-code {
  width: 35%;
  height: 82px;
  background: #eaeaea;
  color: #717376;
  border: 1px solid #eaeaea;
  border-radius: 2px;
  font-size: 28px;
  text-align: center;
  line-height: 82px;
}
.get-code.bg-color {
  background: #1989fa;
  color: white;
}
.reg-btn {
  width: 85%;
  height: 80px;
  margin: 0 auto;
  background: #eb1625;
  font-size: 36px;
  color: #fff;
  line-height: 80px;
  text-align: center;
  margin-top: 40px;
  border-radius: 4px;
}
.login-btn {
  height: 60px;
  width: 30%;
  line-height: 60px;
  margin: 20px auto;
  font-size: 20px;
  color: #1989fa;
  text-align: center
}
</style>
