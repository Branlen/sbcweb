<template>
  <div id="homes">
    <div class="homeContent">

      <floats></floats>
      <headerInfo></headerInfo>
      <homeContent></homeContent>
      <footerInfo></footerInfo>
    </div>
  </div>
</template>

<script>
import headerInfo from "../components/general/fixed";
import footerInfo from "../components/general/footerInfo";
import floats from "../components/home/float";
import homeContent from "../components/home/homeContent";
export default {
  data() {
    return {
      msg:""
    };
  },
  components: {
    headerInfo,
    footerInfo,
    floats,
    homeContent
  }
};
</script>

<style lang="less" scoped>
#homes {
  margin: 0;
  padding: 0;

  /* 为了悬浮窗 */
  position: relative;
  background: url("../images/background5.png") no-repeat;
  background-size: 100%;
  background-position-y: -100px;
  font-family: Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
    Arial, sans-serif;
  .homeContent {
    padding-top: 0.52%;
  }
}
</style>
