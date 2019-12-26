<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      title: "555"
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.nav{
  width: 100%;
  height:100px;
  background: white;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
}
.nav span {
  display: block;
}
.nav .go-icon {
  background: url("../assets/images/home/goods/back.png") center center
    no-repeat;
  background-size: 80%;
  height: 80px;
  width: 80px;
}
.nav span:nth-child(2) {
  width: 80%;
  height: 100%;
  float: left;
  overflow: hidden;
  font-size: 32px;
  text-align: center;
  line-height: 100px;
}
</style>
