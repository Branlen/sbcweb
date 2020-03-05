<template>
  <div>
    <div class="adminEditArticle">
      <el-form label-width="auto" :rules="rules" ref="form" :model="form">
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
        <el-form-item label="悬浮盒子：">
          <el-radio-group v-model="form.isBox">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="栏目：">
          <el-select v-model="form.categoryId" placeholder="请选择" size="mini">
            <el-option
              v-for="item in columns"
              :key="item.categoryId"
              :label="item.name"
              :value="item.categoryId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：">
          <el-input size="mini" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="作者：">
          <el-input size="mini" v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="发布时间：">
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
          <Upload v-model="form.pictureUrl" @changeCarousel="setPictureUrl" />
        </el-form-item>
        <el-form-item v-if="this.form.notOutSide">
          <Editor :catchContent="catchContent" :content="form.content" ></Editor>
        </el-form-item>
        <el-form-item v-if="!this.form.notOutSide" label="外链文章：">
          <el-input size="mini" v-model="form.outsideUrl"></el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Editor from "./Editor/Editor";
import request from "../../untils/request";
import Upload from "./Upload/SingleImage";
export default {
  components: {
    Editor,
    Upload
  },
  data() {
    return {
      form: {
        isOutLink: true,      //外网可见
        isTop: false,         //置顶
        categoryId: "",       //栏目id
        name: "",             //栏目名称
        title: "",            //标题
        author: "",           //作者
        isCarousel: false,    //轮播图 
        content: "",          //wangEditor内容
        isBox: false,         //悬浮盒子
        pubTime: "",          //发布时间
        pictureUrl: "",       //轮播图链接
        notOutSide:true,      //外链文章
        outsideUrl:"",
      },
      columns: [
        {
          categoryId: "",    //栏目id
          name: ""           
        }
      ],
      articleId: "",
      picturelist: [],
      rules: {
        categoryId: [
          { required: true, message: "请选择栏目", trigger: "blur" }
        ],
        name: [{ required: true, messade: "请输入标题", trigger: "blur" }]
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
            
          }else{
            this.$message.warning(res.data.msg)
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error('错误')
        });
    },
    getArticleInfo(articleId) {
      let temp = "";
      request
        .get(`/sbcweb/article/info/${articleId}`)
        .then(res => {
          console.log('===获取编辑文章信息===')
          console.log(res);
          if(res.data.status  === 200)
          {
           
          let data = res.data.data;
          this.form.isOutLink = data.isOutLink;
          this.form.isTop = data.isTop;
          this.form.categoryId = data.categoryId;
          this.form.title = data.title;
          this.form.author = data.author;
          this.form.isCarousel = data.isCarousel;
          this.form.isBox = data.isBox;
          this.form.pubTime = data.pubTime;
          this.articleId = data.articleId;
          this.form.content = data.content;
          this.form.notOutSide = !data.isOutside;
          this.form.outsideUrl = data.outsideUrl;
          temp = data.pictureUrl;
          
          this.$nextTick(() => {
            if (data.isCarousel) {
              this.form.pictureUrl = temp;
            } else {
              this.form.pictureUrl = "";
            }
          });
          }else{
            this.$message.warning(res.data.msg)
          }
          //  this.picturelist.push({'name':data.pictureUrl,'url':data.pictureUrl});
        })
        .catch();
    },
    handleUpload(response, file, fileList) {
      this.$message.success("上传成功");
      console.log(response);
      this.form.pictureUrl = response.data;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        console.log("验证");
        if (valid) {
           request
        .put("/sbcweb/article/update", {
          adminId: 0,
          articleId: this.articleId,
          author: this.form.author,
          categoryId: this.form.categoryId,
          content: this.form.content,
          isBox: this.form.isBox,
          isCarousel: this.form.isCarousel,
          isOutLink: this.form.isOutLink,
          isTop: this.form.isTop,
          pubTime: this.form.pubTime,
          title: this.form.title,
          outsideUrl:this.form.outsideUrl,
          
        })
        .then(res => {
          this.$message.success("修改成功");
          this.$emit("success", false);
          console.log(res);
          this.setNotOutSide();
        })
        .catch(err => {
          console.log(err);
          this.setNotOutSide();
        });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    catchContent(html) {
      this.form.content = html;
    },
    setPictureUrl(url) {
      this.form.pictureUrl = url;
    },
    //改变notOutSide的状态，保证Editor监听content属性时，content存在
    setNotOutSide(){
      this.form.notOutSide = true;
      console.log('===已经修改notOutSide===')
    }
  },
  mounted() {
    this.getColumns();
  },
};
</script>
<style lang="less">
.adminEditArticle {
  .el-form-item {
    padding-bottom: 30px;
    margin-bottom: 10px;
  }
  .buttons {
    float: right;
    margin-top: -20px;
  }
}
</style>
