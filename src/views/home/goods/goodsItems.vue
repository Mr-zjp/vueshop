<template>
  <div ref="goods-classify-content" class="goods-content-main">
    <div v-show="goods.length>0">
      <div class="goods-wrap" v-for="(item,index) in goods" :key="index">
        <div class="classify-name">{{item.title}}</div>
        <div class="goods-items-wrap">
          <ul v-for="(item2,index2) in item.goods" :key="index2">
            <li>
              <img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt />
            </li>
            <li>{{item2.title}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-show="goods.length<=0" class="no-data">没有相关商品！</div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import IScroll from "../../../assets/js/iscroll";
export default {
  methods: {
    ...mapActions({
      getGoods: "goods/getGoods"
    }),
    scrollPreventDefault(e) {
      e.preventDefault();
    },
    init(cid) {
      this.getGoods({
        cid: cid,
        success: () => {
          this.$nextTick(() => {
            this.myScroll.refresh();
            this.$methods.lazyImg();
          });
        }
      });
    }
  },
  computed: {
    ...mapState({
      goods: state => state.goods.goods
    })
  },
  created() {
    this.cid = this.$route.query.cid ? this.$route.query.cid : "";
    this.init(this.cid);
  },
  mounted() {
    this.$refs["goods-classify-content"].addEventListener(
      "touchmove",
      this.scrollPreventDefault
    );
    this.myScroll = new IScroll(this.$refs["goods-classify-content"], {
      scrollX: false,
      scrollY: true,
      preventDefault: false
    });

    this.myScroll.on("scrollEnd", () => {
      this.$methods.lazyImg();
    });
  },
  beforeRouteUpdate(to, from, next) {
    // console.log(to.query.cid);
    this.init(to.query.cid);
    next();
  },
  beforeDestroy() {
    this.$refs["goods-classify-content"].removeEventListener(
      "touchmove",
      this.scrollPreventDefault
    );
  }
};
</script>

<style scoped>
.goods-content-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
}
.goods-wrap {
  width: 100%;
  height: auto;
}
.goods-wrap .classify-name {
  font-size: 28px;
  width: 100%;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
}
.goods-wrap .goods-items-wrap {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  padding-top: 20px;
  overflow: hidden;
}
.goods-wrap .goods-items-wrap ul {
  width: 32%;
  height: auto;
  float: left;
  margin-left: 0.5%;
  margin-right: 0.5%;
  margin-bottom: 20px;
}
.goods-wrap .goods-items-wrap ul li:nth-child(1) {
  width: 150px;
  height: 150px;
  overflow: hidden;
  margin: 0 auto;
  text-align: center;
}
.goods-wrap .goods-items-wrap ul li:nth-child(1) img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.goods-wrap .goods-items-wrap ul li:nth-child(2) {
  width: 90%;
  height: 80px;
  font-size: 24px;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 20px;
}
</style>
