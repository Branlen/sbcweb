<template>
  <div class="adminManageColumn" v-loading="loading">
    <div class="dialog">
      <el-dialog :visible.sync="addVisible" width="500px">
        <addColumn :addVisible="addVisible" v-on:success="addSuccess"></addColumn>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog :visible.sync="editVisible" width="500px">
        <editColumn :editVisible="editVisible" v-on:success="editSuccess" ref="myChild"></editColumn>
      </el-dialog>
    </div>
    <div class="button">
      <el-button type="primary" size="small" @click="handleAdd">新增栏目</el-button>
    </div>
    <el-table
      border
      fit
      highlight-current-row
      ref="dragColumn"
      :data="tableData"
      class="admin_table"
      row-key="categoryId"
    >
      <el-table-column prop="categoryId" label="ID" align="center" width="150"></el-table-column>
      <el-table-column prop="name" label="栏目名称" align="left" width="210"></el-table-column>
      <el-table-column prop="navigationBarName" label="所属导航栏" align="left" min-width="210"></el-table-column>
      <el-table-column label="编辑" align="center" width="200">
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
// import axios from "axios";
import request from '../../untils/request'
import addColumn from "./adminAddColumn";
import editColumn from "./adminEditColumn";
import Sortable from "sortablejs";

export default {
  components: {
    addColumn,
    editColumn
  },
  data() {
    return {
      pageSize: 15,
      currentPage: 1,
      total: 0,
      tableData: [],
      addVisible: false,
      editVisible: false,
      loading: true
    };
  },
  created() {
    this.getData(this.currentPage, this.pageSize);
  },
  methods: {
    addSuccess(res) {
      this.addVisible = false;
      this.getData(this.currentPage, this.pageSize);
    },
    editSuccess(res) {
      this.editVisible = false;
      this.getData(this.currentPage, this.pageSize);
    },
    //请求数据
    getData(val, pageSize) {
      request
        .get(`/sbcweb/category/list?pageNum=${val}&pageSize=${pageSize}`)
        .then(res => {
          console.log("===请求栏目列表成功===", res.data);
          if (res.status == 200) {
            let data = res.data.data;
            this.tableData = data.list;
            this.total = data.totalCount;
            this.currentPage = data.currPage;
          } else if (res.status == 406) {
            this.tableData = [];
            this.total = 0;
          }
          this.loading = false;
        });
      this.$nextTick(() => {
        this.setSort();
      });
    },
    handleAdd() {
      this.addVisible = true;
    },
    handleEdit(index, row) {
      this.editVisible = true;
      setTimeout(() => {
        this.$refs.myChild.getColumnInfo(row.categoryId);
      }, 0);
      // this.$nextTick(()=>{
      //   this.$refs.myChild.getColumnInfo(row.categoryId);
      // })
    },
    //删除栏目
    handleDelete(index, row) {
      this.loading = true;
      request
        .delete(`/sbcweb/category/delete?categoryId=${row.categoryId}`)
        .then(res => {
          console.log('===column==delete==',res)
          if (res.data.status == 200) {
            this.$message.success("删除成功");
            this.getData(1, this.pageSize); // 这里的请求页数不可以改为this.currentPage,因为删除后页数会发生变化
          } else {
            this.$message.warning(res.data.msg);
            this.getData(1, this.pageSize); // 这里的请求页数不可以改为this.currentPage,因为删除后页数会发生变化
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('错误')
          this.getData(1, this.pageSize);
        });
    },
    handleCurrentChange(val) {
      console.log("===栏目管理分页 val:===", val);
      this.currentPage = val;
      this.loading = true;
      this.getData(val, this.pageSize);
    },
    setSort() {
      const el = this.$refs.dragColumn.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      console.log(el);
      var sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);
          this.tableData.forEach((item, index) => {
            item.sort = index + 1;
            axios
              .put("/sbcweb/category/update", {
                categoryId: item.categoryId,
                name: item.name,
                sort: item.sort,
                navigationBarId: item.navigationBarId
              })
              .then(res => {
                console.log("===栏目排序更新成功===");
                this.getData(this.currentPage, this.pageSize);
              })
              .catch(() => {
                console.log("===栏目更新失败===");
              });
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
</style>
