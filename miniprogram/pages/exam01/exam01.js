// pages/exam01/exam01.js
//初始化默认云数据库
const select = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shjlete:[],
    housilp:'none',
    id:[]
  },
  //删除按钮
  chedx:function(e){
    var id = this.data.id;
   if(id.length>0){
     id.forEach(function(item,index){
       select.collection("xiaoshuo").doc(item).remove().then(res => {
       }).catch(err => {
         console.log(err)
       }) 
     })
   }
    this.loadMore();
    this.setData({
      housilp: "none"
    })
  },
  //复选框
  checkboxChange:function(e) { 
    var id = [];
    var aaa = e.detail.value;
    var id = id.concat(aaa)
   //console.log(id)  
   this.setData({
     id:id
   })   
  },
  shj_defale:function(){
    wx.switchTab({
      url: '/pages/exam02/exam02',
    })
  },
  //长按事件
  handle:function(e){
    this.setData({
      housilp:"block"
    })
           
  },
  //取消事件
  housp: function () {
    this.setData({
      housilp:"none"
    })
  }, 
  loadMore:function(){
    //添加遮罩层
    this.setData({
      display: "block"
    })
    select.collection("xiaoshuo").get().then(res=>{
      //console.log(res.data)
      this.setData({
        shjlete: res.data
      });
      //隐藏遮罩层
      this.setData({
        display: "none"
      })
    }).catch(err=>{
      console.log(err);
    })
  },
  long:function(){
    select.collection("xiaoshuo").get().then(res => {
      //console.log(res.data)
      this.setData({
        shjlete: res.data
      });
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
    this.long()
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
    console.log(5)
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