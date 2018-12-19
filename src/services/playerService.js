import Api from '@/services/api'

export default {
  fetchPlayers () {
    return Api().get('/players')
  },
  fetchPlayer (id) {
    return Api().get(`/players/${id}`)
  },
  updatePlayer (id, player) {
    console.log('REQUESTING ' + player._id + ' ' +
      JSON.stringify(player, null, 5))
    return Api().put(`/players/${id}/updatePlayer`, player,
      { headers: {'Content-type': 'application/json'} })
  },
  addPlayer (player) {
    return Api().post('/addPlayers', player,
      { headers: {'Content-type': 'application/json'} })
  },
  deletePlayer (id) {
    return Api().delete(`/deletePlayer/${id}`)
  }
}
