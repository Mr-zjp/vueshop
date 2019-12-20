<template>
  <div>
    <div class="goods-wrap">
      <div class="goods-show">
        <div class="title">裙装</div>
        <div class="goods-classes">
          <div class="goods-items">
            <div>
              <img src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg" alt />
            </div>
            <div>xxxxx</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  computed: {
       goods: state => state.goods.goods
  },
  watch: {},
  created() {
      
  },
  mounted() {
  },
  methods: {
     
  }
};
</script>

<style scoped>
.goods-classes {
  width: 526px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  background: white;
}
.goods-items {
  width: 174px;
  height: 160px;
  border: 1px solid red;
}
.goods-items div:nth-child(1) {
  width: 122px;
  height: 122px;
}
.goods-items div:nth-child(1) img {
  width: 100%;
  height: 100%;
}
</style>
