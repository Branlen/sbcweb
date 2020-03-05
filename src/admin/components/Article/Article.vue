<template>
  <div>
    <el-menu router mode="horizontal" :default-active="this.$route.path">
      <el-menu-item class v-for="(item,i) in navList" :key="i" :index="item.path">{{item.name}}</el-menu-item>
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
  data() {
    return {
      navList: [
        { path: "/admin/article", name: "文章管理" },
        { path: "/admin/article/addarticle", name: "新增文章" },
        { path: "/admin/article/outside", name: "新增外链文章" }
      ]
    };
  }
};
</script>
<style lang="less">
</style>
