var amapFile = require('../../libs/amap-wx.js');
 
Page({
  data: {
    weather: {},
    occasion:["职业","休闲","社交","运动",],
    currentIndex:0,
    combinationArr:[]
  },
  gotoAdd:function(){
    wx.navigateTo({
      url: '../addclothes/addclothes',
    })
  },

  washClothes:function(){
    wx.navigateTo({
      url: '/pages/washclothes/washclothes',
    })
  },
  //点击导航栏
  navClick:function(e){
    console.log(e.currentTarget.dataset.currentindex)
    this.setData({
      currentIndex:e.currentTarget.dataset.currentindex
    })
  },

  onLoad: function () {
    var that = this;
    //获取用户位置信息、天气信息
    var myAmapFun = new amapFile.AMapWX({ key: '9e2029cbc3136635b316b23eb3904e52' });
    myAmapFun.getWeather({
      success: function (data) {
        that.setData({
          weather: data
        });
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
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
  }
})