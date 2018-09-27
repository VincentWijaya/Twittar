const router = require('express').Router()

const Tweet = require('../models/Tweet')

router.get('/', (req, res) => {
  Tweet.find()
    .populate('user', '_id name username email')
    .then(tweets => {
      res.status(200).json(tweets)
    })
    .catch(err => {
      res.status(500).json({error: err.message})
    })
})

module.exports = router