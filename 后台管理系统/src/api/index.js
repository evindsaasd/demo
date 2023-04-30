/* eslint-disable no-undef */
// import { request } from '../utils/request';
import { loginreq, req } from './axiosFun';

//获取菜单列表
export const getDishList = (params) => { return req("get", "/dish/list", params) };
// export function getDishList(id) {
//     return require({ url: '/dish', method: 'get', id })
// }
//新增商品
export const addDishList = (params) => { return req("post", "/dish"), params };
// export function addDishList(params) {
//     return req({ url: '/dish', method: 'post', params })
// }
//编辑商品
export const editDishList = (params) => { return req("put", "/dish"), params };
// 删除菜品
export const deleteDishList = (params) => { return req("delete", "/dish") + params };




//获取套餐列表
export const getPackageList = () => http({ url: '/combo', method: 'post' })