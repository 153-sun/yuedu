// pages/exam02/exam02.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    male1: [],
    female1: [],
    display: ''
  },
  //男生点击分类跳转传值
  exment: function (e) {
    var name = e.target.dataset.name;
    var app = getApp();
    app.usermale = "male"
    app.username = name
    wx.navigateTo({
      url: '/pages/comnt/comnt'
    })
  },
  //女生点击分类跳转传值
  exment1: function (e) {
    var name = e.target.dataset.name;
    var app = getApp();
    app.usermale = "female"
    app.username = name
    wx.navigateTo({
      url: '/pages/comnt/comnt'
    })
  },
  loadMore: function () {
    wx.showLoading({
      title: '加载中...',
    })
    //添加遮罩层
    this.setData({
      display: "block"
    })
    //1.调用云函数move
    wx.cloud.callFunction({
      name: "details",
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        male1: obj.male,
        female1: obj.female
      });
      // console.log(obj)

      //1.接收返回的数据str，创建循环
      wx.hideLoading();
      //隐藏遮罩层
      this.setData({
        display: "none"
      })
    }).catch(err => {
      console.log(err);
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})