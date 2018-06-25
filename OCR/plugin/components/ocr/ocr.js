// components/com-camera/com-camera.js
var camera = require('../../api/api.js');
/**
 * 组件事件传递
 * onTap: function(){
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showCamera: {
      type: Boolean,
      value: false
    },
    scanType: String,
    quality: {
      type: String,
      value: 'normal'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    windowWidth: 375,
    windowHeight: 603,
    animationData: {

    },
    cover_horn: ['lt','lb','rt','rb'] 
  },

  attached() {
    this._getSystemInfo();
    // this.setComponent();

    var lt = wx.createAnimation().step().export();
    var rt = wx.createAnimation().rotate(90).step().export();
    var rb = wx.createAnimation().rotate(180).step().export();
    var lb = wx.createAnimation().rotate(270).step().export();

    this.setData({
      animationData: {
        lt,rt,lb,rb
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _getSystemInfo() {
      let systemInfo = wx.getSystemInfoSync();
      this.setData({
        windowHeight: systemInfo.windowHeight,
        windowWidth: systemInfo.windowWidth
      })
    },
    
    _takePhoto() {
      let that = this;
      camera.takePhoto({
        quality: that.data.quality
      },function(res){
        that.triggerEvent('plugTakePhoto', res, {});
      },function(){
        that._takePhotoError();
      })
    },

    _takePhotoError() {
      this.triggerEvent('plugTakePhotoError', {}, {});
    },

    _cancelCamera() {
      this.triggerEvent('plugCancelCamera', {}, {});
    }
  }
})
