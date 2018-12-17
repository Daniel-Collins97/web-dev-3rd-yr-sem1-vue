import Api from '@/services/api'

export default {
  fetchPlayers () {
    return Api().get('/players')
  },
  addPlayer (player) {
    return Api().post('/addPlayers', player,
      { headers: {'Content-type': 'application/json'} })
  }
}
