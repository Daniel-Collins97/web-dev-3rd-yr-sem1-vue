<template>
  <div class="text">
    <template v-if="childDataLoaded">
      <add-pitch-form :pitch=pitch :messageTitle=messageTitle :finalized=finalized :pitchLocationLabel=pitch.pitchLocation :pitchLightsLabel=pitch.pitchLights :pitchSportLabel=pitch.pitchSport :pitchAgeLabel=pitch.pitchAge :primaryButton=primaryButton @pitch-is-created-updated="updatePitch"></add-pitch-form>
    </template>
  </div>
</template>

<<script>
  import pitchService from '@/services/pitchService'
  import addPitchForm from '@/components/addPitchForm'

  export default {
    data () {
      return {
        pitch: this.pitch,
        childDataLoaded: false,
        temp: {},
        messageTitle: 'Edit this Pitch',
        finalized: 'Pitch Edited Successfully!',
        primaryButton: 'Save Changes'
      }
    },
    components: {
      'add-pitch-form': addPitchForm
    },
    created() {
      this.getPitch()
    },
    methods: {
      getPitch: function () {
        pitchService.fetchPitch(this.$router.params)
          .then(response => {
            this.temp = response.data;
            this.pitch = this.temp[0];
            this.childDataLoaded = true;
            console.log('Getting Pitch in Edit: ' + JSON.stringify(this.pitch, null, 5))
          })
          .catch(error => {
            this.errors.push(error);
            console.log(error)
          })
      },
      updatePitch: function (pitch) {
        pitchService.updatePitch(this.$router.params, pitch)
          .then(response => {
            console.log(response)
            this.$router.push('Pitches')
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
