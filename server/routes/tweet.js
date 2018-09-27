const router = require('express').Router()

const Tweet = require('../models/Tweet')
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
    .then(() => {
      res.status(201).json({msg: 'Tweet created!'})
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})

module.exports = router