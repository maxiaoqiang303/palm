let ocr = requirePlugin("myPlugin");
console.log(ocr.getPluginInfo());
Page({
  /**
   * 页面的初始数据
   */
  data: {
    IDFront_src: '',
    IDBack_src: '',
    bankFront_src: '',
    bankBack_src: '',
    showCamera: false,
    quality: 'normal',
    scanType: ''
  },

  onLoad() {
    
  },

  
  /**
   * 点击拍照
   */
  takePhoto(res) {
    this.takePhotoSuccess(res);
  },
  takePhotoSuccess(res) {
    let scanTypekey = this.data.scanType + '_src';
    this.data[scanTypekey] = res.detail.tempImagePath;
    this.setData(this.data);
    this.cancelCamera();
  },
  takePhotoError(e) {
    this.cancelCamera();
  },

  /**
   * 扫描身份证正面
   */
  scanIDFront() {
    this.setData({
      showCamera: true,
      scanType: 'IDFront',
      IDFront_src: ''
    })

  },

  /**
   * 扫描身份证反面
   */
  scanIDBack() {
    this.setData({
      showCamera: true,
      scanType: 'IDBack',
      IDBack_src: ''
    })
  },

  //扫描银行卡反面
  scanBankBack() {
    this.setData({
      showCamera: true,
      scanType: 'bankBack',
      bankBack_src: ''
    })
  },

  //扫描银行卡正面
  scanBankFront() {
    this.setData({
      showCamera: true,
      scanType: 'bankFront',
      bankFront_src: ''
    })
  },

  /**
   * 隐藏相机
   */
  cancelCamera() {
    this.setData({
      showCamera: false
    })
  }
})