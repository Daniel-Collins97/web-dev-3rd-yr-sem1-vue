import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Teams from '@/components/teams'
import Players from '@/components/players'
import Pitches from '@/components/pitches'
import addPlayer from '@/components/addPlayer'
import addTeam from '@/components/addTeam'
import addPitch from '@/components/addPitch'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/teams',
      name: 'Teams',
      component: Teams
    },
    {
      path: '/players',
      name: 'Players',
      component: Players
    },
    {
      path: '/pitches',
      name: 'Pitches',
      component: Pitches
    },
    {
      path: '/addTeams',
      name: 'AddTeam',
      component: addTeam
    },
    {
      path: '/addPlayers',
      name: 'AddPlayer',
      component: addPlayer
    },
    {
      path: '/addPitch',
      name: 'AddPitch',
      component: addPitch
    }
    ]
})
