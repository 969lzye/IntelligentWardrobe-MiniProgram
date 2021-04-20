// pages/addcombination/addcombination.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_desc:'',
    typeArr:[],
    clothesArr:[],
    currentType:'',
    currentIndex:'',
    combinationClothesArr:[]
  },

  getDesc:function(e){
  this.setData({
    c_desc:e.detail.value
  })
  },

  navClick:function(e){
    var that=this;
    var ctype;
    ctype=e.currentTarget.dataset.currenttype;
    this.setData({
      currentIndex:e.currentTarget.dataset.currentindex
    })
    this.setData({
      currentType:e.currentTarget.dataset.currenttype
    })
    wx.request({
      url: 'http://localhost:8080/clothes/findClothesByTypeid',
      method:'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      data:{
        uid:getApp().globalData.uid,
        typeid:ctype
      },
      success:function(res){
        that.setData({
          clothesArr:res.data
        })
      }
    })
  },

  clothesClick:function(e){
    console.log(e.currentTarget.dataset.currentclothes)
    var ccArr=this.data.combinationClothesArr;
    ccArr.push(e.currentTarget.dataset.currentclothes)
    this.setData({
      combinationClothesArr:ccArr
    })
  },

  combinationClothesClick:function(e){
    console.log(e.currentTarget.dataset.currentcombinationclothes)
    var index=(e.currentTarget.dataset.currentcombinationclothes)
    var ccArr=this.data.combinationClothesArr;
    ccArr.splice(index,1)
    this.setData({
      combinationClothesArr:ccArr
    })
  },

  addCombination:function(){
    var clist = JSON.stringify(this.data.combinationClothesArr);
    wx.request({
      url: 'http://localhost:8080/combination/addCombination',
      method:'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      data:{
        uid:getApp().globalData.uid,
        c_desc:this.data.c_desc,
        clothesArr:clist
      },
      success:function(res){
        wx.showToast({
          title: '成功添加',
          icon:'success',
          duration:2000
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://localhost:8080/type/getAllType',
      method:'POST',
      header:{'content-type': 'application/x-www-form-urlencoded'},
      data:{
        uid:getApp().globalData.uid
      },
      success:function(res){
        that.setData({
          typeArr:res.data,
          currentType:res.data[0].typeid
        })
        wx.request({
          url: 'http://localhost:8080/clothes/findClothesByTypeid',
          method:'POST',
          header:{'content-type': 'application/x-www-form-urlencoded'},
          data:{
            uid:getApp().globalData.uid,
            typeid:res.data[0].typeid
          },
          success:function(res){
            that.setData({
              clothesArr:res.data
            })
          }
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