<template>
  <div id="navigation">
    <nav>
      <ul class="menu">
        <router-link tag="li" class="li" to="/">
          <span>首页</span>
        </router-link>
        <span v-for="item   in navigationbarInfo" :key="item.navigationBarId">
          <li class="li">
            <span>{{item.navigationName}}</span>
            <ul class="submenu" v-for="items in item.categoryVos" :key="items.categoryId">
              <router-link tag="li" :to="'/list/'+items.categoryId">
                <span href="#">{{items.name}}</span>
              </router-link>
            </ul>
            <!-- 二级导航结束 -->
          </li>
        </span>

        <router-link tag="li" class="li" @click.self="changeColor" to="/download">
          <span>下载专区</span>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex2: "1",
      navigationbarInfo: []
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    refresh() {
      this.$router.go(1);
    },
    getNavigationBar() {
      this.$http
        .get(`/sbcweb/navigationbar/cascade`)
        .then(result => {
          if (result.data.status == 200) {
            this.$store.commit("setNavigation", result.body.data);
            this.navigationbarInfo = this.$store.state.navigation;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    changeColor(e) {
      console.log(e.target);
      e.target.style.backgroundColor = "red";
    }
  },
  created() {
    this.getNavigationBar();
  },
  mounted() {
    this.navigationbarInfo = this.$store.state.navigation;
  }
};
</script>


  <style lang="less" scope>
@media screen and (max-width: 769px) {
  #navigation {
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #204bb0;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .menu span {
    text-decoration: none;
    color: white;
    font-size: 8px;
  }
  /*一级导航*/
  /*背景色*/
  ul.menu,
  ul.submenu {
    background-color: #204bb0;
  }
  /*一级导航浮动*/
  ul.menu::after {
    content: "";
    display: block;
    clear: both;
  }
  ul.menu > li {
    float: left;
    width: 16.6%;
    line-height: 54px;
    height: 55px;
    text-align: center;
    cursor: pointer;
  }
  ul.menu > span > li {
    float: left;
    width: 16.6%;
    line-height: 55px;
    height: 55px;
    text-align: center;
    cursor: pointer;
  }

  /*二级导航项分割线*/
  .submenu {
    /*默认隐藏*/
    position: relative;

    display: none;
    z-index: 999;
  }
  ul.submenu > li {
    line-height: 3em;
    height: 3em;
    z-index: 9999;
  }

  /*内容区*/
  // .content {
  //     min-height: 800px;
  //     background-color: #fff;
  // }
  .menu > li:active {
    background-color: red;
  }
  ul.menu > li:hover {
    background-color: rgba(22, 21, 21, 0.123);
  }
  ul.menu > span > li:visited {
    background-color: #aa3232;
  }
  ul.menu > span > li:hover {
    background-color: rgba(22, 21, 21, 0.123);
  }

  ul.menu > li:hover > span {
    color: #fff;
  }
  ul.menu > span > li:hover > span {
    color: #fff;
  }
  ul.menu > span > li:hover > ul.submenu {
    display: block;
  }
  .submenu > li:hover {
    background-color: rgba(22, 21, 21, 0.123);
  }
}
@media screen and (min-width: 769px) {
  #navigation {
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #204bb0;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .menu span {
    text-decoration: none;
    color: white;
    font-size: 17px;
  }
  /*一级导航*/
  /*背景色*/
  ul.menu,
  ul.submenu {
    background-color: #204bb0;
  }
  /*一级导航浮动*/
  ul.menu::after {
    content: "";
    display: block;
    clear: both;
  }
  ul.menu > li {
    float: left;
    width: 16.6%;
    line-height: 55px;
    height: 55px;
    text-align: center;
    cursor: pointer;
  }
  ul.menu > span > li {
    float: left;
    width: 16.6%;
    line-height: 55px;
    height: 55px;
    text-align: center;
    cursor: pointer;
  }

  /*二级导航项分割线*/
  .submenu {
    /*默认隐藏*/
    position: relative;

    display: none;
    z-index: 999;
  }
  ul.submenu > li {
    line-height: 3em;
    height: 3em;
    z-index: 9999;
  }

  /*内容区*/
  // .content {
  //     min-height: 800px;
  //     background-color: #fff;
  // }
  .menu > li:active {
    background-color: red;
  }
  ul.menu > li:hover {
    background-color: rgba(22, 21, 21, 0.123);
  }
  ul.menu > span > li:visited {
    background-color: #aa3232;
  }
  ul.menu > span > li:hover {
    background-color: rgba(22, 21, 21, 0.123);
  }

  ul.menu > li:hover > span {
    color: #fff;
  }
  ul.menu > span > li:hover > span {
    color: #fff;
  }
  ul.menu > span > li:hover > ul.submenu {
    display: block;
  }
  .submenu > li:hover {
    background-color: rgba(22, 21, 21, 0.123);
  }
}
</style>

