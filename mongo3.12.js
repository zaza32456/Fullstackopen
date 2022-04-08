require("dotenv").config()
const mongoose = require("mongoose")
/* 
if (process.argv.length < 3) {
  console.log("Please provide the password")
  process.exit(1)
}else if(process.argv.length !== 3 && 5) {
  console.log(process.argv.length)
  console.log("Please provide only name and number")
}

const password = process.argv[2]

const url = `mongodb+srv://meowmini:${password}@cluster0.7zvux.mongodb.net/phoneboook-app?retryWrites=true&w=majority`

 */

const url = process.env.MONGODB_URI

mongoose.connect(url)

//定义数据模式
const personSchema = new mongoose.Schema({
  name: String,
  number: String,

})

//定义单个Preson模型
const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 4) {
  const personName = process.argv[2]
  const personNumber = process.argv[3]

  //创建单个实例对象
  const person = new Person({
    name: personName,
    number:personNumber
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook `)
    mongoose.connection.close()
  })
}else if (process.argv.length === 2) {
  console.log("phonebook:")
  Person.find({}).then(result => {
    result.forEach(n =>{ 
      console.log(n.name, n.number)
    })
    //注意和数据库的连接断开的位置!!
    mongoose.connection.close()
  })

}