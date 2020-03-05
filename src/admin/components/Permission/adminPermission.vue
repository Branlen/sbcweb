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
            <transition name="fade-transform" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
   </div>
</template>
<script>
export default {
      data(){
        return{
             navList:[
                 {path:"/admin/permission",name:"管理员"},
                 {path:"/admin/permission/role",name:"角色管理"},
             ]
        }   
    }
}
</script>
<style lang="less">

</style>
