<template>
  <div class="downloadInfo">
    <div class="first">
      <div class="search">
        <input
          type="search"
          name
          id="searchCase"
          v-model="searchInfo"
          placeholder="请输入下载文章的内容"
          @keyup.enter="searchDownload"
        >
        <!-- <el-input v-model="searchInfo" placeholder="请输入下载文章的内容"></el-input> -->
        <el-button type="success" @click="searchDownload">查询</el-button>
      </div>
      <div class="breadCrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href>高级搜索</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="list">
        <div class="contentLeft">
          <div class="downloadBox">下载专区</div>
        </div>
        <div class="mainContent">
          <div class="allAritle">
            <div class="categoryHeader">
              <div class="categoryName">
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
              <ul v-for="(item,index) in downloadInfo" :key="item.downloadFileId">
                <li :title="item.title" @click="clickDownloadFile(item,index)">
                  <span class="title">{{item.title}}（下载量：{{item.downloadNum}})</span>
                  <span class="articleTime">{{item.pubTime.slice(0,10)}}</span>
                </li>
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
import download from "ly-downloader";
export default {
  data() {
    return {
      //下载专区的文章信息
      downloadInfo: {},
      //最新文章的文章
      newCategoryInfo: {},
      //文章的页数
      totalNum: 2,
      //    输入框的内容
      searchInfo: "",
      //是否成功搜索
      failureSearch: false,
      //是否加载的判断信息
      loading: true,
      //查询结果的条数
      totalCount: 1
      //    categoryId:parseInt(this.$route.params.id),
    };
  },
  //   watch: {
  // 　　'$route': function (to, from) {

  //        this.getCategoryInfo(1)
  // 　　}
  // },
  methods: {
    //获取每个栏目的文章信息
    getDownloadInfo(pageNum) {
      this.$http
        .get(`/sbcweb/downloadfile/list?pageNum=1&pageSize=10`)
        .then(result => {
          if (result.body.status == 200) {
            // console.log('b',result.body.data.list)
            this.downloadInfo = result.body.data.list;
            this.totalNum = result.body.data.totalCount;
            this.loading = false;
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
    //搜索下载专区的文章
    searchDownload() {
      this.$http
        .get(
          `/sbcweb/downloadfile/list?pageNum=1&pageSize=10&title=${
            this.searchInfo
          }`
        )
        .then(result => {
          if (result.body.status == 200) {
            console.log(result.body.data.list);
            this.searchInfo = "";
            this.downloadInfo = result.body.data.list;
            this.failureSearch = false;
            this.loading = false;
            this.totalCount = result.body.data.totalCount;
          } else if (result.body.status == 406) {
            this.downloadInfo = {};
            this.failureSearch = true;
            this.loading = false;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    clickDownloadFile(item, index) {
      //点击更新下载量
      this.$http
        .post(`sbcweb/downloadfile/add`, item.downloadFileId)
        .then(result => {
          if (result.body.status == 200) {
            this.downloadInfo[index].downloadNum++;
          }
        })
        .catch(err => {
          console.error(err);
        });
      var str = item.url.split(".");
      var num = str.length - 1;
      if (str[num] === "pdf") {
        window.open(`http://123.56.11.253:8181/sbcweb/${item.url}`);
      } else {
        download(
          1,
          `http://123.56.11.253:8181/sbcweb/${item.url}`,
          item.title
        );
      }
    }
  },

  mounted() {
    this.getNewCategoryInfo();
    this.getDownloadInfo();
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
.list {
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 20%;
  }
  .mainContent {
    width: 80%;
  }
}
.contentLeft {
  .downloadBox {
    width: 100%;
    height: 100px;
    background-color: skyblue;
    text-align: center;
    color: azure;
    line-height: 100px;
    font-size: 26px;
    margin-top: 10%;
  }
}
.mainContent {
  // margin-top: 2=%;
  min-height: 500px;
  .allAritle {
    width: 90%;
    margin-left: 5%;
  }
}
.search {
  width: 80%;
  margin-left: 10%;
  display: flex;
  margin-top: 2%;
  justify-content: space-between;
  #searchCase {
    width: 79%;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 50px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  button {
    width: 15%;
    background-color: #4360b5;
  }
}

.allAritle {
  display: inline-block;
  width: 70%;
  background-color: #fff;

  margin-bottom: 3.5%;
  // display: flex;
  // justify-content: space-between;
  .categoryHeader {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 2% 1% 1%;
    border-bottom: 1px outset #000;
    border-bottom: 1px solid skyblue;
    margin-bottom: 5px;
    .categoryName {
      font-size: 20px;
      // font-weight: bold;
      color: black;
      cursor: pointer;
    }
    .categoryMore {
      cursor: pointer;
    }
  }
  .categoryContent {
    width: 100%;
    box-sizing: border-box;
    padding: 3% 1%;
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

.failure {
  padding: 10% 0%;
  text-align: center;
  font-size: 18px;
  height: 100px;
}
</style>
