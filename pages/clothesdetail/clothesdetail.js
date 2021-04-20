
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clothesid:'null',
    clothesArr:[],
    clothesDesc:'',
    localbase64:'',
    typeArr:[],
    currentIndex:1,
    currentSeason:'春季',
    currentOccasion:'职业',
    season:["春季","夏季","秋季","冬季",],
    seasonIndex:0,
    occasion:["职业","休闲","社交","运动",],
    occasionIndex:0
  },
  //获取desc
  getDesc:function(e){
    this.setData({
      clothesDesc:e.detail.value
    })
  },
  //选择图片
  chooseImg:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success(data){
        console.log(data.tempFilePaths)
        let base64='data:image/jpg;base64,'+wx.getFileSystemManager().readFileSync(data.tempFilePaths[0],'base64')
        console.log(base64)
        that.setData({
          localbase64:base64
        })
        
      }
    })
  },
  //衣服类型选择
  chooseType:function(e){
    console.log(e.currentTarget.dataset.current)
    this.setData({
      currentIndex:e.currentTarget.dataset.current
    }) 
  },
  //季节选择
  seasonPickerChanger:function(e){
    this.setData({
      seasonIndex:e.detail.value,
      currentSeason:this.data.season[e.detail.value]
    })
  },
  //场合选择
  occasionPickerChanger:function(e){
    this.setData({
      occasionIndex:e.detail.value,
      currentOccasion:this.data.occasion[e.detail.value]
    })
  },
  //更新衣服信息
  addBtn:function(){
    wx.request({
      url: 'http://localhost:8080/clothes/updateClothesByClothesid',
      method:'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      data:{
        uid:2,
        c_desc:this.data.clothesDesc,
        typeid:this.data.currentIndex,
        imgsrc:this.data.localbase64,
        season:this.data.currentSeason,
        occasion:this.data.currentOccasion,
        clothesid:this.data.clothesid
      },
      success:function(res){
        if(res.data==true){
          wx.showToast({
            title: '更新成功',
            duration:2000,
            icon:'success'
          })
          wx.switchTab({
            url: '/pages/wardrobe/wardrobe',
          })
        }
        else{
          wx.showToast({
            title: '更新失败',
            duration:2000,
            icon:'none'
          })
        }
      }
    })
  },
  /**
   * 删除按钮的监听函数-删除衣服
   */
  deleteBtn:function(){
    wx.request({
      url: 'http://localhost:8080/clothes/deleteClothesByClothesid',
      method:'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      data:{
        clothesid:this.data.clothesid
      },
      success:function(res){
        if(res.data==true){
          wx.showToast({
            title: '删除成功',
            duration:2000,
            icon:'success'
          })
          wx.switchTab({
            url: '/pages/wardrobe/wardrobe',
          })
        }
        else{
          wx.showToast({
            title: '删除失败',
            duration:2000,
            icon:"none"
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
    //获取当前衣服id
    this.setData({
      clothesid:this.options.clothesid
    })
    //加载衣服类型
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
    //加载当前衣服id的信息
    wx.request({
      url: 'http://localhost:8080/clothes/findClothesByClothesid',
      method:'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      data:{
        clothesid:this.data.clothesid
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          clothesArr:res.data,
          localbase64:res.data[0].imgsrc,
          clothesDesc:res.data[0].c_desc,
          currentIndex:res.data[0].typeid,
          currentSeason:res.data[0].season,
          currentOccasion:res.data[0].occasion
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