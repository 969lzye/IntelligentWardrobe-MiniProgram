// pages/account/account.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    localbase64:''
  },

  //获取用户上传的头像
  getProfile:function(){
    var that=this;
    wx.chooseImage({
      count: 1,
      success:function(res){
        console.log(res.tempFilePaths)
        let base64='data:image/jpg;base64,'+wx.getFileSystemManager().readFileSync(res.tempFilePaths[0],'base64')
        wx.request({
          url: 'http://localhost:8080/user/updateUser',
          method:'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          data:{
            uid:getApp().globalData.uid,
            column:'profile',
            value:base64
          },
          success:function(res){
            if(res.data==true){
              wx.showToast({
                title: '更新成功',
                duration:2000,
                icon:'succcess'
              })
              that.onShow()
            }
            else{
              wx.showToast({
              title: '更新失败',
              duration:2000
              })
            }
          }
        }
        )}
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