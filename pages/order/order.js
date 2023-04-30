const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
    //   {ft_name: "推荐",ft_id: "a"},
    // {ft_name: "锡纸饭套餐",ft_id: "b"},
    // {ft_name: "锡纸烤饭",ft_id: "c"},
    // {ft_name: "精品冷碟",ft_id: "d"}
  ],
    tabsList: [
            // {ft_id: "a",f_Cooks_Id:'11',food_Img:'https://ts1.cn.mm.bing.net/th?id=OIP-C.s6dpfSeTuglKhh1UbDEZDQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',f_Name:'小炒牛肉',f_Description:'真的很好吃，商家推荐！',f_DPrice:'12',f_Price:'18',quantity:'0',f_Introduction:'小炒牛肉是一道美食，制作原料主要有牛肉、玉兰片、鸡蛋清等，辅料有小葱、江米酒、 味精、酱油、姜、植物油、盐、淀粉等，属于川菜。',si_imgUrl:[{pic_Url:'../../../images/meishi.jpg'},{pic_Url:'../../../images/meishi2.jpg'}]},
            // {ft_id: "a",f_Cooks_Id:'12',food_Img:'https://ts1.cn.mm.bing.net/th?id=OIP-C.s6dpfSeTuglKhh1UbDEZDQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',f_Name:'虎皮凤爪',f_Description:'真的很好吃，商家推荐！',f_DPrice:'12',f_Price:'18',quantity:'0',f_Introduction:'虎皮凤爪是一道色香味俱全的地方名肴，属于粤菜系。皮酥肉嫩，色泽饱满，特别诱人，家常下酒小菜。肉掌丰厚，鲜香味辣，越嚼越香，越嚼越有劲。以鸡爪 花椒、桂皮、八角、少许盐等制作而成。',si_imgUrl:[{pic_Url:'../../../images/meishi2.jpg'},{pic_Url:'../../../images/meishi3.jpg'}]},
            // {ft_id: "b",f_Cooks_Id:'13',food_Img:'https://ts1.cn.mm.bing.net/th?id=OIP-C.s6dpfSeTuglKhh1UbDEZDQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',f_Name:'红烧牛腩',f_Description:'真的很好吃，商家推荐！',f_DPrice:'12',f_Price:'18',quantity:'0',f_Introduction:'红烧牛腩是四川省传统的特色名菜，属于川菜系。主要食材是牛腩。卤汁乳白稠浓，肉质肥嫩，滋味鲜美。营养价值较高，一般人都适合食用。',si_imgUrl:[{pic_Url:'../../../images/meishi3.jpg'},{pic_Url:'../../../images/meishi4.jpg'}]},
            // {ft_id: "b",f_Cooks_Id:'14',food_Img:'https://ts1.cn.mm.bing.net/th?id=OIP-C.s6dpfSeTuglKhh1UbDEZDQHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',f_Name:'羊肉串',f_Description:'真的很好吃，商家推荐！',f_DPrice:'12',f_Price:'18',quantity:'0',f_Introduction:'羊肉串是指新鲜的羊肉用竹签或钢签穿成串后烧烤制成的菜品，是一种比较常见的烧烤类菜品。',si_imgUrl:[{pic_Url:'../../../images/meishi4.jpg'},{pic_Url:'../../../images/meishi5.jpg'}]},{ft_id: "c",f_Cooks_Id:'15',food_Img:'../../../images/meishi.jpg',f_Name:'小炒牛肉',f_Description:'真的很好吃，商家推荐！',f_DPrice:'12',f_Price:'18',quantity:'0',f_Introduction:'小炒牛肉是一道美食，制作原料主要有牛肉、玉兰片、鸡蛋清等，辅料有小葱、江米酒、 味精、酱油、姜、植物油、盐、淀粉等，属于川菜。',si_imgUrl:[{pic_Url:'../../../images/meishi.jpg'},{pic_Url:'../../../images/meishi2.jpg'}]},
            // {ft_id: "c",f_Cooks_Id:'15',food_Img:'../../../images/meishi2.jpg',f_Name:'虎皮凤爪',f_Description:'真的很好吃，商家推荐！',f_DPrice:'12',f_Price:'18',quantity:'0',f_Introduction:'虎皮凤爪是一道色香味俱全的地方名肴，属于粤菜系。皮酥肉嫩，色泽饱满，特别诱人，家常下酒小菜。肉掌丰厚，鲜香味辣，越嚼越香，越嚼越有劲。以鸡爪 花椒、桂皮、八角、少许盐等制作而成。',si_imgUrl:[{pic_Url:'../../../images/meishi2.jpg'},{pic_Url:'../../../images/meishi3.jpg'}]},
            // {ft_id: "d",f_Cooks_Id:'16',food_Img:'../../../images/meishi3.jpg',f_Name:'红烧牛腩',f_Description:'真的很好吃，商家推荐！',f_DPrice:'12',f_Price:'18',quantity:'0',f_Introduction:'红烧牛腩是四川省传统的特色名菜，属于川菜系。主要食材是牛腩。卤汁乳白稠浓，肉质肥嫩，滋味鲜美。营养价值较高，一般人都适合食用。',si_imgUrl:[{pic_Url:'../../../images/meishi3.jpg'},{pic_Url:'../../../images/meishi4.jpg'}]},
            // {ft_id: "d",f_Cooks_Id:'17',food_Img:'../../../images/meishi4.jpg',f_Name:'羊肉串',f_Description:'真的很好吃，商家推荐！',f_DPrice:'12',f_Price:'18',quantity:'0',f_Introduction:'羊肉串是指新鲜的羊肉用竹签或钢签穿成串后烧烤制成的菜品，是一种比较常见的烧烤类菜品。',si_imgUrl:[{pic_Url:'../../../images/meishi4.jpg'},{pic_Url:'../../../images/meishi5.jpg'}]}
          ],
    indexId: 0,
    toTitle: "title-0",
    scrollTop: 0,
    top: [],
    totalPrice: 0, //选中商品总价格
    totalNum: 0, //选中商品数量
    cartList: [], //选中商品列表
    // 购物车动画
    animationData: {},
    animationMask: {},
    maskVisual: "hidden",
    maskFlag: true,
  },
  // 左侧点击事件
  jumpIndex(e) {
    let index = e.currentTarget.dataset.menuindex;
    let ft_id = e.currentTarget.dataset.ft_id;
    let that = this
    that.setData({
      indexId: index,
      toTitle: "title-" + ft_id
    });
  },
  scrollToLeft(res) {
    // console.log("scrollToLeft-res:" + JSON.stringify(res) + JSON.stringify(this.data.top));
    this.setData({
      scrollTop: res.detail.scrollTop
    })
    var length = this.data.top.length;
    for (var i = 0; i < this.data.top.length; i++) {
      if (this.data.top[i] - this.data.top[0] <= this.data.scrollTop && (i < length - 1 && this.data.top[i + 1] - this.data.top[0] > this.data.scrollTop)) {
        if (this.data.indexId != i) {
          this.setData({
            indexId: i,
          });
        }
      }
    }
  },
  onLoad: async function (options) {
    console.log("onload!!!")
    var that = this;
    that.data.targetId=options.id
    console.log(that.targetId)
    this.gettabs();
    this.getDishes();
    wx.showLoading({
      mask: true,
      title: '加载中…',
    })
    // //获取分类
    // gettabs();
    // await GetFoodType(that)
    // //获取菜品
    // getDishes();
    // await GetFoodCook(that)
    wx.hideLoading()
    console.log(that.data.tabsList)
    //赋值
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight - 100
        });
        var top2 = new Array();
        for (var i = 0; i < that.data.tabs.length; i++) {
          wx.createSelectorQuery().select('#view-' + that.data.tabs[i].id).boundingClientRect(function (rect) {
            var isTop = Number(rect.top);
            top2.push(isTop);
            console.log("view-c:" + JSON.stringify(rect));
          }).exec();
        }
        that.setData({
          top: top2
        });
      }
    });
    this.onShow()
  },
  onShow: function (options) {
    var that = this;
    // 获取购物车缓存数据
    var arr = wx.getStorageSync('cart') || [];
    // 进入页面后判断购物车是否有数据，如果有，将菜单与购物车quantity数据统一
    if (arr.length > 0) {
      for (var j in that.data.tabsList) {
      for (var i in arr) {
          if (that.data.tabsList[j].id == arr[i].id) {
            that.data.tabsList[j].quantity = arr[i].quantity;
            break
          } else {
            that.data.tabsList[j].quantity = 0;
          }
        }
      }
    } else {
      for (var j in that.data.tabsList) {
        that.data.tabsList[j].quantity = 0;
      }
    }
    // 进入页面计算购物车总价、总数
    var totalPrice = 0;
    var totalNum = 0;
    if (arr.length > 0) {
      for (var i in arr) {
        totalPrice += arr[i].price * arr[i].quantity;
        totalNum += Number(arr[i].quantity);
      }
    }
    // 赋值数据
    this.setData({
      cartList: arr,
      tabsList: that.data.tabsList,
      totalPrice: totalPrice.toFixed(2),
      totalNum: totalNum
    })
  },
  // 购物车增加数量
  addCart: function (e) {
    var id = e.currentTarget.dataset.id;
    var arr = wx.getStorageSync('cart') || [];
    var f = false;
    for (var i in this.data.tabsList) { // 遍历菜单找到被点击的菜品，数量加1
      if (this.data.tabsList[i].id == id) {
        this.data.tabsList[i].quantity += 1;
        if (arr.length > 0) {
          for (var j in arr) { // 遍历购物车找到被点击的菜品，数量加1
            if (arr[j].id == id) {
              arr[j].quantity += 1;
              f = true;
              try {
                wx.setStorageSync('cart', arr)
              } catch (e) {
                console.log(e)
              }
              break;
            }
          }
          if (!f) {
            arr.push(this.data.tabsList[i]);
          }
        } else {
          arr.push(this.data.tabsList[i]);
        }
        try {
          wx.setStorageSync('cart', arr)
        } catch (e) {
          console.log(e)
        }
        break;
      }
    }
    this.setData({
      cartList: arr,
      tabsList: this.data.tabsList
    })
    this.getTotalPrice();
  },
  // 购物车减少数量
  delCart: function (e) {
    var id = e.currentTarget.dataset.id;
    var arr = wx.getStorageSync('cart') || [];
    for (var i in this.data.tabsList) {
      if (this.data.tabsList[i].id == id) {
        this.data.tabsList[i].quantity -= 1;
        if (this.data.tabsList[i].quantity <= 0) {
          this.data.tabsList[i].quantity = 0;
        }
        if (arr.length > 0) {
          for (var j in arr) {
            if (arr[j].id == id) {
              arr[j].quantity -= 1;
              if (arr[j].quantity <= 0) {
                this.removeByValue(arr, id) //77
              }
              if (arr.length <= 0) {
                this.setData({
                  tabsList: this.data.tabsList,
                  cartList: [],
                  totalNum: 0,
                  totalPrice: 0,
                })
                this.cascadeDismiss()
              }
              try {
                wx.setStorageSync('cart', arr)
              } catch (e) {
                console.log(e)
              }
            }
          }
        }
      }
    }
    this.setData({
      cartList: arr,
      tabsList: this.data.tabsList
    })
    this.getTotalPrice();
  },
  // 定义根据id删除数组的方法
  removeByValue: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == val) {
        array.splice(i, 1);
        break;
      }
    }
  },
  // 获取购物车总价、总数
  getTotalPrice: function () {
    var cartList = this.data.cartList; // 获取购物车列表
    var totalP = 0;
    var totalN = 0
    for (var i in cartList) { // 循环列表得到每个数据
      totalP += cartList[i].quantity * cartList[i].price; // 所有价格加起来     
      totalN += cartList[i].quantity
    }
    this.setData({ // 最后赋值到data中渲染到页面
      cartList: cartList,
      totalNum: totalN,
      totalPrice: totalP.toFixed(2)
    });
  },
  // 清空购物车
  cleanList: function (e) {
    for (var t in this.data.tabs) {
      for (var j in this.data.tabsList) {
        this.data.tabsList[j].quantity = 0;
      }
    }
    try {
      wx.setStorageSync('cart', "")
    } catch (e) {
      console.log(e)
    }
    this.setData({
      tabsList: this.data.tabsList,
      cartList: [],
      cartFlag: false,
      totalNum: 0,
      totalPrice: 0,
    })
    this.cascadeDismiss()
  },
  //删除购物车单项
  deleteOne: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var arr = wx.getStorageSync('cart')
    for (var i in this.data.tabsList) {
      if (this.data.tabsList[i].id == id) {
        this.data.tabsList[i].quantity = 0;
      }
    }
    arr.splice(index, 1);
    if (arr.length <= 0) {
      this.setData({
        tabsList: this.data.tabsList,
        cartList: [],
        cartFlag: false,
        totalNum: 0,
        totalPrice: 0,
      })
      this.cascadeDismiss()
    }
    try {
      wx.setStorageSync('cart', arr)
    } catch (e) {
      console.log(e)
    }
    this.setData({
      cartList: arr,
      tabsList: this.data.tabsList
    })
    this.getTotalPrice()
  },
  //切换购物车开与关
  cascadeToggle: function () {
    var that = this;
    var arr = this.data.cartList
    if (arr.length > 0) {
      if (that.data.maskVisual == "hidden") {
        that.cascadePopup()
      } else {
        that.cascadeDismiss()
      }
    } else {
      that.cascadeDismiss()
    }

  },
  // 打开购物车方法
  cascadePopup: function () {
    var that = this;
    // 购物车打开动画
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease-in-out',
      delay: 0
    });
    that.animation = animation;
    animation.translate(0, -285).step();
    that.setData({
      animationData: that.animation.export(),
    });
    // 遮罩渐变动画
    var animationMask = wx.createAnimation({
      duration: 200,
      timingFunction: 'linear',
    });
    that.animationMask = animationMask;
    animationMask.opacity(0.8).step();
    that.setData({
      animationMask: that.animationMask.export(),
      maskVisual: "show",
      maskFlag: false,
    });
  },
  // 关闭购物车方法
  cascadeDismiss: function () {
    var that = this
    // 购物车关闭动画
    that.animation.translate(0, 285).step();
    that.setData({
      animationData: that.animation.export()
    });
    // 遮罩渐变动画
    that.animationMask.opacity(0).step();
    that.setData({
      animationMask: that.animationMask.export(),
    });
    // 隐藏遮罩层
    that.setData({
      maskVisual: "hidden",
      maskFlag: true
    });
  },
  // 跳转确认订单页面
  gotoOrder: function () {
    wx.navigateTo({
      url: '/pages/checkout/checkout'
    })
  },
  //跳转搜索
  searchNav: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    });
  },
  toDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var goodDetail = [];
    for (var i = 0; i < this.data.tabsList.length; i++) {
      if (this.data.tabsList[i].id == id) {
        goodDetail.push(this.data.tabsList[i]);
      }
    }
    wx.navigateTo({
      url: '../../category/goodDetail/goodDetail?goodDetail=' + JSON.stringify(goodDetail),
    })
  },
  gotoOrder: function () {
    var count=wx.getStorageSync('cart').length
    console.log(count)
    if(count<=0){
      wx.showToast({
        title: '请先选择菜品',
        icon:"none"
      })
      return
    }
    wx.navigateTo({
      url: '/pages/checkout/checkout',
    })
  },
  gettabs(){
    
    var that=this;
    console.log("targetId")
    console.log(that.data.targetId)
    wx.request({
      url: "https://624w0n2786.yicp.fun/restaurant/category",
      method: "GET",
      data: {
        id: that.data.targetId
      },
      success: function (res) {
        // 一般在这一打印下看看是否拿到数据
        if (res.data.code === 200) {
          that.setData({
            tabs: res.data.data
          })
          }
        },
        fail: function(){
          console.log("fail!!!")
        }
      })
  },
  getDishes(){
    var that=this;
    wx.request({
      url: "https://624w0n2786.yicp.fun/restaurant/dishes",
      method: "GET",
      data: {
        id: that.data.targetId
      },
      success: function (res) {
        // 一般在这一打印下看看是否拿到数据
        if (res.data.code === 200) {
          var data=res.data.data;
          var list=[];
          for(var i=0;i<data.length;i++){
            for(var j=0;j<data[i].length;j++){
              var temp=data[i][j];
              // var name="quantity";
              temp.quantity=0;
              list.push(temp);
            }
          }
          that.setData({
            tabsList: list
          })
          }
        },
        fail: function(){
          console.log("fail!!!")
        }
      })
  }
})
//获取商品信息
function GetFoodCook(_this) {
  var that = _this
  return new Promise((resove, reject) => {
    //获取分类
    let data = {
      CookName:""
    }
    let header = {}
    http.request(config.GetFoodCook_WXList, data, 'POST', header).then(function (res) {
      var e = res
      if (e.meta.Code == 200) {
        that.setData({
          tabsList: e.data.foodCookInfo == null ? [] : e.data.foodCookInfo
        })
        resove(true);
      } else {
        wx.showToast({
          title: res.Msg,
          duration: 2000,
          icon: "none",
          mask: true
        })
        reject(false)
      }
    }).catch((res) => {
      wx.showToast({
        title: res.Msg,
        duration: 2000,
        icon: "none",
        mask: true
      })
      reject(false)
    })
  })
}
//获取商品类别
function GetFoodType(_this) {
  var that = _this
  return new Promise((resove, reject) => {
    let data = {
      pagenum: 1,
      pagesize: 100
    }
    let header = {}
    http.request(config.GetFoodTypeList, data, 'POST', header).then(function (res) {
      var e = res
      if (e.meta.Code == 200) {
        that.setData({
          tabs: e.data.foodTypeInfo == null ? [] : e.data.foodTypeInfo
        })
        resove(true);
      } else {
        wx.showToast({
          title: res.Msg,
          duration: 2000,
          icon: "none",
          mask: true
        })
        reject(false)
      }
    }).catch((res) => {
      wx.showToast({
        title: res.Msg,
        duration: 2000,
        icon: "none",
        mask: true
      })
      reject(false)
    })
  })
}
