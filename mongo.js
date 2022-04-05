const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("Please provide the password")
  process.exit(1)
}else if(process.argv.length !== 3 && 5) {
  console.log("Please provide only name and number")
}

const password = process.argv[2]

const url = `mongodb+srv://meowmini:${password}@cluster0.7zvux.mongodb.net/phoneboook-app?retryWrites=true&w=majority`

mongoose.connect(url)

//定义数据模式
const presonSchema = new mongoose.Schema({
  name: String,
  number: Number,
  id: Number
})

//定义单个Note模型
const Preson = mongoose.model("Preson", presonSchema)

if (process.argv.length === 5) {
  const presonName = process.argv[3]
  const presonNumber = process.argv[4]

  //创建单个实例对象
  const preson = new Preson({
    name: presonName,
    number:presonNumber,
    id: Math.floor(Math.random() * 10**10 + 1)
  })

  preson.save().then(result => {
    console.log(`added ${preson.name} number ${preson.number} to phonebook `)
    mongoose.connection.close()
  })
}else if (process.argv.length === 3) {
  console.log("phonebook:")
  Preson.find({}).then(result => {
    result.forEach(n =>{ 
      console.log(n.name, n.number)
    })
    //注意和数据库的连接断开的位置!!
    mongoose.connection.close()
  })

}