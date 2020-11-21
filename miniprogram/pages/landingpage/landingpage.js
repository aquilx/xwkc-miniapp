// miniprogram/pages/landingpage/landingpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    object_id :null,
    servicelist:[],
    latitude: 39.955967,
    longitude: 116.550452,
    currentIndex:0,
    indexMax:0,
    contacts:[
      "电话:18610556241",
      "微信:XXX"
    ],
    markers: [{
      id: 1,
      latitude: 39.955967,
      longitude: 116.550452,
      title: '京爱门诊',
      iconPath: '../../images/location.png'
    },{
      id: 2,
      latitude: 39.956793,
      longitude: 116.547255,
      title: '金泰丽富嘉园'
    },{ 
      id: 3,
      latitude: 39.954388,
      longitude: 116.547250,
      title: '东坝中街'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadServices();
  },

  loadServices: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'servicelist',
      data: {},
      success: res => {

        var dataArray = res.result.list
        this.data.indexMax = dataArray.length
        for(var i = 0; i < dataArray.length; i++) {
          var item = dataArray[i];
          var rate =  item.width / 1200 
          var imageH =  wx.getSystemInfoSync().windowWidth * rate  * 0.85 
          console.log("imageH %d", imageH)
          var itemHeight = (662 - 21 - 65 - imageH) / item.items.length
          item.cellHeight = itemHeight * 2 * 0.85;
          dataArray[i] = item;
        }
        this.setData({
          servicelist: dataArray
        });
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  bookingAction: function(e) {
    wx.makePhoneCall({
      phoneNumber: '18610556241',
    })
  },
  touchWx: function(e) {
    wx.copy
    wx.showToast({
      title: '已复制微信号',
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  leftAction: function(e){
    var current = this.data.currentIndex - 1
    if (current < 0) {
      current = this.data.indexMax - 1
    }
    this.setData({
      currentIndex: current
   });
   console.log("left %d", current)
  },
  rightAction: function(e){
    var current = this.data.currentIndex + 1
    if (current >= this.data.indexMax) {
      current = 0
    }
    this.setData({
       currentIndex: current
    });
    console.log("right %d", current)
  },
  scrollAction: function(e) {
    this.data.currentIndex = e.detail.current;
  },
  scorllToMap: function(e) {
    wx.pageScrollTo({
      scrollTop: 700
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
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