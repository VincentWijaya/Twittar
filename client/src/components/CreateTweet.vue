<template>
  <div>
    <div class="row" v-if="user">
      <div class="col-lg-12 col-md-12 mb-12 form-horizontal">
        <div class="form-group">
          <textarea class="form-control" placeholder="What's happening?" rows="3" v-model="tweet"></textarea>
        </div>
        <div class="form-group">
          <button class="btn-info" @click="postTweet">Post</button>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export default {
  data () {
    return {
      tweet: ''
    }
  },
  methods: {
    getUser () {
      let self = this
      let token = localStorage.getItem('token') ? localStorage.getItem('token') : ''

      axios({
        method: 'get',
        url: `${baseUrl}/users/auth`,
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
    postTweet () {
      let self = this

      axios({
        method: 'post',
        url: `${baseUrl}/tweets`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          tweet: this.tweet
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
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style>

</style>
