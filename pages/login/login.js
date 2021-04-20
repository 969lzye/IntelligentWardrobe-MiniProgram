// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },

  //获取手机输入框的数据
  input_phone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },

  //获取密码输入框的数据
  input_password:function(e){
    this.setData({
      password:e.detail.value
    })
  },

  //登录功能
  login:function(){
    console.log("登录参数："+this.data.phone+","+this.data.password)
    wx.request({
      url: 'http://localhost:8080/user/login',
      method:"POST",
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        phone:this.data.phone,
        password:this.data.password
      },
      success:function(res){
        if(res.data[0]!=null){
          wx.showToast({                                     
            title: '登录成功',
            icon:'success',
            duration:2000,
            success:function(){
              wx.switchTab({
                url: '/pages/homepage/homepage',
              })
            }
          })
          //获得当前登录用户的uid
          getApp().globalData.uid=res.data[0].uid
          getApp().globalData.user=res.data[0]
        }
        else{
          wx.showToast({
            title: '登录失败，手机号或密码错误',
            duration:2000,
            icon:'none'
          })
        }
      }
    })
  },

  //注册功能
  register:function(){
    wx.navigateTo({
      url: '/pages/register/register',
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