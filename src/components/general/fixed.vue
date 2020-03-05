<template>
  <div class="fixed">
    <div class="top">
      <div class="image">
        <img src="../../images/head.png" alt>
      </div>
      <div class="topSome">
        <span class="searchs">
          <search></search>
        </span>
      </div>
    </div>
    <!-- 导航栏 -->
    <navigation></navigation>
  </div>
</template>

<script>
import navigation from "../general/navigation";
import search from "../general/search";
export default {
  methods: {},
  components: {
    search,
    navigation
  }
};
</script>

<style lang='less' scoped>
@media screen and (max-width: 769px) {
  .fixed {
    width: 100%;
    margin: 0 auto;
    .top {
      padding-top: 1%;
      // height: 170px;
      .topSome {
        margin-bottom: 1.5%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        width: 70%;
        color: white;

        .searchs {
          width: 80%;
          margin-top: 1%;
          margin-bottom: 1%;
        }
      }
      .image {
        padding-bottom: 0%;
        position: relative;
        left: -10px;
        // top:-50px;
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
@media screen and (min-width: 769px) {
  .fixed {
    width: 1000px;
    margin: 0 auto;
    .top {
      padding-top: 1%;
      // height: 170px;
      .topSome {
        margin-bottom: 1.5%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        width: 32%;
        color: white;

        .searchs {
          width: 80%;
          margin-top: 1%;
          margin-bottom: 1%;
        }
      }
      .image {
        padding-bottom: 0%;
        position: relative;
        left: -10px;
        // top:-50px;
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>