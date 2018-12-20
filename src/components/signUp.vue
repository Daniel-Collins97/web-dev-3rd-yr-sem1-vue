<template>
  <div class="signUp">
    <h1>Sign Up</h1>
    <input type="text" v-model="firstName" placeholder="First Name"><br/>
    <input type="text" v-model="lastName" placeholder="Last Name"><br/>
    <input type="text" v-model="email" placeholder="Email"><br/>
    <input type="password" v-model="password" placeholder="Password"><br/>
    <button class="btn btn-primary btn1" @click="signUp">Create account</button>
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
      signUp: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(()=>{
            console.log('Signup successful.');
            this.$swal('Congratulations!', 'Your account had been created!', 'success');
            this.$router.push('/')
          })
          .catch((error)=> {
            this.$swal({
              title: 'Oops!',
              text: error.message,
              type: 'info',
              showCancelButton: false,
            });
            console.log(error.code);
            console.log(error.message);
          });
      }
    }
  }
</script>

<style scoped>
  .signUp {
    margin-top: 40px;
    color: white;
    text-shadow:
      -1px -1px 0 rgb(0,0,0),
      1px -1px 0 rgb(0,0,0),
      -1px 1px 0 rgb(0,0,0),
      1px 1px 0 rgb(0,0,0);
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

  .btn1 {
    width: 300px;
    font-size: x-large;
  }

</style>
