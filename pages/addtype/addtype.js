// pages/addtype/addtype.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeDesc:'',
    localbase64:'',
  },
  getTypeDesc:function(e){
    this.setData({
      typeDesc:e.detail.value
    })
  },
  chooseImg:function(){
    var that=this;
    wx.chooseImage({
      count: 1,
      success:function(res){
        console.log(res.tempFilePaths)
        let base64='data:image/jpg;base64,'+wx.getFileSystemManager().readFileSync(res.tempFilePaths[0],'base64')
        that.setData({
          localbase64:base64
        })
      }
    })
  },
  addTypeBtn:function(){
    wx.request({
      url: 'http://localhost:8080/type/saveType',
      method:'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      data:{
        uid:getApp().globalData.uid,
        t_desc:this.data.typeDesc,
        imgsrc:this.data.localbase64
      },
      success:function(res){
        if(res.data==true){
          wx.showToast({
            title: '添加类型成功',
            duration:2000,
            icon:'success'
          })
          wx.switchTab({
            url: '/pages/wardrobe/wardrobe',
          })
        }
        else{
          wx.showToast({
            title: '添加类型失败',
            duration:2000,
            icon:'none'
          })
        }
      },
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