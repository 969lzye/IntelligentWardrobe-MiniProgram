// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },

  //获取手机输入框的值
  getPhone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

  //获取输入的密码
  getPassword:function(e){
    this.setData({
      password:e.detail.value
    })
  },

  //注册功能
  register:function(){
    wx.request({
      url: 'http://localhost:8080/user/register',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        phone:this.data.phone,
        password:this.data.password
      },
      success:function(res){
        if(res.data==true){
          wx.showToast({
            title: '注册成功',
            duration:2000,
            icon:'success'
          })
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
        else{
          wx.showToast({
            title: '注册失败',
            duration:2000,
            icon:'none'
          })
        }
      },
    })
  },

  //跳转到登录页面
  login:function(){
    wx.navigateTo({
      url: '/pages/login/login',
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