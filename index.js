const express = require("express")
const app = express()
const morgan = require("morgan") 

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// Exercises 3.7/3.8 (morgan要写在路由请求方法之前，实际执行在请求发生后)
morgan.format("phai", " [phai] 请求方式-:method 请求路径-:url 状态码-:status 文档长度-:res[content-length] 响应时长-:response-time ms 文档内容-:rescontent")
morgan.token("rescontent", function (req, res) { return JSON.stringify(req.body) })
app.use(morgan("phai"))

// Exercises 3.1
app.get("/api/persons", (req, res) => {
    res.json(notes)

    console.log("Exercises 3.1 ok!")
})


// Exercises 3.2
app.get("/info", (req, res) => {
    const date = new Date()

    res.send(`<p>Phonebook has info for ${notes.length} people</p>
            <br>
            <p>${date}</p>`)

    console.log("Exercises 3.2 ok!")
})

// Exercises 3.3
app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    //find返回对象，filter返回数组
    const note = notes.find(n => n.id === id)

    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
    
    console.log("Exercises 3.3 ok!")
})

// Exercises 3.4
app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(n => n.id !== id)
    res.status(204).end()
    
    console.log("Exercises 3.4 ok!")
})

// Exercises 3.5/3.6
app.use(express.json())

app.post("/api/persons", (req,res) => {
    const body = req.body
    console.log(req.body)

    if (!body.name || !body.number) {
        return res.status(400).json({
            error:"Please check the name and number"
        })
    }else if (notes.find(n => n.name === body.name)){
        return res.status(400).json({
            error:"Name must be unique"
        })
    }else {
        let note = {
            id: Math.floor(Math.random() * 10**10 + 1),
            name: body.name,
            number: body.number
        }
    
        notes = notes.concat(note)

    }

    res.json(notes)

})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})