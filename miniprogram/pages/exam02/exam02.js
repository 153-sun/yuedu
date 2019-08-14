// pages/exam02/exam02.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:[],
    metea:[],
    sester:[],
    display: ''
  },
  myster: function (e) {
    //功能：用户点击按钮后跳转详情组件
    var id = e.target.dataset.id;
    var title = e.target.dataset.title;
    wx.navigateTo({
      url: '/pages/home/home?id=' + id + '&title=' + title,
    })
  },
  //完结
  phstreg:function(){
    var app = getApp();
    app.usermale = "male"
    app.username = "玄幻"
    app.usertype="over"
    wx.navigateTo({
      url: '/pages/freate/freate',
    })
  },
  //新书
  phxin:function () {
    var app = getApp();
    app.usermale = "female"
    app.username = "古代言情"
    app.usertype = "over"
    wx.navigateTo({
      url: '/pages/freate/freate',
    })
  },
  //火爆
  phsearte: function () {
    var app = getApp();
    app.usermale = "male"
    app.username = "都市"
    app.usertype = "hot"
    wx.navigateTo({
      url: '/pages/freate/freate',
    })
  },
  //搜索
  onSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  loadMore: function () {
    var app = getApp();
    var name = app.username;
    var male = app.usermale;
    var type = app.usertype;
    wx.showLoading({
      title: '加载中...',
    })
    //添加遮罩层
    this.setData({
      display: "block"
    })
    //1.调用云函数scroll
    wx.cloud.callFunction({
      name: "scroll",
      data: {
        gender: "male",
        major: "玄幻",
        type: "over"
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        str: obj.books
      });
      //console.log(obj.books);
      //1.接收返回的数据str，创建循环
    }).catch(err => {
      console.log(err);
    })
    wx.cloud.callFunction({
      name: "scroll",
      data: {
        gender: "female",
        major: "古代言情",
        type: "over"
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        metea: obj.books
      });
     // console.log(obj.books);
      //1.接收返回的数据str，创建循环
    }).catch(err => {
      console.log(err);
    })
    wx.cloud.callFunction({
      name: "scroll",
      data: {
        gender: "male",
        major: "都市",
        type: "hot"
      }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        sester: obj.books
      });
      // console.log(obj.books);
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