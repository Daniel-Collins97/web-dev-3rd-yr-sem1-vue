<template>
  <div class="background">
    <div class="table"id="app1">
      <v-client-table :columns="columns" :data="pitches" :options="options">
      </v-client-table>
    </div>
  </div>
</template>

<script>
  import pitchService from '@/services/pitchService'
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'

  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

  export default {
    name: 'Pitches',
    data () {
      return {
        messagetitle: ' Pitches List ',
        pitches: [{"pitchLocation": String, "pitchLights": String, "pitchSport": String, "pitchAge": Number}],
        errors: [],
        columns: ['_id', 'pitchLocation', 'pitchLights', 'pitchSport', 'pitchAge'],
        options: {
          headings: {
            _id: 'ID',
            pitchLocation: 'Pitch Location',
            pitchLights: 'Pitch Lights',
            pitchSport: 'Pitch Sport',
            pitchAge: 'Pitch Age'
          }
        }
      }
    },
    // Fetches Pitches when the component is created.
    created () {
      this.loadPitches()
    },
    methods: {
      loadPitches: function () {
        pitchService.fetchPitches()
          .then(response => {
            // JSON responses are automatically parsed.
            this.pitches = response.data
            console.log(this.pitches)
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
