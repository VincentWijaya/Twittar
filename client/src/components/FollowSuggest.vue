<template>
  <div v-if="user">
    <div class="card  mb-3" style="max-width: 18rem;">
      <div class="card-body who-to-follow">
        <h5 class="card-title">Who to Follow <small><a href="#" @click="getUsers">Refresh</a></small></h5>
        <ul id="recently-followed">

          <li v-for="(user, index) in users" :key="index">
            <div class="media">
              <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
              <span class="media-body twit-status">
                <h6 class="mt-0">{{ user.name }} <small>@{{ user.username }}</small></h6>

                <button class="btn btn-outline-info" @click="follow(user._id)" v-if="!user.followed">Follow</button>
                <button class="btn btn-danger" @click="unfollow(user._id)" v-if="user.followed">Unfollow</button>
              </span>
            </div>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: []
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      let self = this

      axios({
        method: 'get',
        url: 'http://localhost:3000/users/random',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(response => {
          response.data.forEach(user => {
            if (this.user.following) {
              this.user.following.forEach(following => {
                if (user._id === following._id) {
                  user['followed'] = true
                } else {
                  user['followed'] = false
                }
              })
            }
          })

          self.users = response.data
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
    follow (id) {
      let self = this

      axios({
        method: 'patch',
        url: `http://localhost:3000/users/follow/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          self.getUser()
          self.users.forEach(user => {
            if (user._id === id) {
              user['followed'] = 'true'
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    unfollow (id) {
      console.log(id)
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
