<template>
  <div id="app">
    <!-- <keep-alive> -->
 
      <router-view></router-view>

    <!-- </keep-alive> -->
  </div>
</template>

<script>


import home from "./pages/home";

export default {
  name: "App",
  data() {
    return {
      msg: true
    };
  },
  components: {
    home
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    var app = document.getElementById("app");
    app.style.width = that.screenWidth + "px";
    console.log(document.body.clientWidth);
    var phoneWidth = parseInt(window.screen.width);
    var phoneHeight = parseInt(window.screen.height);
    var phoneScale = phoneWidth / 1000; //除以的值按手机的物理分辨率
    var ua = navigator.userAgent;
    if (/Android (\d+\.\d+)/.test(ua)) {
      var version = parseFloat(RegExp.$1);
      // andriod 2.3
      if (version > 2.3) {
        document.write(
          '<meta name="viewport" content="width=device-width,initial-scale=' +
            phoneScale +
            ",minimum-scale=" +
            phoneScale +
            ",maximum-scale=" +
            phoneScale +
            ',user-scalable=no">'
        );
        // andriod 2.3以上
      } else {
        document.write(
          '<meta name="viewport" content="width=device-width,user-scalable=no">'
        );
      }
      // 其他系统
    } else {
      document.write(
        '<meta name="viewport" content="width=device-width, initial-scale=' +
          phoneScale +
          ",minimum-scale=" +
          phoneScale +
          ",maximum-scale =" +
          phoneScale +
          ',user-scalable=no,">'
      );
    }
  }
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  font-family: Helvetica, "Hiragino Sans GB", "Microsoft Yahei", "微软雅黑",
    Arial, sans-serif;
}
</style>
