//part3-C
//先创建一个Mongoose的实践应用

const mongoose = require("mongoose")

//要求在命令行启动行时输入明文密码作为参数
if ( process.argv.length<3 ) {
  console.log("Please provide the password as an argument: node mongo.js <password>")
  //非0表示异常退出
  process.exit(1)
}

//通过访问命令行的参数第获得密码
const password = process.argv[2]

//可以直接在这里指定数据库名字，当数据库不存在灰树咀创建
const url = `mongodb+srv://meowmini:${password}@cluster0.7zvux.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)



//定义数据模式
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

//定义Note模型
const Note = mongoose.model("Note", noteSchema)

/* 创建和保存对象

//使用构造函数创建新的实例note
const note = new Note({
  content: "HTML is easy",
  date: new Date(),
  important: true,
})

note.save().then(result => {
  console.log("note saved!")
  mongoose.connection.close()
}
)

*/

//从数据库中获取对象

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

