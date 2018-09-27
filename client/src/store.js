import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: '',
    tweets: []
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    removeUser (state) {
      state.user = ''
    },
    setTweets (state, tweets) {
      state.tweets = tweets
    }
  },
  actions: {
    setUser (context, user) {
      context.commit('setUser', user)
    },
    removeUser (context) {
      context.commit('removeUser')
    },
    setTweets (context, tweets) {
      context.commit('setTweets', tweets)
    }
  }
})
