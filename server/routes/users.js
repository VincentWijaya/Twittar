const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')
const {auth} = require('../middleware/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Users.....');
});

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/auth', auth, userController.auth)

router.get('/random', auth, userController.randomUser)

router.patch('/follow/:id', auth, userController.follow)

module.exports = router;
