<template>
  <div class="hero text">
    <br/>
    <h1 class="vue-title">TeamMe <img src="../assets/team.png" height=100px class="img-circle" style="padding: 5px">
    </h1>
    <table align="center">
      <tr>
        <td>
          <p class="lead"><b><i>Making Team Organizing easy!!</i></b>
          <p>Teams, Players, Pitches all in the one place!</p>
          <p>Just click <a href ="/addPlayer">here</a> to </p>
          <p>start adding Players to the Database!<br/><br/><br/><br/></p>
        </td>
      </tr>
    </table>
    <p></p>
    <p class="lead">Web Development application developed by </p>
    <p><b>Daniel Collins, I.o.T, 20076240</b></p>
  </div>
</template>

<style>
  .hero {
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
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
  }
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    font-size: 70pt;
  }

  .text {
    color: white;
    text-shadow:
      -1px -1px 0 rgb(0,0,0),
      1px -1px 0 rgb(0,0,0),
      -1px 1px 0 rgb(0,0,0),
      1px 1px 0 rgb(0,0,0);
    font-size: 30px;
  }
</style>
