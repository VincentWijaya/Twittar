const router = require('express').Router()

const Tweet = require('../models/Tweet')
const User = require('../models/User')

const {auth} = require('../middleware/auth')

router.get('/', (req, res) => {
  Tweet.find()
    .populate('user', '_id name username email')
    .sort({createdAt: 'desc'})
    .then(tweets => {
      res.status(200).json(tweets)
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})

router.post('/', auth, (req, res) => {
  let newTweet = {
    tweet: req.body.tweet,
    user: req.decoded.id
  }

  Tweet.create(newTweet)
    .then(tweet => {
      User.updateOne({_id: req.decoded.id}, {$push: {tweets: tweet._id}})
        .then(() => {
          res.status(201).json({msg: 'Tweet created!'})
        })
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})

router.post('/search', auth, (req, res) => {
  Tweet.find({tweet: { $regex: req.body.keyword, $options: 'i' }})
    .populate('user', '_id name username email')
    .sort({createdAt: 'desc'})
    .then(tweets => {
      res.status(200).json(tweets)
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})

router.delete('/:id', auth, (req, res) => {
  Tweet.deleteOne({_id: req.params.id})
    .then(() => {
      res.status(201).json({msg: 'Tweet deleted!'})
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})

module.exports = router