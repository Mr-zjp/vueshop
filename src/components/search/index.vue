<template>
  <div id="search">
    <div class="search-head">
      <div class="search-head-x" @click="back"></div>
      <div class="search-head-input">
        <div>
          <input type="text" placeholder="请输入商品名称" v-model="text" />
        </div>
        <div @click="addRecord"></div>
      </div>
    </div>
    <div class="search-history" v-if="record.length>0">
      <div class="search-history-tip">
        <span>最近搜索</span>
        <span @click="empty"></span>
      </div>
      <div class="search-history-record">
        <div class="search-history-keywords" v-for="(item,index) in record" :key="index">{{item}}</div>
      </div>
    </div>
    <div class="search-hot">
      <div class="search-hot-tip">
        <span>热门搜索</span>
      </div>
      <div class="search-hot-record">
        <div class="search-hot-keywords" v-for="(item,index) in record" :key="index">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {
      text: ""
    };
  },
  computed: {
    ...mapState({
      record: state => state.index.record
    })
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      SET_RECORD: "index/SET_RECORD"
    }),
    back() {
      this.$emit("update", true);
    },
    addRecord() {
      if (this.record.length > 0 && this.record.indexOf(this.text) > -1) {
        return;
      } else {
        if (this.text) {
          this.record.unshift(this.text);
          this.SET_RECORD(this.record);
        }
      }
    },
    empty() {}
  }
};
</script>

<style scoped>
#search {
  width: 100%;
  height: 100vh;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
}
.search-head {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #efefef;
  display: flex;
  align-items: center;
}
.search-head-x {
  width: 50px;
  height: 50px;
  background: url("../../assets/images/common/search_x.png") center no-repeat;
  background-size: 100%;
  margin-left: 20px;
  margin-right: 20px;
}
.search-head-input {
  width: 78%;
  height: 64px;
  border: 1px solid #b2b2b2;
  border-radius: 10px;
  display: flex;
  align-items: center;
}
.search-head-input div:nth-child(1) {
  width: 80%;
  height: 93%;
  display: flex;
  align-items: center;
  border-right: 1px solid #b2b2b2;
  margin-left: 20px;
}
.search-head-input div:nth-child(1) input {
  width: 100%;
  height: 100%;
}
.search-head-input div:nth-child(2) {
  height: 68px;
  width: 100px;
  background: url("../../assets/images/common/search_icon.png") center no-repeat;
  background-size: 50%;
}
/* --------------------搜索历史------------------------- */
.search-history,
.search-hot {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.search-history-tip,
.search-hot-tip {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
}
.search-history-tip span:nth-child(1),
.search-hot-tip span:nth-child(1) {
  font-size: 28px;
}
.search-history-tip span:nth-child(2) {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url("../../assets/images/common/bin.png") center no-repeat;
  background-size: 100%;
}
.search-history-record,
.search-hot-record {
  width: 100%;
  height: auto;
  display: flex;
  padding: 0 30px;
  box-sizing: border-box;
  margin-top: 15px;
  flex-wrap: wrap;
}
.search-history-keywords,
.search-hot-keywords {
  width: 26%;
  height: 60px;
  color: #717376;
  border: 1px solid #727070;
  border-radius: 64px;
  font-size: 0.28px;
  text-align: center;
  overflow: hidden;
  line-height: 60px;
  margin-right: 1.3%;
  margin-left: 1.3%;
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
