import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/admin/untils/auth'

// create an axios instance
const service = axios.create({
    // withCredentials: true, // send cookies when cross-domain requests
    //timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        const hasToken = getToken();
        if(hasToken)
        {
            // let each request carry token
            // ['token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
// service.interceptors.response.use(
//     /**
//      * If you want to get http information such as headers or status
//      * Please return  response => response
//     */

//     /**
//      * Determine the request status by custom code
//      * Here is just an example
//      * You can also judge the status by HTTP Status Code
//      */
//     response => {
//         const res = response.data

//         // if the custom code is not 20000, it is judged as an error.
//         if (res.code !== 200) {
//             Message({
//                 message: res.message || 'Error',
//                 type: 'error',
//                 duration: 5 * 1000
//             })

//             // 527:token 失效
//             if (res.code == 527) {
//                 // to re-login
//                 MessageBox.confirm('登录失效, 你可以停留在这个界面, 或者重新登录', '是否重新登录', {
//                     confirmButtonText: '重新登录',
//                     cancelButtonText: '取消',
//                     type: 'warning'
//                 }).then(() => {
//                     this.$router.push({
//                         name: "adminLogin"
//                     });
//                 })
//             }
//             return Promise.reject(new Error(res.message || 'Error'))
//         } else {
//             return res
//         }
//     },
//     error => {
//         //console.log('err' + error) // for debug
//         Message({
//             message: error.message,
//             type: 'error',
//             duration: 5 * 1000
//         })
//         return Promise.reject(error)
//     }
// )

export default service
