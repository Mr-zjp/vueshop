<template>
  <div>
    <router-view></router-view>
    <div :class="{'bottom-nav':true,'bottom-nav2':flag}">
      <ul :class="{home:true, active:homeStyle}" @click="goPage('/index')">
        <li></li>
        <li>首页</li>
      </ul>
      <ul :class="{cart:true, active:cartStyle}" @click="goPage('/cart')">
        <li></li>
        <li>购物车</li>
      </ul>
      <ul :class="{my:true, active:myStyle}" @click="goPage('/my')">
        <li></li>
        <li>我的</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      homeStyle: true,
      cartStyle: false,
      myStyle: false,
      flag:this.$store.state.index.flag
    };
  },
  methods: {
    goPage(url) {
      this.$router.replace(url);
    },
    changeStyleNav(name) {
      switch (name) {
        case "index":
          this.homeStyle = true;
          this.cartStyle = false;
          this.myStyle = false;
          break;
        case "cart":
          this.homeStyle = false;
          this.cartStyle = true;
          this.myStyle = false;
          break;
        case "my":
          this.homeStyle = false;
          this.cartStyle = false;
          this.myStyle = true;
          break;
        default:
          this.homeStyle = true;
          this.cartStyle = false;
          this.myStyle = false;
          break;
      }
    }
  },
  created() {
    document.title = this.$route.meta.title;
    this.changeStyleNav(this.$route.name);
  },
  beforeRouteUpdate(to, from, next) {
    document.title = to.meta.title;
    this.changeStyleNav(to.name);
    next();
  },
  activated() {
    document.title = this.$route.meta.title;
    this.changeStyleNav(this.$route.name);
  }
};
</script>

<style scoped>
.bottom-nav {
  box-sizing: border-box;
  height: 120px;
  width: 100%;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  color: #323232;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  z-index: 10;
}
.bottom-nav.bottom-nav2{
  z-index: 0;
}
.bottom-nav ul {
  width: 100px;
}
.bottom-nav ul li:nth-child(1) {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}
.bottom-nav ul li:nth-child(2) {
  font-size: 28px;
  text-align: center;
}
.bottom-nav ul.active li:nth-child(2) {
  color: #eb1625;
}
.bottom-nav ul.home li:nth-child(1) {
  background-image: url("../../../assets/images/home/main/home1.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.bottom-nav ul.home.active li:nth-child(1) {
  background-image: url("../../../assets/images/home/main/home2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.bottom-nav ul.cart li:nth-child(1) {
  background-image: url("../../../assets/images/home/main/cart1.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.bottom-nav ul.cart.active li:nth-child(1) {
  background-image: url("../../../assets/images/home/main/cart2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.bottom-nav ul.my li:nth-child(1) {
  background-image: url("../../../assets/images/home/main/my1.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.bottom-nav ul.my.active li:nth-child(1) {
  background-image: url("../../../assets/images/home/main/my2.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>