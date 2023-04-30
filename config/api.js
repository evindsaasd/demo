// 以下是业务服务器API地址
 // 本机开发API地址
 var WxApiRoot = 'https://624w0n2786.yicp.fun/';
 // 测试环境部署api地址
 // var WxApiRoot = 'http://192.168.0.101:8070/demo/wx/';
 // 线上云平台api地址
 //ar WxApiRoot = 'https://www.dtsshop.com/demo/wx/';
 
 module.exports = {
   IndexUrl: WxApiRoot + 'home/index', //首页数据接口
   ComList: WxApiRoot + 'main', //首页商家推荐接口

   CatalogList: WxApiRoot + 'catalog/index', //分类目录全部分类数据接口
   CatalogCurrent: WxApiRoot + 'cate', //分类目录当前分类数据接口
 
   AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
   AuthLoginByAccount: WxApiRoot + 'auth/login', //账号登录
   AuthLogout: WxApiRoot + 'auth/logout', //账号登出
   AuthRegister: WxApiRoot + 'auth/register', //账号注册
   AuthReset: WxApiRoot + 'auth/reset', //账号密码重置
   AuthRegisterCaptcha: WxApiRoot + 'auth/regCaptcha', //验证码
   AuthBindPhone: WxApiRoot + 'auth/bindPhone', //绑定微信手机号
 
   GoodsCount: WxApiRoot + 'goods/count', //统计商品总数
   GoodsList: WxApiRoot + 'goodsst', //获得商品列表
   GoodsCategory: WxApiRoot + 'goods/category', //获得分类数据
   GoodsDetail: WxApiRoot + 'goods/detail', //获得商品的详情
   GoodsRelated: WxApiRoot + 'goods/related', //商品详情页的关联商品（大家都在看）
 
   CartList: WxApiRoot + 'cart/index', //获取购物车的数据
   CartAdd: WxApiRoot + 'cart/add', // 添加商品到购物车
   CartFastAdd: WxApiRoot + 'cart/fastadd', // 立即购买商品
   CartUpdate: WxApiRoot + 'cart/update', // 更新购物车的商品
   CartDelete: WxApiRoot + 'cart/delete', // 删除购物车的商品
   CartChecked: WxApiRoot + 'cartecked', // 选择或取消选择商品
   CartGoodsCount: WxApiRoot + 'cart/goodscount', // 获取购物车商品件数
   CartCheckout: WxApiRoot + 'carteckout', // 下单前信息确认
 
   SearchIndex: WxApiRoot + 'mainarch', //搜索关键字
   SearchResult: WxApiRoot + 'search/result', //搜索结果
   SearchHelper: WxApiRoot + 'mainarch', //搜索帮助
   SearchClearHistory: WxApiRoot + 'search/clearhistory', //搜索历史清除
 
   OrderSubmit: WxApiRoot + 'order/submit', // 提交订单
   OrderPrepay: WxApiRoot + 'order/prepay', // 订单的预支付会话
   OrderList: WxApiRoot + 'orderst', //订单列表
   OrderDetail: WxApiRoot + 'order/detail', //订单详情
   OrderCancel: WxApiRoot + 'order/cancel', //取消订单
   OrderRefund: WxApiRoot + 'order/refund', //退款取消订单
   OrderDelete: WxApiRoot + 'order/delete', //删除订单
   OrderConfirm: WxApiRoot + 'order/confirm', //确认收货
   OrderGoods: WxApiRoot + 'order/goods', // 代评价商品信息
   OrderComment: WxApiRoot + 'order/comment', // 评价订单商品信息
 
   FeedbackAdd: WxApiRoot + 'feedback/submit', //添加反馈
   FootprintList: WxApiRoot + 'footprintst', //足迹列表
   FootprintDelete: WxApiRoot + 'footprint/delete', //删除足迹
 
   UserFormIdCreate: WxApiRoot + 'formid/create', //用户FromId
 
   StorageUpload: WxApiRoot + 'storage/upload', //图片上传,
 
   UserIndex: WxApiRoot + 'user/index', //个人页面用户相关信息
   GetSharedUrl: WxApiRoot + 'user/getSharedUrl' //获取推广二维码
 };
