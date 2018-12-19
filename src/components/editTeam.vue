<template>
  <div class="text">
    <template v-if="childDataLoaded">
      <add-team-form :team=team :messageTitle=messageTitle :finilized=finalized :teamNameLabel=team.teamName :teamSportLabel=team.teamSport :teamLeagueLabel=team.teamLeague :numberOfPitchesLabel=team.numberOfPitches :primaryButton=primaryButton @team-is-created-updated="updateTeam"></add-team-form>
    </template>
  </div>
</template>

<<script>
  import teamService from '@/services/teamService'
  import addTeamForm from '@/components/addTeamForm'

  export default {
    props: [],
    data () {
      return {
        team: this.team,
        childDataLoaded: false,
        temp: {},
        messageTitle: 'Edit this Team',
        finalized: 'Team Edited Successfully!',
        primaryButton: 'Save Changes'
      }
    },
    components: {
      'add-team-form': addTeamForm
    },
    created() {
      this.getTeam()
    },
    methods: {
      getTeam: function () {
        teamService.fetchTeam(this.$router.params)
          .then(response => {
            this.temp = response.data;
            this.team = this.temp[0];
            this.childDataLoaded = true;
            console.log('Getting Team in Edit: ' + JSON.stringify(this.team, null, 5))
          })
          .catch(error => {
            this.errors.push(error);
            console.log(error)
          })
      },
      updateTeam: function (team) {
        teamService.updateTeam(this.$router.params, team)
          .then(response => {
            console.log(response)
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
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }

  .text {
    color: white;
    text-shadow:
      -1px -1px 0 rgb(0,0,0),
      1px -1px 0 rgb(0,0,0),
      -1px 1px 0 rgb(0,0,0),
      1px 1px 0 rgb(0,0,0);
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }
</style>
