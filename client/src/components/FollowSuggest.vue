<template>
  <div v-if="user">
    <div class="card  mb-3" style="max-width: 18rem;">
      <div class="card-body who-to-follow">
        <h5 class="card-title">Who to Follow <small><a href="#">Refresh</a></small></h5>
        <ul id="recently-followed">

          <li>
            <div class="media ">
              <img class="d-flex mr-3 rounded-circle" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="">
              <span class="media-body twit-status">
                <h6 class="mt-0">Johny Walker <small>@johnywalker</small></h6>

                <button class="btn btn-danger">Unfollow</button>
              </span>
            </div>
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
