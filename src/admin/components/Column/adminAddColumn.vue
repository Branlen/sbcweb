<template>
  <div class="adminAddColumn">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="导航栏：" prop="navigationBarId">
        <el-select v-model="form.navigationBarId" placeholder="请选择" size="mini">
          <el-option
            v-for="item in navs"
            :key="item.navigationBarId"
            :label="item.name"
            :value="item.navigationBarId"
          ></el-option>
        </el-select>
      </el-form-item>
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
// import axios from 'axios'
import request from "../../untils/request";
export default {
  props: ["addVisible"],
  data() {
    return {
      form: {
        title: "",
        name: "",
        navigationBarId: ""
      },
      navs: [
        {
          navigationBarId: "",
          name: ""
        }
      ],
       rules: {
        navigationBarId: [
          { required: true, message: "所属导航栏不能为空！", trigger: "blur" }
        ],
        title: [{ required: true, message: "栏目标题不能为空！", trigger: "blur" }],
      }
    };
  },
  methods: {
    getNavs() {
      request
        .get(`/sbcweb/navigationbar/list`)
        .then(res => {
          if (res.status == 200) {
            this.navs = res.data.data.list;
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          this.$message.error("错误");
        });
    },
    handleUpload(response, file, fileList) {
      console.log(response);
      this.form.fileUrl = response.data;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          request
            .post("/sbcweb/category/save", {
              name: this.form.title,
              // "sort":this.form.sort,
              sort: 0,
              navigationBarId: this.form.navigationBarId
            })
            .then(res => {
              console.log("===新增栏目===", res);
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
              this.$message.error("错误");
            });
        }
      });
    }
  },
  mounted() {
    this.getNavs();
  }
};
</script>
<style lang="less">
.adminAddColumn {
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
