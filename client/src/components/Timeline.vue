<template>
  <div>
      <div class="row" v-for="tweet in tweets" :key="tweet._id">
        <div class="col-lg-12 col-md-12 timeline-wrapper">
          <div class="media ">
            <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
            <span class="media-body twit-status">
              <h5 class="mt-0">{{ tweet.user.name }}</h5>
              <p>@{{ tweet.user.username }}</p>
              {{ tweet.tweet }}
            </span>
            <button class="btn btn-danger" v-if="tweet.isHim" @click="deleteTweet(tweet._id)">Delete</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export default {
  created () {
    this.getTweets()
  },
  computed: {
    tweets () {
      return this.$store.state.tweets
    }
  },
  watch: {
    tweets () {
      return this.$store.state.tweets
    }
  },
  methods: {
    getTweets () {
      let self = this

      axios({
        method: 'get',
        url: `${baseUrl}/tweets`
      })
        .then(response => {
          self.$store.dispatch('setTweets', response.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUser () {
      let self = this
      let token = localStorage.getItem('token') ? localStorage.getItem('token') : ''

      axios({
        method: 'get',
        url: `http://localhost:3000/users/auth`,
        headers: {
          token: token
        }
      })
        .then(response => {
          self.token = localStorage.getItem('token')
          self.$store.dispatch('setUser', response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteTweet (id) {
      let self = this

      axios({
        method: 'delete',
        url: `http://localhost:3000/tweets/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          self.getUser()
          self.getTweets()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
