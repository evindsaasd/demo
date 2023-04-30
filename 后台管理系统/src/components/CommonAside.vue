<template>
  <el-row class="tac">
    <el-col :span="22">
      <!-- default-active需要传进去的值就是子导航的index值（也就是其路由值），达到点击路由就可以引起高亮。 -->
      <el-menu
        :collapse="isCollapse"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="overflow: hidden; position: fixed"
      >
        <h3>{{ !isCollapse ? "商城后台管理系统" : "后台" }}</h3>
        <!-- index的值作为地址进行跳转 -->
        <!-- item表示当前的每一项  key用于添加标记当前元素的唯一性  : ===> v-bind -->

        <!-- 一级菜单 -->
        <el-menu-item
          @click="clickMenu(item)"
          v-for="item in noChildren"
          :key="item.name"
          :index="item.name"
        >
          <!-- 加‘：’改写成动态class -->
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!-- 二级菜单 -->
        <el-submenu
          v-for="item in hasChildren"
          :key="item.label"
          :index="item.label"
        >
          <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group
            v-for="subItem in item.children"
            :key="subItem.path"
          >
            <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{
              subItem.label
            }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div class="div"></div>
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border-right: none !important;
  // margin-right: -17px;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 18px;
  }
}
.div {
  width: 200px;
  height: 100vh;
}
</style>

<script>
import {
  getClassify
} from '@/api/userMG'
export default {
  data() {
    return {
      managerData:[
        {
          path: "/shop",
          name: "shop",
          label: "店铺",
          icon: "s-shop",
          url: "Shop/Shop",
        },
        {
          path: "/date-data",
          name: "date-data",
          label: "日志",
          icon: "notebook-1",
          url: "DateData/DateData",
        },
        {
          path: "/personal-center",
          name: "personal-center",
          label: "个人中心",
          icon: "user",
          url: "PersonalCenter/PersonalCenter",
        },
        {
          label: "权限管理",
          icon: "tickets",
          children: [
            {
              path: "/user-list",
              name: "user-list",
              label: "用户列表",
              // icon: "box",
              url: "Other/UserList",
            },
            // {
            //   path: "/permission-list",
            //   name: "permission-list",
            //   label: "店主管理",
            //   // icon: "setting",
            //   url: "Other/PermissionList",
            // },
          ],
        },
        {
          path: "/client-manage",            
          name: "client-manage",
          label: "客户管理",
          icon: "client",
          url: "ClientManage/ClientManage",
        },
        {
          path: "/store-manager",            
          name: "store-manager",
          label: "店长管理",
          icon: "manager",
          url: "StoreManager/StoreManager",
        },
        {
          path: "/store-classify",            
          name: "store-classify",
          label: "店铺分类管理",
          icon: "storeClassify",
          url: "StoreClassify/StoreClassify",
        },
        {
          path: "/store-list",            
          name: "store-list",
          label: "店铺信息管理",
          icon: "storeList",
          url: "StoreList/StoreList",
        },
      ],
      clotheData:[
        {
          path: "/shop",
          name: "shop",
          label: "店铺",
          icon: "s-shop",
          url: "Shop/Shop",
        },
        // {
        //   path: "/package",
        //   name: "package",
        //   label: "套餐",
        //   icon: "dish",
        //   url: "PackageManage/PackageManage",
        // },
        {
          path: "/personal-center",
          name: "personal-center",
          label: "个人中心",
          icon: "user",
          url: "PersonalCenter/PersonalCenter",
        },
      ],
      eatData:[
        {
          path: "/shop",
          name: "shop",
          label: "店铺",
          icon: "s-shop",
          url: "Shop/Shop",
        },
        // {
        //   path: "/package",
        //   name: "package",
        //   label: "套餐",
        //   icon: "dish",
        //   url: "PackageManage/PackageManage",
        // },
        {
          path: "/personal-center",
          name: "personal-center",
          label: "个人中心",
          icon: "user",
          url: "PersonalCenter/PersonalCenter",
        },
        {
          label: "商品",
          icon: "discount",
          children: [
            {
              path: "/goods-store",
              name: "goods-store",
              label: "商品库",
              icon: "sell",
              url: "Other/GoodsStore",
            },
            {
              path: "/goods-classify",
              name: "goods-classify",
              label: "商品分类",
              icon: "setting",
              url: "Other/GoodsClassify",
            },
          ],
        },
        {
          label: "订单",
          icon: "tickets",
          children: [
            {
              path: "/eat-in-order",
              name: "eat-in-order",
              label: "堂食订单",
              icon: "box",
              url: "Other/EatInOrder",
            },
            {
              path: "/order-query",
              name: "order-query",
              label: "订单查询",
              icon: "setting",
              url: "Other/OrderQuery",
            },
          ],
        },
      ],
      menuData: [
        {
          path: "/shop",
          name: "shop",
          label: "店铺",
          icon: "s-shop",
          url: "Shop/Shop",
        },
        // {
        //   path: "/package",
        //   name: "package",
        //   label: "套餐",
        //   icon: "dish",
        //   url: "PackageManage/PackageManage",
        // },
        {
          path: "/date-data",
          name: "date-data",
          label: "日志",
          icon: "notebook-1",
          url: "DateData/DateData",
        },
        {
          path: "/personal-center",
          name: "personal-center",
          label: "个人中心",
          icon: "user",
          url: "PersonalCenter/PersonalCenter",
        },
        {
          label: "商品",
          icon: "discount",
          children: [
            {
              path: "/goods-store",
              name: "goods-store",
              label: "商品库",
              icon: "sell",
              url: "Other/GoodsStore",
            },
            {
              path: "/goods-classify",
              name: "goods-classify",
              label: "商品分类",
              icon: "setting",
              url: "Other/GoodsClassify",
            },
          ],
        },
        {
          label: "订单",
          icon: "tickets",
          children: [
            {
              path: "/eat-in-order",
              name: "eat-in-order",
              label: "堂食订单",
              icon: "box",
              url: "Other/EatInOrder",
            },
            {
              path: "/order-query",
              name: "order-query",
              label: "订单查询",
              icon: "setting",
              url: "Other/OrderQuery",
            },
          ],
        },
        {
          label: "权限管理",
          icon: "tickets",
          children: [
            {
              path: "/user-list",
              name: "user-list",
              label: "用户列表",
              // icon: "box",
              url: "Other/UserList",
            },
            {
              path: "/permission-list",
              name: "permission-list",
              label: "店主管理",
              // icon: "setting",
              url: "Other/PermissionList",
            },
            // {
            //   path: "/customer-list",
            //   name: "customer-list",
            //   label: "顾客管理",
            //   // icon: "setting",
            //   url: "Other/CustomerList",
            // },
          ],
        },
        {
          path: "/client-manage",            
          name: "client-manage",
          label: "客户管理",
          icon: "client",
          url: "ClientManage/ClientManage",
        },
        {
          path: "/store-manager",            
          name: "store-manager",
          label: "店长管理",
          icon: "manager",
          url: "StoreManager/StoreManager",
        },
        {
          path: "/store-classify",            
          name: "store-classify",
          label: "店铺分类管理",
          icon: "storeClassify",
          url: "StoreClassify/StoreClassify",
        },
        {
          path: "/store-list",            
          name: "store-list",
          label: "店铺信息管理",
          icon: "storeList",
          url: "StoreList/StoreList",
        },
      ],
    };
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){
      getClassify().then(res => {
        if (res.code === 200) {
          if(res.data.role === 'manager'){
            this.menuData = this.managerData
          }
          if(res.data.role === 'clother'){
            this.menuData = this.clotheData
          }
          if(res.data.role === 'food'){
            this.menuData = this.eatData
          }
          console.log(this.menuData);
        }
      })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //点击左侧导航栏实现跳转
    clickMenu(item) {
      // 添加容错 当前页面路由与跳转路由不一致时才允许跳转
      // $route表示当前页面路由  这里的$router表示整个的router实例
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      ) {
        this.$router.push(item.path);
      }
    },
  },
  computed: {
    // 没有子菜单
    noChildren() {
      // 使用数组里的filter进行过滤 接收一个函数作为参数 对当前的menuData进行遍历
      return this.menuData.filter((item) => !item.children);
    },
    // 有子菜单
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>