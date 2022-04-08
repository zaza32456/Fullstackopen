require("dotenv").config()
const express = require("express")
const app = express()
const Person = require("./models/person")
const morgan = require("morgan") 
const cors = require("cors")
//cors需要放在数组前
app.use(cors())
app.use(express.static("build"))

morgan.format("phai", " [phai] 请求方式-:method 请求路径-:url 状态码-:status 文档长度-:res[content-length] 响应时长-:response-time ms 文档内容-:rescontent")
morgan.token("rescontent", function (req, res) { return JSON.stringify(req.body) })
app.use(morgan("phai"))

app.get("/api/persons", (req, res) => {
    Person.find({}).then(people => {
      console.log(people.length)
      res.json(people)
    })
})

app.get("/info", (req, res) => {
    const date = new Date()

    res.send(`<p>Phonebook has info for ${people.length} people</p>
            <br>
            <p>${date}</p>`)
})

//返回对应URL资源
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    console.log("find id",id)
    Person.findById(id)
          .then(person => {
            res.json(person)
            })
          .catch((error) => {
              console.log(error.message)
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
app.delete("/api/persons/:id", (req, res) => {
/*     const id = Number(req.params.id)
    notes = notes.filter(n => n.id !== id)
    res.status(204).end() */
})

// 更改资源
app.use(express.json())

app.post("/api/persons", (req,res) => {
    const body = req.body
    
    const person = new Person({
        name: body.name,
        number: body.number
    })

    console.log("创建实例", person)

    person.save().then(savedPerson => {
        console.log("savedPerson = ", savedPerson)
        res.json(savedPerson)
    }
        )

    //获得post方法发来的请求数据：body
/*     const body = req.body
    console.log(req.body)
    notes = notes.concat(body)
    res.json(body) */
})

app.put("/api/persons/:id", (req, res) => {
/*   const body = req.body
  const id = Number(req.params.id)
  notes = notes.map(note => note.id === id
    ?body
    :note)
  res.json(body) */
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})