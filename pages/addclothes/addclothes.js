// pages/addclothes/addclothes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clothesDesc:'',
    localbase64:'',
    typeArr:[],
    currentIndex:'null',
    currentSeason:'春季',
    currentOccasion:'职业',
    season:["春季","夏季","秋季","冬季",],
    seasonIndex:0,
    occasion:["职业","休闲","社交","运动",],
    occasionIndex:0
  },
  getDesc:function(e){
    this.setData({
      clothesDesc:e.detail.value
    })
  },
  chooseImg:function(){
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success(data){
        console.log(data.tempFilePaths)
        let base64='data:image/jpg;base64,'+wx.getFileSystemManager().readFileSync(data.tempFilePaths[0],'base64')
        that.setData({
          localbase64:base64
        })
        
      }
    })
  },
  chooseType:function(e){
    console.log(e.currentTarget.dataset.current)
    this.setData({
      currentIndex:e.currentTarget.dataset.current
    })
    
    
  },
  seasonPickerChanger:function(e){
    this.setData({
      seasonIndex:e.detail.value,
      currentSeason:this.data.season[e.detail.value]
    })
  },
  occasionPickerChanger:function(e){
    this.setData({
      occasionIndex:e.detail.value,
      currentOccasion:this.data.occasion[e.detail.value]
    })
  },
  addBtn:function(){
    wx.request({
      url: 'http://localhost:8080/clothes/addClothes',
      method:'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      data:{
        uid:getApp().globalData.uid,
        desc:this.data.clothesDesc,
        typeid:this.data.currentIndex,
        imgsrc:this.data.localbase64,
        season:this.data.currentSeason,
        occasion:this.data.currentOccasion
      },
      success:function(res){
        if(res.data==true){
          wx.showToast({
            title: '添加成功',
            duration:2000,
            icon:'success'
          })
          wx.switchTab({
            url: '/pages/wardrobe/wardrobe',
          })
        }
        else{
          wx.showToast({
            title: '添加失败',
            duration:2000,
            icon:'none'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({ 
      url: 'http://localhost:8080/type/getAllType',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        uid:getApp().globalData.uid
      },
      success:function(res){
        that.setData({
          typeArr:res.data
        })
      }
    })
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