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
            <a href="https://twitter.com/mertskaplan">{{ user.name }}</a>
          </div>
          <span>
            <a href="https://twitter.com/mertskaplan">@<span>{{ user.username }}</span></a>
          </span>
        </div>

        <div class="twPc-divStats">
          <ul class="twPc-Arrange">
            <li class="twPc-ArrangeSizeFit">
              <a href="https://twitter.com/mertskaplan" title="9.840 Tweet">
                <span class="twPc-StatLabel twPc-block">Tweets</span>
                <span class="twPc-StatValue">{{ user.tweets.length }}</span>
              </a>
            </li>
            <li class="twPc-ArrangeSizeFit">
              <a href="https://twitter.com/mertskaplan/following" title="885 Following">
                <span class="twPc-StatLabel twPc-block">Following</span>
                <span class="twPc-StatValue">{{ user.following.length }}</span>
              </a>
            </li>
            <li class="twPc-ArrangeSizeFit">
              <a href="https://twitter.com/mertskaplan/followers" title="1.810 Followers">
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
  }
}
</script>

<style>

</style>
