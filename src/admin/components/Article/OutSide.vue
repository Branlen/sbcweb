<template>
  <div class="adminAddArticle">
    <el-form ref="form" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="公开状态：">
        <el-radio-group v-model="form.isOutLink">
          <el-radio :label="true">允许校外阅读</el-radio>
          <el-radio :label="false">只允许校内阅读</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="置顶：">
        <el-radio-group v-model="form.isTop">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="轮播图：">
        <el-radio-group v-model="form.isCarousel">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="悬浮盒子：">
        <el-radio-group v-model="form.isBox">
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
      <el-form-item label="作者：">
        <el-input size="mini" v-model="form.author"></el-input>
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
      <el-form-item label="轮播图:">
        <el-upload
          action="/sbcweb/article/upload"
          drag
          :on-success="handleUpload"
          :limit="1"
          accept=".jpg, .png, .jpeg"
          list-type="picture"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="外链文章：" prop="outsideUrl">
        <el-input size="mini" v-model="form.outsideUrl"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import axios from "axios";
import request from "../../untils/request";
export default {
  data() {
    return {
      form: {
        isOutLink: true,
        isTop: false, //置顶
        categoryId: "", //栏目id
        title: "", //标题
        author: "作者", //作者
        isCarousel: false, //轮播图
        // content: "",       //内容
        isBox: false, //悬浮盒子
        pubTime: "", //文章发布时间
        pictureUrl: "", //图片链接
        outsideUrl: "" //外链文章链接
      },
      columns: [
        {
          categoryId: "",
          name: ""
        }
      ],
      rules: {
        categoryId: [
          { required: true, message: "请选择栏目", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        pubTime: [
          { required: true, message: "请选择发布时间", trigger: "blur" }
        ],
        outsideUrl: [
          { required: true, message: "请输入外链地址", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //获取栏目信息
    getColumns() {
      request
        .get("/sbcweb/category/list?pageNum=1&pageSize=999")
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.columns = res.data.data.list;
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("错误");
        });
    },
    //上传轮播图
    handleUpload(response, file, fileList) {
      console.log(response);
      this.form.isCarousel = true;
      this.form.pictureUrl = response.data;
    },
    //提交
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          request
            .post("/sbcweb/article/saveOutside", {
              adminId: 0,
              author: this.form.author,
              categoryId: this.form.categoryId,
              content: this.form.content,
              isBox: this.form.isBox,
              isCarousel: this.form.isCarousel,
              isOutLink: this.form.isOutLink,
              isTop: this.form.isTop,
              pubTime: this.form.pubTime,
              title: this.form.title,
              pictureUrl: this.form.pictureUrl,
              outsideUrl: this.form.outsideUrl,
              isOutside: true
            })
            .then(res => {
              if (res.data.status === 200) {
                this.$message.success("新增成功");
                console.log(res);
                this.$router.push({
                  name: "adminManageArticle"
                });
              } else {
                this.$message.warning(res.data.msg);
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
    this.getColumns();
  }
};
</script>
<style lang="less">
.adminAddArticle {
  margin-top: 20px;
  margin-left: 20px;
  min-width: 800px;
  width: 900px;
  .el-input {
    max-width: 600px;
  }
  #wangeditor {
    max-width: 900px;
    .w-e-menu {
      z-index: 100 !important;
    }
    .w-e-text-container {
      z-index: 100 !important;
    }
  }
  .buttons {
    float: right;
    margin-right: 30px;
  }
}
</style>
