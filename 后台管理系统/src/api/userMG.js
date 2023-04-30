import axios from 'axios';
import { loginreq, req } from './axiosFun';

// 登录接口 
export const login = (params) => { return loginreq("post", "/api/login", params) };
// 获取用户菜单
export const menu = (params) => { return axios.get("/api/menu?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 退出接口
export const loginout = () => { return axios.delete("/api/login?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 用户管理 
 **/
// 用户管理-获取用户列表
export const userList = (params) => { return req("post", "/api/User/list", params) };
// 用户管理-保存（添加编辑）
export const userSave = (params) => { return req("post", "/api/User/save", params) };
// 用户管理-删除用户
export const userDelete = (params) => { return axios.delete("/api/User/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 用户管理-重置密码
export const userPwd = (params) => { return req("post", "/api/User/pwd", params) };
// 用户管理-修改状态
export const userLock = (params) => { return axios.get("/api/User/lock?userId=" + params.userId + "&lock=" + params.lock + "&token=" + localStorage.getItem('logintoken')) };
// 用户管理-数据权限
export const UserDeptTree = (params) => { return axios.get("/api/UserDept/tree/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 用户管理-数据权限保存
export const UserDeptSave = (params) => { return req("post", "/api/UserDept/save", params) };
// 用户管理-获取部门设置
export const UserDeptdeptTree = (params) => { return axios.get("/api/UserDept/deptTree/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 用户管理-保存部门设置
export const UserChangeDept = (params) => { return req("post", "/api/User/change/dept", params) };
// 用户管理-用户下线
export const userExpireToken = (params) => { return req("get", "/api/User/expireToken/" + params, {}) };
// 用户管理-刷新缓存
export const userFlashCache = (params) => { return req("get", "/api/User/flashCache/" + params, {}) };

/**
 * 菜单管理
 **/
// 菜单管理-获取菜单Module/list
export const ModuleList = () => { return req("post", "/api/Module/list") };
// 菜单管理-根据菜单获取数据
export const ModuleGet = (params) => { return axios.get("/api/Module/get/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 菜单管理-获取父级菜单Module/nodes
export const ModuleNodes = (params) => { return req("post", "/api/Module/nodes", params) };
// 菜单管理-修改菜单
export const ModuleSave = (params) => { return req("post", "/api/Module/save", params) };
// 菜单管理-删除菜单
export const ModuleDelete = (params) => { return axios.delete("/api/Module/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 角色管理
 **/
// 角色管理-获取角色列表
export const roleList = (params) => { return req("get", "/role/page", params) };
//获取角色权限
export const roleRight = (params)=>{return req('get','/role/permission/'+params) };
// 角色管理-获取角色列表
export const rolePut = (params) => { return req("put", "/role/permission", params) };
// 角色管理-保存（添加编辑）
export const roleSave = (params) => { return req("post", "/role", params) };
// 角色管理-删除角色
// export const roleDelete = (params) => { return req("delete", "/role?id="+params) };
// 角色管理-删除角色
export const roleDelete = (params) => { return axios.delete("https://624w0n2786.yicp.fun/role?id=" + params) };
// 角色管理-菜单权限（获取）
export const RoleRightTree = (params) => { return axios.get("/api/RoleRight/tree/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 角色管理-菜单权限（保存）
export const RoleRightSave = (params) => { return req("post", "/api/RoleRight/save", params) };

/**
 * 公司管理 
 **/
// 公司管理-获取公司列表
export const deptList = (params) => { return req("post", "/api/Dept/list", params) };
// 公司管理-保存（添加编辑）
export const deptSave = (params) => { return req("post", "/api/Dept/save", params) };
// 公司管理-删除公司
export const deptDelete = (params) => { return axios.get("/api/Dept/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 系统环境变量 
 **/
// 系统环境变量-获取系统环境变量列表
export const variableList = (params) => { return req("post", "/api/Variable/list", params) };
// 系统环境变量-保存（添加编辑）
export const variableSave = (params) => { return req("post", "/api/Variable/save", params) };
// 系统环境变量-删除系统环境变量
export const variableDelete = (params) => { return axios.delete("/api/Variable/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 权限管理 
 **/
// 权限管理-获取权限列表
export const permissionList = (params) => { return req("post", "/api/Permission/list", params) };
// 权限管理-保存权限
export const ermissionSave = (params) => { return req("post", "/api/Permission/save", params) };
// 权限管理-删除权限
export const ermissionDelete = (params) => { return axios.delete("/api/Permission/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 权限管理-获取权限
export const roleDropDown = () => { return axios.get("/api/Role/dropDown/all?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 权限管理-配置权限
export const RolePermission = (params) => { return req("post", "/api/RolePermission/save", params) };

/**
 * 权限管理 
 **/
// 权限管理-获取权限列表
export const getOrder = (params) => { return req("get", "/order/page", params) };

/**
 * 店长管理
 **/
// 店长管理-获取店长列表
export const getManager = (params) => { return req("get", "/manager/page"+"?page="+params.page+"&pageSize="+params.limit)};
// 店长管理-增加店长
export const saveManager = (params) => { return req("post", "/manager", params) };
// 店长管理-修改店长信息
export const reviseManager = (params) => { return req("put", "/manager?id="+params.id, params) };
// 店长管理-修改店长状态
export const reviseManagerState = (params) => { return req("get", "/manager/forbidden"+params)};
// 店长管理-修改店长状态
export const managerDelete = (params) => { return axios.delete("https://624w0n2786.yicp.fun/manager?id=" + params) };

/**
 * 顾客管理
 **/
// 顾客管理-获取顾客列表
export const getClient = (params) => { return req("get", "/customer/page"+"?page="+params.page+"&pageSize="+params.limit)};
// 顾客管理-修改顾客状态
export const reviseClient = (params) => { return req("get", "/customer"+params)};

/**
 * 店铺分类管理
 **/
// 店铺分类管理-保存（添加编辑）
export const classifySave = (params) => { return req("post", "/variety", params) };
// 店铺分类管理-获取店铺分类列表
export const getStoreClassify = (params) => { return req("get", "/variety/page"+"?page="+params.page+"&pageSize="+params.limit)};
// 店铺分类管理-删除店铺分类
export const storeClassifyDelete = (params) => { return axios.delete("https://624w0n2786.yicp.fun/variety?id=" + params) };

/**
 * 店铺管理
 **/
// 店铺管理-获取店铺列表
export const getStore = (params) => { return req("get", "/shop/page"+"?page="+params.page+"&pageSize="+params.limit)};
// 店铺管理-增加商店
export const saveStore = (params) => { return req("post", "/shop", params) };
// 店铺管理-修改店铺信息
export const reviseStore = (params) => { return req("put", "/shop", params) };
// 店铺管理-删除店铺
export const storeDelete = (params) => { return axios.delete("https://624w0n2786.yicp.fun/shop?id=" + params) };
// 顾客管理-修改店铺状态
export const reviseStoreState = (params) => { return req("get", "/shop/status"+params)};

/**
 * 菜品管理
 **/
// 菜品管理-获取菜品列表
export const getGoods = (params) => { return req("get", "/dish/page"+"?page="+params.page+"&pageSize="+params.limit)};
// 菜品管理-增加菜品
export const saveGoods = (params) => { return req("post", "/dish", params) };
// 菜品管理-修改菜品状态
export const reviseGoodsState = (params) => { return req("put", "/dish/status",params)};
// 菜品管理-删除菜品
export const goodsDelete = (params) => { return axios.delete("https://624w0n2786.yicp.fun/dish?id=" + params) };

/**
 * 菜品分类管理
 **/
// 菜品分类管理-保存（添加编辑）
export const saveGoodsClassify = (params) => { return req("post", "/category", params) };
// 菜品分类管理-获取菜品分类列表
export const getGoodsClassify = (params) => { return req("get", "/category/page"+"?page="+params.page+"&pageSize="+params.limit)};
// 菜品分类管理-获取菜品分类列表
export const getAllGoodsClassify = (params) => { return req("get", "/category/list?isCombo="+params)};

/**
 * 订单管理
 */
// 订单管理-获取订单
export const GetLogs = (params) => { return req("get","/order"+"?page="+params.page+"&pageSize="+params.limit)};
// 订单管理-修改订单状态
export const reviseOrderState = (params) => { return req("get", "/order"+params)};

//获取菜单分类
export const getClassifyList = (params) => { return req("get", "/category/list"), params };
//新增菜单分类
export const addClassifyList = (params) => { return req("post", "/category"), params };
//编辑菜单分类
export const editClassifyList = (params) => { return req("put", "/category"), params };
// 删除菜单分类
export const goodsClassifyDelete = (params) => { return axios.delete("https://624w0n2786.yicp.fun/category?id=" + params) };

/**
 * 当前店铺信息管理
 */
//获取当前店铺信息
export const GetMsg = (params) => { return req("get","/account/shopMsg",params)};
// export function Getmsg(params) {
//     return req({
//         url:'/account/shopMsg',
//         method:'get',
//         params
//     })
// }
// 修改当前店铺信息
export const reviseInformation = (params) => { return req("put", "/shop?id="+params.id, params) };

/**
 * 当前用户信息管理
 */
// 获取当前用户信息
export const getUser = (params) => { return req("get","/account/user",params)};
// 修改用户名
export const AlterName = (params) => { return req("get","/account/username"+params)};
// 修改用户名
export const AlterPassword = (params) => { return req("get","/account/username"+params)};

/**
 * 侧边栏验证
 */
//获取角色信息
export const getClassify = (params) => { return req("get","/account/user",params)};