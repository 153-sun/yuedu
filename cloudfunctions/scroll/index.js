//1.引入第三方ajax库，request-promise
var rp = require("request-promise");
//2.创建main函数
exports.main = async (event, context) => {
  var url = `https://api.zhuishushenqi.com/book/by-categories?gender=${event.gender}&type=${event.type}&major=${encodeURI(event.major)}&minor=&start=0&limit=20`;
  return rp(url).then(res => {
    return res
  }).catch(
    err => {
      console.log(err);
    }
  )
}