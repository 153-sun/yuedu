// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
var rp = require("request-promise");
exports.main = async (event, context) => {
  var url = `http://api.zhuishushenqi.com/cats/lv2/statistics`;
  return rp(url).then(res => {
    return res;
  }).catch(err => {
    return err;
  })
}
