<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/rugbyBall.png" width="50px" height="50px" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">TeamMe App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/teams"><i class="fa fa-list" style="padding: 5px"> Manage Teams</i></b-nav-item>
          <b-nav-item to="/players"><i class="fa fa-list" style="padding: 5px"> Manage Players</i></b-nav-item>
          <b-nav-item to="/pitches"><i class="fa fa-list" style="padding: 5px"> Manage Pitches</i></b-nav-item>
          <b-nav-item to="/addTeams"><i class="fa fa-plus" style="padding: 5px"> Add Teams</i></b-nav-item>
          <b-nav-item to="/addPlayers"><i class="fa fa-plus" style="padding: 5px"> Add Players</i></b-nav-item>
          <b-nav-item to="/addPitch"><i class="fa fa-plus" style="padding: 5px"> Add Pitches</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-nav-item>
          <b-nav-item to="/logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-nav-item>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
