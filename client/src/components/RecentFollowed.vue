<template>
  <div v-if="user">
    <div class="card  mb-3" style="max-width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Recently Followed</h5>
        <ul id="recently-followed">
          <li v-for="followed in user.following" :key="followed._id">
            <a href="#">{{ followed.name }}</a>
          </li>
        </ul>
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
