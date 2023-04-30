import Vue from 'vue'
import VueRouter from 'vue-router'
import Shop from '../views/Shop.vue'
import Main from '../views/Main.vue'
import Package from '../views/Package.vue'
import GoodsStore from '../views/GoodsStore.vue'
import GoodsClassify from '../views/GoodsClassify.vue'
import EatInOrder from '../views/EatInOrder.vue'
import OrderQuery from '../views/OrderQuery.vue'
import Login from '../views/Login/Login.vue'
import UserList from '../views/UserList.vue'
import PermissionList from '../views/PermissionList.vue'
import DateData from '../views/DateData.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import ClientManage from '../views/ClientManage.vue'
import StoreManager from '../views/StoreManager.vue'
import StoreClassify from '../views/StoreClassify.vue'
import StoreList from '../views/StoreList.vue'
Vue.use(VueRouter)
//1.创建路由组件
//2.将路由与组件进行映射
//3.创建router实例

const routes = [
    // 主路由
    {
        path:'/',
        component:Main,
        redirect:'shop',  //重定向
        children:[
            //子路由
            { path: 'shop', component: Shop },  //店铺
            { path: 'package', component: Package },  //套餐
            { path: 'goods-store', component: GoodsStore },   //商品库
            { path: 'goods-classify', component: GoodsClassify },  //商品分类
            { path: 'eat-in-order', component: EatInOrder },  //堂食订单
            { path: 'order-query', component: OrderQuery },  //订单查询
            { path: 'user-list', component: UserList }, //用户列表
            { path: 'permission-list', component: PermissionList }, //权限列表
            { path: 'date-data', component: DateData }, //日志信息
            { path: 'personal-center', component: PersonalCenter }, //个人中心
            { path: 'client-manage', component: ClientManage }, //客户管理
            { path: 'store-manager', component: StoreManager }, //店长管理
            { path: 'store-classify', component: StoreClassify }, //店铺分类管理
            { path: 'store-list', component: StoreList }, //店铺分类管理
        ]
    },
    {
        path:'/login',
        name:'login',
        component: Login
    }

]

const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router
