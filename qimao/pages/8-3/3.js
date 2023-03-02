const DEFAULT_PAGE = 0;
const app = getApp();
Page({
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    toView: `card_${DEFAULT_PAGE}`,
    list: ['../images/fish1.jpg','../images/fish2.jpg','../images/fish3.jpg']
  },
  toHome: function(){ 
    wx.redirectTo({ url: '../1/1', })
  },
  again: function(){ 
    wx.redirectTo({ url: '../8-1/1', })
  },
  onLoad: function (options) {
    var index = 1;
    var that = this;
    var timer = setInterval(function () {
      index = index + 1;   
      if (index == 3) {
        clearInterval(timer);
      };
      that.setData({
        showModal: true
      });
      that.currentView=that.currentView+1;
      that.setData({
        toView: `card_${that.currentView}`
      });
    }, 2000);
  },
  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },
  touchEnd(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    if (Math.abs(moveX) >= 150){
       wx.showToast({
                    title:'请点击按钮',
                    icon:'loading',
                    duration:1000
                  })
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  }
})