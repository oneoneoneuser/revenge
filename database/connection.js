const mongoose = require('mongoose');

const connection = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongo connect: ${con.connection.host}`)
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = connection