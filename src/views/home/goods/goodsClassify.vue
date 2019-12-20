<template>
  <div>
    <div>
      <div class="nav">
        <div @click="$router.go(-1)" class="go-icon"></div>
        <div class="goods-search">请输入宝贝名称</div>
      </div>
      <div class="goods-content">
        <div class="left-nav-wrap">
          <div
            v-for="(item,index) in menu"
            :key="index"
            :class="{'left-nav':true,'color':active===index?true:false}"
            @click="changeColor(index,item.cid)"
          >{{item.title}}</div>
        </div>
        <div class="right-views">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {
      active: -1
    };
  },
  computed: {
    ...mapState({
      menu: state => state.goods.menu,
      goods: state => state.goods.goods
    })
  },
  watch: {},
  created() {
    this.getMenu();
  },
  mounted() {},
  methods: {
    ...mapActions({
      getMenu: "goods/getMenu",
      getGoods: "goods/getGoods"
    }),
    changeColor(index, id) {
      this.active = index;
      this.$router.push("/goodsItems?cid=" + id);
      this.getGoods({ cid: id });

    }
  }
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 100px;
  background: white;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.nav .go-icon {
  background: url("../../../assets/images/common/right_arrow.png") center center
    no-repeat;
  background-size: 80%;
  height: 80px;
  width: 80px;
  transform: rotate(-180deg);
}
.goods-search {
  width: 480px;
  height: 70px;
  padding-left: 60px;
  line-height: 70px;
  border: 1px solid #b2b2b2;
  font-size: 24px;
  border-radius: 3px;
  margin-left: 40px;
}
.goods-content {
  width: 100%;
  height: auto;
  margin-top: 100px;
  display: flex;
}
.right-views {
  margin-left: 20px;
}
.goods-content .left-nav-wrap {
  width: 172px;
  height: auto;
}
.left-nav {
  width: 100%;
  height: 82px;
  font-size: 28px;
  color: #323232;
  line-height: 82px;
  text-align: center;
  border-bottom: 1px solid #efefef;
  background: white;
}
.color {
  color: #eb1625;
}
</style>
