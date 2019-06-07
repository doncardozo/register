/* eslint-disable no-console */

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const serveStatic = require("serve-static")
const config = require("./config/app")
const app = express()
const personRoutes = require("./routes/person")
var PORT = process.env.PORT || 5000

mongoose.Promise = global.Promise
mongoose.connect(config.db, {useNewUrlParser: true}).then(
    () => {console.log("database is connected")},
    err => {console.log(err)}
)

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(serveStatic(__dirname + "/dist"));

app.use('/person', personRoutes)

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})