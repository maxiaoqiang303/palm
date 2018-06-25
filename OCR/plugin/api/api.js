let pluginInfo = null;

function getPluginInfo() {
  return pluginInfo;
}

function setPluginInfo(val) {
  pluginInfo = val 
}
function initPluginInfo(){
  pluginInfo = {
    name: 'ocr',
    version: '1.0.0',
    date: '2018-06-25',
    libVersion: '2.1.0'
  }
}
function show(){

}

function takePhoto(obj = {},suc,fail) {
  let that = this;
  const ctx = wx.createCameraContext()
  ctx.takePhoto({
    quality: obj.quality || 'normal',
    success: function (res) {
      return suc && suc(res);
    }, 
    fail(){
      return fail && fail()
    }
  })
}

module.exports = {
  takePhoto,
  getPluginInfo,
  setPluginInfo,
  initPluginInfo
}