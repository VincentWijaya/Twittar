<template>
  <div v-if="user">
    <div class="card  mb-3" style="max-width: 18rem;">
      <div class="card-body">
        <input type="text" placeholder="Search..." v-model="keyword">
        <button class="btn-info" @click="findTweet">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    findTweet () {
      let self = this

      axios({
        method: 'post',
        url: `http://localhost:3000/tweets/search`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          keyword: this.keyword
        }
      })
        .then(response => {
          self.$store.dispatch('setTweets', response.data)
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
  }
}
</script>

<style>

</style>
