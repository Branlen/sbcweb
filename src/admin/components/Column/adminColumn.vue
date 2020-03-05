//无用代码，本来想象文章管理那样再弄个导航栏

<template>
    <div>
         <el-menu router mode="horizontal" :default-active="this.$route.path">
            <el-menu-item class="" 
            v-for="(item,i) in navList" 
            :key="i" 
            :index="item.path">
            {{item.name}}
            </el-menu-item>
        </el-menu>
        <div>
            <router-view></router-view>
        </div>
   </div>
</template>
<script>
export default {
     data(){
        return{
             navList:[
                 {path:"/admin/column",name:"栏目管理"},
                  {path:"/admin/column/nav",name:"导航栏管理"},
                 {path:"/admin/column/addnav",name:"新增导航栏"},

             ]
        }   
    }
}
</script>
<style lang="less">

</style>
