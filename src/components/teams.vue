<template>
  <div class="background">
    <div class="table" id="app1">
      <v-client-table :columns="columns" :data="teams" :options="options">
      </v-client-table>
    </div>
  </div>
</template>

<script>
  import teamService from '@/services/teamService'
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'


  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true});

  export default {
    name: 'Teams',
    data () {
      return {
        messagetitle: ' Teams List ',
        teams: [{"teamName": String, "teamLeague": Number, "teamSport": String, "numberOfPitches": Number}],
        errors: [],
        columns: ['_id', 'teamName', 'teamLeague', 'teamSport', 'numberOfPitches'],
        options: {
          headings: {
            _id: 'ID',
            teamName: 'Team Name',
            teamLeague: 'Team League',
            teamSport: 'Team Sport',
            numberOfPitches: 'Number Of Pitches'
          }
        }
      }
    },
    // Fetches Teams when the component is created.
    created () {
      this.loadTeams()
    },
    methods: {
      loadTeams: function () {
        teamService.fetchTeams()
          .then(response => {
            // JSON responses are automatically parsed.
            this.teams = response.data
            console.log(this.teams)
          })
          .catch(error => {
            this.errors.push(error)
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
