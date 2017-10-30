//app.js
App({
  onLaunch: function () {
    
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{

      //调用登录接口
      wx.login({
        success: function (re) {

          if (re.code) {
            //发起网络请求

             wx.setStorageSync('code',re.code);

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }


          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              wx.setStorageSync('nickname',that.globalData.userInfo.nickName);
              // console.log(res);
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  
  globalData:{   API_URL:"http://192.168.231.132/ecstore-xcx/index.php/openapi/weixinxcx.callback.gateway/go_to", 
    userInfo:null,
    current_location:"index"
  }
})