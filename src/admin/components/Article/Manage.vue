<template>
  <div v-loading="loading">
    <div class="adminManageTitle">
      <div class="adminEditDialog">
        <el-dialog :visible.sync="editVisible" width="1000px" title="编辑文章" :before-close="handleCloseEditArticle">
          <adminEditArticle
            v-bind:editArticleId="editArticleId"
            ref="myChild"
            v-on:success="editSuccess"
            
          ></adminEditArticle>
        </el-dialog>
      </div>
      <div>
        <el-dialog
          :visible.sync="uploadVisible"
          width="900px"
          :before-close="handleClose"
        >
          <uploadCarousel
            v-on:success="uploadSuccess"
            v-bind:articleId="articleId"
            v-bind:categoryId="categoryId"
            v-bind:content="content"
            ref="myChildUpload"
          ></uploadCarousel>
        </el-dialog>
      </div>
      <div class="conditions">
        <span class="condition">
          <label>栏目：</label>
          <el-select v-model="value" clearable placeholder="请选择" size="mini">
            <el-option
              v-for="item in columns"
              :key="item.categoryId"
              :label="item.name"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </span>
        <span class="condition">
          <label class="demonstration">时间：</label>
          <el-date-picker
            size="mini"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </span>
        <span class="condition">
          <label>标题：</label>
          <el-input class="titleInput" size="mini" v-model="input" placeholder></el-input>
        </span>
        <span class="confirmButton">
          <el-button type="primary" @click="reset()">重置</el-button>
        </span>
        <span class="confirmButton">
          <el-button type="primary" @click="handleConfirm(1,7)">查询</el-button>
        </span>
      </div>
    </div>

    <div>
      <el-table :data="tableData" class="admin_table" border fit highlight-current-row>
        <el-table-column align="center" label="序号" type="index" :index="indexMethod" width="100"></el-table-column>
        <el-table-column label="文章标题" min-width="300">
          <template slot-scope="scope">
            <span
              @click="handleEdit(scope.$index, scope.row)"
              class="articleTitle"
            >{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="栏目类型" width="140">
          <template slot-scope="scope">
            <span>{{ scope.row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发布日期" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.pubTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="置顶" width="70">
          <template slot-scope="scope">
            <el-checkbox
              :checked="scope.row.isTop"
              @change="handleChange(scope.row)"
              v-model="scope.row.isTop"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="轮播图" width="70">
          <template slot-scope="scope">
            <el-checkbox
              :checked="scope.row.isCarousel"
              @change="handleChangeCarousel(scope.row)"
              v-model="scope.row.isCarousel"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="悬浮窗" width="70">
          <template slot-scope="scope">
            <el-checkbox
              :checked="scope.row.isBox"
              @change="handleChange(scope.row)"
              v-model="scope.row.isBox"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="外网可见" width="80">
          <template slot-scope="scope">
            <el-checkbox
              :checked="scope.row.isOutLink"
              @change="handleChange(scope.row)"
              v-model="scope.row.isOutLink"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="admin_block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import adminEditArticle from "./EditArticle";
import uploadCarousel from "./UploadCarousel";
import request from "../../untils/request";
import { getToken } from "../../untils/auth";
// import axios from 'axios'
export default {
  components: {
    adminEditArticle,
    uploadCarousel
  },
  data() {
    return {
      editVisible: false,
      uploadVisible: false,
      articleId: "", //传给轮播图文章ID
      categoryId:"", //传给轮播图栏目ID
      content:"",    //传给轮播图内容，content不传后台会报错
      editArticleId: "",
      pageSize: 7,
      currentPage: 1,
      total: 0,
      columns: [
        {
          categoryId: "",
          name: ""
        }
      ],
      value: "",
      value1: "",
      input: "",
      tableData: [],
      loading: true
    };
  },
  methods: {
    //关闭轮播图框
    handleClose(done) {
      this.loading = true;
      console.log(this.articleId);
      request
        .put("/sbcweb/article/update", {
           categoryId:this.categoryId,
          content:this.content,
          adminId: 0,
          articleId: this.articleId,
          isCarousel: false
        })
        .then(res => {
          console.log("===关闭上传轮播图框===");
          this.handleConfirm(this.currentPage, 7);
          done();
        })
        .catch(err => {});
    },
    //上传成功
    uploadSuccess(res) {
      console.log("sadas");
      console.log(res);
      this.uploadVisible = false;
      this.handleConfirm(this.currentPage, 7);
    },
    //编辑成功
    editSuccess(res) {
      this.editVisible = false;
      this.handleConfirm(this.currentPage, 7);
      console.log('===编辑文章列表消失==')
    },
    //获取文章列表信息
    getData(pageNum, pageSize) {
      request
        .get(`/sbcweb/article/list?pageNum=${pageNum}&pageSize=${pageSize}`)
        .then(res => {
          console.log("===获取文章列表信息===");
          console.log(res);
          if (res.data.status == 200) {
            this.total = res.data.data.totalCount;
            this.tableData = res.data.data.list;
            this.loading = false;
          }
        });
    },
    //获取栏目信息
    getColumns() {
      request
        .get("/sbcweb/category/list?pageNum=1&pageSize=999")
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.columns = res.data.data.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.currentPage = val;
      this.handleConfirm(val, 7);
    },
    //自定义索引
    indexMethod(index) {
      return index + (this.currentPage - 1) * 10 + 1;
    },
    //改变轮播图上传状态 ，若改变后为真，则显示上传轮播图界面，若为假，则发送请求
    handleChangeCarousel(row) {
      this.articleId = row.articleId;
      this.categoryId = row.categoryId,
            this.content=row.content,
      console.log("====row===", row);
      console.log(this.articleId);
      if (row.isCarousel) {
        this.uploadVisible = true;
        setTimeout(() => {
          this.$refs.myChildUpload.getPictureUrl(row.articleId);
        }, 0);
      } else {
        console.log("改变轮播图上传状态 ，若改变后为真，则显示上传轮播图界面");
        request
          .put("/sbcweb/article/update", {
            adminId: 0,
            articleId: row.articleId,
            categoryId: row.categoryId,
            content: row.content,
            isBox: row.isBox,
            isCarousel: row.isCarousel,
            isOutLink: row.isOutLink,
            isTop: row.isTop
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //改变除轮播图之外其他单选框状态
    handleChange(row) {
      request
        .put("/sbcweb/article/update", {
          adminId: 0,
          categoryId: row.categoryId,
          content: row.content,
          articleId: row.articleId,
          isBox: row.isBox,
          isCarousel: row.isCarousel,
          isOutLink: row.isOutLink,
          isTop: row.isTop
        })
        .then(res => {
          if (res.data.status === 200) {
            this.$message.success("更新成功");
          } else {
            this.$message.warning(res.data.msg);
            this.getData(1, this.pageSize);
          }
          console.log("===articleUpdate====", res);
        })
        .catch(err => {
          this.$message.error("错误");
          this.getData(1, this.pageSize);
        });
    },
    //修改文章
    handleEdit(index, row) {
      this.editVisible = true;
      this.editArticleId = row.articleId;
      //宏任务执行，当上面执行完后才会执行
      setTimeout(() => {
        this.$refs.myChild.getArticleInfo(row.articleId);
      }, 0);
    },
    //删除文章
    handleDelete(index, row) {
      this.loading = true;
      request
        .delete(
          `/sbcweb/article/delete?articleIds=${row.articleId}&categoryId=${row.categoryId}`
        )
        .then(res => {
          console.log("===删除文章===", res);
          if (res.data.status === 527) {
            this.$message.warning("无权限删除");
            setTimeout(() => {
              this.loading = false;
            }, 400);
          } else if (res.data.status === 200) {
            this.$message.success("删除成功");
            this.handleConfirm(this.currentPage, 7);
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("错误");
          console.log(err);
        });
    },
    //搜索条件
    handleConfirm(pageNum, pageSize) {
      this.loading = true;
      let url = "/sbcweb/article/list";
      url = url + "?pageNum=" + pageNum + "&pageSize=" + pageSize;
      if (this.value1 !== "") {
        url =
          url + "&startTime=" + this.value1[0] + "&endTime=" + this.value1[1];
      }
      if (this.input !== "") {
        console.log("this.input");
        console.log(this.input);
        url = url + "&title=" + this.input;
      }
      if (this.value !== "") {
        url = url + "&categoryId=" + this.value;
      }
      request
        .get(url)
        .then(res => {
          if (res.data.status == 200) {
            this.total = res.data.data.totalCount;
            this.tableData = res.data.data.list;
            this.loading = false;
          } else if (res.data.status == 406) {
            this.total = 0;
            this.tableData = [];
            this.loading = false;
          }
          console.log("===article查询res===", res);
        })
        .catch(err => {
          console.log("===article查询===");
          console.log(err);
          this.$message.error('错误')
          this.loading = false;
        });
    },
    //通知子组件改变notOutSide状态
    handleCloseEditArticle(done){
      console.log('===已经关闭EditArticle==')
      this.$refs.myChild.setNotOutSide();
      done();
    },
    reset(){
      this.value = ""
      this.value1 = ""
      this.input =""
    }
  },
  mounted() {
    this.getData(1, this.pageSize);
    this.getColumns();
  }
};
</script>
<style lang="less">
.adminManageTitle {
  margin: 20px 0;
  display: inline-block;
  font-size: 14px;
  .conditions {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .condition {
      margin-top: 10px;
      margin-left: 20px;
      .titleInput {
        width: 200px;
      }
      .el-date-editor {
        width: 300px;
      }
    }
    .confirmButton {
      margin-left: 40px;
      margin-top: 5px;
    }
  }
}
.articleTitle {
  cursor: pointer;
}
.articleTitle:hover {
  color: #3498db;
}
</style>
