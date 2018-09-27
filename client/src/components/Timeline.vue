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
  computed: {
    tweets () {
      return this.$store.state.tweets
    }
  },
  watch: {
    tweets () {
      return this.$store.state.tweets
    }
  }
}
</script>

<style>

</style>
