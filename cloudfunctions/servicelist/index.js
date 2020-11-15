// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
db.collection('ServiceCategory').aggregate()
  .lookup({
    from: 'ServiceItem',
    localField: '_id',
    foreignField: 'category',
    as: 'items',
  })
  .end()
  .then(res => console.log(res))
  .catch(err => console.error(err))
}