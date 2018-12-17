<template>
  <div class="background text">
    <br/>
    <h1>Fill out the form below to add a Player!</h1>
    <br/>
    <form @submit.prevent="submit" class="text">
      <div class="form-group">
        <label class="form-control-label" name="playerName">Enter Player Name
          <input class="form_input" v-model.trim="$v.playerName.$model"/>
        </label>
      </div>
      <div class="form-group">
        <label class="form-control-label" name="playerPosition">Enter Player Position
          <input class="form_input" v-model.trim="$v.playerPosition.$model"/>
        </label>
      </div>
      <div class="form-group">
        <label class="form-label">Select Player Sport
          <select id="playerSport" name="playerSport" class="form-control" type="text" v-model="playerSport">
            <option value="null" selected disabled hidden>Choose Player Sport</option>
            <option value="Rugby">Rugby</option>
            <option value="Soccer">Soccer</option>
            <option value="Football">Football</option>
            <option value="Hurling">Hurling</option>
          </select>
        </label>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.playerAge.$error }">
        <label class="form-control-label" name="age">Enter Player Age
          <input class="form__input" type="number" v-model.trim="playerAge"/>
        </label>
      </div>
      <div class="error" v-if="!$v.playerAge.between">Age must be between 1 and 100</div>
      <p>
        <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Add Player</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">Player Added!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
      <p></p>
      <p></p>
    </form>
  </div>
</template>

<script>
  import playerService from '../services/playerService'
  import Vue from 'vue';
  import VueForm from "vueform";
  import {Vuelidate} from "vuelidate";
  import VueSweetalert from "vue-sweetalert"
  import {between, minLength, required} from 'vuelidate/lib/validators'

  Vue.use(VueForm, {
    inputClasses: {
      valid: 'form-control-success',
      invalid: 'form-control-danger'
    }
  });

  Vue.use(Vuelidate);
  Vue.use(VueSweetalert);
    export default {
      name: "addPlayer",
      validations: {
        playerName: {
          required,
          minLength: minLength(5)
        },
        playerPosition: {
          required,
          minLength: minLength(3)
        },
        playerSport: {
          required,
          minLength: minLength(5)
        },
        playerAge: {
          required,
          between: between(1, 100)
        },
      },
        data () {
          return {
            _id: 5,
            playerName: '',
            playerPosition: '',
            playerSport: '',
            playerAge: 1,
            player: {},
            submitStatus: null
          }
      },
      methods: {
        submitPlayer: function (player) {
          playerService.addPlayer(player)
            .then(response => {
              // JSON responses are automatically parsed.
              console.log(response)
            })
            .catch(error => {
              this.errors.push(error);
              console.log(error)
            })
        },
        submit () {
          console.log('submit!');
          this.$v.$touch();
          if (this.$v.$invalid) {
            this.submitStatus = 'ERROR'
          } else {
            // do your submit logic here
            this.submitStatus = 'PENDING';
            setTimeout(() => {
              this.submitStatus = 'OK';
              this.player = {
                playerName: this.playerName,
                playerPosition: this.playerPosition,
                playerSport: this.playerSport,
                playerAge: this.playerAge
              };
              this.submitPlayer(this.player)
            }, 500)
          }
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
