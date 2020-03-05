<template>
  <div class="column">
    <div class="columnHeader">
      <el-button icon="el-icon-printer">栏目信息</el-button>
    </div>
    <div class="categorys">
      <div class="category" v-for="(item) in categoryInfos[0]" :key="item.categoryId">
        <div class="categoryHeader">
          <div class="categoryName">
            <router-link tag="p" :to="'/list/'+item.categoryId">{{item.name}}</router-link>
          </div>
          <div class="categoryMore">
            <router-link tag="span" :to="'/list/'+item.categoryId" href>更多>></router-link>
          </div>
        </div>
        <div class="categoryContent">
          <div class="noArticle" v-if="!item.articleEntities">本栏目没有文章...</div>
          <template v-else>
            <ul v-for="ite in item.articleEntities" :key="ite.articleId">
              <li :title="ite.title" @click="goDetail(ite)">
                <span class="title">{{ite.title}}</span>
                <span class="articleTime">{{ite.pubTime.slice(5,10)}}</span>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { categoryInfo: "" },
  data() {
    return {
      // 栏目的全部信息
      // categoryInfo:[]
      categoryInfos: []
    };
  },
  methods: {
    //判断是否是外链接
    goDetail(item) {
      if (item.isOutside) {
        window.open(item.outsideUrl);
      } else {
        this.$router.push(`/details/${item.articleId}`);
      }
    }
  },
  watch: {
    categoryInfo(val){
      this.$nextTick(function(){
        this.$set(this.categoryInfos,0,val)
      })
    }
  },
  updated() {
    // 挂载时，能够获取栏目所有信息
    // this.$set(this.categoryInfos,0,this.ategoryInfo)
    console.log('taga', this.categoryInfos[0])
  }
};
</script>

<style lang="less" scoped>
.column {
  padding: 1% 0%;
  width: 100%;
  box-sizing: border-box;

  .columnHeader {
    width: 100%;
    font-size: 17px;
    font-weight: bold;
    // margin-top: 2%;
    border-bottom: 1px solid blue;
    margin-bottom: 2%;
    button {
      background-color: #204bb0;
      color: #fff;
      font-size: 18px;
    }
  }
  .categorys {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    .category {
      display: inline-block;
      width: 49%;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 3.5%;
      // display: flex;
      // justify-content: space-between;
      .categoryHeader {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        box-sizing: border-box;
        background-color: #fff;
        // background-color: #f8f8f8;
        margin: 5% 5% 0%;
        border-bottom: 1px outset #f8f8f8;
        .categoryName {
          font-size: 20px;
          font-weight: bold;
          color: #4360b5;
          cursor: pointer;
          padding: 1% 0;
          border-bottom: 3px solid #4360b5;
        }
        .categoryMore {
          cursor: pointer;
          padding: 1% 0;
          color: #aca6a6;
          text-decoration: none;
        }
      }
      .categoryContent {
        width: 100%;
        box-sizing: border-box;
        padding: 1% 4% 5%;
        height: 260px;
        font-size: 15px;
        ul {
          list-style: none;
          width: 100%;
          li {
            margin-bottom: 3%;
            padding: 3px 2px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            .articleTime {
              color: #aca6a6;
            }
            .title {
              width: 81%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          li:last-child {
            margin-bottom: 0%;
          }
          li:hover {
            color: #c85900;
            text-decoration: underline;
            transform: scale(1.05, 1.05);
            .articleTime {
              color: #c85900;
            }
          }
        }
      }
    }
  }
}
.noArticle {
  margin-top: 20%;
  text-align: center;
  font-size: 22px;
  color: #aca6a6;
}
</style>

