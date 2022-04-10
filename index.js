require("dotenv").config()
const express = require("express")
const app = express()
const Person = require("./models/person")
const morgan = require("morgan") 
const cors = require("cors")
const { response } = require("express")
const res = require("express/lib/response")
//cors需要放在数组前（没有使用数据库时）
app.use(cors())
app.use(express.static("build"))
app.use(express.json())

morgan.format("phai", " [phai] 请求方式-:method 请求路径-:url 状态码-:status 文档长度-:res[content-length] 响应时长-:response-time ms 文档内容-:rescontent")
morgan.token("rescontent", function (req, res) { return JSON.stringify(req.body) })
app.use(morgan("phai"))

app.get("/api/persons", (req, res) => {
    Person.find({}).then(people => {
      res.json(people)
    })
})

app.get("/info", (req, res) => {
    const date = new Date()
    //除了find有其他的方法嘛？
    Person.find({}).then(people => {
        res.send(`<p>Phonebook has info for ${people.length} people</p>
            <br>
            <p>${date}</p>`)
    })
    
})

//返回对应URL资源
app.get("/api/persons/:id", (req, res, next) => {
    //注意id类型，这里是字符串类型，不用转换数字
    const id = req.params.id
    console.log("find id",id)
    Person.findById(id)
            //！！需要查文档了解then里的参数是否保留字
          .then(person => {
            res.json(person)
            })
          .catch((error) => {
              console.log(error.message)
              next(error)
          })
    //find返回对象，filter返回数组
/*     const note = notes.find(n => n.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
 */
})

//删除对应URL资源
app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    Person.findByIdAndRemove(id)
        .then(result => {
            if (result) {
                res.status(204).end()
            }else {
                res.status(404).end()
            }
            
        })
        .catch(error => next(error))
/*     
    const id = Number(req.params.id)
    notes = notes.filter(n => n.id !== id)
    res.status(204).end() */
})

// 更改资源
app.post("/api/persons", (req,res) => {
    const body = req.body
    
    const person = new Person({
        name: body.name,
        number: body.number
    })

    console.log("创建实例", person)

    person.save().then(savedPerson => {
        console.log("savedPerson = ", savedPerson)
        //这里的json使用了toJSON格式化内容？
        res.json(savedPerson)
    }
        )

    //获得post方法发来的请求数据：body
/*     
    const body = req.body
    console.log(req.body)
    notes = notes.concat(body)
    res.json(body) */
})

app.put("/api/persons/:id", (req, res) => {
    const body = req.body
    const id = req.params.id

    //创建对象，而不是构造一个新的person实例
    const person = {
        name: body.name,
        number: body.number        
    }

    Person.findByIdAndUpdate(id, person, {new: true})
        .then(updatedPerson => {
            console.log("后端数据库已更新", updatedPerson)
            res.json(updatedPerson)
        })
        .catch(error => next(error))

/*   const body = req.body
  const id = Number(req.params.id)
  notes = notes.map(note => note.id === id
    ?body
    :note)
  res.json(body) */
})

//错误处理程序放在最后
const errorHandler = (error, request, response, next) => {
    console.log("发生错误。错误内容为:", error.message)
    if (error.name === "CastError" && error.kind === "ObejectId" ) {
        return res.status(400).send({error: "malformatted id"})
    }
    //最后next到哪？
    next (error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})