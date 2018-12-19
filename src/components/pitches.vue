<template>
  <div class="backgroundPic">
    <br/>
    <br/>
    <h1 class="text">
      {{messagetitle}}
    </h1>
    <br/>
    <div class="table" id="app1">
      <v-client-table :columns="columns" :data="pitches" :options="options">
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x VueTables__delete" @click="deletePitch(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x VueTables__Edit" @click="editPitch(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
  import pitchService from '@/services/pitchService'
  import Vue from 'vue'
  import VueTables from 'vue-tables-2'

  Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn:true});

  export default {
    name: 'Pitches',
    data () {
      return {
        messagetitle: ' Current Pitches ',
        pitches: [{"_id": Number, "pitchLocation": String, "pitchLights": String, "pitchSport": String, "pitchAge": Number}],
        errors: [],
        columns: ['_id', 'pitchLocation', 'pitchLights', 'pitchSport', 'pitchAge', 'delete', 'edit'],
        props: ['_id'],
        options: {
          perPage: 10,
          filterable: ['pitchLocation', 'pitchLights', 'pitchSport', 'pitchAge'],
          headings: {
            _id: 'ID',
            pitchLocation: 'Pitch Location',
            pitchLights: 'Pitch Lights',
            pitchSport: 'Pitch Sport',
            pitchAge: 'Pitch Age',
            delete: 'Delete Pitch',
            edit: 'Edit'
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
            this.pitches = response.data;
            console.log(this.pitches)
          })
          .catch(error => {
            this.errors.push(error);
            console.log(error)
          })
      },
      deletePitch: function (id) {
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
          if (result.value) {
            pitchService.deletePitch(id)
              .then(response => {
                // JSON responses are automatically parsed.
                this.message = response.data;
                console.log(this.message);
                this.loadPitches();
                // Vue.nextTick(() => this.$refs.vuetable.refresh())
                this.$swal('Deleted','success')
              })
              .catch(error => {
                this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error');
                this.errors.push(error);
                console.log(error)
              })
          } else {
            this.$swal('Cancelled', 'Your Pitch is still There!', 'info')
          }
        })
      },
      editPitch: function (id) {
        this.$router.params = id;
        this.$router.push('editPitch')
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
