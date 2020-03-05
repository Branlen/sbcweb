<template>
  <div class="adminUploadCarousel">
    <el-form>
      <el-form-item label="轮播图:">
        <!-- <el-upload action="/sbcweb/article/upload" 
                drag 
                :on-success="handleUpload"
                :limit=1
                accept=".jpg, .png, .jpeg"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件 且只能上传一张</div>
        </el-upload>-->
        <Upload v-model="form.pictureUrl" />
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import request from "../../untils/request";
import Upload from "./Upload/SingleImage";
export default {
  components: {
    Upload
  },
  props: ["articleId","categoryId","content"],
  data() {
    return {
      form: {
        pictureUrl: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.form.pictureUrl);
      if (this.form.pictureUrl == "" || this.form.pictureUrl == undefined) {
        this.$message.warning("轮播图不能为空");
      } else {
        request
          .put("/sbcweb/article/update", {
            articleId: this.articleId,
             categoryId:this.categoryId,
          content:this.content,
            isCarousel: true,
            pictureUrl: this.form.pictureUrl
          })
          .then(res => {
            this.$message.success("修改成功");
            console.log("res");
            console.log(res);
            this.$emit("success", false);
          });
      }
    },
    getPictureUrl(articleId) {
      let temp = "";
      request.get(`/sbcweb/article/info/${articleId}`).then(res => {
        console.log("===每篇文章的轮播图片===");
        console.log(res.data.data.pictureUrl);
        let result = res.data.data;
        temp = result.pictureUrl;
        console.log("===temp===");
        console.log(temp);

        if (result.pictureUrl) {
          this.form.pictureUrl = temp;
        } else {
          console.log("===无轮播图片===");
          this.form.pictureUrl = "";
        }
      });
    },
    get() {
      console.log("===输出get===");
    }
  }
};
</script>
<style lang="less">
.adminUploadCarousel {
  .buttons {
    float: right;
    margin-top: -20px;
    margin-left: 0;
  }
}
</style>
