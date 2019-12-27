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
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
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
}
.nav .go-icon {
  background: url("../assets/images/home/goods/back.png") center center
    no-repeat;
  background-size: 80%;
  height: 80px;
  width: 80px;
}
.nav span {
  display: block;
  width: 80%;
  height: 100%;
  float: left;
  overflow: hidden;
  font-size: 32px;
  text-align: center;
  line-height: 100px;
}
.nav span.css2 {
  width: 100%;
}
</style>
