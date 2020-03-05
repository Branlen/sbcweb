// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import store from './store'


import './admin/permission'  //权限控制

// 引入vueResource包
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.emulateHTTP = true;
// Vue.http.options.root = 'http://47.106.248.255:9090';

//导入vuex包
// import Vuex from 'vuex'
// Vue.use(Vuex)

// var store = new Vuex.Store({
//    state:{
//      categorys:"",
//      //导航条内容
//      navigation:''
//    },
//    mutations:{
//      setCategory(state,Categorys){
//         state.categorys=Categorys;
//      },
//      setNavigation(state,navigation){
//        state.navigation = navigation
//      }
//    },
//    getters:{
//      getCategory(state){
  
//      },
//    }
// })


// 使用Element-UI组件库
Vue.use(ElementUI);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,//挂载路由对象到VM实例上
  template: '<App/>',
})
