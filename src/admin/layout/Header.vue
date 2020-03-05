<template>
  <div class="adminHeader">
    <span class="title">资产与实验管理处</span>
    <span class="headerRight">
      <i class="icon iconfont icon-icon-user" @click="editPass">你好，{{userName}}</i>
      <!-- <i class="icon iconfont icon-home"></i> -->
      <i class="icon iconfont icon-button" @click="dialogVisible = true"></i>
    </span>
    <el-dialog  :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>是否退出账号?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="editPassVisible" width="500px" class="dialog">
      <EditPassword v-on:success="editPassSuccess" v-bind:editAdminId="editAdminId" />
    </el-dialog>
  </div>
</template>
<script>
import { removeToken, removeRoles } from "../untils/auth";
import store from "../../store/index";
import request from "../untils/request";
import EditPassword from '../components/Permission/editPassword'
export default {
  components:{
    EditPassword
  },
  data() {
    return {
      dialogVisible:false,
      userName:"管理员",
      editAdminId:"1",
      editPassVisible:false,
    };
  },
  methods: {
    logout() {
      const id = store.getters.tokenID;
      console.log("===store===", store.getters);
      console.log("===id===", id);
      request
        .post(`/sbcweb/logout`, {
          id: id
        })
        .then(res => {
          if (res.data.status === 200) {
            console.log("===登出===res===", res);
            store.dispatch("user/setTokenID", null);
           store.dispatch('update/updateRouter',false)
            removeToken();
            removeRoles();
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
            this.$message.success("登出成功");
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("错误，登出失败");
        });

      console.log("退出登录成功");
    },
    handleClose(){
      this.dialogVisible = false;
    },
    editPass(){
      console.log('hello')
      this.editPassVisible = true;
    },
    editPassSuccess(){
      this.editPassVisible = false;
    }
  },
  mounted() {
    this.userName = store.getters.userName;
  },
};
</script>
<style lang="less" >
.adminHeader {
  height: 60px;
  background-color: rgb(52, 152, 219);

  color: #fff;
  line-height: 60px;
  .title {
    margin-left: 30px;
    font-size: 22px;
  }
  .headerRight {
    float: right;
    margin-right: 30px;
    cursor: pointer;
    font-size: 20px;
    .icon {
      margin: 0 5px;
    }
  }
}
</style>