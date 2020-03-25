<template>
  <div id="box">
    <div class="header-box">
      <div class="header">
        <div class="classify-icon" @click="$router.go(-1)"></div>
        <div class="search" @click="searchShow.show=true">
          <div class="search-icon"></div>
          <div>{{text}}</div>
        </div>
        <div class="screen" @click="screenBox=true">筛选</div>
      </div>
      <div class="condition">
        <div
          :class="{'color':comprehensive}"
          @click="comprehensive=!comprehensive;salesVolume=false"
        >
          <span>{{title}}</span>
          <span :class="{'bg-image-0':true,'bg-image-1':comprehensive}"></span>
        </div>
        <div :class="{'color':salesVolume}" @click="salesVolume=true;comprehensive=false">销量</div>
      </div>
      <div class="condition-item" v-if="comprehensive">
        <div
          v-for="(item,index) in conditionItems"
          :key="index"
          @click="changeCondition(index,item)"
          :class="{'condition-item-color':conditionActive===index?true:false}"
        >{{item.title}}</div>
      </div>
    </div>
    <div class="goods-main">
      <div class="goods-content" v-for="(item,index) in resultData" :key="index">
        <div class="show-img">
          <img :src="item.image" alt />
        </div>
        <div class="goods-tip">
          <div class="title">{{item.title}}</div>
          <div class="price">${{item.price}}</div>
          <div class="salesVolume">
            销量
            <span class="num">{{item.sales}}</span>件
          </div>
        </div>
      </div>
    </div>
    <div class="bg-opcity" @click="screenBox=false" v-show="screenBox"></div>
    <div :class="screenBox?'screen-box show-box':'screen-box unshow-box'">
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
          <div>价格区间</div>
          <div class="price-wrap" @click.stop>
            <div class="price-input">
              <input
                type="tel"
                placeholder="最低价"
                :value="minPrice"
                @input="SET_MINPRICE({minPrice:$event.target.value})"
              />
            </div>
            <div class="price-line"></div>
            <div class="price-input">
              <input
                type="tel"
                placeholder="最高价"
                :value="maxPrice"
                @input="SET_MAXPRICE({maxPrice:$event.target.value})"
              />
            </div>
          </div>
          <div :class="{'bg-img-0':true, 'bg-img-1':priceSection}"></div>
        </div>
        <div class="price-section-item" v-if="priceSection">
          <div
            v-for="(item,index) in priceItems"
            :key="index"
            :class="{'bg-color-0':true,'bg-color-1':priceActive===index?true:false}"
            @click="checkPrice(index,item)"
          >{{item.price1}}-{{item.price2}}</div>
        </div>
      </div>
    </div>
    <searchComponent :show="searchShow" :isGoodsClass="true" />
  </div>
</template>

<script>
import IScroll from "../../../assets/js/iscroll";
import { mapState, mapActions, mapMutations } from "vuex";
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
      conditionActive: 0, //控制当前点击的分类的背景色
      salesVolume: false, //控制销量样式
      screenBox: false, //控制筛选
      classify: false, //控制分类
      priceSection: false, //控制价格区间
      classifyActive: 0, //控制当前点击的分类的背景色
      priceActive: 0, //控制当前点击的价格区间的背景色
      conditionItems: [
        { otype: "all", title: "综合", active: true },
        { otype: "up", title: "价格从低到高", active: true },
        { otype: "down", title: "价格从高到低", active: true }
      ]
    };
  },
  computed: {
    ...mapState({
      menu: state => state.goods.menu,
      priceItems: state => state.search.priceItems,
      minPrice: state => state.search.minPrice,
      maxPrice: state => state.search.maxPrice,
      resultData:state=>state.search.resultData
    })
  },
  watch: {},
  created() {
    this.getMenu({
      success: () => {
        //console.log(111);
      }
    });
    this.getResult({kwords:this.text,success:()=>{
       this.$nextTick(() => {
         
        });
    }})
  },
  mounted() {},
  destroyed(){},
  beforeRouteUpdate(to, from, next) {
    this.text = to.query.keyword;
     this.getResult({kwords:this.text})
    next();
  },
  methods: {
    ...mapMutations({
      SET_MAXPRICE: "search/SET_MAXPRICE",
      SET_MINPRICE: "search/SET_MINPRICE"
    }),
    ...mapActions({
      getMenu: "goods/getMenu",
      getResult:"search/getResult"
    }),
    changeCondition(index, item) {
      this.conditionActive = index;
      this.title = item.title;
      this.comprehensive = false;
    },
    checkClassify(index) {
      this.classifyActive = index;
    },
    checkPrice(index, item) {
      this.priceActive = index;
      this.SET_MINPRICE(item.price1);
      this.SET_MAXPRICE(item.price2);
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
  z-index: 9999;
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
.condition .color,
.condition-item-color {
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
  margin-top: 100px;
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
  width: 80%;
  height: 100%;
  position: fixed;
  z-index: 100;
  right: 0px;
  top: 0px;
  background-color: #ffffff;
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
  overflow: hidden;
}
.screen-box.show-box {
  transition: transform 1s;
  -webkit-transition: transform 1s;
  transform: translateX(0%);
  -webkit-transform: translateX(0%);
}
.screen-box.unshow-box {
  transition: transform 0.5s;
  -webkit-transition: transform 0s;
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
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
.price-wrap {
  width: auto;
  height: auto;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  margin-left: 18%;
}
.price-wrap .price-input {
  width: 100px;
  height: 40px;
  border: 1px solid #efefef;
}
.price-wrap .price-input input {
  width: 100%;
  height: 89%;
  font-size: 28px;
  text-align: center;
}
.price-wrap .price-line {
  width: 40px;
  height: 1px;
  background-color: black;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
