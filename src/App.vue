<template>
  <div id="app" class="backgroundPic">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/rugbyBall.png" width="50px" height="50px" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">TeamMe App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item-dropdown id="nav7 ddwon" text="Manage" extra-toggle-classes="nav-link-custom" right>
            <b-dropdown-item to="/teams"><i class="fa fa-list" style="padding: 5px"> Manage Teams</i></b-dropdown-item>
            <b-dropdown-item to="/players"><i class="fa fa-list" style="padding: 5px"> Manage Players</i></b-dropdown-item>
            <b-dropdown-item to="/pitches"><i class="fa fa-list" style="padding: 5px"> Manage Pitches</i></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown id="nav7 ddown" text="Add" extra-toggle-classes="nav-link-custom" right>
            <b-dropdown-item to="/addTeams"><i class="fa fa-plus" style="padding: 5px"> Add Teams</i></b-dropdown-item>
            <b-dropdown-item to="/addPlayers"><i class="fa fa-plus" style="padding: 5px"> Add Players</i></b-dropdown-item>
            <b-dropdown-item to="/addPitch"><i class="fa fa-plus" style="padding: 5px"> Add Pitches</i></b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/map"><i class="fa fa-globe" style="padding: 5px"> map</i></b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown id="nav7_ddown" text="Members" extra-toggle-classes="nav-link-custom" right>
            <b-dropdown-item to="/login"><i class="fa fa-sign-in" style="padding: 5px"> Login </i></b-dropdown-item>
            <b-dropdown-item to="/signUp"><i class="fa fa-plus-circle" style="padding: 5px"> SignUp </i></b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item @click="logout"><i class="fa fa-sign-out" style="padding: 5px"> Logout </i></b-dropdown-item>
          </b-nav-item-dropdown>
          <i class="fa fa-pied-piper-alt fa-1x" style="padding: 5px; color: white;"></i>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'App',
    methods: {
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$swal('Logged Out', 'You have been logged out successfully!', 'success');
          this.$router.push('login')
        })
      }
    }
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
    background: url("assets/rugby-background-9.jpg") fixed;
    background-size: cover;
    min-height: 100vh;
    min-width: 100%;
  }
</style>
