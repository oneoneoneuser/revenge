const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema({
    UID: String,
    اسم_اللاعب: String,
    اسم_القلعة: String,
    عدد_الرماه_المدرع: Number,
    عدد_الثكنة_المدرع: Number,
    عدد_الرماه_الخارق: Number,
    عدد_الثكنة_الخارق: Number,
    مستوى_المارد: String,
    مستوى_المقام: String,
    قوة_السلاح: String,
    player_id: String,
    player_name: String
}, {
    timestamps: true
})

const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player