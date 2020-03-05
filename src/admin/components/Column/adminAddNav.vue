<template>
  <div class="adminAddNav">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="标题：" prop="title">
        <el-input size="mini" v-model="form.title"></el-input>
      </el-form-item>
      <!-- <el-form-item label="排序：">
        <el-input size="mini" v-model="form.sort"></el-input>
      </el-form-item>-->
      <el-form-item class="buttons">
        <!-- <el-button type="primary" @click=" resetForm('form')">重置</el-button> -->
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
import request from "../../untils/request";
export default {
  props: ["addVisible"],
  data() {
    return {
      form: {
        title: "",
        sort: ""
      },
      rules: {
        title: [
          { required: true, message: "导航栏标题不能为空！", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          request
            .post("/sbcweb/navigationbar/save", {
              name: this.form.title,
              sort: 1
            })
            .then(res => {
              console.log("===新增导航栏===", res);
              if (res.data.status == 200) {
                this.$message.success("新增成功");
                this.$emit("success", false);
              } else {
                this.$message.warning(res.data.msg);
                this.$emit("success", false);
              }
            })
            .catch(err => {
              console.log(err);
              console.log(11);
              this.$emit("success", false);
            });
        }
      });
    },
    resetForm(formName) {}
  },
  mounted() {}
};
</script>
<style lang="less">
.adminAddNav {
  margin-top: 20px;
  margin-left: 20px;
  min-width: 300px;
  width: 450px;
  .el-form {
    max-width: 450px;
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
