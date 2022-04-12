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
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: [8, "The phone number needs 8 digits or more"],
    //验证号码
    validate: {
      validator: value => {
        return /^\d{2,3}-?\d{0,}$/.test(value)
      },
      message:props => `${props.value} is not a vaild phone number!`
    }
  }
})

//格式化toJSON返回的数据，去除_id,__v,增加将_id字符串化的id
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//3.20* 验证号码
/*
Person.schema.path("number").validate(value => {
  return /^\d{2,3}-?\d{4,}$/.test(value)
}, "Invalid number")
*/
//导出模块
module.exports = mongoose.model("Person", personSchema)