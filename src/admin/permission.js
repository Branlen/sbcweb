import router from '../router/index'
import { asyncRoutes } from '../router/index'
import { Message } from 'element-ui'
import { getToken, getRoles } from './untils/auth'  //从cookie获取token

import store from '../../src/store/index'

//无权限,除了login，因为如果登录之后再去login则重定向到后台管理页面
const whiteList = ['/', `list`, 'details', 'backstage', 'download', 'search']


router.beforeEach(async (to, from, next) => {
    console.log('===路由前置守卫===')
    let path;
    if (to.path !== '/') {
        path = to.path.split('/')[1];
    } else {
        path = to.path;
    }
    if (whiteList.indexOf(path) != -1) {
        console.log('===我要跳转的是无权限页面，所以正常跳转===')
        next()
    } else {
        //确认用户是否登录
        const hasToken = getToken()
        const roles = getRoles()
        if (hasToken ) {
            console.log('===有Token和角色===')
            console.log('===to.path===', to.path)
            console.log('===Roles===', roles)
            const hasUpdateRouters = store.getters.updatedRouters
            console.log('===store===', store.getters)
            console.log('===hasUpdateRouters===', hasUpdateRouters)
            // store.dispatch('update/updateRouter')
            // console.log('===hasUpdateRouters===11', hasUpdateRouters)
            if (to.path === '/login') {
                console.log('===login redirect to  admin===')
                next({
                    path: '/admin'
                })
            } if (hasUpdateRouters) {
                console.log('haUpdateRouter true')
                console.log(to.path)
                next()
            } else {
                console.log('===roles===', roles)
                if (roles == 'superAdmin') {
                    console.log('roles == superAdmin')

                    await store.dispatch('update/updateRouter',true)
                    router.addRoutes(asyncRoutes)
                    //hack方法 确保addRoutes已完成，set the relpace
                    next({ ...to, replace: true })


                    console.log('router.addRoutes(asyncRoutes)已完成')
                } else {
                    next()
                }
            }
        }
        else {

            //如果其他页面无权限进入则重定向到登录页面
            if (to.path === '/login') {
                console.log('===进入登录页面===')
                next()
            } else {
                console.log('===其他页面无权限===')
                next(`/login?redirect=${to.path}`)
            }
        }
    }

})


router.afterEach((to, from, next) => {
    console.log('I am after eacn')
})