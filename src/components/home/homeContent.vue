<template>
  <div id="home">
    <div class="first">
      <!-- 头部信息 -->

      <!-- 内容头部部分 -->
      <div class="topConetent">
        <!-- 头部左边部分 -->
        <div class="topLeft">
          <div class="topLeft1">
            <carousel></carousel>
          </div>
          <div class="topLeft2">
            <div class="categoryHeader">
              <div class="categoryName">
                <router-link :to="'/list/'+topCategory.categoryId" tag="p">{{topCategory.name}}</router-link>
              </div>
              <div class="categoryMore">
                <router-link tag="span" :to="'/list/'+topCategory.categoryId" href>更多>></router-link>
              </div>
            </div>
            <div class="categoryContent">
              <div class="noArticle" v-if="!topCategoryInfo">本栏目没有文章...</div>
              <template v-else>
                <ul v-for="item in topCategoryInfo" :key="item.articleId">
                  <li :title="item.title" @click="goDetail(item)">
                    <span class="title">{{item.title}}</span>
                    <span class="articleTime">{{item.createTime.slice(5,10)}}</span>
                  </li>
                </ul>
              </template>
            </div>
          </div>
        </div>
        <!-- 头部右边部分 -->
        <div class="topRight">
          <el-button @click="toFixed">
            <i class="el-icon-data-line"></i>
            &nbsp;{{linkInfo[0].name}}
          </el-button>
          <el-button @click="toLowPrice">
            <i class="el-icon-suitcase-1"></i>
            &nbsp;{{linkInfo[1].name}}
          </el-button>
          <el-button @click="toLaboratory">
            <i class="el-icon-data-analysis"></i>
            &nbsp;{{linkInfo[2].name}}
          </el-button>
        </div>
      </div>
      <!-- 内容中间部分 -->
      <div class="content">
        <div class="contentLeft">
         <column :categoryInfo='allCenterCategory'></column>
        </div>
        <div class="contentRight">
          <div class="categoryHeader">
            <div class="categoryName">
              <router-link
                :to="'/list/'+centerRightCategory.categoryId"
                tag="p"
              >{{centerRightCategory.name}}</router-link>
            </div>
            <div class="categoryMore">
              <router-link tag="span" :to="'/list/'+centerRightCategory.categoryId">更多>></router-link>
            </div>
          </div>
          <div class="categoryContent">
            <div class="noArticle" v-if="!centerRightCategory">本栏目没有文章...</div>
            <template v-else>
              <ul v-for="item in centerRightCategoryInfo" :key="item.articleId">
                <li :title="item.title" @click="goDetail(item)">
                  <span class="title">{{item.title}}</span>
                  <span class="articleTime">{{item.createTime.slice(5,10)}}</span>
                </li>
              </ul>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>   

<script>
import carousel from "../home/Carousel";
import column from "../home/column";

export default {
  data() {
    return {
      // 顶部的栏目的分类
      topCategory: { name: "" },
      // 顶部分类的文章
      topCategoryInfo: [],
      centerRightCategory: { name: "" },
      centerRightCategoryInfo: {},
      centerLeftCategory: [],
      centerLeftCategoryInfo: [],
      allCenterCategory: [],
      // 跳转链接信息
      linkInfo: [{ name: "" }]
    };
  },
  methods: {
    //得到跳转链接
    getLink() {
      this.$http
        .get(`/sbcweb/blogroll/list?pageNum=1&pageSize=10`)
        .then(result => {
          if (result.body.status == 200) {
            this.linkInfo = result.body.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //跳转页面
    toFixed() {
      window.location.href = this.linkInfo[0].url;
    },
    toLowPrice() {
      window.location.href = this.linkInfo[1].url;
    },
    toLaboratory() {
      window.location.href = this.linkInfo[2].url;
    },
    //得到所有栏目
    getCategory() {
      this.$http
        .get(`/sbcweb/category/list?pageNum=1&pageSize=10`)
        .then(result => {
          if (result.body.status == 200) {
            this.$store.commit("setCategory", result.body.data.list);
            this.getTopCategory();
            this.getCenterRightCategory();
            this.getCenterleftCategory();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到上中栏目
    getTopCategory() {
      this.$store.state.categorys.forEach(category => {
        if (category.sort == 1) {
          this.topCategory = category;
        }
      });
      this.$http
        .get(
          `/sbcweb/article/list?pageNum=1&pageSize=8&categoryId=${this.topCategory.categoryId}`
        )
        .then(result => {
          if (result.body.status == 200) {
            this.topCategoryInfo = result.body.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到中间右边的栏目
    getCenterRightCategory() {
      this.$store.state.categorys.forEach(category => {
        if (category.sort == 2) {
          this.centerRightCategory = category;
        }
      });
      this.$http
        .get(
          `/sbcweb/article/list?pageNum=1&pageSize=8&categoryId=${this.centerRightCategory.categoryId}`
        )
        .then(result => {
          if (result.body.status == 200) {
            console.log(result.body.data.list);
            this.centerRightCategoryInfo = result.body.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //得到中间左的栏目
    getCenterleftCategory() {
      this.$store.state.categorys.forEach(category => {
        if (category.sort != -1 && category.sort != 1 && category.sort != 2) {
          this.centerLeftCategory.push(category);
        }
      });

      this.$http
        .get(`/sbcweb/article/index`)
        .then(result => {
          if (result.body.status == 200) {
           
            var currentInfo = result.body.data;
           ;
            //调整centerleftCategoryInfo的位置问题
            var correctInfo = [];
            var centerLeftLength = this.centerLeftCategory.length;
            var centerLeftInfoLength = currentInfo.length;
            for (var i = 0; i < centerLeftLength; i++) {
              for (var j = 0; j < centerLeftInfoLength; j++) {
                if (this.centerLeftCategory[i].categoryId ===currentInfo[j].categoryId&&currentInfo[j].sort!=1&&currentInfo[j].sort!=2) {
                  correctInfo.push(currentInfo[j]);
                }
              }
            }
             this.centerLeftCategoryInfo.push(correctInfo)
            this.allCenterCategory=correctInfo;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //判断是否是外链接
    goDetail(item) {
      if (item.isOutside) {
        window.open(item.outsideUrl);
      } else {
        this.$router.push(`/details/${item.articleId}`);
      }
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    this.getLink();
  },
  components: {
    carousel,
    column
  }
};
</script>

<style lang="less" scoped>
@import url('./homeContent.less');
</style>
