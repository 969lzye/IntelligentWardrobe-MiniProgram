// pages/washclothes/washclothes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstType:'0',
    currentType:'0',
    currentIndex:'0',
    currentDesc:'',
    dirtyClothesArr:[],
    typeArr:[],
    clothesArr:[],
  },
  typeClick:function(e){
    this.setData({
      currentType:e.currentTarget.dataset.currenttype
    })
    this.setData({
      currentIndex:this.data.currentType-this.data.firstType
    })
    //根据当前typeid请求衣服
    var that=this
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
  cleanClothesClick:function(e){
    var clothesid=e.currentTarget.dataset.clothesid
    var that=this;
    wx.request({
      url: 'http://localhost:8080/clothes/updateClothesStatus',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        clothesid:e.currentTarget.dataset.clothesid,
        status:'false'
      },
      success:function(res){
        console.log(res);
      }
    })
    that.onLoad(this.data.pageOption);
  },
  dirtyClothesClick:function(e){
    var clothesid=e.currentTarget.dataset.clothesid
    console.log(clothesid);
    var that=this;
    wx.request({
      url: 'http://localhost:8080/clothes/updateClothesStatus',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        clothesid:e.currentTarget.dataset.clothesid,
        status:'true'
      },
      success:function(res){
        console.log(res);
      }
    })
    that.onLoad(this.data.pageOption);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    that.setData({
      pageOption: options
    });
    //加载未清洗的衣服
    wx.request({
      url: 'http://localhost:8080/clothes/findDirtyClothes',
      method:'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        uid:getApp().globalData.uid
      },
      success:function(res){
        that.setData({
          dirtyClothesArr:res.data
        })
      }
    })
    
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