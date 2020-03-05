
<template>
  <div class="adminAddAdmin">
    <el-form :rules="rules" ref="form" :model="form">
      <el-form-item label="旧密码：" prop="prePassWord">
        <el-input size="mini" v-model="form.prePassWord" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassWord">
        <el-input size="mini" v-model="form.newPassWord" show-password></el-input>
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
  props: ["editAdminId"],
  data() {
    return {
      form: {
        prePassWord: "",
        newPassWord:""
      },
       rules: {
        prePassWord: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
         newPassWord: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
      request
        .post(`/sbcweb/admin/changeAdminPassWord`, {
          id:this.editAdminId,
          prePassWord: this.form.prePassWord,
          newPassWord: this.form.newPassWord
        })
        .then(res => {
          if (res.data.status === 200) {
             this.$message.success("修改密码成功");
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
    max-width: 450px;
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

