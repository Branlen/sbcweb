<template>
  <div class="adminManagePermission" v-loading="loading">
    <div class="button">
      <el-button type="primary" size="small" @click="addAdmin">新增管理员</el-button>
    </div>
    <el-table :data="tabledata" class="admin_table" border fit highlight-current-row>
      <el-table-column label="账号" prop="adminInfo.username" width="180"></el-table-column>
      <el-table-column label="管理员" width="180">
        <template slot-scope="scope">
          <span
            @click="handleEditPassword(scope.$index, scope.row)"
            class="adminName"
          >{{ scope.row.adminInfo.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.rolesInfo"
            :key="item.roleId"
            type="success"
            closable
            :disable-transitions="false"
            @close="handleClose(scope.row,item.roleId)"
          >{{ item.description }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="编辑" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">添加角色</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="addVisible" width="500px" class="dialog">
      <AddAdmin v-on:success="addSuccess" />
    </el-dialog>
    <el-dialog :visible.sync="editPassVisible" width="500px" class="dialog">
      <EditPassword v-on:success="editPassSuccess" v-bind:editAdminId="editAdminId" />
    </el-dialog>
    <el-dialog :visible.sync="editVisible" width="500px" class="dialog">
      <EditRole
        ref="myEditRole"
        v-on:success="editSuccess"
        v-bind:editAdminId="editAdminId"
        :selectAdminUid="selectAdminUid"
      />
    </el-dialog>
  </div>
</template>
<script>
// import axios from 'axios'
import request from "../../untils/request";
import AddAdmin from "./addAdmin";
import EditPassword from "./editPassword";
import EditRole from "./editAdminRole";
export default {
  components: {
    AddAdmin,
    EditPassword,
    EditRole
  },
  data() {
    return {
      editVisible: false,
      editPassVisible: false,
      addVisible: false,
      username: "",
      password: "",
      editAdminId: "",
      tabledata: [],
      roles: [],
      selectAdminUid: "",
      loading:true,
    };
  },
  created() {
    this.getAdmin();
  },
  methods: {
    getAdmin() {
      
      console.log("===getAdmin===");
      request
        .get("/sbcweb/admin/select")
        .then(res => {
          if (res.data.status === 200) {
            console.log("===Admin===", res);
            this.tabledata = res.data.data;
             this.loading = false;
          } else {
            this.$message.warning(res.data.msg);
             this.loading = false;
          }
        })
        .catch(err => {
          this.$message.error("错误");
          this.loading = false;
        });
       
    },
    addAdmin() {
      this.addVisible = true;
    },
    handleEdit(index, row) {
      this.editVisible = true;
      console.log("===selctUid===", row);
      this.selectAdminUid = row.adminInfo.uid;
      //宏任务执行，当上面执行完后才会执行
      setTimeout(() => {
        this.$refs.myEditRole.getAdminRole(row.adminInfo.uid);
      }, 0);
    },
    handleEditPassword(index, row) {
      this.editPassVisible = true;
      console.log("row");
      console.log(row);
      this.editAdminId = row.adminInfo.uid;
    },
    handleDelete(index,row) {
      console.log('===删除管理员===',row)
      this.loading = true;
      request.delete(`/sbcweb/admin/delete/${row.adminInfo.uid}`)
      .then(res =>{
        if(res.data.status == 200)
        {
          this.$message.success('删除成功');
          this.getAdmin();
        }else{
          this.$message.warning(res.data.msg)
        }
      })
      .catch(err =>{
        this.$message.error('错误，删除失败')
      })
    },
    handleClose(obj,roleId) {
      console.log('===obj===',obj);
      console.log(roleId);
      let data = {
        uid:obj.adminInfo.uid,
        roleId:roleId,
      }
      request.delete('/sbcweb/admin/deleteAdminRole',{
       data:data
      }
      )
      .then(res =>{
        if(res.data.status === 200)
        {
          this.$message.success('删除成功');
          this.getAdmin()
        }else{
          this.$message.warning(res.data.msg)
        }
      })
      .catch(err =>{
        this.$message.error('错误')
      })
    },
    addSuccess(res) {
      this.addVisible = false;
      this.getAdmin();
    },
    editPassSuccess(res) {
      this.editPassVisible = false;
      this.getAdmin();
    },
    editSuccess(res) {
      this.editVisible = false;
      this.getAdmin();
    }
  }
};
</script>
<style lang="less">
.adminManagePermission {
  .button {
    margin-top: 30px;
  }
  .dialog {
    .dialogDiv {
      margin: 0 0px 10px 5px;
    }
  }
  .el-tag {
    margin: 0 2px;
  }
  .adminName {
    cursor: pointer;
  }
  .adminName:hover {
    color: #3498db;
  }
}
</style>

