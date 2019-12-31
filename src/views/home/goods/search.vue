<template>
  <div id="box">
    <div class="header-box">
      <div class="header">
        <div class="classify-icon" @click="$router.go(-1)"></div>
        <div class="search" @click="searchShow.show=true">
          <div class="search-icon"></div>
          <div>{{text}}</div>
        </div>
        <div class="screen" @click="screenBox=!screenBox">筛选</div>
      </div>
      <div class="condition">
        <div :class="{'color':comprehensive}" @click="comprehensive=!comprehensive">
          <span>{{title}}</span>
          <span :class="{'bg-image-0':true,'bg-image-1':comprehensive}"></span>
        </div>
        <div :class="{'color':salesVolume}" @click="salesVolume=!salesVolume">销量</div>
      </div>
      <div class="condition-item" v-if="comprehensive">
        <div v-for="(item,index) in conditionItems" :key="index" @click="title=item">{{item}}</div>
      </div>
    </div>
    <div class="goods-main">
      <div class="goods-content">
        <div class="show-img">
          <img src="//vueshop.glbuys.com/uploadfiles/1524557968.jpg" alt />
        </div>
        <div class="goods-tip">
          <div class="title">酷睿i5四核GTX1060独显台式机组装电脑主机整机 绝地求生吃鸡游戏</div>
          <div class="price">$2580</div>
          <div class="salesVolume">
            销量
            <span class="num">{{'0'}}</span>件
          </div>
        </div>
      </div>
    </div>
    <div :class="{'bg-opcity':screenBox}" @click="screenBox=false"></div>
    <transition name="fade">
      <div class="screen-box" v-if="screenBox">
        <div class="title-tip">
          <div class="goods-classify" @click="classify=!classify">
            <span>分类</span>
            <span :class="{'bg-img-0':true, 'bg-img-1':classify}"></span>
          </div>
          <div class="classify" v-if="classify">
            <div
              v-for="(item,index) in menu"
              :key="index"
              :class="{'bg-color-0':true,'bg-color-1':classifyActive===index?true:false}"
              @click="checkClassify(index)"
            >{{item.title}}</div>
          </div>
        </div>
        <div class="title-tip">
          <div class="price-section" @click="priceSection=!priceSection">
            <span>价格区间</span>
            <span :class="{'bg-img-0':true, 'bg-img-1':priceSection}"></span>
          </div>
          <div class="price-section-item" v-if="priceSection">
            <div
              v-for="(item,index) in price"
              :key="index"
              :class="{'bg-color-0':true,'bg-color-1':priceActive===index?true:false}"
              @click="checkPrice(index)"
            >{{item}}</div>
          </div>
        </div>
      </div>
    </transition>
    <searchComponent :show="searchShow" :isGoodsClass="true" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import searchComponent from "../../../components/search";
export default {
  components: {
    searchComponent
  },
  props: {},
  data() {
    return {
      searchShow: {
        show: false
      }, //控制搜索页面和搜索组件的显示隐藏
      text: this.$route.query.keyword ? this.$route.query.keyword : "",
      title: "综合",
      comprehensive: false, //控制综合样式
      salesVolume: false, //控制销量样式
      screenBox: false, //控制筛选
      classify: false, //控制分类
      priceSection: false, //控制价格区间
      classifyActive: -1, //控制当前点击的分类的背景色
      priceActive: -1, //控制当前点击的价格区间的背景色
      conditionItems: ["综合", "价格由高到低", "价格由低到高"],
      price: ["1-50", "51-99", "100-300", "301-1000", "1001-9999"]
    };
  },
  computed: {
    ...mapState({
      menu: state => state.goods.menu
    })
  },
  watch: {},
  created() {
    this.getMenu({
      success: () => {
        //console.log(111);
      }
    });
  },
  mounted() {},
  beforeRouteUpdate(to, from, next) {
    this.text = to.query.keyword;
    next();
  },
  methods: {
    ...mapActions({
      getMenu: "goods/getMenu"
    }),
    checkClassify(index) {
      this.classifyActive = index;
    },
    checkPrice(index) {
      this.priceActive = index;
    }
  }
};
</script>

<style scoped>
#box {
  width: 100%;
  height: 100vh;
  background: white;
  overflow: hidden;
}
.bg-opcity {
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.header-box {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}
.header {
  height: 100px;
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
}
.classify-icon {
  height: 80px;
  width: 80px;
  background: url("../../../assets/images/home/goods/back.png") center center
    no-repeat;
  background-size: 100%;
}
.search {
  background: #eaeaea;
  width: 65%;
  height: 60px;
  line-height: 60px;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 16px;
}
.search > .search-icon {
  display: inline-block;
  height: 44px;
  width: 44px;
  background: url("../../../assets/images/common/search_icon.png") center center
    no-repeat;
  background-size: 100%;
  margin: 0 20px;
}
.screen {
  height: 44px;
  width: auto;
  font-size: 32px;
}
.condition {
  height: 82px;
  width: 100%;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  display: flex;
  align-items: center;
  padding-left: 20px;
  background: white;
  font-size: 32px;
  box-sizing: border-box;
}
.condition .color {
  color: #fad208;
}
.condition div:nth-child(1) {
  display: flex;
  align-items: center;
  margin-right: 25px;
}
.condition div:nth-child(1) .bg-image-0 {
  display: inline-block;
  height: 35px;
  width: 35px;
  background: url("../../../assets/images/home/goods/down.png") center no-repeat;
  background-size: 100%;
  margin-left: 5px;
}
.condition div:nth-child(1) .bg-image-0.bg-image-1 {
  background: url("../../../assets/images/home/goods/down2.png") center
    no-repeat;
  background-size: 100%;
}
.condition-item div {
  height: 82px;
  width: 100%;
  border-bottom: 1px solid #efefef;
  text-indent: 20px;
  line-height: 82px;
  background: white;
  font-size: 28px;
}
.goods-main {
  height: auto;
  width: 100%;
  margin-top: 200px;
}
.goods-content {
  width: 100%;
  height: 200px;
  display: flex;
}
.goods-content .show-img {
  width: 200px;
  height: 200px;
  margin-left: 10px;
}
.goods-content .show-img img {
  width: 100%;
  height: 100%;
}
.goods-content .goods-tip {
  width: 73%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  padding-left: 40px;
}
.title {
  height: 80px;
  width: 95%;
  font-size: 28px;
}
.price {
  font-size: 32px;
  color: #f93036;
  margin-top: 10px;
}
.salesVolume {
  font-size: 24px;
  color: #969696;
  margin-top: 10px;
}
.num {
  color: #fda208;
}
.screen-box {
  width: 600px;
  height: 100%;
  z-index: 10;
  background: white;
  position: fixed;
  right: 0;
  top: 0;
}
.screen-box > .title-tip {
  border-bottom: 1px solid #ccc;
}
.screen-box > .title-tip > .goods-classify,
.screen-box > .title-tip > .price-section {
  width: 100%;
  height: 80px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.screen-box > .title-tip > .goods-classify > .bg-img-0,
.screen-box > .title-tip > .price-section > .bg-img-0 {
  display: block;
  height: 40px;
  width: 40px;
  background: url("../../../assets/images/home/goods/down.png") center no-repeat;
  background-size: 100%;
}
.screen-box > .title-tip > .goods-classify > .bg-img-0.bg-img-1,
.screen-box > .title-tip > .price-section > .bg-img-0.bg-img-1 {
  display: block;
  height: 40px;
  width: 40px;
  background: url("../../../assets/images/home/goods/up.png") center no-repeat;
  background-size: 100%;
}
.classify {
  width: 100%;
  min-height: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 3px;
}
.price-section-item {
  width: 100%;
  height: 170px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 3px;
}
.classify > .bg-color-0,
.price-section-item > .bg-color-0 {
  width: 30%;
  height: 64px;
  background-color: #efefef;
  text-align: center;
  line-height: 64px;
  overflow: hidden;
  font-size: 28px;
  border-radius: 10px;
  margin-left: 2%;
  margin-right: 1%;
  margin-bottom: 20px;
}
.classify > .bg-color-0.bg-color-1,
.price-section-item > .bg-color-0.bg-color-1 {
  background: #fda208;
  color: white;
}
.fade-enter {
  right: -600px;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-leave {
  right: 600px;
}
</style>
