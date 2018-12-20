<template>
  <div class="login">
    <h1>Sign In</h1>
    <input type="text" v-model="email" placeholder="Email"><br/>
    <input type="password" v-model="password" placeholder="Password"><br/>
    <button class="btn btn-primary btn1" @click="login">Log In</button><br/><br/>
    <h3>Dont have an account?</h3>
    <h3><router-link to="/signUp" class="signup"><button class="btn btn-primary btn2">Sign-Up</button></router-link></h3>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data() {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      login: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(()=>{
            this.$router.push('/')
          })
          .catch((error)=> {
            this.$swal({
              title: 'Oops!',
              text: error.message,
              type: 'error',
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
  .login {
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

  .btn1 {
    width: 300px;
    font-size: x-large;
  }

  .btn2 {
    width: 150px;
    font-size: large;
  }

  .signup {
    cursor: pointer;
    color: white;
    text-decoration: none;
  }

</style>
