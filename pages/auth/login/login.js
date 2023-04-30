var api = require('../../../config/api.js');
var util = require('../../../utils/util.js');
var user = require('../../../utils/user.js');

var app = getApp();
Page({
  data: {
    canIUseGetUserProfile: false, // 用于向前兼容
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onReady: function() {

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
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        user.checkLogin().catch(() => {
          user.loginByWeixin(res.userInfo).then(res => {
            app.globalData.hasLogin = true;
            wx.navigateBack({
              delta: 1
            })
          }).catch((err) => {
            app.globalData.hasLogin = false;
            util.showErrorToast('微信登录失败');
          });
        });
      },
      fail: (res) => {
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      }
    });
  },
  wxLogin: function(e) {
    if (e.detail.userInfo == undefined) {
      app.globalData.hasLogin = false;
      util.showErrorToast('微信登录失败');
      return;
    }
    user.checkLogin().catch(() => {

      user.loginByWeixin(e.detail.userInfo).then(res => {
        app.globalData.hasLogin = true;

        wx.navigateBack({
          delta: 1
        })
      }).catch((err) => {
        app.globalData.hasLogin = false;
        util.showErrorToast('微信登录失败');
      });

    });
  },
  test(){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          console.log("res.code")
          console.log(res.code)
          wx.request({
            url: 'https://624w0n2786.-yicp.fun/main/login',
            method: 'GET',
            data: {
              code: res.code
            },
            success: function(res) {
              if(res.data.code===200){
                app.globalData.hasLogin = true;
                
                wx.setStorageSync('Authorization',res.header['Authorization']);

                wx.navigateBack({
                  delta: 1
                })
              }else{
                util.showErrorToast('微信登录失败');
              }
            },
            fail: function (params) {
              util.showErrorToast('微信登录失败');
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  accountLogin: function() {
    wx.navigateTo({
      url: "/pages/auth/accountLogin/accountLogin"
    });
  }
})