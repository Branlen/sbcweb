<template>
  <div class="ariticleDetail">
    <div class="first">
      <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{path:`/list/${ariticleInfo.categoryId}`}"
          >{{ariticleInfo.categoryName}}</el-breadcrumb-item>
          <el-breadcrumb-item>文章详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="mainContent">
        <div class="Aritle" v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
          <div class="AritleHeader">
            <div class="AritleTitle">{{ariticleInfo.title}}</div>
            <div
              class="AritleTime"
            >作者：{{ariticleInfo.author}} 日期：{{ariticleInfo.createTime.slice(0,10)}}</div>
          </div>
          <div class="AritleContent">
            <p v-html="ariticleInfo.content"></p>
          </div>
        </div>
        <div class="newArticle">
          <div class="categoryHeader">
            <div class="categoryName">最新文章</div>
          </div>
          <div class="categoryContent">
            <ul v-for="item  in newCategoryInfo" :key="item.articleId">
              <li :title="item.title" @click="goDetail(item)">
                <span class="title">{{item.title}}</span>
                <el-divider></el-divider>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      //最新文章的文章
      newCategoryInfo: {},
      //    文章的内容
      ariticleInfo: {},
      // //栏目的相关信息
      // categoryInfo:{}
      loading:true
    };
  },
  watch: {
    $route: function(to, from) {
      this.getArticleInfo();
    }
  },
  methods: {
    //获取当前文章的内容
    getArticleInfo() {
      console.log("tag", this.$route.params.id);
      this.$http
        .get(`/sbcweb/article/info/${this.$route.params.id}`)
        .then(result => {
          if (result.body.status == 200) {
            console.log("articleInfo", result.body.data);
            this.ariticleInfo = result.body.data;
            this.loading = false;
            // this.$http.get(`/sbcweb/category/info/${this.ariticleInfo.categoryId}`).then((result) => {
            //     if(result.body.status==200){
            //         this.categoryInfo= result.body.data;
            //     }
            // }).catch((err) => {
            //     console.log(err)
            // });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //    获取最新栏目的文章信息
    getNewCategoryInfo() {
      this.$http
        .get(`/sbcweb/article/listLatest`)
        .then(result => {
          if (result.body.status == 200) {
            console.log("newCategoryInfo", result.body.data);
            this.newCategoryInfo = result.body.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goDetail(item) {
      if (item.isOutside) {
        window.open(item.outsideUrl);
      } else {
        this.$router.push(`/details/${item.articleId}`);
      }
    }
  },
  mounted() {
    this.getNewCategoryInfo();
    this.getArticleInfo();
  }
};
</script>


<style lang="less" scoped>
@media screen and (max-width: 769px) {
  .first {
  width: 100%;
  margin: 0 auto;
}
.el-breadcrumb {
  font-size: 8px;
  margin-top: 2%;
}
.mainContent {
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
  min-height: 500px;
  .Aritle {
    width: 70%;
  }
  .newArticle {
    width: 25%;
  }
}
.Aritle {
  display: inline-block;
  width: 47%;
  background-color: #fff;
  margin-bottom: 3.5%;
  // display: flex;
  // justify-content: space-between;
  .AritleHeader {
    padding: 3% 4% 2%;
    border-bottom: 1px solid #3e3e3e;
    box-sizing: border-box;
    .AritleTitle {
      text-align: center;
      font-size: 13px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC",
        "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      color: rgb(20, 21, 22);
      margin-bottom: 1%;
    }
    .AritleTime {
      text-align: center;
      color: #534f4f46;
      font-size: 7px;
    }
  }
  .AritleContent {
    padding: 3% 4% 2%;
  }
}

.newArticle {
  display: inline-block;
  width: 47%;
  background-color: #fff;
  padding: 1% 1%;
  margin-bottom: 3.5%;
  max-height: 300px;
  // display: flex;
  // justify-content: space-between;
  .categoryHeader {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 2% 1% 0.5%;
    border-bottom: 1px outset #000;
    .categoryName {
      font-size: 10px;
      font-weight: bold;
      color: dodgerblue;
      cursor: pointer;
    }
    .categoryMore {
      cursor: pointer;
    }
  }
  .categoryContent {
    width: 100%;
    box-sizing: border-box;
    padding: 3% 2%;
    font-size: 8px;
    ul {
      list-style: none;
      width: 100%;
      li {
        margin-bottom: 0%;
        cursor: pointer;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .el-divider {
          margin: 5px 0;
        }
      }
      li:last-child {
        margin-bottom: 0%;
      }
      li:hover {
        color: #c85900;
        text-decoration: underline;
        transform: scale(1.05, 1.05);
      }
    }
  }
}
}
@media screen and (min-width: 769px) {
  .first {
    width: 1000px;
    margin: 0 auto;
  }
  .el-breadcrumb {
    font-size: 16px;
    margin-top: 2%;
  }
  .mainContent {
    display: flex;
    justify-content: space-between;
    margin-top: 2%;
    min-height: 500px;
    .Aritle {
      width: 70%;
    }
    .newArticle {
      width: 25%;
    }
  }
  .Aritle {
    display: inline-block;
    width: 47%;
    background-color: #fff;
    margin-bottom: 3.5%;
    // display: flex;
    // justify-content: space-between;
    .AritleHeader {
      padding: 3% 4% 2%;
      border-bottom: 1px solid #3e3e3e;
      box-sizing: border-box;
      .AritleTitle {
        text-align: center;
        font-size: 20px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC",
          "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: rgb(20, 21, 22);
        margin-bottom: 1%;
      }
      .AritleTime {
        text-align: center;
        color: #534f4f46;
        font-size: 15px;
      }
    }
    .AritleContent {
      padding: 3% 4% 2%;
    }
  }

  .newArticle {
    display: inline-block;
    width: 47%;
    background-color: #fff;
    padding: 1% 1%;
    margin-bottom: 3.5%;
    max-height: 300px;
    // display: flex;
    // justify-content: space-between;
    .categoryHeader {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 2% 1% 0.5%;
      border-bottom: 1px outset #000;
      .categoryName {
        font-size: 25px;
        font-weight: bold;
        color: dodgerblue;
        cursor: pointer;
      }
      .categoryMore {
        cursor: pointer;
      }
    }
    .categoryContent {
      width: 100%;
      box-sizing: border-box;
      padding: 3% 2%;
      font-size: 16px;
      ul {
        list-style: none;
        width: 100%;
        li {
          margin-bottom: 0%;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .el-divider {
            margin: 8px 0;
          }
        }
        li:last-child {
          margin-bottom: 0%;
        }
        li:hover {
          color: #c85900;
          text-decoration: underline;
          transform: scale(1.05, 1.05);
        }
      }
    }
  }
}
</style>
