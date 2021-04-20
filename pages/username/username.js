// pages/username/username.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    username:''
  },

  //获取修改后的用户名
  getUsername:function(e){
    this.setData({
      username:e.detail.value
    })
  },

  //更新账户信息
  updateUser:function(){
    var that=this
    wx.request({
      url: 'http://localhost:8080/user/updateUser',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        uid:getApp().globalData.uid,
        column:'username',
        value:this.data.username
      },
      success:function(res){
        if(res.data==true){
          wx.showToast({
            title: '更新成功',
            duration:2000,
            icon:'succcess'
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      }
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
    var that =this
    wx.request({
      url: 'http://localhost:8080/user/findUserByPhone',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        phone:getApp().globalData.user.phone
      },
      success:function(res){
        getApp().globalData.user=res.data[0]
      }
    })
    this.setData({
      user:getApp().globalData.user
    })
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