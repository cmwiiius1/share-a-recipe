const express = require('express')
const router = express.Router()
const User = require('../db/models/user')
const passport = require('../passport')

// this route is just used to get the user basic info
router.get('/member', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

module.exports = router
