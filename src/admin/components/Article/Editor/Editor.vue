<template>
  <div>
    <div id="wangeditor">
      <div ref="editorElem"></div>
    </div>
  </div>
</template>
<script>
import E from "wangEditor";
export default {
  name: "editorElem",
  data() {
    return {
      editor: null,
      editorContent: this.content || ""
    };
  },
  props: ["catchContent", "content"], // 接收父组件的方法
  watch: {
    content() {
      console.log('===this.content===')
      this.editor.txt.html(this.content);
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    //输入内容有变时，将输入的内容插入editorContent中
    this.editor.customConfig.onchange = html => {

      this.editorContent = html;
      this.catchContent(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.uploadFileName = "myFile"; //设置文件上传的参数名称
    //下面两个配置不能同时使用
    this.editor.customConfig.uploadImgShowBase64 = true; //使用base64保存图片
    // this.editor.customConfig.uploadImgServer = '/sbcweb/article/upload'  //上传图片到服务器
    this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M

    this.editor.customConfig.debug =
      location.href.indexOf("wangeditor_debug_mode=1") > 0;
    // 关闭粘贴样式的过滤
    this.editor.customConfig.pasteFilterStyle = true;
    // 忽略粘贴内容中的图片
    this.editor.customConfig.pasteIgnoreImg = true;
    // 自定义处理粘贴的文本内容
    this.editor.customConfig.pasteTextHandle = function(content) {
      // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      // console.log("===content===");
      // console.log(content);
      
      return content;
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
  
    this.editor.create(); // 创建富文本实例
  }
};
</script>
<style lang="less">
.w-e-text-container {
  height: 700px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>