<template>
  <div class="downloadInfo">
    <div class="first">
      <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href>搜索结果</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="list">
        <div class="mainContent">
          <div class="allAritle">
            <div class="categoryHeader">
              <div class="categoryName">搜索结果页</div>
              <div class="searchInfo">
                查询到
                <span style="color:red">{{totalCount}}</span>条相关信息
              </div>
            </div>
            <div class="failure" v-if="failureSearch">没有查找相关信息，请重新查询</div>
            <div
              v-else
              class="categoryContent"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
            >
              <ul v-for="item in searchInfo" :key="item.articleId">
                <router-link :to="'/details/'+item.articleId" tag="li" :title="item.title">
                  <span class="title">{{item.title.slice(0,30)}}</span>
                  <span class="articleTime">{{item.createTime.slice(0,10)}}</span>
                </router-link>
                <el-divider></el-divider>
              </ul>
            </div>
            <div class="pagination">
              <el-pagination
                background
                layout="prev, pager, next"
                @current-change="currentChange"
                :total="totalCount"
              ></el-pagination>
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
      // 搜索的结果内容
      searchInfo: {},
      //是否成功搜索
      failureSearch: false,
      //是否加载的判断信息
      loading: true,
      //查询结果的条数
      totalCount: 1
      //    categoryId:parseInt(this.$route.params.id),
    };
  },
  watch: {
    $route: function(to, from) {
      this.loading = true;
      this.searchDownload();
    }
  },
  methods: {
    //    分页器的页数改变触发
    currentChange(e) {
      console.log("tag", e);
      this.getCategoryInfo(e, this.categoryId);
    },
    //搜索下载专区的文章
    searchDownload() {
      this.$http
        .get(
          `/sbcweb/article/list?pageNum=1&pageSize=10&title=${
            this.$route.params.content
          }`
        )
        .then(result => {
          if (result.body.status == 200) {
            console.log(result.body.data.list);

            this.searchInfo = result.body.data.list;
            this.failureSearch = false;
            this.loading = false;
            this.totalCount = result.body.data.totalCount;
          } else if (result.body.status == 406) {
            this.searchInfo = {};
            this.totalCount = 0;
            this.failureSearch = true;
            this.loading = false;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  },

  mounted() {
    this.searchDownload();
  }
};
</script>

<style lang="less" scoped>
.first {
  width: 1000px;
  margin: 0 auto;
}
.el-breadcrumb {
  font-size: 16px;
  margin-top: 5%;
}

.mainContent {
  margin-top: 2%;
  min-height: 500px;
}

.allAritle {
  display: inline-block;
  width: 100%;
  background-color: #fff;
  margin-bottom: 3.5%;
  // display: flex;
  // justify-content: space-between;
  .categoryHeader {
    display: flex;
    flex-wrap: wrap;
    padding: 2% 1% 1%;
    border-bottom: 1px outset #000;
    border-bottom: 1px solid skyblue;
    margin-bottom: 5px;
    .categoryName {
      font-size: 20px;
      font-weight: bold;
      color: skyblue;
      padding-left: 5px;
      border-left: 5px solid skyblue;
      cursor: pointer;
    }
    .searchInfo {
      font-size: 16px;
      // font-weight: bold;
      margin-left: 3%;
      color: black;
      cursor: default;
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
        .title {
          width: 50%;
        }
        .articleTime {
          width: 15%;
        }
      }
      li:last-child {
        margin-bottom: 0%;
      }
      li:hover {
        color: #C85900b;
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

.failure {
  padding: 10% 0%;
  text-align: center;
  font-size: 18px;
  height: 100px;
}
</style>
