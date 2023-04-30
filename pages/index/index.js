const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../utils/user.js');

//获取应用实例
const app = getApp();

Page({
  onShow() {},
  data: {
    // 轮播图
    banner: [ 

      // {url:"//tse4-mm.cn.bing.net/th/id/OIP-C.WCqeGtPisiaW77NrCdANbgHaE8?w=298&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
      // {url:"//tse3-mm.cn.bing.net/th/id/OIP-C.KkPqg6uB5i98OKrhDpkfmQHaEY?w=293&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"},
      // {url:"//tse4-mm.cn.bing.net/th/id/OIP-C.QBFNFDqiU2F2oFn0OyOCdAHaEc?w=298&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"}
      // {
      //   id:"106383857430822913"
      // }
    ],
    // 分类
    channel: [
      {
        id:"132450026835148801",
        name:"服装",
        iconUrl:"/static/images/home1.png",
      },
      {
        id:"jewelry",
        name:"饰品",
        iconUrl:"/static/images/home2.png",
      },
      {
        id:"132450361842597893",
        name:"电子产品",
        iconUrl:"/static/images/home3.png",
      },
      {
        id:"132450477806714888",
        name:"茶饮",
        iconUrl:"/static/images/home4.png",
      },
      {
        id:"facility",
        name:"便民设施",
        iconUrl:"/static/images/home5.png",
      },
      {
        id:"132450477806714888",
        name:"食品",
        iconUrl:"/static/images/home6.png",
      },
    ],
    // 商家推荐
    comList: [
  //     {
  //     image: "https://tse1-mm.cn.bing.net/th/id/OIP-C.hvckeJoHe-jd_f92gVF3jgHaEo?w=314&h=196&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //     description: '商品的名称，可以很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
  //     address:"龙泉驿区",
  //     name:'佳客堡'
  // }, {
  //   image: "https://tse4-mm.cn.bing.net/th/id/OIP-C.sz0z2jR--3aelpZ5g42htwHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   description: '商品的名称，可以很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
  //   address:"龙泉驿区",
  //   name:'佳客堡'
  // },
  // {
  //   image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.sz0z2jR--3aelpZ5g42htwHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   description: '商品的名称，可以很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
  //   address:"龙泉驿区",
  //   name:'佳客堡'
  // }, {
  //   image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.sz0z2jR--3aelpZ5g42htwHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   description: '商品的名称，可以很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
  //   address:"龙泉驿区",
  //   name:'佳客堡'
  // }, {
  //   image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.sz0z2jR--3aelpZ5g42htwHaLH?w=115&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  //   description: '商品的名称，可以很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
  //   address:"龙泉驿区",
  //   name:'佳客堡'
  // }
], //商品列表
    indicatorDots: false,
    window: false,
    colseCoupon:false,
    page: 1,
    // id: '106383857430822913',
  },
  // 获取商家推荐数据
  // getComList: function() {
  //   let that = this;
    
  //   util.request(api.ComList, {
  //     id: that.data.id,
  //     name: that.data.name,
  //     address: that.data.address,
  //     description: that.data.description,
  //     image: that.data.swipers.image
  //   }).then(function(res) {
  //     if (res.code === 200) {
  //       console.log(res.data);
  //       that.setData({
  //         comList: res.data,
  //       });
  //     }
  //   });
  // },
  // ////////////////////
  getComList: function(){
    let that = this;

    wx.request({
      url: 'https://624w0n2786.yicp.fun/main',
      data: {
        // 接口设置的固定参数值
          page: that.data.page,
          id: that.data.id,
          name: that.data.name,
          address: that.data.address,
          description: that.data.description,
          image: that.data.swipers.image
      },
      // 请求的方法
      method: 'GET', // 或 ‘POST’
  	  // 请求成功时的处理
      success: function (res) {
        console.log(res.data)
        if (res.code == 200) {
          that.setData({
            comList: res.data,
          })
        }
      },
      // 请求失败时的一些处理
      fail: function () {
      	wx.showToast({
            icon: "none",
            mask: true,
          	title: "网络连接失败，请稍后再试。",
         });
      }
    }) 
  },

  // ///////////////////////
    // util.request(api.ComList, {
    //   page: that.data.page,
    //   id: that.data.id,
    //   name: that.data.name,
    //   address: that.data.address,
    //   description: that.data.description,
    //   image: that.data.swipers.image
    // })
    // .then(function(res) {
    //   if (res.errno === 0) {
    //     that.setData({
    //       comList: res.data,
    //     });
    //   }
    // });

 
  // getComList(){
  //   util.request({ url: 'https://624w0n2786.yicp.fun/main' })
  //   .then(result => {
  //     this.setData({
  //       comList: result.data.swipers.image
  //     })
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
    
  // },
  onShareAppMessage: function() {
    let userInfo = wx.getStorageSync('userInfo');
    let shareUserId = 1;
    if (userInfo){
      shareUserId = userInfo.userId;
    }
    console.log('/pages/index/index?shareUserId=' + shareUserId);
    return {
      title: 'MOON商城',
      desc: '欢迎使用MOON商城',
      path: '/pages/index/index?shareUserId=' + shareUserId
    }
  },

  onPullDownRefresh() {
    this.getSwiper()
    this.test();
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getIndexData();
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  getIndexData: function() {
    let that = this;
    util.request(api.IndexUrl).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          banner: res.data.banner,
          channel: res.data.channel,
          noramalData: res.data.noramalData,
        });
      }
    });
    util.request(api.GoodsCount).then(function (res) {
      that.setData({
        goodsCount: res.data.goodsCount
      });
    });
  },
  onLoad: function(options) {
    // this.getComList();
    this.getSwiper()
    this.test();
    this.setData({
      colseCoupon: false
    });
    var id = '106383857430822913';
    var that = this;
    // 发送异步请求获取轮播图数据
    wx.request({
      url: 'https://624w0n2786.yicp.fun/main/swiper',
      data:{
        // id: "106383857430822913",
        page: 1
      },
      // id: "106383857430822913",
      success:function(res) {
        console.log(res.data);
        banner:res.data;
        that.setData({
            index : banner
        })
      }
    })
    //如果有分享用户，则设置
    if (options.shareUserId){
      wx.setStorageSync('shareUserId', options.shareUserId);
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.scene) {
      //这个scene的值存在则证明首页的开启来源于朋友圈分享的图,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      var scene = decodeURIComponent(options.scene);
      console.log("scene:" + scene);

      let info_arr = [];
      info_arr = scene.split(',');
      let _type = info_arr[0];
      let id = info_arr[1];

      let shareUserId = null;//默认用户
      if (info_arr.length == 4 && info_arr[2] == 'user'){
    	  shareUserId = info_arr[3];
      } else if (_type == 'user'){
    	  shareUserId = id;
      }

	  if (shareUserId != null){
	  	 wx.setStorageSync('shareUserId', id);
	  }
  	
      if (_type == 'goods') {
        wx.navigateTo({
          url: '../goods/goods?id=' + id
        });
      } else if (_type == 'groupon') {
        wx.navigateTo({
          url: '../goods/goods?grouponId=' + id
        });
      } else if (_type == 'brand') {
          wx.navigateTo({
              url: '../brandDetail/brandDetail?id=' + id
            });
      } else if (_type == 'topic') {
           wx.navigateTo({
               url: '../topicDetail/topicDetail?id=' + id
             });
      } else {
        wx.navigateTo({
          url: '../index/index'
        });
      }
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.grouponId) {
      //这个pageId的值存在则证明首页的开启来源于用户点击来首页,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?grouponId=' + options.grouponId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.goodId) {
      //这个goodId的值存在则证明首页的开启来源于分享,同时可以通过获取到的goodId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../goods/goods?id=' + options.goodId
      });
    }

    // 页面初始化 options为页面跳转所带来的参数
    if (options.orderId) {
      //这个orderId的值存在则证明首页的开启来源于订单模版通知,同时可以通过获取到的pageId的值跳转导航到对应的详情页
      wx.navigateTo({
        url: '../ucenter/orderDetail/orderDetail?id=' + options.orderId
      });
    }

    this.getIndexData();
  },
  onReady: function() {
    // 页面渲染完成
    let that = this;
    let userInfo = wx.getStorageSync('userInfo');
    if (!that.data.colseCoupon && userInfo && that.data.coupon.length > 0) {
      that.setData({ window: true });
    };
    // 商家推荐
    // const db= wx.cloud.database();
    // db.collection('index').where({
    //   name:'tuijian'
    // })
    // .get({
    //   success: (res)=>{
    //     // res.data 是包含以上定义的两条记录的数组
    //     console.log(res.data);
    //     console.log(this);
        
    //     this.setData({
    //       noramalData:res.data[0]
    //     })
    //     console.log(res.data[0]);
    //     this.setData({
    //     item:{
    //     }
    //   })
    //   }
    // });
  },
  test(){
    console.log("i'am coming !!!!!!")
    var that=this;
    wx.request({
      url: "https://624w0n2786.yicp.fun/main",
      method: "GET",
      data: {
        page: 1
      },
      success: function (res) {
        // 一般在这一打印下看看是否拿到数据
        if (res.data.code === 200) {
          that.setData({
            comList: res.data.data
          })
          }
        },
        fail: function(){
          console.log("fail!!!")
        }
      })
  },
  getSwiper(){
    var that=this
    wx.request({
      url: 'https://624w0n2786.yicp.fun/main/swiper',
      method: 'GET',
      data: {
        id: "132799955000623111"
      },
      success: function (res) {
        
          if(res.data.code===200){
            that.setData({
              banner: res.data.data
            })
            console.log("swiper!!!")
            console.log(this.data.banner)
          }
      }
    })
  }
})