<template>
  <div class="adminEditNav">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="标题：" prop="name">
        <el-input size="mini" v-model="form.name"></el-input>
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

import request from "../../untils/request";
export default {
  data() {
    return {
      form: {
        name: "",
        navigationBarId: "",
        categoryId: ""
        //  sort:"",
      },
      rules: {
        title: [
          { required: true, message: "导航栏标题不能为空！", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getNavInfo(navId) {
     request
        .get(`/sbcweb/navigationbar/info/${navId}`)
        .then(res => {
          console.log(res);
          let data = res.data.data;
          this.form.navigationBarId = data.navigationBarId;
          this.form.name = data.name;
          //  this.form.sort = data.sort;
        })
        .catch();
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
         request
            .put("/sbcweb/navigationbar/update", {
              name: this.form.name,
              // "sort":this.form.sort,
              navigationBarId: this.form.navigationBarId
            })
            .then(res => {
              if(res.data.status === 200)
              {
                 this.$message.success("修改成功");
                 this.$emit("success", false);
              }else{
                this.$message.warning(res.data.msg)
                 this.$emit("success", false);
              }   
            })
            .catch(err => {
              this.$message.error('错误')
              console.log(err);
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
.adminEditNav {
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
