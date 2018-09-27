const User = require('../models/User')
const encrypt = require('../helpers/encrypt')
const jwt = require('jsonwebtoken')

class Controller {

  static register(req, res) {
    let newUser = {
      name: req.body.name,
      username: req.body.username,
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
    let hashed = encrypt.hashPassword(req.body.password, process.env.SECRET)

    User.findOne({$or: [{email: req.body.email}, {username: req.body.email}], password: hashed})
      .then(user => {
        let obj = {
          id: user._id,
          name: user.name,
          username: user.username,
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
    User.findOne({_id: req.decoded.id})
      .populate('tweets')
      .populate('following', '_id name username')
      .populate('followers', '_id name username')
      .then(user => {
        user.following.reverse()
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }

  static randomUser(req, res) {
    User.findRandom({_id: {$ne: req.decoded.id}}, {}, {limit: 3}, (err, users) => {
      if (err) {
        res.status(500).json({error: err.message})
      } else {
        res.status(200).json(users)
      }
    })
  }

  static follow(req, res) {
    let updateFollowing = User.updateOne({_id: req.decoded.id}, {$push: {following: req.params.id}})
    let updateFollowers = User.updateOne({_id: req.params.id}, {$push: {followers: req.decoded.id}})

    Promise.all([updateFollowing, updateFollowers])
      .then(() => {
        res.status(201).json({msg: `You just followed ${req.params.id}`})
      })
      .catch(err => {
        res.status(500).json({error: err.message})
      })
  }

}

module.exports = Controller