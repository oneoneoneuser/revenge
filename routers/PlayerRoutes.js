const PlayerCtrl = require('../controllers/PlayerCtrl')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const router = require('express').Router()

router.get('/', auth, adminAuth, PlayerCtrl.get)
router.get('/playerinfo', auth, PlayerCtrl.playerInfo)
router.put('/:id', auth, PlayerCtrl.update)
router.delete('/:id', auth, adminAuth, PlayerCtrl.delete)

module.exports = router