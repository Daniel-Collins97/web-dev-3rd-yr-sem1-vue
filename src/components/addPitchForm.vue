<template>
  <div class="text">
    <br/>
    <h1>
      <img src="../assets/Pitch-back.png" alt="Pitch Logo" style="width:100px;height:100px;">
      {{messageTitle}}
    </h1>
    <br/>
    <form class="form, text" @submit.prevent="submit">
      <div class="form-group">
        <label class="form-control-label" name="pitchLocation">Enter a location for the Pitch
          <input class="form_input" :placeholder=pitchLocationLabel v-model.trim="$v.pitchLocation.$model"/>
        </label>
      </div>
      <div class="form-group">
        <label class="form-label">Pitch Lights
          <select required id="pitchLights" name="pitchLights" class="form-control" type="text" v-model="pitchLights">
            <option :value=pitchLightsLabel selected disabled>{{pitchLightsLabel}}</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
      </div>
      <div class="form-group">
        <label class="form-label">Select Pitch Sport
          <select required id="pitchSport" name="pitchSport" class="form-control" type="text" v-model="pitchSport">
            <option value="" selected disabled>{{pitchSportLabel}}</option>
            <option value="Rugby">Rugby</option>
            <option value="Soccer">Soccer</option>
            <option value="Football">Football</option>
            <option value="Hurling">Hurling</option>
          </select>
        </label>
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.pitchAge.$error }">
        <label class="form-control-label" name="age">Enter Pitch Age
          <input class="form__input" :placeholder=pitchAgeLabel type="number" v-model.trim="pitchAge"/>
        </label>
      </div>
      <div class="error" v-if="!$v.pitchAge.between">Age must be between 1 and 100</div>
      <p>
        <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Add Pitch</button>
      </p>
      <p class="typo__p" v-if="submitStatus === 'OK'">{{finalized}}</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Adding...</p>
      <p></p>
      <p></p>
    </form>
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
  import pitchService from '../services/pitchService'
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
    name: "addPitch",
    props: ['primaryButton', 'pitch', 'messageTitle', 'pitchLocationLabel', 'pitchLightsLabel', 'pitchSportLabel', 'pitchAgeLabel', 'finalized'],
    data() {
      return {
        _id: 5,
        pitchLocation: "",
        pitchLights: "",
        pitchSport: "",
        pitchAge: null,
        submitStatus: null,
      }
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
            this.pitch = {
              pitchLocation: this.pitchLocation,
              pitchLights: this.pitchLights,
              pitchSport: this.pitchSport,
              pitchAge: this.pitchAge
            };
            console.log('Submitting in Pitch Form : ' + JSON.stringify(this.pitch, null, 5));
            console.log('Location : ' + JSON.stringify(this.pitch.pitchLocation, null, 5));
            this.$emit('pitch-is-created-updated', this.pitch)
          }, 500)
        }
      }
    },

    validations: {
      pitchLocation: {
        required,
        minLength: minLength(5)
      },
      pitchLights: {
        required,
        minLength: minLength(2)
      },
      pitchSport: {
        required,
        minLength: minLength(5)
      },
      pitchAge: {
        required,
        between: between(1, 100)
      },
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

  select:required:invalid {
    color: lightgray;
  }
  option {
    color: black;
  }
  option[value=""][disabled] {
    display: none;
  }

</style>
