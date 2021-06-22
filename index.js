const db = require("./models/")

const express = require("express")
const app = express()
// const bodyParser = require("body-parser")
const PORT = process.env.PORT || 8000

app.use(express.json())

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

