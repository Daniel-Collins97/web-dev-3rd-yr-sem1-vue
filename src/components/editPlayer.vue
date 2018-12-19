<template>
  <div class="text">
    <template v-if="childDataLoaded">
      <add-player-form :player=player :messageTitle=messageTitle :finalized=finalized :playerNameLabel=player.playerName :playerPositionLabel=player.playerPosition :playerSportLabel=player.playerSport :playerAgeLabel=player.playerAge :primaryButton=primaryButton @player-is-created-updated="updatePlayer"></add-player-form>
    </template>
  </div>
</template>

<<script>
  import playerService from '@/services/playerService'
  import addPlayerForm from '@/components/addPlayerForm'

  export default {
    data () {
      return {
        player: this.player,
        childDataLoaded: false,
        temp: {},
        messageTitle: 'Edit this Player',
        finalized: 'Player Edited Successfully!',
        primaryButton: 'Save Changes'
      }
    },
    components: {
      'add-player-form': addPlayerForm
    },
    created() {
      this.getPlayer()
    },
    methods: {
      getPlayer: function () {
        playerService.fetchPlayer(this.$router.params)
          .then(response => {
            this.temp = response.data;
            this.player = this.temp[0];
            this.childDataLoaded = true;
            console.log('Getting Player in Edit: ' + JSON.stringify(this.player, null, 5))
          })
          .catch(error => {
            this.errors.push(error);
            console.log(error)
          })
      },
      updatePlayer: function (player) {
        playerService.updatePlayer(this.$router.params, player)
          .then(response => {
            console.log(response)
            this.$router.push('Players')
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
