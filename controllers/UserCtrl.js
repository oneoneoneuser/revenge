const User = require("../models/UserModel")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Player = require("../models/player");

const UserCtrl = {
    register: async (req, res) => {
        try {
            const { name, password } = req.body
            
            if(name.length < 3) return res.status(400).json({ msg: 'يجب على الاسم ان يكون مكونا من 3 احرف او اكثر'})
            if(password.length < 6) return res.status(400).json({ msg: 'المرجو ادخال كلمة مرور على الاقل 6 احرف'}) 
            
            const user = await User.findOne({ name })
            if(user) return res.status(400).json({ msg: 'هدا الاسم تم اختياره سابقا, المرجوا اختيار اسم اخر'})
            
            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = new User({
                name, password: hashedPassword
            })

            await newUser.save()

            const newPlayer = new Player({
                player_id: newUser._id,
                player_name: name,
                UID: '',
                اسم_اللاعب: '',
                اسم_القلعة: '',
                عدد_الرماه_المدرع: 0,
                عدد_الثكنة_المدرع: 0,
                عدد_الرماه_الخارق: 0,
                عدد_الثكنة_الخارق: 0,
                مستوى_المارد: '',
                مستوى_المقام: '',
                قوة_السلاح: '',
            })

            await newPlayer.save()

            const accessToken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/user/refreshtoken'
            })

            return res.json({ accessToken })
            
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { name, password } = req.body

            const user = await User.findOne({ name })
            if(!user) return res.status(400).json({ msg: 'هادا الاسم غير موجود' })
            if(password.length < 6) return res.status(400).json({ msg: 'المرجو ادخال كلمة مرور على الاقل 6 احرف'}) 
            
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({ msg: 'كلمة المرور غير صحيحة' })

            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/user/refreshtoken'
            })

            return res.status(200).json({ accesstoken })
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    change_password: async (req, res) => {
        try {
            const { password } = req.body
            
            if(password.length < 6) return res.status(400).json({ msg: 'المرجو ادخال كلمة مرور على الاقل 6 احرف'})
            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt)

            const user = await User.findByIdAndUpdate({ _id: req.user.id }, {
                password: hashedPassword  
            })
            return res.status(200).json({ success: true, data: user })
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshtoken: async (req, res) => {
        try {
            const token = req.cookies.refreshtoken
            if(!token) return res.status(400).json({ msg: 'Invalid Authentication!' })
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({ msg: 'Invalid Authentication!'})

                const accesstoken = createAccessToken({ id: user.id })
                return res.status(200).json({ accesstoken })
            })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/user/refreshtoken' })
            res.status(200).json('Logout successfult!')
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    userInfo: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password')
            return res.json({ user })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

const createAccessToken = (id) => {
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (id) => {
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = UserCtrl