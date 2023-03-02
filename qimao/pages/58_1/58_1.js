// pages/58_1/58_1.js
const DEFAULT_PAGE = 0;
const app = getApp();
Page({
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    toView: `card_${DEFAULT_PAGE}`,
    list: ['../images/订单0058.jpg','../images/gohome.jpg','../images/choosehouseblank.jpg']
  },


  changeYL: function () {
    this.setData({
      showModal: true
    })
  },
  wrongHouse: function () {
    wx.redirectTo({ url: '../58_2/58_2', })
  },
  correctHouse: function () {
    wx.redirectTo({ url: '../58_3/58_3', })
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
    this.setData({
      showHint: false
    });
  },
  toMenu: function(){ 
    wx.redirectTo({ url: '../1/1', })
  },
  again: function () {
    wx.redirectTo({ url: '../58_1/58_1', })
    this.setData({
      showHouse: false
    });
    this.setData({
      showModal: false
    });
    this.setData({
      showHint: false
    });
    wx.showToast({
      title:'右滑翻页',
      icon:'sucess',
      duration:1000
    });
  },
  onLoad: function (options) {
    var index = 1;
    var that = this;
    if(app.data.musicon==true){
      that.setData({
        musicbtn: true,
        musicbtn2:false
      });
    }
    if(app.data.musicon==false){
      that.setData({
        musicbtn2: true,
        musicbtn:false
      });
    }
    var timer = setInterval(function () {

      index = index + 1;   
      if (index == 3) {
        clearInterval(timer);
        that.setData({
          showHouse: true
        });
      };
 
      that.currentView=that.currentView+1;
      that.setData({
        toView: `card_${that.currentView}`
      });

    }, 2000);
  },
  hintShow: function () {
    this.setData({
      showHint: true
    });
  },
  audioPause: function () {
    var app = getApp();
    app.AppMusic.pause();
    this.setData({
      musicbtn2: true,
      musicbtn:false
    });
    app.data.musicon = false;
  },
  audioPlay: function () {
    var app = getApp();
    app.AppMusic.play();
    app.data.musicon = true;
    this.setData({
      musicbtn: true,
      musicbtn2:false
    });
  },
  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },
  touchEnd(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const maxPage = this.data.list.length - 1;
    if (Math.abs(moveX) >= 150){
      if (moveX < 0) {
        if(this.currentView==maxPage){
          wx.showToast({
            title:'请点击房子',
            icon:'loading',
            duration:1000
          })
        } else{
          this.setData({
            showHouse: true
          });
          this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
        }
        
      } else{
        wx.showToast({
          title:'剧情不可回放',
          icon:'loading',
          duration:1000
        })
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  }
  
})
