<template>
    <div >
    <el-col >
    <el-menu 
    class="adminMenu" 
    router
    mode="vertical"
    :collapse="isCollapse"
    :collapse-transition="false">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.path" >
            <i class="icon iconfont" :class ="item.icon"></i>
            <span>{{item.name}}</span>
            </el-menu-item>
    </el-menu>
  </el-col>
    </div>
</template>
<script>
import store from '../../store/index'
export default {
props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
    data(){
        return{
             navList:[
                 {path:"/admin/article",icon:"icon-wenzhangguanli",name:"文章管理"},
             ]
        }   
    },
    mounted() {
      //如果添加了异步路由就更新栏目
      const hasUpdateRouters = store.getters.updatedRouters;
      console.log('===navList===',this.navList)
      let asyncList = [
                 {path:"/admin/article",icon:"icon-article",name:"文章管理"},
                 {path:"/admin/file",icon:"icon-Filesave",name:"文件管理"},
                 {path:"/admin/blogroll",icon:"icon-url",name:"友情链接"},
                 {path:"/admin/column",icon:"icon-column",name:"栏目管理"},
                 {path:"/admin/nav",icon:"icon-navigation",name:"导航栏管理"},
                 {path:"/admin/permission",icon:"icon-admin",name:"管理员管理"},
                 {path:"/admin/setup",icon:"icon-setup",name:"网站基本设置"}, 
             ]
      if(hasUpdateRouters){
        this.navList = asyncList;
      }
    },
}
</script>
<style lang="less">

.adminMenu{
   i{
       font-size: 20px;
       margin-right:20px; 
   }
}
</style>
