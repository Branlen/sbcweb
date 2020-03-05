<template>
  <div class="adminBlogroll" v-loading="loading">
    <div class="dialog">
      <el-dialog :visible.sync="addVisible" width="500px">
        <addBlogroll :addVisible="addVisible" v-on:success="addSuccess" ></addBlogroll>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog :visible.sync="editVisible" width="500px">
        <editBlogroll :editVisible="editVisible" v-on:success="editSuccess" ref="myChild"></editBlogroll>
      </el-dialog>
    </div>
    <div class="button">
      <el-button type="primary" size="small" @click="handleAdd">新增友情链接</el-button>
    </div>
    <el-table border fit highlight-current-row :data="blogrollData" class="admin_table">
      <el-table-column prop="name" label="外链标题" width="210"></el-table-column>
      <el-table-column prop="url" label="外链链接" min-width="350"></el-table-column>
      <el-table-column align="center" label="编辑" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
// import axios from 'axios';
import request from "../../untils/request";
import addBlogroll from "./adminAddBlogroll";
import editBlogroll from "./adminEditBlogroll";
export default {
  components: {
    addBlogroll,
    editBlogroll
  },
  data() {
    return {
      pageSize: 15,
      currentPage: 1,
      total: 0,
      blogrollData: [],
      addVisible: false,
      editVisible: false,
      loading: true //请求数据
    };
  },
  methods: {
    addSuccess(res) {
      this.addVisible = false;
      this.getBlogroll(1, this.pageSize);
    },
    editSuccess(res) {
      this.editVisible = false;
      this.getBlogroll(1, this.pageSize);
    },
    getBlogroll(pageNum, pageSize) {
      this.$http
        .get(`/sbcweb/blogroll/list?pageNum=${pageNum}&pageSize=${pageSize}`)
        .then(res => {
          if (res.body.status == 200) {
            console.log(res.body.data.list);
            this.total = res.body.data.totalCount;
            this.blogrollData = res.body.data.list;
            this.loading = false;
          }
        });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loading = true;
      this.getBlogroll(val, this.pageSize);
    },
    //自定义索引
    indexMethod(index) {
      return index + (this.currentPage - 1) * 10 + 1;
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleEdit(index, row) {
      this.editVisible = true;
      setTimeout(() => {
        this.$refs.myChild.getBlogrollInfo(row.blogrollId);
      }, 0);
      // this.$nextTick(()=>{
      //   this.$refs.myChild.getBlogrollInfo(row.downloadFileId);
      // })
    },
    handleDelete(index, row) {
      this.loading = true;
      request
        .delete(`/sbcweb/blogroll/delete?blogrollIds=${row.blogrollId}`)
        .then(res => {
          if (res.data.status === 200) {
            this.$message.success("删除成功");
            this.getBlogroll(this.currentPage, this.pageSize);
          }else{
            this.$message.warning(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('错误')
        });
    }
  },
  mounted() {
    this.getBlogroll(1, this.pageSize);
  }
};
</script>
<style lang="less">
.adminBlogroll {
  .dialog {
    min-width: 800px;
  }
}
</style>
