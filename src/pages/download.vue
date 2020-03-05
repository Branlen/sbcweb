<template>
  <div id="download">
    <headerInfo></headerInfo>
    <download></download>
    <footerInfo></footerInfo>
  </div>
</template>

<script>
import headerInfo from "../components/general/fixed";
import footerInfo from "../components/general/footerInfo";
import download from "../components/download/downloadInfo";
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
    download
  }
};
</script>

<style>
#download {
  margin: 0;
  padding: 0;
  background: url("../images/background5.png") no-repeat;
  background-size: 100%;
  background-position-y: -100px;
  font-family: Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
    Arial, sans-serif;
}
</style>
