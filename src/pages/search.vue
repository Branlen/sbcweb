<template>
  <div id="search">
    <headerInfo></headerInfo>
    <search></search>
    <footerInfo></footerInfo>
  </div>
</template>

<script>
import headerInfo from "../components/general/fixed";
import footerInfo from "../components/general/footerInfo";
import search from "../components/searchContent/searchContent";
export default {
  data() {
    return {
      msg: "",
      categoryId: this.$route.params.id
    };
  },
  methods: {},
  components: {
    headerInfo,
    footerInfo,
    search
  }
};
</script>

<style>
#search {
  margin: 0;
  padding: 0;
  background: url("../images/background5.png") no-repeat;
  background-size: 100%;
  background-position-y: -100px;
  font-family: Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
    Arial, sans-serif;
}
</style>
