// pages/wardrobe/wardrobe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    combinationArr:[],
  },
  
  //点击左侧导航栏获取当前类型对应的衣服
  navClick:function(e){
    this.setData({
      currentType:e.target.dataset.currenttype,
      combinationArr:[]
    }) 
    this.setData({
      currentIndex:this.data.currentType-this.data.firstType
    })
    this.setData({
      currentDesc:this.data.typeArr[this.data.currentIndex].t_desc,
      combinationArr:[]
    })
    var that=this
    //根据typeid请求对应的衣服
    wx.request({
      url: 'http://localhost:8080/clothes/findClothesByTypeid',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        uid:getApp().globalData.uid,
        typeid:this.data.currentType
      },
      header:{'content-type': 'application/x-www-form-urlencoded'},
      success:function(res){
        that.setData({
          clothesArr:res.data,
        })
      }
    })
  },
  //长按导航栏进行进入类型的编辑页
  navPress:function(){
    var that=this;
    wx.navigateTo({
      url: '/pages/typedetail/typedetail?typeid='+that.data.currentType,
    })
  },

  //点击‘组合’获取当前用户的所有组合
  combinationClick:function(e){
    var that=this
    this.setData({
      currentType:e.target.dataset.currenttype,
      clothesArr:[],
      currentDesc:'组合',
    })
    wx.request({
      url: 'http://localhost:8080/combination/findCombinationByUid',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        uid:getApp().globalData.uid
      },
      success:function(res){
        that.setData({
          combinationArr:res.data
        })
      }
    })

  },
  //添加组合
  addCombination:function(){
    wx.navigateTo({
      url: '/pages/addcombination/addcombination',
    })
  },

//点击具体组合进入编辑页面
editcombination:function(e){
  console.log(e.currentTarget.dataset.currentcombination)
  wx.navigateTo({
    url: '/pages/combinationdetail/combinationdetail?combinationid='+e.currentTarget.dataset.currentcombination,
  })
},
  //跳转添加衣服类型页面
  addType:function(){
    wx.navigateTo({
      url: '/pages/addtype/addtype',
    })
  },

  //跳转到添加衣服页面
  addClothes:function(){
    wx.navigateTo({
      url: '/pages/addclothes/addclothes',
    })
  },

  //跳转到衣服详情页面
  editclothes:function(e){
    wx.navigateTo({
      url: '/pages/clothesdetail/clothesdetail?clothesid='+e.currentTarget.dataset.currentclothes,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    //请求衣服种类
    wx.request({ 
      url: 'http://localhost:8080/type/getAllType',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        uid:getApp().globalData.uid
      },
      success:function(res){
        if(res.data.length>0){
          that.setData({
            typeArr:res.data,
            firstType:res.data[0].typeid,
            currentType:res.data[0].typeid,
            currentDesc:res.data[0].t_desc
          })
        }
        else{
          that.setData({
            typeArr:[],
            firstType:'',
            currentType:''
          })
        }
        
         //默认请求第一个type的衣服
         if(res.data.length>0){
          wx.request({
            url: 'http://localhost:8080/clothes/findClothesByTypeid',
            method:'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data:{
              uid:getApp().globalData.uid,
              typeid:res.data[0].typeid
            },
            header:{'content-type': 'application/x-www-form-urlencoded'},
            success:function(res){
                that.setData({
                  clothesArr:res.data,
                })      
            }
          })
         }
         else{
           that.setData({
             clothesArr:[]
           })
         }
         
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