<template>
  <div id="box">
    <!--头部搜索 -->
    <div :class="{header:true,scroll:isScroll}">
      <div class="classify-icon" @click="$router.push('/goods/classify')"></div>
      <div class="search" @click="showSearch">
        <div class="search-icon"></div>
        <div>输入喜欢的宝贝名称</div>
      </div>
      <div class="login" @click="$router.push('/login')" v-if="!isLogin">登录</div>
      <div class="my-icon" @click="$router.push('/my')" v-else></div>
    </div>
    <!-- 轮播 -->
    <div class="swiper-container" ref="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banners" :key="index">
          <img :src="item.image" alt />
        </div>
      </div>
      <div class="swiper-pagination" ref="swiper-pagination"></div>
    </div>
    <!-- 商品分类 -->
    <div class="nav-wrap">
      <ul class="item" v-for="(item,index) in navClass" :key="index">
        <li>
          <img :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg" alt />
        </li>
        <li>{{item.title}}</li>
      </ul>
    </div>
    <!--商品展示 -->
    <template v-for="(item,index) in goods">
      <div class="goods-main" :key="index" v-if="(index+1)%2!==0">
        <div :class="'goods-title color-'+index">—— {{item.title}} ——</div>
        <div class="goods-row-1">
          <div class="goods-column">
            <div>{{item.items&&item.items[0].title}}</div>
            <div>
              <span>精品打折</span>
              <span :class="'bg-color-'+index">{{item.items&&item.items[0].price}}</span>
            </div>
            <div>
              <img
                :data-echo="item.items&&item.items[0].image"
                src="../../../assets/images/common/lazyImg.jpg"
                alt
              />
            </div>
          </div>
          <div class="goods-column">
            <div
              class="goods-list goods-list1"
              v-for="(item2,index2) in item.items.slice(1,3)"
              :key="index2"
            >
              <div class="goods-list-title">
                <div>{{item2.title}}</div>
                <div>品质精挑</div>
              </div>
              <img :data-echo="item2.image" src="../../../assets/images/common/lazyImg.jpg" alt />
            </div>
          </div>
        </div>
        <div class="goods-row-2">
          <div class="goods-list" v-for="(item,index) in item.items.slice(3,7)" :key="index">
            <div class="hidden">{{item.title}}</div>
            <div>
              <img :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg" alt />
            </div>
            <div>¥{{item.price}}</div>
            <div>¥{{item.price*2}}</div>
          </div>
        </div>
      </div>
      <div class="goods-main" :key="index" v-else>
        <div class="goods-title color-1">—— {{item.title}} ——</div>
        <div class="goods-row-1">
          <div class="goods-column" v-for="(item,index) in item.items.slice(0,2)" :key="index">
            <div>{{item.title}}</div>
            <div class="nz-tip">火爆开售</div>
            <div class="nz-tip-img">
              <img :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg" alt />
            </div>
          </div>
        </div>
        <div class="goods-row-2">
          <div class="goods-list" v-for="(item,index) in item.items.slice(2,6)" :key="index">
            <div class="hidden">{{item.title}}</div>
            <div>
              <img :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg" alt />
            </div>
            <div>¥{{item.price}}</div>
            <div>¥{{item.price*2}}</div>
          </div>
        </div>
      </div>
    </template>
    <div class="goods-recommend">
      <div>
        <div class="left-line"></div>
        <div class="text-tip">
          <div></div>
          <div>为你推荐</div>
        </div>
        <div class="right-line"></div>
      </div>
    </div>
    <div class="recommend-content">
      <div class="goods-show" v-for="(item,index) in recoms" :key="index">
        <div>
          <img :data-echo="item.image" src="../../../assets/images/common/lazyImg.jpg" alt />
        </div>
        <div>
          <p>{{item.title}}</p>
        </div>
        <div>¥{{item.price}}</div>
      </div>
    </div>
    <search :show="searchShow"></search>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import search from "../../../components/search";
export default {
  components: {
    search
  },
  props: {},
  data() {
    return {
      isScroll: false,
      searchShow: { show: false },
      flag: this.$store.state.index.flag
    };
  },
  computed: {
    ...mapState({
      banners: state => state.index.img,
      navClass: state => state.index.navData,
      goods: state => state.index.products,
      recoms: state => state.index.recom,
      isLogin: state => state.user.isLogin
    })
  },
  watch: {},
  created() {
    this.scroll = true;
    this.getBanner({
      success: () => {
        this.$nextTick(function() {
          new Swiper(this.$refs["swiper-container"], {
            loop: true,
            autoplay: 3000,
            pagination: this.$refs["swiper-pagination"],
            paginationClickable: true,
            autoplayDisableOnInteraction: false
          });
        });
      }
    });
    this.getNav({
      success: () => {
        this.$nextTick(() => {
          this.$methods.lazyImg();
        });
      }
    });
    this.getProducts({
      success: () => {
        this.$nextTick(() => {
          this.$methods.lazyImg();
        });
      }
    });
    this.getRecom({
      success: () => {
        this.$nextTick(() => {
          this.$methods.lazyImg();
        });
      }
    });
    window.addEventListener("scroll", this.eventScrollTop);
  },
  mounted() {},
  destroyed() {
    //离开页面，移除监听
    window.removeEventListener("scroll", this.eventScrollTop);
  },
  deactivated() {
    //离开缓存页面时触发，移除监听
    window.removeEventListener("scroll", this.eventScrollTop);
  },
  activated() {
    this.scroll = true;
    window.addEventListener("scroll", this.eventScrollTop);
  },
  methods: {
    ...mapActions({
      getBanner: "index/getBanner",
      getNav: "index/getNav",
      getProducts: "index/getProduct",
      getRecom: "index/getRecom"
    }),
    showSearch() {
      this.searchShow.show = true;
      this.flag = false;
    },
    eventScrollTop() {
      let top = document.body.scrollTop || document.documentElement.scrollTop;
      if (top >= 150) {
        if (this.scroll) {
          this.scroll = false;
          this.isScroll = true;
        }
      } else {
        if (!this.scroll) {
          this.scroll = true;
          this.isScroll = false;
        }
      }
    }
  }
};
</script>

<style scoped>
#box {
  width: 100%;
  min-height: 100%;
  margin-bottom: 150px;
}
/* --------------header----------------- */
.header {
  height: 100px;
  width: 100%;
  background: linear-gradient(
    rgba(1, 1, 1, 0.2) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
  z-index: 10;
}
.header.scroll {
  background: linear-gradient(rgb(235, 22, 37) 0%, rgba(255, 255, 255, 0) 100%);
}
.classify-icon {
  height: 60px;
  width: 60px;
  background: url("../../../assets/images/common/class.png") center center
    no-repeat;
  background-size: 100%;
}
.search {
  background: rgba(255, 255, 255, 0.8);
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
.login {
  height: 44px;
  width: auto;
  font-size: 32px;
  color: white;
}
.my-icon {
  width: 60px;
  height: 60px;
  background-image: url("../../../assets/images/home/index/my.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
/* --------------------轮播图----------------------- */
.swiper-container {
  height: 364px;
  width: 100%;
  position: relative;
  z-index: 0;
}
.swiper-container img {
  width: 100%;
  height: 364px;
  position: absolute;
  left: 0;
  top: 0;
}
/* -----------------------导航-------------------------- */
.nav-wrap {
  width: 100%;
  height: 160px;
  background-color: #ffffff;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav-wrap .item {
  width: 140px;
}
.nav-wrap ul li:nth-child(1) {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}
.nav-wrap ul li:nth-child(1) img {
  width: 100%;
  height: 100%;
}
.nav-wrap ul li:nth-child(2) {
  font-size: 28px;
  color: #7b7f82;
  text-align: center;
}
/* ---------------------商品分类-------------------------- */
.goods-main {
  width: 100%;
  height: 606px;
  background: white;
}
.goods-main > .goods-title {
  height: 62px;
  width: 100%;
  margin-top: 20px;
  font-size: 28px;
  line-height: 62px;
  text-align: center;
  border-bottom: #efefef 1px solid;
}
.goods-main > .goods-title.color-0 {
  color: #f73b61;
}
.goods-main > .goods-title.color-1 {
  color: #fe6719;
}
.goods-main > .goods-title.color-2 {
  color: #5fc600;
}
.goods-main .nz-tip {
  margin-left: 35%;
  text-align: center;
  font-size: 24px;
  color: #7b7f82;
}
.goods-main .nz-tip-img img {
  width: 120px !important;
  height: 140px !important;
}
.goods-main > .goods-row-1 {
  border-bottom: 1px solid #efefef;
  display: flex;
  overflow: hidden;
}
.goods-main > .goods-row-1 > .goods-column {
  width: 50%;
  height: 250px;
  border-right: 1px solid #efefef;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
}
.goods-column div:nth-child(1),
.goods-list .hidden {
  font-size: 28px;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
}
.goods-column div:nth-child(2) {
  display: flex;
}
.goods-column div:nth-child(2) span {
  width: 80px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  display: inline-block;
}
.goods-column div:nth-child(2) span:nth-child(1) {
  font-size: 24px;
  width: 100px;
  color: #cb385d;
}
.goods-column div:nth-child(2) span:nth-child(2) {
  font-size: 28px;
  border-radius: 30px;
  color: #fff;
  margin-left: 50px;
}
.goods-column div:nth-child(2) .bg-color-0 {
  background: #f21d4f;
}
.goods-column div:nth-child(2) .bg-color-2 {
  background: #5fc600;
}
.goods-column div:nth-child(3) img {
  margin-top: 2px;
  width: 90%;
  height: 146px;
}
.goods-column .goods-list {
  border-bottom: 1px solid #efefef;
  height: 122px;
  display: flex;
}
.goods-list img {
  width: 120px;
  height: 116px;
}
.goods-list.goods-list-title span {
  font-size: 28px;
}
.goods-list-title div:nth-child(2) {
  font-size: 24px;
  color: #7b7f82;
}
.goods-list1 {
  border: 0;
}
.goods-row-2 {
  width: 100%;
  height: 302px;
  display: flex;
  align-items: center;
  text-align: center;
}
.goods-row-2 .goods-list {
  width: 25%;
  height: 302px;
  border-right: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 5px;
  box-sizing: border-box;
  color: #323232;
}
.goods-row-2 .goods-list div:nth-child(1) {
  font-size: 28px;
  overflow: hidden;
  white-space: nowrap;
}
.goods-row-2 .goods-list div:nth-child(2) img {
  height: 147px;
  width: 152px;
}
.goods-row-2 .goods-list div:nth-child(3) {
  color: #d32a4e;
  font-size: 28px;
}
.goods-row-2 .goods-list div:nth-child(4) {
  font-size: 24px;
  color: #7b7f82;
  text-decoration: line-through;
}
/* ----------------------商品推荐----------------------- */
.goods-recommend {
  margin-top: 20px;
}
.goods-recommend div:nth-child(1) {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.goods-recommend div:nth-child(1) .left-line,
.goods-recommend div:nth-child(1) .right-line {
  width: 35%;
  height: 1px;
  background-color: #d4d4d4;
}

.goods-recommend .text-tip {
  width: 242px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 32px;
  display: flex;
  justify-content: center;
  font-weight: bold;
}
.goods-recommend .text-tip div:nth-child(1) {
  height: 40px;
  width: 40px;
  background: url("../../../assets/images/home/index/recom.png") center center
    no-repeat;
  background-size: 100%;
  margin-right: 10px;
}
.recommend-content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
}
.recommend-content .goods-show {
  width: 360px;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-around;
  background: white;
  margin-bottom: 10px;
  font-size: 28px;
  padding: 10px;
  padding-top: 0;
}
.recommend-content .goods-show div:nth-child(1) {
  width: 280px;
  height: 280px;
  margin: 0 auto;
}
.recommend-content .goods-show div:nth-child(1) img {
  width: 100%;
  height: 100%;
}
.recommend-content .goods-show div:nth-child(2) {
  width: 100%;
  height: 60px;
  padding: 3px;
}
.recommend-content .goods-show div:nth-child(2) p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.recommend-content .goods-show div:nth-child(3) {
  width: 50%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: red;
  margin-top: 40px;
}
</style>
