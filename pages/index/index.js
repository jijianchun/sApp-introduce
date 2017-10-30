//获取应用实例
var app = getApp();
var common = require('../../util/util');
var network = require('../../util/network');
Page({
  data: {
    imgUrls: [
      {"url":"../../images/index/ad_01.jpg"},
      {"url":"../../images/index/ad_02.jpg"}
    ],
    navs: [
       {"pic_url":"../../images/index/n1.png","title":"扫码即用"},
       {"pic_url": "../../images/index/n1.png","title": "更好的用户体验"},
       {"pic_url": "../../images/index/n1.png","title": "公众号关联" },
       {"pic_url": "../../images/index/n1.png","title": "完善的用户系统" },
       {"pic_url": "../../images/index/n1.png","title": "一键分享" },
       {"pic_url": "../../images/index/n1.png","title": "不占内存不卡顿" }
    ],
    brings: [
      { "pic_url": "../../images/index/n1.png", "title": "拉新获客","desc":"流量爆发，店铺不愁没有客人，您的店，一搜就有！" },
      { "pic_url": "../../images/index/n1.png", "title": "拉新获客", "desc": "流量爆发，店铺不愁没有客人，您的店，一搜就有！" },
      { "pic_url": "../../images/index/n1.png", "title": "拉新获客", "desc": "流量爆发，店铺不愁没有客人，您的店，一搜就有！" },
      { "pic_url": "../../images/index/n1.png", "title": "拉新获客", "desc": "流量爆发，店铺不愁没有客人，您的店，一搜就有！" },
      { "pic_url": "../../images/index/n1.png", "title": "拉新获客", "desc": "流量爆发，店铺不愁没有客人，您的店，一搜就有！" },
      { "pic_url": "../../images/index/n1.png", "title": "拉新获客", "desc": "流量爆发，店铺不愁没有客人，您的店，一搜就有！" }
    ],
    tpls:[
      "http://study.jameschun.cc/images/ad.jpg",
      "http://study.jameschun.cc/images/ad.jpg",
      "http://study.jameschun.cc/images/ad.jpg",
      "http://study.jameschun.cc/images/ad.jpg",
      "http://study.jameschun.cc/images/ad.jpg",
      "http://study.jameschun.cc/images/ad.jpg",
      "http://study.jameschun.cc/images/ad.jpg" 
    ],
    userInfo: {}
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  calling:function(){
    wx.makePhoneCall({
      phoneNumber: '18662168116', 
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  previewImage:function(e){
    var current = e.target.dataset.src;
    wx.previewImage({
      current:current,
      urls:this.data.tpls
    })
  },
  onLoad: function () {
    this.setData({
      current_location:'index'
    })
    var that = this;

    app.getUserInfo(function(userInfo){
      // 更新数据
      that.setData({
        userInfo:userInfo
      })
    });

    var nickname = wx.getStorageSync('nickname');
    var code = wx.getStorageSync('code');
    // ecstore登录
    wx.request({
      url: app.globalData.API_URL,
      method: 'POST',
      data: {
        app:'weixinxcx',
        ctl:'api_pam',
        act:'session',
        params:{
          code:code,
          nickname:nickname
        },
        sign:common.md5('weixinxcx','api_pam','session',code,nickname)
      },
      success: function(res){
        if(!wx.getStorageSync('session_id')){
          wx.setStorageSync('session_id',res.data);
        }
        
      }
    })

  }
})
