<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Victwitter</a>
        <div class="alert alert-warning" v-if="error">
          <strong>Warning!</strong> {{ error }}
        </div>
        <div class="header-right">
          <button class="btn-info" @click="logout" v-if="token">Logout</button>
          <div v-else>
            <input type="text" placeholder="username / email" v-model="email">
            <input type="password" placeholder="password" v-model="password">
            <button class="btn-info" @click="login">Login</button>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: '',
      token: ''
    }
  },
  created () {
    this.getUser()
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
    login () {
      let self = this

      axios({
        method: 'post',
        url: `${baseUrl}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          localStorage.setItem('token', response.data)
          self.token = localStorage.getItem('token')
          self.getUser()
        })
        .catch(err => {
          console.log(err)
          self.error = 'Login gagal!'
        })
    },
    logout () {
      this.token = ''
      localStorage.removeItem('token')
      this.$store.dispatch('removeUser')
    }
  }, // methods
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
