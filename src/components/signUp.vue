<template>
  <div class="signUp">
    <h3>Sign Up</h3>
    <input type="text" v-model="firstName" placeholder="First Name"><br/>
    <input type="text" v-model="lastName" placeholder="Last Name"><br/>
    <input type="text" v-model="email" placeholder="Email"><br/>
    <input type="password" v-model="password" placeholder="Password"><br/>
    <button @click="signUp">Create account</button>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'signUp',
    data() {
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.email, this.password).then(
          function (user) {
            this.$swal('Congratulations!', 'Your account had been created!', 'success')
          },
          function (err) {
            this.$swal('Oops!', "That didn't work...", 'info')
          }
        )
      }
    }
  }
</script>

<style scoped>
  .signUp {
    margin-top: 40px
  }

  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px
  }

  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }

  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
