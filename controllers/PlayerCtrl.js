const Player = require("../models/player")

const PlayerCtrl = {
    create: async (req, res) => {
        try {
            const { UID, اسم_اللاعب, اسم_القلعة, عدد_الرماه_المدرع, عدد_الثكنة_المدرع, عدد_الرماه_الخارق, عدد_الثكنة_الخارق, مستوى_المارد, مستوى_المقام, قوة_السلاح } = req.body

            const player = new Player({
                UID: UID, اسم_اللاعب: اسم_اللاعب, اسم_القلعة: اسم_القلعة, عدد_الرماه_المدرع: عدد_الرماه_المدرع, عدد_الثكنة_المدرع: عدد_الثكنة_المدرع, عدد_الرماه_الخارق: عدد_الرماه_الخارق, عدد_الثكنة_الخارق: عدد_الثكنة_الخارق, مستوى_المارد: مستوى_المارد, مستوى_المقام: مستوى_المقام, قوة_السلاح: قوة_السلاح
            })
            await player.save()

            return res.status(200).json({ success: true, data: player })
        } catch (err) {
            return res.status(500).json({ success: false, msg: err.message })
        }
    },
    get: async (req, res) => {
        try {
            let players = await Player.find()
            return res.status(200).json({ success: true, data: players })
        } catch (err) {
            return res.status(500).json({ success: false, msg: err.message })
        }
    },
    playerInfo: async (req, res) => {
        try {
            let player = await Player.findOne({ player_id: req.user.id })
            return res.status(200).json({ success: true, data: player })
        } catch (err) {
            return res.status(500).json({ success: false, msg: err.message })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            const { UID, اسم_اللاعب, اسم_القلعة, عدد_الرماه_المدرع, عدد_الثكنة_المدرع, عدد_الرماه_الخارق, عدد_الثكنة_الخارق, مستوى_المارد, مستوى_المقام, قوة_السلاح } = req.body

            const updatePlayer = await Player.findByIdAndUpdate({ _id: id }, {
                UID: UID, اسم_اللاعب: اسم_اللاعب, اسم_القلعة: اسم_القلعة, عدد_الرماه_المدرع: عدد_الرماه_المدرع, عدد_الثكنة_المدرع: عدد_الثكنة_المدرع, عدد_الرماه_الخارق: عدد_الرماه_الخارق, عدد_الثكنة_الخارق: عدد_الثكنة_الخارق, مستوى_المارد: مستوى_المارد, مستوى_المقام: مستوى_المقام, قوة_السلاح: قوة_السلاح
            })

            return res.status(200).json({ success: true, data: updatePlayer })
        } catch (err) {
            return res.status(500).json({ success: false, msg: err.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            await Player.findByIdAndDelete({ _id: id })
            return res.status(200).json({ success: true, data: "User Deleted Successfully" })
        } catch (err) {
            return res.status(500).json({ success: false, msg: err.message })
        }
    },
}

module.exports = PlayerCtrl