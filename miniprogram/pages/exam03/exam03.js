// pages/exam01/exam01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str: [],
    list: []

  },
  myster: function (e) {
    //功能：用户点击按钮后跳转详情组件
    var id = e.target.dataset.id;
    var title = e.target.dataset.title;
    wx.navigateTo({
      url: '/pages/home/home?id=' + id + '&title=' + title,
    })
  },
  loadMore: function () {
    wx.showLoading({
      title: '加载中...',
    })
    //1.调用云函数move
    wx.cloud.callFunction({
      name: "move1",
      data: {
        gender: "male",
        major: "玄幻"

      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        str: obj.books
      });
      // console.log(obj.books);
      //1.接收返回的数据str，创建循环
      //2.
    }).catch(err => {
      console.log(err);
    })
    //女生
    wx.cloud.callFunction({
      name: "move1",
      data: {
        gender: "female",
        major: "古代言情"

      }
    }).then(set => {
      // console.log(set.result);
      var obj = JSON.parse(set.result);
      this.setData({
        list: obj.books
      });
      //  console.log(obj.books);
      //1.接收返回的数据str，创建循环
      wx.hideLoading();
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