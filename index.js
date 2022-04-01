const express = require("express")
const app = express()
const morgan = require("morgan") 
const cors = require("cors")
//cors需要放在数组前
app.use(cors())
app.use(express.static("build"))

let notes = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    {  
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    {  
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
]


morgan.format("phai", " [phai] 请求方式-:method 请求路径-:url 状态码-:status 文档长度-:res[content-length] 响应时长-:response-time ms 文档内容-:rescontent")
morgan.token("rescontent", function (req, res) { return JSON.stringify(req.body) })
app.use(morgan("phai"))

app.get("/api/persons", (req, res) => {
    res.json(notes)
})

app.get("/info", (req, res) => {
    const date = new Date()

    res.send(`<p>Phonebook has info for ${notes.length} people</p>
            <br>
            <p>${date}</p>`)
})

//返回对应URL资源
app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    //find返回对象，filter返回数组
    const note = notes.find(n => n.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }

})

//删除对应URL资源
app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(n => n.id !== id)
    res.status(204).end()
})

// 更改资源
app.use(express.json())

app.post("/api/persons", (req,res) => {
    //获得post方法发来的请求数据：body
    const body = req.body
    console.log(req.body)
    notes = notes.concat(body)
    res.json(body)
})

app.put("/api/persons/:id", (req, res) => {
  const body = req.body
  const id = Number(req.params.id)
  notes = notes.map(note => note.id === id
    ?body
    :note)
  res.json(body)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})