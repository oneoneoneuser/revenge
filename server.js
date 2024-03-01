require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connection = require('./database/connection')
const path = require('path')
const app = express()
let PORT = process.env.PORT || 8080

// app.use(cors(
//     {
//         origin: 'http://localhost:5000/',
//         credentials: true,
//         optionSuccessStatus: 200
//     }
// ))

//Connect to the database before listening

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/user', require('./routers/UserRoutes'))
app.use('/api/player', require('./routers/PlayerRoutes'))

app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

connection().then(() => 
    app.listen(PORT, () => console.log(`SERVER IS RUN ON PORT: http://localhost:${PORT}`))
})

app.listen(PORT, () => console.log(`SERVER IS RUN ON PORT: http://localhost:${PORT}`))
