<template>
  <div id="list">
    <headerInfo></headerInfo>
    <list></list>
    <footerInfo></footerInfo>
  </div>
</template>

<script>
import headerInfo from "../components/general/fixed";
import footerInfo from "../components/general/footerInfo";
import list from "../components/articleList/articleList";
export default {
  data() {
    return {
      msg: ""
      // categoryIdP:this.$route.params.id
    };
  },
  components: {
    headerInfo,
    footerInfo,
    list
  }
};
</script>

<style>
#list {
  margin: 0;
  padding: 0;
  background: url("../images/background5.png") no-repeat;
  background-size: 100%;
  background-position-y: -100px;
  font-family: Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
    Arial, sans-serif;
}
</style>
