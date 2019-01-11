<template>
  <div class="hero text">
    <br/>
    <h1 class="vue-title">TeamMe <img src="../assets/team.png" height=100px style="padding: 5px">
    </h1>
    <table align="center">
      <tr>
        <td>
          <p class="lead"><b><i>Making Team Organizing easy!!</i></b>
          <p>Teams, Players, Pitches all in the one place!</p>
          <div class="container">
            <i class="fa fa-plus-circle image"></i>
            <div class="overlay">
              <router-link to="/addPlayers" class="icon" title="Plus Icon">
                <i class="fa fa-plus"></i>
              </router-link>
            </div>
          </div>
          <p>Just click the Image above to get started<br/>Adding players!<br/><br/><br/></p>
        </td>
      </tr>
    </table>
    <br/>
    <p class="lead">Web Development application developed by </p>
    <p><b>Daniel Collins, I.o.T, 20076240</b></p>
    <br/>
  </div>
</template>

<style scoped>
  .hero {
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
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


  .image {
    display: block;
    transition: .5s ease;
  }

  .container {
    position: relative;
  }
  .fa{
    font-size: 200px;
    color: white;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: .5s ease;
    color: white;
  }

  .container:hover .overlay {
    opacity: 1;
  }

  .container:hover .image {
    opacity: 0;
  }
</style>
