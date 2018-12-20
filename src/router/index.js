import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Teams from '@/components/teams'
import Players from '@/components/players'
import Pitches from '@/components/pitches'
import addPlayer from '@/components/addPlayer'
import addTeam from '@/components/addTeam'
import addPitch from '@/components/addPitch'
import editTeam from '@/components/editTeam'
import editPlayer from '@/components/editPlayer'
import editPitch from '@/components/editPitch'
import login from '@/components/login'
import signUp from '@/components/signUp'
import firebase from 'firebase'
import map from '@/components/googleMap'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/players',
      name: 'Players',
      component: Players,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/pitches',
      name: 'Pitches',
      component: Pitches,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addTeams',
      name: 'AddTeam',
      component: addTeam,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addPlayers',
      name: 'AddPlayer',
      component: addPlayer,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addPitch',
      name: 'AddPitch',
      component: addPitch,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editTeam',
      name: 'EditTeam',
      component: editTeam,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editPlayer',
      name: 'EditPlayer',
      component: editPlayer,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editPitch',
      name: 'EditPitch',
      component: editPitch,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: login,
      props: true
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: signUp,
      props: true
    },
    {
      path: '/map',
      name: 'Map',
      component: map,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
    ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  }
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
