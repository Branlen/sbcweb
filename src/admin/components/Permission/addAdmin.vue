<template>
  <div class="adminAddAdmin">
    <el-form :rules="rules" ref="form" :model="form">
      <el-form-item label="用户名：" prop="name">
        <el-input size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="账号：" prop="username">
        <el-input size="mini" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input size="mini" v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <!-- <el-button type="primary" @click=" resetForm('form')">重置</el-button> -->
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//  import axios from 'axios'
import request from "../../untils/request";
export default {
  props: ["addVisible"],
  data() {
    return {
      form: {

        name: "",
        username:"",
        password: ""
      },
       rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
      request
        .post(`/sbcweb/admin/save`, {
          name:this.form.name,
          username: this.form.username,
          password: this.form.password
        })
        .then(res => {
          if (res.data.status === 200) {
             this.$message.success("新增成功");
            this.$emit("success", false);
          } else {
             this.$message.warning(res.data.msg);
            this.$emit("success", false);
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.$message.error("错误");
        });
        }})
    },
  }
};
</script>
<style lang="less">
.adminAddAdmin {
  margin-top: 20px;
  margin-left: 20px;
  min-width: 400px;
  width: 500px;
  .el-form {
    max-width: 400px;
    .el-upload {
      margin-left: 0px;
    }
  }
  .el-form-item__content {
    max-width: 400px;
    .el-input{
      max-width: 300px;
    }
  }
  .buttons {
    float: right;
    margin-top: -20px;
  }
}
</style>

