var api = require('./api/api.js');
api.initPluginInfo();
module.exports = {
  getPluginInfo: api.getPluginInfo
}