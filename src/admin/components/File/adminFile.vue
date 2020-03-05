<template>
  <div class="adminFile" v-loading="loading">
    <div class="dialog">
      <el-dialog :visible.sync="addVisible" width="900px">
        <addFile :addVisible="addVisible" v-on:success="addSuccess"></addFile>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog :visible.sync="editVisible" width="900px">
        <editFile :editVisible="editVisible" v-on:success="editSuccess" ref="myChild"></editFile>
      </el-dialog>
    </div>
    <div class="button">
      <el-button type="primary" size="small" @click="handleAdd">新增文件</el-button>
    </div>
    <el-table :data="fileData" class="admin_table" border fit highlight-current-row>
      <el-table-column label="文件标题" min-width="210">
        <template slot-scope="scope">
          <a
            class="fileTitle"
            @click="clickDownloadFile(scope.row.url,scope.row.title)"
          >{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="categoryName" align="center" label="栏目分类" width="210"></el-table-column>
      <el-table-column align="center" prop="pubTime" label="发布时间" width="210"></el-table-column>
      <el-table-column align="center" prop="downloadNum" label="下载量" width="150"></el-table-column>
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
import addFile from "./adminAddFile";
import editFile from "./adminEditFile";
import download from "ly-downloader";
export default {
  components: {
    addFile,
    editFile
  },
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      total: 0,
      fileData: [],
      addVisible: false,
      editVisible: false,
      loading: true
    };
  },
  methods: {
    clickDownloadFile(url, name) {
      console.log('===url===',url)
      download(1, `http://123.56.11.253:8181/sbcweb/${url}`, name);
    },
    addSuccess(res) {
      this.addVisible = false;
      this.getFile(this.currentPage, this.pageSize);
    },
    editSuccess(res) {
      this.editVisible = false;
      this.getFile(this.currentPage, this.pageSize);
    },
    getFile(pageNum, pageSize) {
      this.$http
        .get(
          `/sbcweb/downloadfile/list?pageNum=${pageNum}&pageSize=${pageSize}`
        )
        .then(res => {
          console.log('===File===',res)
          if (res.body.status == 200) {
            this.total = res.body.data.totalCount;
            this.fileData = res.body.data.list;
            this.loading = false;
          }else{
            this.loading = false;
          }
        }).catch(err =>{
          this.loading = false;
        })
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.currentPage = val;
      this.getFile(val, this.pageSize);
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleEdit(index, row) {
      this.editVisible = true;
      setTimeout(() => {
        this.$refs.myChild.getFileInfo(row.downloadFileId);
      }, 0);
      // this.$nextTick(()=>{
      //   this.$refs.myChild.getFileInfo(row.downloadFileId);
      // })
    },
    handleDelete(index, row) {
      this.loading = true;
      request
        .delete(
          `/sbcweb/downloadfile/delete?downloadFileIds=${row.downloadFileId}`
        )
        .then(res => {
          console.log('===文件===',res)
          if (res.data.status === 200) {
            this.$message.success("删除成功");
            this.getFile(1, this.pageSize);
          } else {
            this.$message.warning(res.data.msg);
            this.loading = false;
          }
        })
        .catch(err => {
          this.$message.error("错误");
          console.log(err);
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getFile(1, 10);
  }
};
</script>
<style lang="less">
.adminFile {
  .dialog {
    min-width: 800px;
  }
  .fileTitle {
    cursor: pointer;
  }
  .fileTitle:hover {
    color: #3498db;
  }
}
</style>
