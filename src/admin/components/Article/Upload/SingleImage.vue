<template>
  <div class="admin-upload-container">
    <el-upload
      drag
      :multiple="false"
      :show-file-list="false"
      list-type="picture"
      accept=".jpg, .png, .jpeg"
      :before-upload="beforeUpload"
      action="/sbcweb/article/upload"
      ref="upload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件 且只能上传一张</div>
    </el-upload>
    <div class="image-preview image-app-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl" />
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../../../untils/request";
export default {
  name: "Upload",
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      url: ""
    };
  },
  computed: {
    //返回图片路径
    imageUrl() {
      if (this.value !== "" && this.value) {
        let url = "http://123.56.11.253:8181/sbcweb/" + this.value;
        return url;
      } else {
        return this.value;
      }
    }
  },
  methods: {
    //改变父组件的form.pictureUrl
    emitInput(val) {
      this.$emit("input", val); //v-model是一个语法糖，相当于value+input
      this.$refs.upload.clearFiles();
    },
    //上传图片钩子  通知父组件，emit参数 pictureUrl，isCarousel
    beforeUpload(file) {
      let fd = new FormData();
      fd.append("file", file);
      request
        .post("/sbcweb/article/upload", fd)
        .then(res => {
          console.log("===上传图片成功===");
          console.log(res);
          let isCarousel = true;
          this.$emit("changeCarousel", res.data.data, isCarousel);
          this.emitInput(res.data.data);
        })
        .catch(err => {
          console.log("===上传图片失败===");
          console.log(err.response);
        });
    },
    //删除图片   通知父组件form.pictureUrl为空，清除fileLsit，通知父组件，emit参数 pictureUrl，isCarousel
    rmImage() {
      this.emitInput("");
      this.$refs.upload.clearFiles();
      console.log("===删除图片成功===");
      let isCarousel = false,pictureUrl = "";
      this.$emit("changeCarousel", pictureUrl, isCarousel);
    }
  }
};
</script>
<style lang="less">
.admin-upload-container {
  display: flex;
  .image-preview {
    width: 200px;
    height: 200px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .image-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .image-preview-action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      cursor: pointer;
      text-align: center;
      line-height: 200px;
      .el-icon-delete {
        font-size: 36px;
      }
    }
    &:hover {
      .image-preview-action {
        opacity: 1;
      }
    }
  }
  .image-app-preview {
    width: 320px;
    height: 180px;
    position: relative;
    border: 1px dashed #d9d9d9;
    float: left;
    margin-left: 50px;
    .app-fake-conver {
      height: 44px;
      position: absolute;
      width: 100%; // background: rgba(0, 0, 0, .1);
      text-align: center;
      line-height: 64px;
      color: #fff;
    }
  }
}
</style>
