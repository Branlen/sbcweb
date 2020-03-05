<template>
  <div class="adminEditFile">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="置顶：">
        <el-radio-group v-model="form.isTop">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="栏目：" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择" size="mini">
          <el-option
            v-for="item in columns"
            :key="item.categoryId"
            :label="item.name"
            :value="item.categoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input size="mini" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="链接：" prop="fileUrl">
        <el-upload
          action="/sbcweb/downloadfile/upload"
          drag
          :on-success="handleUpload"
          :limit="1"
          accept=".pdf, .ppt, .xls, .docx"
          :file-list="fileList"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="发布时间：" prop="pubTime">
        <el-date-picker
          size="mini"
          v-model="form.pubTime"
          type="datetime"
          placeholder="选择日期时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
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
        isTop: false,
        categoryId: "",
        title: "",
        pubTime: "",
        fileUrl: "",
        downloadFileId: ""
      },
      columns: [
        {
          categoryId: "",
          name: ""
        }
      ],
      fileList: [],
      rules: {
        categoryId: [
          { required: true, message: "栏目不能为空！", trigger: "blur" }
        ],
        fileUrl: [{ required: true, message: "文件不能为空！", trigger: "blur" }],
        title: [
          { required: true, message: "标题不能为空！", trigger: "blur" }
        ],
        pubTime: [{ required: true, message: "发布时间不能为空！", trigger: "blur" }],
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
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("错误");
        });
    },
    handleUpload(response, file, fileList) {
      console.log(response);
      this.form.fileUrl = response.data;
    },
    getFileInfo(downloadFileId) {
      this.fileList = [];
      request
        .get(`/sbcweb/downloadfile/info/${downloadFileId}`)
        .then(res => {
          console.log(res);
          let data = res.data.data;
          this.form.isTop = data.isTop;
          this.form.downloadFileId = data.downloadFileId;
          this.form.categoryId = data.categoryId;
          this.form.title = data.title;
          this.form.pubTime = data.pubTime;
          this.articleId = data.articleId;
          this.form.fileUrl = data.url;
          this.fileList.push({ name: data.title, url: data.url });
        })
        .catch();
    },
    handleSubmit() {
       this.$refs.form.validate(valid => {
        if (valid) {
      request
        .put("/sbcweb/downloadfile/update", {
          downloadFileId: this.form.downloadFileId,
          categoryId: this.form.categoryId,
          isTop: this.form.isTop,
          pubTime: this.form.pubTime,
          title: this.form.title,
          url: this.form.fileUrl
        })
        .then(res => {
          if (res.data.status === 200) {
            this.$message.success("修改成功");
            console.log(res);
            this.$emit("success", false);
          } else {
            this.$emit("success", false);

            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('错误');
          this.$emit("success", false);

        });
        }
       })
    },
    catchContent(html) {
      this.form.content = html;
    }
  },
  mounted() {
    this.getColumns();
  }
};
</script>
<style lang="less">
.adminEditFile {
  margin-top: 20px;
  margin-left: 20px;
  min-width: 800px;
  width: 900px;
  .el-form {
    max-width: 800px;
    .el-upload {
      margin-left: 0px;
    }
  }
  .el-input {
    max-width: 600px;
  }
  .buttons {
    float: right;
    margin-top: -20px;
  }
}
</style>
