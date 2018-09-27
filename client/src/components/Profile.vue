<template>
  <div v-if="user">
    <div class="twPc-div">
      <a class="twPc-bg twPc-block bg-info"></a>
      <div>
        <a title="Mert S. Kaplan" href="https://twitter.com/mertskaplan" class="twPc-avatarLink">
          <img alt="Mert S. Kaplan" src="https://mertskaplan.com/wp-content/plugins/msk-twprofilecard/img/mertskaplan.jpg" class="twPc-avatarImg">
        </a>

        <div class="twPc-divUser">
          <div class="twPc-divName">
            <a href="#" @click="myTweets">{{ user.name }}</a>
          </div>
          <span>
            <a href="#" @click="myTweets">@<span>{{ user.username }}</span></a>
          </span>
        </div>

        <div class="twPc-divStats">
          <ul class="twPc-Arrange">
            <li class="twPc-ArrangeSizeFit">
              <a href="#" title="My Tweet" @click="myTweets">
                <span class="twPc-StatLabel twPc-block">Tweets</span>
                <span class="twPc-StatValue">{{ user.tweets.length }}</span>
              </a>
            </li>
            <li class="twPc-ArrangeSizeFit">
              <a href="#" title="885 Following">
                <span class="twPc-StatLabel twPc-block">Following</span>
                <span class="twPc-StatValue">{{ user.following.length }}</span>
              </a>
            </li>
            <li class="twPc-ArrangeSizeFit">
              <a href="#" title="1.810 Followers">
                <span class="twPc-StatLabel twPc-block">Followers</span>
                <span class="twPc-StatValue">{{ user.followers.length }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    myTweets () {
      let tweets = []

      this.user.tweets.forEach(tweet => {
        tweet['isHim'] = true

        tweets.push(tweet)
      })

      this.$store.dispatch('setTweets', tweets)
    }
  }
}
</script>

<style>

</style>
