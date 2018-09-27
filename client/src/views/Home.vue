<template>
  <div class="container">
    <div class="row">

      <div class="col-lg-3">
        <Profile/>
        <Search/>
        <Recent/>
      </div>

      <div class="col-lg-6">
        <CreateTweet/>
        <Timeline/>
      </div>

      <div class="col-lg-3">
        <Suggest/>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '../components/Profile'
import Search from '../components/Search'
import Recent from '../components/RecentFollowed'
import CreateTweet from '../components/CreateTweet'
import Timeline from '../components/Timeline'
import Suggest from '../components/FollowSuggest'

export default {
  name: 'home',
  components: {
    Profile,
    Search,
    Recent,
    CreateTweet,
    Timeline,
    Suggest
  }
}
</script>
