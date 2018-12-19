import Api from '@/services/api'

export default {
  fetchTeams() {
    return Api().get('/teams')
  },
  fetchTeam (id) {
    return Api().get(`/teams/${id}`)
  },
  updateTeam (id, team) {
    console.log('REQUESTING ' + team._id + ' ' +
      JSON.stringify(team, null, 5))
    return Api().put(`/teams/${id}/updateTeam`, team,
      { headers: {'Content-type': 'application/json'} })
  },
  addTeam (team) {
    return Api().post('/addTeams', team,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteTeam (id) {
    return Api().delete(`/deleteTeam/${id}`)
  }
}
