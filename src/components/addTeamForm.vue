<template>
  <div class="text">
    <br/>
    <h1>
      <img src="../assets/team.png" alt="Team Logo" style="width:70px;height:70px;">
      {{messageTitle}}
    </h1>
    <br/>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label class="form-control-label" name="teamName">Enter a Team Name
          <input class="form_input" :placeholder=teamNameLabel v-model.trim="$v.teamName.$model"/>
        </label>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.teamLeague.$error }">
        <label class="form-control-label" name="teamLeague">Enter Team League
          <input class="form__input" :placeholder=teamLeagueLabel type="number" v-model.trim="teamLeague"/>
        </label>
      </div>
      <div class="error" v-if="!$v.teamLeague.between">League must be between 1 and 6</div>
      <div class="form-group">
        <label class="form-label">Select Team Sport
          <select id="teamSport" name="teamSport" class="form-control" type="text" v-model="teamSport">
            <option :value=teamSportLabel selected disabled hidden>{{teamSportLabel}}</option>
            <option value="Rugby">Rugby</option>
            <option value="Soccer">Soccer</option>
            <option value="Football">Football</option>
            <option value="Hurling">Hurling</option>
          </select>
        </label>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.numberOfPitches.$error }">
        <label class="form-control-label" name="numberOfPitches">Number of Pitches
          <input class="form__input" :placeholder=numberOfPitchesLabel type="number" v-model.trim="numberOfPitches"/>
        </label>
      </div>
      <div class="error" v-if="!$v.numberOfPitches.between">Number of Pitches must be between 1 and 10</div>
      <p>
        <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{primaryButton}}</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">{{finalized}}</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
    </form>
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
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
    name: "addTeamForm",
    props: ['primaryButton', 'team', 'messageTitle', 'teamNameLabel', 'teamSportLabel', 'teamLeagueLabel', 'numberOfPitchesLabel', 'finalized'],
    data () {
      return {
        _id: 4,
        teamName: "",
        teamLeague: null,
        teamSport: "",
        numberOfPitches: null,
        submitStatus: null,
      }
    },
    validations: {
      teamName: {
        required,
        minLength: minLength(5)
      },
      teamLeague: {
        required,
        between: between(1,6)
      },
      teamSport: {
        required,
        minLength: minLength(5)
      },
      numberOfPitches: {
        required,
        between: between(1, 10)
      },
    },

    methods: {
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
            this.team = {
              teamName: this.teamName,
              teamLeague: this.teamLeague,
              teamSport: this.teamSport,
              numberOfPitches: this.numberOfPitches
            };
            console.log('Submitting in Team Form : ' + JSON.stringify(this.team, null, 5))
            this.$emit('team-is-created-updated', this.team)
          }, 500)
        }
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
