<template>
  <div class="AddArticle">
    <el-form ref="form" :model="form" :rules="rules">
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
      <el-form-item label="标题：" prop="name">
        <el-input size="mini" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="作者：">
        <el-input size="mini" v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="发布时间：" prop="pubTime">
        <el-date-picker
          size="mini"
          @focus="datePickerFocus"
          @blur="datePickerBlur"
          v-model="form.pubTime"
          type="datetime"
          placeholder="选择日期时间"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="轮播图:">
        <Upload v-model="form.pictureUrl" @changeCarousel="setPictureUrl" />
      </el-form-item>
      <el-form-item prop="content">
        <Editor :catchContent="catchContent" :style="{marginTop:marginTop+'px'}" class="editor"></Editor>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click="handleSubmit()">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Editor from "./Editor/Editor";
// import axios from "axios";
import request from "../../untils/request";
import Upload from "./Upload/SingleImage";
export default {
  components: {
    Editor,
    Upload
  },
  data() {
    return {
      marginTop: 0,
      form: {
        isOutLink: true, //文章公开状态
        isTop: false, //文章置顶状态
        categoryId: "", //文章栏目
        name: "", //文章标题
        author: "作者", //文章作者
        isCarousel: false, //轮播图
        content: "", //文章内容
        isBox: false, //文章悬浮状态
        pubTime: "", //文章发布时间
        pictureUrl: "" //轮播图链接
      },
      columns: [
        {
          categoryId: "",
          categoryName: ""
        }
      ],
      rules: {
        categoryId: [
          { required: true, message: "请选择栏目", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入标题", trigger: "blur" }],
        pubTime: [
          { required: true, message: "请选择发布时间", trigger: "blur" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getColumns();
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
    //提交文章
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          request
            .post("/sbcweb/article/save", {
              adminId: 0,
              author: this.form.author,
              categoryId: this.form.categoryId,
              content: this.form.content,
              isBox: this.form.isBox,
              isCarousel: this.form.isCarousel,
              isOutLink: this.form.isOutLink,
              isTop: this.form.isTop,
              pubTime: this.form.pubTime,
              title: this.form.name,
              pictureUrl: this.form.pictureUrl,
              isOutside: false
            })
            .then(res => {
              if (res.data.status == 200) {
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
              this.$message.error("错误");
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获取编辑器的html
    catchContent(html) {
      this.form.content = html;
    },
    //改变轮播图状态
    setPictureUrl(url, isCarousel) {
      this.form.pictureUrl = url;
      this.form.isCarousel = isCarousel;
    },
    //改变marginTop 来解决el-date-picker与wangEditor的层级问题
    datePickerBlur() {
      this.marginTop = 0;
    },
    datePickerFocus() {
      this.marginTop = 150;
    }
  }
};
</script>
<style lang="less">
.AddArticle {
  margin-top: 20px;
  margin-left: 20px;
  min-width: 800px;
  width: 900px;
  .el-input {
    max-width: 600px;
  }
  .editor {
    transition: margin-top 0.4s;
    -webkit-transition: margin-top 0.4s; /* Safari */
  }

  .buttons {
    float: right;
    margin-right: 30px;
  }
}
</style>
