<template>
  <div class="adminLayout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside :width="sideBarOpen ? '240px' : '65px'" >
          <Menu :is-collapse="!sideBarOpen"></Menu>
        </el-aside>
       
        <el-main>
          <div class="hamburger-container">
          <hamburger   class="hamburger" :is-active="sideBarOpen" @toggleClick="toggleSideBar"/>
          </div>
          <transition name="fade-transform" mode="out-in">
              <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Hamburger from '../components/Hamburger/index'
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import "../styles/transition.less";
import '../styles/table.less'  //管理员端公共样式
export default {
  components: {
    Header,
    Footer,
    Menu,
    Hamburger
  },
  data(){
    return{
       sideBarOpen:true,  //侧边栏是否展开
    }
  },
  methods:{
    toggleSideBar(){
      this.sideBarOpen = !this.sideBarOpen;
    }
  }
};
</script>
<style lang="less" >
@Height: e("calc(100vh - 60px)");
.adminLayout {
  margin: 0;
  padding: 0;
  .el-header {
    margin: 0;
    padding: 0;
  }

  .el-container {
    .el-container {
      height: @Height;
      .el-aside {
        border-right: solid 1px #e6e6e6;
        background-color: #fff;
         //sideBar过渡动画
         transition:width 0.4s;
         overflow: hidden;
        .el-menu {
          border: none;
        }
      }
      .el-main {
        background-color: #fff;
        .hamburger-container{
          height:40px; 
          .hamburger{
            cursor:pointer;
            transition:background .3s;
            float:left;
            padding:15px;
            margin-left:-15px;
            margin-top:-15px;
          }
          .hamburger:hover{
          background:rgba(0,0,0,0.025); 
        }
        }
       
      }
    }
  }
}


</style>
