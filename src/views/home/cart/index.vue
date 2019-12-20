<template>
  <div id="box">
    <div class="nav">
      <div @click="$router.go(-1)" class="go-icon"></div>
      <span>购物车</span>
    </div>
    <div class="cart-main">
      <div class="goods-checked">
        <div class="label">
          <span :class="{'bg-image':status}" @click="changeStatus"></span>
        </div>
        <div class="goods-news">
          <div class="goods-news-img">
            <div>
              <img src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg" alt />
            </div>
            <span>删除</span>
          </div>
          <div class="goods-news-tip">
            <div class="font-css">韩都衣舍2016秋新款时尚拼接色宽松显瘦气质长款长袖连衣裙</div>
            <div>
              <span class="font-css">颜色：白色</span>
              <span class="font-css">尺寸：M</span>
            </div>
            <div class="num-wrap">
              <span>¥128</span>
              <div class="wrap-input">
                <div class="mius yunsuan">-</div>
                <div>
                  <input type="text" v-model="counts" />
                </div>
                <div class="plus yunsuan">+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="jiesuan">
      <div class="label">
        <span :class="{'bg-image':AllStatus}" @click="Allchange"></span>
      </div>
      <div class="check-tag">
        <div>全选</div>
        <div>
          合计:
          <span>¥{{price}}</span>
        </div>
      </div>
      <div :class="{'jiesuan-btn':true,'active':status}">去结算</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      status: true,
      AllStatus: true,
      counts: 1,
      price: "0.00"
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goBack() {
      console.log(this.$router)
    },
    changeStatus() {
      this.status = !this.status;
      if (!this.status) {
        this.AllStatus = false;
      }
    },
    Allchange() {
      this.AllStatus = !this.AllStatus;
      if (this.AllStatus) {
        this.status = true;
      }
    }
  }
};
</script>

<style scoped>
#box {
  width: 100%;
  height: auto;
  position: relative;
}
.nav,
.jiesuan {
  width: 100%;
  height: 100px;
  background: white;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
}
.nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.nav span {
  display: block;
}
.nav .go-icon {
  background: url("../../../assets/images/common/right_arrow.png") center center
    no-repeat;
  background-size: 80%;
  height: 80px;
  width: 80px;
  transform: rotate(-180deg);
}
.nav span:nth-child(2) {
  width: 80%;
  height: 100%;
  float: left;
  overflow: hidden;
  font-size: 36px;
  text-align: center;
  line-height: 100px;
}
/* ---------------商品信息-------------------- */
.cart-main {
  min-height: 600px;
  width: 100%;
  position: absolute;
  top: 100px;
  left: 0;
}
.cart-main .goods-checked {
  display: flex;
  width: 100%;
  height: 240px;
  border-bottom: 2px solid #efefef;
  background: white;
}
.cart-main .goods-checked .label,
.jiesuan .label {
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cart-main .goods-checked .label span,
.jiesuan .label span {
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  border: 1px solid #efefef;
  background: #efefef;
}
.cart-main .goods-checked .label span.bg-image,
.jiesuan .label span.bg-image {
  background: url("../../../assets/images/home/cart/checkmark.png") center
    center no-repeat;
  background-size: 100%;
}
.goods-news {
  width: 90%;
  height: 100%;
  display: flex;
}
.goods-news .goods-news-img {
  width: 25%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.goods-news .goods-news-img div {
  height: 120px;
  width: 120px;
}
.goods-news .goods-news-img div img {
  width: 100%;
  height: 100%;
}
.goods-news .goods-news-img span {
  font-size: 24px;
  color: #b5b5b5;
  margin-top: 10px;
}
.goods-news-tip {
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  position: relative;
}
.goods-news-tip .font-css {
  font-size: 24px;
  color: #323232;
  text-align: left;
  margin-bottom: 10px;
}
.goods-news-tip div:nth-child(2) span:nth-child(1) {
  margin-right: 30px;
}
.goods-news-tip .num-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.goods-news-tip div:nth-child(3) span {
  font-size: 28px;
  color: #cc0004;
}
.goods-news-tip div:nth-child(3) .wrap-input {
  width: 204px;
  height: 52px;
  border: 1px solid #000000;
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;
}
.wrap-input .yunsuan {
  height: 32px;
  width: 64px;
  text-align: center;
  line-height: 32px;
  font-size: 40px;
}
.wrap-input div:nth-child(2) {
  width: 76px;
  height: 44px;
  border-right: 2px solid #000000;
  border-left: 2px solid #000000;
}
.wrap-input div:nth-child(2) input {
  width: 100%;
  height: 100%;
  text-align: center;
  border: 0;
}
/* -----------------结算------------------- */
.jiesuan {
  position: fixed;
  left: 0;
  bottom: 120px;
  z-index: 10;
}
.check-tag {
  width: 60%;
  height: 100%;
  line-height: 100px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.check-tag div {
  font-size: 24px;
  color: #323232;
}
.check-tag div:nth-child(2) span {
  font-size: 24px;
  color: #cc0004;
}
.jiesuan-btn {
  width: 30%;
  line-height: 100px;
  height: 100%;
  background: #bfbfbf;
  font-size: 32px;
  text-align: center;
  color: white;
}
.jiesuan-btn.active {
  background: #cc0004;
}
</style>