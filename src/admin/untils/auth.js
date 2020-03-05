import Cookies from 'js-cookie'


const TokenKey = "Admin-Token"

export function getToken(){
    return Cookies.get(TokenKey)
}

export function setToken(token){
    return Cookies.set(TokenKey,token)
}

export function removeToken(){
    console.log('Token删除成功')
    return Cookies.remove(TokenKey)
}

const RoleKey = "Admin-Role"

export function getRoles(){
    return Cookies.get(RoleKey)
}

export function setRoles(roles){
    return Cookies.set(RoleKey,roles)
}

export function removeRoles(){
    console.log('角色删除成功')
    return Cookies.remove(RoleKey)
}