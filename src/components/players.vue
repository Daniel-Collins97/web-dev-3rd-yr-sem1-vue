<template>
  <div class="background">
    <div class="table" id="app1">
      <v-client-table :columns="columns" :data="players" :options="options">
      </v-client-table>
    </div>
  </div>
</template>

<script>
  import playerService from '@/services/playerService'
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'

  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true});

  export default {
    name: 'Players',
    data () {
      return {
        messagetitle: ' Players List ',
        players: [{"playerName": String, "playerPosition": String, "playerSport": String, "playerAge": Number}],
        errors: [],
        columns: ['_id', 'playerName', 'playerPosition', 'playerSport', 'playerAge'],
        options: {
          headings: {
            _id: 'ID',
            playerName: 'Player Name',
            playerPosition: 'Player Position',
            playerSport: 'Player Sport',
            playerAge: 'Player Age'
          }
        }
      }
    },
    // Fetches Players when the component is created.
    created () {
      this.loadPlayers()
    },
    methods: {
      loadPlayers: function () {
        playerService.fetchPlayers()
          .then(response => {
            // JSON responses are automatically parsed.
            this.players = response.data;
            console.log(this.players)
          })
          .catch(error => {
            this.errors.push(error);
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>
  .background {
    height: 100vh;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: url("../assets/rugby-background-9.jpg");
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: 100%;
  }

  #app1 {
    width: 60%;
    margin: 0 auto;
  }

</style>
