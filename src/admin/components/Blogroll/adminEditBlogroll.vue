<template>
  <div class="adminEditBlogroll">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="名称：" prop="name">
        <el-input size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="链接：" prop="url">
        <el-input size="mini" v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <!-- <el-button type="primary" @click=" resetForm('form')">重置</el-button> -->
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import axios from 'axios'
import request from "../../untils/request";
export default {
  props: ["editVisible"],
  data() {
    return {
      form: {
        name: "",
        url: "",
        blogrollId: ""
      },
       rules: {
        name: [
          { required: true, message: "友情链接名称不能为空！", trigger: "blur" }
        ],
        url: [{ required: true, message: "友情链接地址不能为空！", trigger: "blur" }],
      }
    };
  },
  methods: {
    getBlogrollInfo(blogrollId) {
      request
        .get(`/sbcweb/blogroll/info/${blogrollId}`)
        .then(res => {
          if (res.data.status === 200) {
            let data = res.data.data;
            this.form.name = data.name;
            this.form.blogrollId = data.blogrollId;
            this.form.url = data.url;
          } else {
            this.$message.warning("获取失败");
          }
          console.log(res);
        })
        .catch(err => {
          this.$message.error("错误");
        });
    },
    handleSubmit() {
       this.$refs.form.validate(valid => {
        if (valid) {
      request
        .put("/sbcweb/blogroll/update", {
          blogrollId: this.form.blogrollId,
          name: this.form.name,
          url: this.form.url
        })
        .then(res => {
          if (res.data.status === 200) {
            this.$message.success("修改成功");
            console.log(res);
            this.$emit("success", false);
          } else {
            this.$message.warning(res.data.msg);
            this.$emit("success", false);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("错误");
        });
        }
       })
    }
  }
};
</script>
<style lang="less">
.adminEditBlogroll {
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
  .el-input {
    max-width: 300px;
  }
  .buttons {
    float: right;
    margin-top: -20px;
  }
}
</style>
