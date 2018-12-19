<template>
  <div class="backgroundPic">
    <br/>
    <br/>
    <h2 class="text">
      {{messagetitle}}
    </h2>
    <div class="table" id="app1">
      <v-client-table :columns="columns" :data="teams" :options="options">
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x VueTables__delete" @click="deleteTeam(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x VueTables__Edit" @click="editTeam(props.row._id)"></a>
      </v-client-table>
      <br/>
      <br/>
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
        messagetitle: ' Current Teams ',
        teams: [{"_id": Number, "teamName": String, "teamLeague": Number, "teamSport": String, "numberOfPitches": Number}],
        errors: [],
        columns: ['_id', 'teamName', 'teamLeague', 'teamSport', 'numberOfPitches', 'delete', 'edit'],
        props: ['_id'],
        options: {
          perPage: 10,
          filterable: ['teamName', 'teamLeague', 'teamSport', 'numberOfPitches'],
          headings: {
            _id: 'ID',
            teamName: 'Team Name',
            teamLeague: 'Team League',
            teamSport: 'Team Sport',
            numberOfPitches: 'No. Of Pitches',
            delete: 'Delete Team',
            edit: 'Edit'
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
            this.teams = response.data;
            console.log(this.teams)
          })
          .catch(error => {
            this.errors.push(error);
            console.log(error)
          })
      },
      deleteTeam: function (id) {
        this.$swal({
          title: 'Are you sure?',
          text: 'You can\'t Undo this action',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'OK, Delete',
          cancelButtonText: 'Cancel',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          console.log('SWAL Result : ' + result);
          if (result.value === true) {
            teamService.deleteTeam(id)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data;
                console.log(this.message);
                this.loadTeams();
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted', 'success')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error');
                this.errors.push(error);
                console.log(error)
              })
          } else {
            console.log('SWAL Else Result : ' + result.value)
            this.$swal('Cancelled', 'Your Team is still there!', 'info')
          }
        })
      },
      editTeam: function (id) {
        this.$router.params = id;
        this.$router.push('editTeam')
      }
    }
  }
</script>

<style scoped>
  #app1 {
    width: 60%;
    margin: 0 auto;
  }

  .text {
    color: white;
    font-size: 45px;
    text-shadow:
      -1px -1px 0 rgb(0,0,0),
      1px -1px 0 rgb(0,0,0),
      -1px 1px 0 rgb(0,0,0),
      1px 1px 0 rgb(0,0,0);
  }

  .VueTables__delete, .VueTables__Edit {
    cursor: pointer;
    width: 100px;
  }
</style>
