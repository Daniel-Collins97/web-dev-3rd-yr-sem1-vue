<template>
  <div class="text">
    <add-team-form :messageTitle=messagetitle :finalized=finalized :primaryButton=primaryButton @team-is-created-updated="submitTeam"></add-team-form>
  </div>
</template>

<<script>
  import teamService from '@/services/teamService'
  import addTeamForm from '@/components/addTeamForm'

  export default {
    data () {
      return {
        messagetitle: ' Fill out the form below to Add a Team ',
        primaryButton: 'Add Team',
        finalized: 'Team Added Successfully!'
      }
    },
    components: {
      'add-team-form': addTeamForm
    },
    methods: {
      submitTeam: function (team) {
        teamService.addTeam(team)
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
