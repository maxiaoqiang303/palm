# OCR小程序插件文档

## 介绍

git地址：[http://git-ma.paic.com.cn/ptjcfw/miniprogram-plugin.git](http://git-ma.paic.com.cn/ptjcfw/miniprogram-plugin.git)

1. OCR插件是小程序内*身份证拍照*、*银行卡拍照*等需要拍照功能的插件。用微信的组件`<camera>+<cover-view>+<cover-image>`组合实现
2. OCR插件依赖的微信基础库版本通过 `ocr.getPluginInfo` 方法获取

## 引用
* 1 `app.json`

在小程序`app.json`中配置插件，`version`字段可以选择适合当前项目的版本号

可通过ocr.getPluginInfo方法获取当前插件版本号

```javascript
{
  "pages": [
    "pages/index/index"
  ],
  "plugins": {
    "myPlugin": {
      "version": "dev",
      "provider": "wxce81573db370c43d"
    }
  }
}
```

* 2 `index.json`

在页面`index.json`文件中，定义组件标签名及路径

```javascript
{
  "usingComponents": {
    "ocr": "plugin://myPlugin/ocr"
  }
}
```

* 3 `index.wxml`

在`idnex.wxml`中使用组件标签，绑定事件函数，传递参数

**传递参数**

|参数|类型|是否必填|默认值|备注|
|:---:|:---:|:-------:|:-----:|:----:|
|showCamera|Boolean|否|false|-|
|scanType|String|否|-|IDFront表示身份证国徽面，IDBack表示身份证人像面，默认普通拍照|
|quality|String|否|normal|成像质量，值为high, normal, low|


```html
<ocr showCamera='{{showCamera}}' scanType='{{scanType}}' quality='{{quality}}' 
bind:plugTakePhoto='takePhoto' 
bind:plugTakePhotoError='takePhotoError' 
bind:plugCancelCamera='cancelCamera' />
```

**绑定回调函数**
	
|回调函数|回调参数|说明|
|:---:|:---:|:----:|
|plugTakePhoto|OBJECT|拍照成功的回调函数	res.detail = { tempImagePath }|
|plugTakePhotoError|{}|拍照失败的回调函数|
|plugCancelCamera|{}|关闭拍照|

```javascript
takePhoto(res) {
    let scanTypekey = this.data.scanType + '_src';
    this.data[scanTypekey] = res.detail.tempImagePath;
    this.setData(this.data);
    this.cancelCamera();
  }
```

* 4 `index.js`

可以在`idnex.js`中调用插件API

```javascript
let ocr = requirePlugin("myPlugin");
console.log(ocr.getPluginInfo());
```

## 插件API

### ocr.getPluginInfo()

```
let pluginInfo = ocr.getPluginInfo();
let name = pluginInfo.name; // 插件名
let version = pluginInfo.version; // 当前插件版本
let date = pluginInfo.date; // 当前版本开发时间
let libVersion = pluginInfo.libVersion; // 支持最低基础库版本
```