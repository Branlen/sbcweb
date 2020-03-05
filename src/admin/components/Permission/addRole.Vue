<template>
  <div class="adminAddRole">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="栏目权限：" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择" size="mini">
          <el-option
            v-for="item in columns"
            :key="item.categoryId"
            :label="item.name"
            :value="item.categoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限名称：">
        <el-input size="mini" v-model="form.categoryName"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
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
        categoryName: "",
        categoryId: ""
      },
      columns: [
        {
          categoryId: "",
          name: ""
        }
      ],
      rules: {
        categoryId: [
          { required: true, message: "请选择栏目！", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getColumns() {
      request
        .get("/sbcweb/category/list?pageNum=1&pageSize=999")
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.columns = res.data.data.list;
          } else {
           this.$message.warning(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("错误");
        });
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(
            "===this.form.categoryId===",
            this.form.categoryId,
            "===this.form.categoryName===",
            this.form.categoryName
          );
          request
            .post("/sbcweb/role/quicklyCreateCategoryAdmin", {
              categoryId: this.form.categoryId,
              categoryName: this.form.categoryName
            })
            .then(res => {
              console.log("===新增角色===", res);
              if (res.data.status == 200) {
                this.$message.success("新增成功");
                this.$emit("success", false);
              } else {
               this.$message.warning(res.data.msg)
                this.$emit("success", false);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error("是否已存在该栏目");
            });
        }
      });
    }
  },
  mounted() {
    this.getColumns();
  }
};
</script>
<style lang="less">
.adminAddRole {
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
