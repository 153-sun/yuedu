// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    metast:[]
  },
  //搜索按钮
  onSearch: function (e) {
    var value = e.detail;
    wx.cloud.callFunction({
      name: "meta",
      data: { query: value }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        metast: obj.books
      })
    }).catch(err => {
      console.log(err);
    })
  },
  //图片
  myster: function (e) {
    //功能：用户点击按钮后跳转详情组件
    var id = e.target.dataset.id;
    var title = e.target.dataset.title;
    wx.navigateTo({
      url: '/pages/home/home?id=' + id + '&title=' + title,
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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