<template>
  <div class="list">
    <div class="first">
      <div class="content">
        <div class="breadCrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href>{{categoryInfo[0].categoryName}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="mainContent">
          <div class="allAritle"  v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)">
            <div class="categoryHeader">
              <div class="categoryName">{{categoryInfo[0].categoryName}}</div>
            </div>
            <div class="categoryContent" >
              <ul v-for="item in categoryInfo" :key="item.articleId">
                <li @click="goDetail(item)" :title="item.title">
                  <span class="title">{{item.title.slice(0,30)}}</span>
                  <span class="articleTime">{{item.createTime.slice(0,10)}}</span>
                </li>
                <el-divider></el-divider>
              </ul>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :total="totalNum"
              ></el-pagination>
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
  </div>
</template>


<script>
export default {
  data() {
    return {
      //每个栏目的文章信息
      categoryInfo: {},
      //最新文章的文章
      newCategoryInfo: {},
      //文章的页数
      totalNum: 2,
      //    categoryId:parseInt(this.$route.params.id),
      loading:true
    };
  },
  watch: {
    $route: function(to, from) {
      this.getCategoryInfo(1);
    }
  },
  //配置组件局部路由跳转守卫
  beforeRouteUpdate(to, from, next)  {
    //does NOT have access to `this` component instance}
   next(vm=>{
     console.log('tag', to)
   })
  },
  methods: {
    //获取每个栏目的文章信息
    getCategoryInfo(pageNum) {
      this.$http
        .get(
          `/sbcweb/article/list?pageNum=${pageNum}&pageSize=10&categoryId=${
            this.$route.params.id
          }`
        )
        .then(result => {
          if (result.body.status == 200) {
            // console.log('b',result.body.data.list)
            this.categoryInfo = result.body.data.list;
            this.totalNum = result.body.data.totalCount;
            this.loading= false;
          }else if(result.body.status ==406){
            this.$message({
              message: '本栏目没有文章',
              center: true,
              showClose:true
            });
            window.history.go(-1);
            //this.$router.push(`/list/8`);
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
            //    console.log('newCategoryInfo',result.body.data);
            this.newCategoryInfo = result.body.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //    分页器的页数改变触发
    currentChange(e) {
      console.log("tag", e);
      this.getCategoryInfo(e, this.categoryId);
    },
    //判断是否是外链接
    goDetail(item) {
      console.info("tag", item);
      if (item.isOutside) {
        window.open(item.outsideUrl);
      } else {
        this.$router.push(`/details/${item.articleId}`);
      }
    }
  },

  mounted() {
    this.getNewCategoryInfo();
    this.getCategoryInfo(1);
  }
  //    updated(){
  //     //    console.log('tags', this.categoryId) ;
  //    this.getCategoryInfo(1)

  //    }
};
</script>

<style lang="less" scoped>
@media screen and (max-width: 769px) {
  .list {
    width: 100%;
  }
  .first {
    width: 100%;
    margin: 0 auto;
    min-height: 300px;
  }
  .el-breadcrumb {
    padding: 2% 1% 2% 0%;
    font-size: 7px;
    margin-top: 2%;
  }
  .mainContent {
    display: flex;
    justify-content: space-between;
    margin-top: 1%;
    .allAritle {
      width: 70%;
    }
    .newArticle {
      width: 25%;
    }
  }
  .allAritle {
    display: inline-block;
    width: 47%;
    background-color: #fff;

    margin-bottom: 3.5%;
    // display: flex;
    // justify-content: space-between;
    .categoryHeader {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 2% 2% 1%;
      border-bottom: 1px outset #000;
      .categoryName {
        font-size: 12px;
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
      font-size: 5px;
      ul {
        list-style: none;
        width: 100%;
        .el-divider {
          margin: 8px 0;
        }
        li {
          margin-bottom: 1%;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: flex;
          justify-content: space-between;
          .articleTime{
            display: none;
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
    .pagination {
      width: 100%;
      text-align: center;
    }
  }

  .newArticle {
    display: inline-block;
    width: 47%;
    height: 300px;
    background-color: #fff;
    padding: 1% 1%;
    margin-bottom: 3.5%;
    // display: flex;
    // justify-content: space-between;
    .categoryHeader {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 2% 1% 0.5%;
      border-bottom: 1px outset #000;
      .categoryName {
        font-size: 12px;
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
      font-size: 1px;
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
            margin: 3px 0;
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
  .list {
    width: 100%;
  }
  .first {
    width: 1000px;
    margin: 0 auto;
    min-height: 500px;
  }
  .el-breadcrumb {
    padding: 2% 1% 2% 0%;
    font-size: 16px;
    margin-top: 2%;
  }
  .mainContent {
    display: flex;
    justify-content: space-between;
    margin-top: 1%;
    .allAritle {
      width: 70%;
    }
    .newArticle {
      width: 25%;
    }
  }
  .allAritle {
    display: inline-block;
    width: 47%;
    background-color: #fff;

    margin-bottom: 3.5%;
    // display: flex;
    // justify-content: space-between;
    .categoryHeader {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 2% 2% 1%;
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
          margin-bottom: 2%;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: flex;
          justify-content: space-between;
          
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
    .pagination {
      width: 100%;
      text-align: center;
    }
  }

  .newArticle {
    display: inline-block;
    width: 47%;
    height: 300px;
    background-color: #fff;
    padding: 1% 1%;
    margin-bottom: 3.5%;
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
