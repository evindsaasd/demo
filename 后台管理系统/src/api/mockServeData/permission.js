import Mock from 'mockjs'
export default {
    getMenu: config => {
        const {username, password} = JSON.parse(config.body)
        // 先判断用户是否存在
        // 判断账号和密码是否对应
        if(username === 'admin' && password === 'admin') {
    return {
        code: 20000,
      data: {
        menu:[
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/shop",
          name: "shop",
          label: "店铺",
          icon: "s-shop",
          url: "ShopManage/ShopManage",
        },
        {
          path: "/package",
          name: "package",
          label: "套餐",
          icon: "dish",
          url: "PackageManage/PackageManage",
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
      token: Mock.Random.guid(),
      message: '获取成功'
        }
    }
} else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
    return {
        code: 20000,
        data: {
            menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/shop",
          name: "shop",
          label: "店铺",
          icon: "s-shop",
          url: "ShopManage/ShopManage",
        },
        ],
        token: Mock.Random.guid(),
      message: '获取成功'
        }
    }
} else {
    return {
        code: -999,
        data: {
            message: '密码错误'
        }
    }
}
}
}