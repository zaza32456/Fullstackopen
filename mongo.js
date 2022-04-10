require("dotenv").config()
const mongoose = require("mongoose")
const Person = require("./models/person")

//查询修改DB数据库小程序

if (process.argv.length === 4) {
  const personName = process.argv[2]
  const personNumber = process.argv[3]

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