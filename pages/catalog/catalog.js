var util = require('../../utils/util.js');
var api = require('../../config/api.js');
const { CommentPost } = require('../../config/api.js');

Page({
  data: {
    categoryList: [
//       {
//         name:'女装/男装'
//     },
//     {
//       name:'童装/母婴'
//   },{
//     name:'数码家电'
// },
// {
//   name:'美妆'
// },
// {
//   name:'办公文教'
// },{
//   name:'日用百货'
// },{
//   name:'美食'
// },
    ],
    currentCategory: "",
    comList: [
  //     {
  //     image: "https://tse2-mm.cn.bing.net/th/id/OIP-C.VcWXHn9qchIV7MHZbnoBBwHaLH?w=144&h=216&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //     description: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
  //     address:"龙泉驿区",
  //     name:'xxx女装'
  // }, {
  //   image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.hysN_iY2JKdeSKEq3wrSEAHaE6?w=236&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //     description: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
  //     address:"龙泉驿区",
  //     name:'xxx女装'
  // },
  // {
  //   image: "https://tse4-mm.cn.bing.net/th/id/OIP-C.Y-PMMZJLFsbsh_41dT67ywHaEN?w=313&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //     description: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
  //     address:"龙泉驿区",
  //     name:'xxx女装'
  // }, {
  //   image: "https://tse1-mm.cn.bing.net/th/id/OIP-C.mDhvhRf7FhuCqZbG59IfZAAAAA?w=131&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //     description: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
  //     address:"龙泉驿区",
  //     name:'xxx男装'
  // }, {
  //   image: "https://tse1-mm.cn.bing.net/th/id/OIP-C.Jd1YbcrZuVDvipabmZzRRgAAAA?w=136&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //     description: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
  //     address:"龙泉驿区",
  //     name:'xxx男装'
  // }
], //商品列表
    // currentSubCategoryList: [
    //   {
    //     picUrl:"https://tse2-mm.cn.bing.net/th/id/OIP-C.VcWXHn9qchIV7MHZbnoBBwHaLH?w=144&h=216&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    //     name:'时尚女装'
    // },
    // ],
    page: 1,
    scrollLeft: 0,
    scrollTop: 0,
    goodsCount: 0,
    scrollHeight: 0
  },
  onLoad: function(options) {
    this.getAllVariety()
    // this.getCatalog();
    console.log("hello world")
    // console.log(currentCategory)
    this.getCurrentCategory(this.data.currentCategory);
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    // this.getCatalog();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },
  // getCatalog: function() {
  //   //CatalogList
  //   let that = this;
  //   wx.showLoading({
  //     title: '加载中...',
  //   });
  //   util.request(api.CatalogList).then(function(res) {
  //     that.setData({
  //       categoryList: res.data.categoryList,
  //       currentCategory: res.data.currentCategory,
  //       currentSubCategoryList: res.data.currentSubCategory
  //     });
  //     wx.hideLoading();
  //   });
  //   util.request(api.GoodsCount).then(function(res) {
  //     that.setData({
  //       goodsCount: res.data.goodsCount
  //     });
  //   });

  // },
  getCurrentCategory: function(id) {
    var that = this;
    console.log("here is your id")
    console.log(id);
    util.request(api.CatalogCurrent, {
        page: that.data.page,
        varietyId: id
      })
      .then(function(res) {
        console.log(id)
        if(res.code==200){
        console.log("yes i am comimng")
        that.setData({
          currentCategory: id,
          // currentSubCategoryList: res.data.data
          comList: res.data
        });
        
      }
      });
      console.log(that.data.comList)
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  getAllVariety(){
      
      var that=this;
      wx.request({
        url: "https://624w0n2786.yicp.fun/main/variety",
        method: "GET",
        data: {
        },
        success: function (res) {
          // 一般在这一打印下看看是否拿到数据
          if (res.data.code === 200) {
            console.log("res.data.data.list[0]");
            console.log(res.data.data.list[0])
            that.setData({
              categoryList: res.data.data.list,
              currentCategory: res.data.data.list[0].id
            })
            that.getCurrentCategory(that.data.currentCategory)
            // console.log(that.data.currentCategory)
            }
          },
          fail: function(){
            console.log("fail!!!")
          }
        })
    
  },
  switchCate: function(event) {
    var that = this;
    var currentTarget = event.currentTarget;
    if (this.data.currentCategory == event.currentTarget.dataset.id) {
      return false;
    }

    this.getCurrentCategory(event.currentTarget.dataset.id);
  }
})