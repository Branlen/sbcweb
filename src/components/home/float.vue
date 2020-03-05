<template>
  <div id="float">
    <ul v-for="item in boxInfo" :key="item.articleId">
      <li :title="item.title" @click="goDetail(item)">{{item.title}}</li>
    </ul>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      timer: "",
      speedsLeft: 0,
      speedstop: 0,
      //框中的信息
      boxInfo: []
    };
  },
  methods: {
    //开始浮动
    startFloat(speedLeft, speedTop) {
      var box = document.getElementById("float");
      var boxstyle = box.currentStyle
        ? box.currentStyle
        : document.defaultView.getComputedStyle(box, null);
      this.speedsLeft = speedLeft;
      this.speedstop = speedTop;
      var that = this;

      this.timer = setInterval(function() {
        // console.log('tag', '')
        //设置距离左边的长度
        var setleft = boxstyle.left;
        //设置距离顶部的长度
        var settop = boxstyle.top;
        //判断是否是移动端
        if (window.screen.availWidth < 768) {
          if (parseInt(setleft) > 800 || parseInt(setleft) < 0) {
            that.speedsLeft = that.speedsLeft * -1;
          }
        } else {
          if (
            parseInt(setleft) > parseInt(window.screen.availWidth) - 238 ||
            parseInt(setleft) < 0
          ) {
            that.speedsLeft = that.speedsLeft * -1;
          }
        }
        if (
          parseInt(settop) > parseInt(document.body.clientHeight) - 125 ||
          parseInt(settop) < 0
        ) {
          that.speedstop = that.speedstop * -1;
        }
        setleft = parseInt(that.speedsLeft) + parseInt(boxstyle.left);
        settop = parseInt(that.speedstop) + parseInt(boxstyle.top);

        // console.log(setleft);
        box.style.left = setleft + "px";
        box.style.top = settop + "px";
      }, 10);
    },
    //停止浮动
    closeFloat() {
      var box = document.getElementById("float");
      box.addEventListener("mouseover", () => {
        clearInterval(this.timer);
      });
      box.addEventListener("mouseout", () => {
        this.startFloat(this.speedsLeft, this.speedstop);
        //  this.startFloat(10,10);
      });
    },
    getBoxInfo() {
      this.$http
        .get(`/sbcweb/article/listBox`)
        .then(result => {
          if (result.body.status == 200) {
            console.log(result.body.data);
            this.boxInfo = result.body.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //判断是否是外链接
    goDetail(item) {
      console.info("tag", item);
      if (item.isOutside) {
        window.location.href = item.outsideUrl;
      } else {
        this.$router.push(`/details/${item.articleId}`);
      }
    }
  },
  mounted() {
    this.startFloat(1, 1);
    this.closeFloat();
    this.getBoxInfo();
  }
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 769px) {
  #float {
    position: absolute;
    left: 0px;
    top: 200px;
    font-size: 8px;
    color: white;
    text-align: center;
    width: 100px;
    z-index: 100;
    ul {
      list-style: none;
      li {
        padding: 5px;
        background-color: red;
        margin-bottom: 1.5%;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
          "Lucida Sans", Arial, sans-serif;
      }
    }
  }
}
@media screen and (min-width: 769px) {
  #float {
    position: absolute;
    left: 0px;
    top: 200px;
    font-size: 16px;
    color: white;
    text-align: center;
    width: 220px;
    z-index: 100;
    ul {
      list-style: none;
      li {
        padding: 5px;
        background-color: red;
        margin-bottom: 1.5%;
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
          "Lucida Sans", Arial, sans-serif;
      }
    }
  }
}
</style>
