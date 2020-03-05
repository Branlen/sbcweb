<template>
  <div>
    <div class="adminManageRole" v-loading="loading">
      <div class="dialog">
      <el-dialog :visible.sync="addVisible" width="500px">
        <addRole :addVisible="addVisible" v-on:success="addSuccess"></addRole>
      </el-dialog>
    </div>
      <div class="button">
        <el-button type="primary" size="small" @click="addRole">新增角色</el-button>
      </div>
      <el-table :data="tabledata" class="admin_table" border fit highlight-current-row>
        <el-table-column align="center" label="角色名" prop="description" width="180">
           <template slot-scope="scope">
            <span>{{ scope.row.roleInfo.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.permissionInfo" :key="item" type="success" >{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="编辑" width="140">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import request from "../../untils/request";
// import axios from "axios";
import { getToken } from "../../untils/auth";
import AddRole from './addRole'
export default {
     components: {
    AddRole,
    
  },
  data() {
    return {
      tabledata: [],
      loading: true,
      addVisible:false,
    };
  },
  created() {
    this.getRole();
  },
  methods: {
    //Get Role
    getRole() {
      request({ url: "/sbcweb/role/list", method: "get" })
        .then(res => {
          console.log("===getRole===res===", res.data.data);
          this.tabledata = res.data.data;
          this.loading = false;
        })
        .catch(err => {
          console.log("===getRole===err===", err);
        });
    },
    addRole(){
      this.addVisible = true;
    },
    //Edit Role
    handleEdit(index, row) {
      console.log("===edit_role===", row);
    },
    //Del Role
    handleDelete(index, row) {
      console.log("===delete_role===", row.roleInfo.id);
      (this.loading = true),
        request({ url: `/sbcweb/role/delete/${row.roleInfo.id}`, method: "delete" })
          .then(res => {
            console.log("===role===res===", res);
            if (res.data.status === 200) {
              this.$message.success('删除角色成功')
              this.getRole();
            } else {
              this.$message.warning("无权限删除");
              this.getRole();
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }
          })
          .catch(err => {
            console.log("===role-err===", err);
            this.$message.error('错误')
            this.loading = false;
          });
    },
     addSuccess(res) {
      this.addVisible = false;
      this.getRole();
    },
    editSuccess(res) {
      this.editVisible = false;
      this.getRole();
    },
  }
};
</script>
<style lang="less">
.adminManageRole {
  margin-bottom: 100px;
  .button {
    margin-top: 30px;
  }
  .el-tag {
    margin: 0 2px;
   
  }
}
</style>
