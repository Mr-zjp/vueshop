<template>
  <div>
    <topBar>
      <div class="nav">
        <div @click="$router.go(-1)" class="go-icon"></div>
        <span>会员中心</span>
      </div>
    </topBar>
    <div class="header">
      <div class="content">
        <div class="header-img">
          <img src="../../../assets/images/user/my/default-head.png" alt />
        </div>
        <div class="news">
          <div>昵称</div>
          <div>
            我的积分：
            <span>{{0}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="all-order">
      <div>全部订单</div>
      <div>查看全部订单></div>
    </div>
    <div class="order-items">
      <a class="wait-pay">
        <div class="text">待支付</div>
      </a>
      <a class="wait-take">
        <div class="text">待收货</div>
      </a>
      <a class="wait-comment">
        <div class="text">待评价</div>
      </a>
    </div>
    <div class="menu">
      <div>个人资料</div>
      <div class="self-news"></div>
    </div>
    <div class="menu">
      <div>收货地址</div>
      <div class="address"></div>
    </div>
    <div class="menu">
      <div>绑定手机</div>
      <div class="iphone"></div>
    </div>
    <div class="menu">
      <div>修改密码</div>
      <div class="password"></div>
    </div>
    <div class="menu">
      <div>我的收藏</div>
      <div class="Collection"></div>
    </div>
    <div class="login-reg" @click="$router.push('/login')">登录/注册</div>
  </div>
</template>

<script>
import topBar from "../../../components/topBar";
export default {
  components: {
    topBar
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 280px;
  background: url("../../../assets/images/user/my/mybg.png") center no-repeat;
  background-size: 100%;
  position: relative;
}
.content {
  height: 120px;
  width: auto;
  position: absolute;
  bottom: 10%;
  left: 5%;
  display: flex;
  display: -webkit-flex;
}
.content .header-img {
  height: 120px;
  width: 120px;
  margin-right: 50px;
}
.content .header-img img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
.content .news {
  height: 120px;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.content .news div {
  font-size: 24px;
  color: white;
}
.content .news div:nth-child(1) {
  margin-bottom: 15px;
}
.all-order {
  width: 100%;
  height: 82px;
  line-height: 80px;
  padding: 0 20px;
  background: white;
  border-bottom: 1px solid #efefef;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
.all-order div:nth-child(1) {
  font-size: 28px;
}
.all-order div:nth-child(2) {
  font-size: 24px;
}
.order-items {
  width: 100%;
  height: 140px;
  background: white;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.order-items a {
  width: 92px;
  height: 60%;
  position: relative;
}
.order-items a .text {
  width: 92px;
  text-align: center;
  position: absolute;
  bottom: 0px;
  font-size: 24px;
}
.order-items .wait-pay {
  background: url("../../../assets/images/user/my/pay.png") center 0 no-repeat;
  background-size: 60%;
}
.order-items .wait-take {
  background: url("../../../assets/images/user/my/shouhuo.png") center 0
    no-repeat;
  background-size: 60%;
}
.order-items .wait-comment {
  background: url("../../../assets/images/user/my/comment.png") center 0
    no-repeat;
  background-size: 60%;
}
.menu {
  width: 100%;
  height: 82px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  padding-left: 10%;
  padding-right: 5%;
  background: white;
  border-bottom: 1px solid #efefef;
}
.menu div:nth-child(1) {
  font-size: 32px;
  color: #323232;
}
.menu div:nth-child(2) {
  width: 40px;
  height: 40px;
  background: url("../../../assets/images/common/right_arrow.png") center 0
    no-repeat;
  background-size: 100%;
}
.login-reg {
  width: 70%;
  height: 80px;
  margin: 30px  auto;
  background-color: #e51b19;
  border-radius: 3px;
  line-height:80px;
  text-align: center;
  font-size:32px;
  color: #ffffff;
}
</style>
