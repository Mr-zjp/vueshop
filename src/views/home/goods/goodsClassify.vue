<template>
  <div class="page">
    <div class="search-header" @click="searchShow.show=true">
      <div class="back" @click="goBack()"></div>
      <div class="search">请输入宝贝名称</div>
    </div>
    <div class="goods-main">
      <div ref="scroll-classify" class="classify-wrap">
        <div>
          <div
            ref="item"
            :class="{'classify-item':true, 'active':val===index?true:false}"
            v-for="(item,index) in menu"
            :key="index"
            @click="changeActive(index,item.cid)"
          >{{item.title}}</div>
        </div>
      </div>
      <div class="goods-content">
        <router-view></router-view>
      </div>
    </div>
    <my-search :show="searchShow"></my-search>
  </div>
</template>

<script>
import IScroll from "../../../assets/js/iscroll";
import mySearch from "../../../components/search";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    mySearch: mySearch
  },
  data() {
    return {
      val: this.$store.state.goods.val ? this.$store.state.goods.val : 0,
      goodsId: this.$store.state.goods.classId
        ? this.$store.state.goods.classId
        : "",
      searchShow: {
        show: false
      } //控制搜索页面和搜索组件的显示隐藏
    };
  },
  computed: {
    ...mapState({
      menu: state => state.goods.menu
    })
  },
  created() {
    this.getMenu({
      success: () => {
        this.$nextTick(() => {
          this.myScroll.refresh();
        });
      }
    });
    this.$router.push("/goods/classify/items?cid=" + this.goodsId);
  },
  mounted() {
    document.title = this.$route.meta.title;
    this.$refs["scroll-classify"].addEventListener(
      "touchmove",
      this.scrollPreventDefault
    );
    this.myScroll = new IScroll(this.$refs["scroll-classify"], {
      scrollX: false,
      scrollY: true,
      preventDefault: false
    });
  },
  beforeDestroy() {
    this.$refs["scroll-classify"].removeEventListener(
      "touchmove",
      this.scrollPreventDefault
    );
  },
  methods: {
    ...mapActions({
      getMenu: "goods/getMenu",
      setId: "goods/setId",
      setVal: "goods/setVal"
    }),
    changeActive(index, id) {
      let top = this.$refs.item[0].offsetHeight * index;
      let minHeight = parseInt(this.$refs["scroll-classify"].offsetHeight / 4);
      let bottomHeight = this.$refs["scroll-classify"].scrollHeight - top;
      if (
        top > minHeight &&
        bottomHeight > this.$refs["scroll-classify"].offsetHeight
      ) {
        this.myScroll.scrollTo(0, -top, 100, IScroll.utils.ease.elastic);
      }
      this.val = index;
      this.setId(id);
      this.setVal(index);
      this.$router.push("/goods/classify/items?cid=" + id);
    },
    goBack() {
      this.$router.push("/index");
    },
    scrollPreventDefault(e) {
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.search-header {
  width: 100%;
  height: 100px;
  background: #ffffff;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  border-bottom: 1px solid #efefef;
}
.search-header .back {
  width: 80px;
  height: 80px;
  background-image: url("../../../assets/images/home/goods/back.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.search-header .search {
  width: 80%;
  height: 69px;
  border: solid 1px #b2b2b2;
  border-radius: 10px;
  font-size: 28px;
  color: #626262;
  line-height: 69px;
  padding-left: 20px;
}

.goods-main {
  width: 100%;
  height: 92.5vh;
  display: flex;
  display: -webkit-flex;
}
.goods-main .classify-wrap {
  width: 172px;
  height: 100%;
  overflow: hidden;
  margin-right: 3%;
  position: relative;
  z-index: 1;
}
.goods-main .classify-wrap .classify-item {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #efefef;
  background-color: #ffffff;
  font-size: 28px;
  text-align: center;
  line-height: 80px;
  overflow: hidden;
}
.goods-main .classify-wrap .classify-item.active {
  color: #ff0000;
}
.goods-main .goods-content {
  width: 71%;
  height: 100%;
}
</style>
