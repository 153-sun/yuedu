// pages/home/home.js
//初始化默认云数据库
const select=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabse:0,
    detail:{},
    title:0,
    metast:[],
    motto:"加入书架",
    disabled:false,
    display: ''
  },
  btase: function (e) {
    //相关推荐
    //功能：用户点击按钮后跳转详情组件
    var id = e.target.dataset.id;
    var title = e.target.dataset.title;
    wx.navigateTo({
      url: '/pages/home/home?id=' + id + '&title=' + title,
    })
  },
  //加入书架
  shu_ru:function(e){   
    var title=e.target.dataset.title;
    var author=e.target.dataset.author;
    var cover = e.target.dataset.cover;
    var id = e.target.dataset.id;
    //防止多次点击按钮
    this.setData({disabled:true})
    //查询数据库中是否有此数据
    select.collection("xiaoshuo").where({
        id:id
    }).get().then(res=>{
      //通过返回值判断 若无数据添加数据
      if(res.data.length<1){
        //添加数据
        wx.showLoading({
          title: '加载中...',
        })
        select.collection("xiaoshuo").add({
          data:{
            title:title,
            author:author,
            cover:cover,
               id:id
          },
          success:(res)=>{
           // console.log(res)
            this.setData({
              motto: "已加入书架"
            })
            wx.hideLoading();
          },
          
          fail:(err)=>{
            console.log(err)
          }
        });
      }else{
        this.setData({
          motto:"已加入书架"
        })
      }
     this.setData({disabled:false}) 
    }).catch(err=>{
      console.log(err);
    })

  },
  // jumpup:function(){
  //   var id = this.data.tabse;
  //  // console.log(id)
  //   wx.showLoading({
  //     title: '加载中...',
  //   })
  //   wx.cloud.callFunction({
  //     name: "mymove",
  //     data: { id: id }
  //   }).then(res => {
  //     var obj = JSON.parse(res.result);
  //     //console.log(obj)
  //     this.setData({
  //       detail: obj
  //     })
  //     wx.hideLoading();
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // },
  loadMore(){
    var id=this.data.tabse;
    //获得数据查询是否已加入书架
    select.collection("xiaoshuo").where({
        id:id
    }).get().then(res=>{
      if(res.data.length>0){
        this.setData({
          motto: "已加入书架"
        })
      }
    }).catch(err=>{
      console.log(err);
    })
    //获得数据加载页面
    wx.showLoading({
      title: '加载中...',
    })
    //添加遮罩层
    this.setData({
      display: "block"
    })
    wx.cloud.callFunction({
      name:"mymove",
      data:{id:id}
    }).then(res=>{
      var obj=JSON.parse(res.result);
     // console.log(obj)
      this.setData({
        detail:obj
      })
    }).catch(err=>{
      console.log(err);
    })
    //相关推荐
    var title=this.data.title.slice(0,2);
    wx.cloud.callFunction({
      name: "meta",
      data: { query: title }
    }).then(res => {
      var obj = JSON.parse(res.result);
      this.setData({
        metast: obj.books.slice(6, 9)
      })
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
    this.setData({
      tabse:options.id,
      title:options.title
    });
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