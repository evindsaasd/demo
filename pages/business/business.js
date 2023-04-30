// pages/business/business.js
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tagertId: "",
      restaurantMessage: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      console.log("business id")
      console.log(options.id)
      this.tagertId=options.id
      var that=this
      wx.request({
        url: "https://624w0n2786.yicp.fun/restaurant",
        method: "GET",
        data: {
          id: this.tagertId
        },
        success: function (res) {
          // 一般在这一打印下看看是否拿到数据
        
          if (res.data.code === 200) {
            that.setData({
              restaurantMessage: res.data.data
            })
            console.log("comlist!!")
            }
          },
          fail: function(){
            console.log("fail!!!")
          }
        })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

   },
//    getRes: function(){
//     var that=this
//     console.log("here is resturant!!~!")
//     wx.request({
//       url: 'https://624w0n2786.yicp.fun/restaurant',
//       method: 'GET',
//       data: {
//           id=this.tagertId
//       } ,
//       success: function(res){
//           if(res.data.code===200){
//             that.setData({
//               restaurantMessage: res.data.data
//             })
            
//           }
//           console.log(this.restaurantMessage);
//       }
//     })
// }
})