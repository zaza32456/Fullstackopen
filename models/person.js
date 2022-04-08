const mongoose = require("mongoose")
const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose.connect(url)
  .then(result => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

//创建personSchema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//格式化toJSON返回的数据，去除_id,__v,增加将_id字符串化的id
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//导出模块
module.exports = mongoose.model("Person", personSchema)