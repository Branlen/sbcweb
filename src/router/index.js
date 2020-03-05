import Vue from 'vue'
import Router from 'vue-router'
import home from '../pages/home.vue'
import list from '../pages/List.vue'
import details from '../pages/Details.vue'
import backstage from '../pages/LoginRegister.vue'
import download from '../pages/download.vue'
import search from '../pages/search.vue'

/**
 * 管理端
 */
import Login from '../admin/pages/Login'
import Layout from '../admin/layout/Layout'
import Article from '../admin/components/Article/Article'


import adminNav from '../admin/components/Column/adminNav'
import adminManageColumn from '../admin/components/Column/adminManageColumn'


import AddArticle from '../admin/components/Article/Add'
import adminManageArticle from '../admin/components/Article/Manage.vue'
import OutSide from '../admin/components/Article/OutSide'

import adminPermission from '../admin/components/Permission/adminPermission'
import adminManageRole from '../admin/components/Permission/role'
import adminManagePermission from '../admin/components/Permission/admin'

import adminFile from '../admin/components/File/adminFile'
import adminSetup from '../admin/components/Settings/adminSetup'

import adminBlogroll from '../admin/components/Blogroll/adminBlogroll'

Vue.use(Router)

export const constantRoutes = [
    {
      path: '/',
      name: 'home',
      component: home
    },
   {
    path: '/404',
     component: () => import('../admin/pages/error-page/404'),
    hidden: true
   },
    {
      path: '/list/:id',
      name: 'list',
      component: list
    },
    {
      path: '/details/:id',
      name: 'details',
      component: details
    },
    {
      path: '/backstage',
      component:  backstage
    },
    {
      path: '/download',
      name: download,
      component: download
    },
    {
      path: '/search/:content',
      name: search,
      component: search
    },
    {
      path: '/login',
      name: 'adminLogin',
      component: Login
    },
    {
      path: '/admin',
      redirect: '/admin/article',
      component: Layout,
      children: [
        {
          path: 'article',
          name: 'Article',
          component: Article,
          children: [
            {
              path: '/',
              name: 'adminManageArticle',
              component: adminManageArticle,
            },
            {
              path: 'addarticle',
              name: 'AddArticle',
              component: AddArticle,
            },
            {
              path: 'outside',
              name: 'OutSide',
              component: OutSide,
            },
          ]
        },
        
      ]
    },
]



/**
* asyncRoutes
* the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes = [
  {
    path: '/admin',
    redirect: '/admin/article',
    component: Layout,
    children: [
  {
    path: 'column',
    name: 'adminManageColumn',
    component: adminManageColumn,
  },

  {
    path: 'nav',
    name: 'adminNav',
    component: adminNav
  },
  {
    path: 'permission',
    name: 'adminPermission',
    component: adminPermission,
    children: [
      {
        path: '/',
        name: 'adminManagePermission',
        component: adminManagePermission,
      },
      {
        path: 'role',
        name: 'adminManageRole',
        component: adminManageRole,
      },
    ]
  },
  {
    path: 'setup',
    name: 'adminSetup',
    component: adminSetup,
  },
  {
    path: 'file',
    name: 'adminFile',
    component: adminFile,
  },
  {
    path: 'blogroll',
    name: 'adminBlogroll',
    component: adminBlogroll,
  },
  ]
},
// 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

export default router;