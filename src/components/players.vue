<template>
  <div class="backgroundPic">
    <br/>
    <br/>
    <h1 class="text">
      {{messagetitle}}
    </h1>
    <div class="table" id="app1">
      <v-client-table :columns="columns" :data="players" :options="options">
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x VueTables__delete" @click="deletePlayer(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x VueTables__Edit" @click="editPlayer(props.row._id)"></a>
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
    data() {
      return {
        messagetitle: ' Current Players ',
        players: [{
          "_id": Number,
          "playerName": String,
          "playerPosition": String,
          "playerSport": String,
          "playerAge": Number
        }],
        errors: [],
        columns: ['_id', 'playerName', 'playerPosition', 'playerSport', 'playerAge', 'delete', 'edit'],
        props: ['_id'],
        options: {
          perPage: 10,
          filterable: ['playerName', 'playerPosition', 'playerSport', 'playerAge'],
          headings: {
            _id: 'ID',
            playerName: 'Player Name',
            playerPosition: 'Player Position',
            playerSport: 'Player Sport',
            playerAge: 'Player Age',
            delete: 'Delete Player',
            edit: 'Edit'
          }
        }
      }
    },
    // Fetches Players when the component is created.
    created() {
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
      },
      deletePlayer: function (id) {
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
            playerService.deletePlayer(id)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data;
                console.log(this.message);
                this.loadPlayers();
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted','success')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error');
                this.errors.push(error);
                console.log(error)
              })
          } else {
            this.$swal('Cancelled', 'Your Player is still There!', 'info')
          }
        })
      },
      editPlayer: function (id) {
        this.$router.params = id;
        this.$router.push('editPlayer')
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
  .VueTables__delete, .VueTables__Edit{
    cursor: pointer;
    width: 100px;
  }

</style>
