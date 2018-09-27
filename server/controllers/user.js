const User = require('../models/User')
const encrypt = require('../helpers/encrypt')
const jwt = require('jsonwebtoken')

class Controller {

  static register(req, res) {
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User.create(newUser)
      .then(() => {
        res.status(201).json({message: 'User created!'})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }

  static login(req, res) {
    let hashed = encrypt.hashPassword(req.body.password, req.body.email)

    User.findOne({email: req.body.email, password: hashed})
      .then(user => {
        let obj = {
          id: user._id,
          name: user.name,
          email: user.email
        }

        jwt.sign(obj, process.env.JWT_SECRET, (err, token) => {
          if (err) {
            res.status(500).json(err)
          } else {
            res.status(201).json(token)
          }
        })
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }

  static auth(req, res) {
    res.status(200).json(req.decoded)
  }

}

module.exports = Controller