var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
var lastTime = null;

Page({
  data: {
    isMultiOrderModel: 0,
    brandCartgoods:[],
    checkedGoodsList: [],
    checkedAddress: {},
    goodsTotalPrice: 0.00, //商品总价
    orderTotalPrice: 0.00, //订单总价
    actualPrice: 0.00, //实际需要支付的总价
    cartId: 0,
    addressId: 0,
    couponId: 0,
    message: '',
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
  },

  //获取checkou信息
  getCheckoutInfo: function() {
    let that = this;
    util.request(api.CartCheckout, {
      cartId: that.data.cartId,
      addressId: that.data.addressId,
      couponId: that.data.couponId,
      grouponRulesId: that.data.grouponRulesId
    }).then(function(res) {
      if (res.errno === 0) {
        let brandCartgoods = [];
        let checkedGoodsList = [];
        if (res.data.isMultiOrderModel === 1) {
          brandCartgoods = res.data.brandCartgoods;
        } else {
          checkedGoodsList = res.data.checkedGoodsList;
        }
        that.setData({
          isMultiOrderModel: res.data.isMultiOrderModel,
          brandCartgoods: brandCartgoods,
          checkedGoodsList: checkedGoodsList,
          checkedAddress: res.data.checkedAddress,
          availableCouponLength: res.data.availableCouponLength,
          actualPrice: res.data.actualPrice,
          couponPrice: res.data.couponPrice,
          grouponPrice: res.data.grouponPrice,
          freightPrice: res.data.freightPrice,
          goodsTotalPrice: res.data.goodsTotalPrice,
          orderTotalPrice: res.data.orderTotalPrice,
          addressId: res.data.addressId,
          couponId: res.data.couponId,
          grouponRulesId: res.data.grouponRulesId,
        });
      }
      wx.hideLoading();
    });
  },
  selectAddress() {
    wx.navigateTo({
      url: '/pages/ucenter/address/address',
    })
  },
  selectCoupon() {
    wx.navigateTo({
      url: '/pages/ucenter/couponSelect/couponSelect',
    })
  },
  bindMessageInput: function(e) {
    this.setData({
      message: e.detail.value
    });
  },
  onReady: function() {
    // 页面渲染完成

  },
  onShow: function() {
    // 页面显示
    // wx.showLoading({
    //   title: '加载中...',
    // });
    try {
      var cartId = wx.getStorageSync('cartId');
      if (cartId) {
        this.setData({
          'cartId': cartId
        });
      }

      var addressId = wx.getStorageSync('addressId');
      if (addressId) {
        this.setData({
          'addressId': addressId
        });
      }

      var couponId = wx.getStorageSync('couponId');
      if (couponId) {
        this.setData({
          'couponId': couponId
        });
      }

      var grouponRulesId = wx.getStorageSync('grouponRulesId');
      if (grouponRulesId) {
        this.setData({
          'grouponRulesId': grouponRulesId
        });
      }

      var grouponLinkId = wx.getStorageSync('grouponLinkId');
      if (grouponLinkId) {
        this.setData({
          'grouponLinkId': grouponLinkId
        });
      }
    } catch (e) {
      // Do something when catch error
      console.log(e);
    }

    this.getCheckoutInfo();
  },
  onHide: function() {
    // 页面隐藏

  },
  onUnload: function() {
    // 页面关闭

  },
  submitOrder: function() {
    if (this.data.addressId <= 0) {
      util.showErrorToast('请选择收货地址');
      return false;
    }
    util.jhxLoadShow("正在下单，请稍后...");
    let nowTime = + new Date();
    if (nowTime - lastTime > 5000 || !lastTime) { //5秒内避免重复提交订单
      lastTime = nowTime;
    } else {
      return false;
    }

    util.request(api.OrderSubmit, {
      cartId: this.data.cartId,
      addressId: this.data.addressId,
      couponId: this.data.couponId,
      message: this.data.message,
      grouponRulesId: this.data.grouponRulesId,
      grouponLinkId: this.data.grouponLinkId
    }, 'POST').then(res => {
      util.jhxLoadHide();
      if (res.errno === 0) {
        
        // 下单成功，重置couponId
        try {
          wx.setStorageSync('couponId', 0);
        } catch (error) {

        }

        const orderId = res.data.orderId;
        util.request(api.OrderPrepay, {
          orderId: orderId
        }, 'POST').then(function(res) {
          if (res.errno === 0) {
            const payParam = res.data;
            console.log("支付过程开始");
            wx.requestPayment({
              'timeStamp': payParam.timeStamp,
              'nonceStr': payParam.nonceStr,
              'package': payParam.packageValue,
              'signType': payParam.signType,
              'paySign': payParam.paySign,
              'success': function(res) {
                console.log("支付过程成功");
                wx.redirectTo({
                  url: '/pages/payResult/payResult?status=1&orderId=' + orderId
                });
              },
              'fail': function(res) {
                console.log("支付过程失败");
                wx.redirectTo({
                  url: '/pages/payResult/payResult?status=0&orderId=' + orderId
                });
              },
              'complete': function(res) {
                console.log("支付过程结束")
              }
            });
          } else {
            wx.redirectTo({
              url: '/pages/payResult/payResult?status=0&orderId=' + orderId
            });
          }
        });

      } else {
        wx.redirectTo({
          url: '/pages/payResult/payResult?status=0&orderId=' + orderId
        });
      }
    });
  }
});