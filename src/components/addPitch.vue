<template>
  <div class="text">
    <add-pitch-form :primaryButton=primaryButton :finalized=finalized :messageTitle=messageTitle @pitch-is-created-updated="submitPitch"></add-pitch-form>
  </div>
</template>

<<script>
  import pitchService from '@/services/pitchService'
  import addPitchForm from '@/components/addPitchForm'

  export default {
    data () {
      return {
        messageTitle: ' Fill out the form below to Add a Pitch ',
        finalized: 'Pitch Added Successfully!',
        primaryButton: 'Add Pitch'
      }
    },
    components: {
      'add-pitch-form': addPitchForm
    },
    methods: {
      submitPitch: function (pitch) {
        pitchService.addPitch(pitch)
          .then(response => {
            console.log(response)
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

  .typo__p {
    font-size: x-large;
    margin: 0 auto;
    width: 50%;
    color: red;
    text-shadow:
      -1px -1px 0 rgb(0,0,0),
      1px -1px 0 rgb(0,0,0),
      -1px 1px 0 rgb(0,0,0),
      1px 1px 0 rgb(0,0,0);
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .error {
    background: red;
    color: whitesmoke;
    position: center;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
