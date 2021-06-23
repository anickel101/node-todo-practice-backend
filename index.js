const db = require("./models/")

const cors = require("cors")

const express = require("express")
const app = express()
// const bodyParser = require("body-parser")
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

function success(res, payload) {
    return res.status(200).json(payload)
}

app.get("/todos", async (req, res, next) => {
    try {
        const todos = await db.Todo.find({})
        return success(res, todos)
    } catch (err) {
        next({status: 400, message: "failed to get todos"})
    }
})

app.post("/todos", async (req, res, next) => {
    try {
        const todo = await db.Todo.create(req.body)
        return success(res, todo)
    } catch (err) {
        next({status: 400, message: "failed to create todo"})
    }
})

app.put("/todos/:id", async (req, res, next) => {
    try {
        const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        return success(res, todo)
    } catch (err) {
        next({ status: 400, message: "failed to update todo"})
    }
})

app.delete("/todos/:id", async (req, res, next) => {
    try {
        await db.Todo.findByIdAndDelete(req.params.id)
        return success(res, "todo deleted")
    } catch (err) {
        next ({status: 400, message: "failed to delete todo"})
    }
})

app.use((err, req, res, next) => {
    return res.status(err.status || 400).jsion({
        status: err.status || 400,
        message: err.message || "there was an error processing the request"
    })
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

