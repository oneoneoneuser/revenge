require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connection = require('./database/connection')
const path = require('path')
const app = express()
let PORT = process.env.PORT || 8080

app.use(cors())
// app.use(cors(
//     {
//         // origin: "https://aborayan.vercel.app",
//         origin: "",
//         methods: ["POST", "GET", "PUT", "DELETE"],
//         credentials: true
//     }
// ))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/user', require('./routers/UserRoutes'))
app.use('/api/player', require('./routers/PlayerRoutes'))

connection()

// app.get('/', (req, res) => {
//     return res.json({ success: true, msg: 'Hello!'})
// })

app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`SERVER IS RUN ON PORT: http://localhost:${PORT}`))
