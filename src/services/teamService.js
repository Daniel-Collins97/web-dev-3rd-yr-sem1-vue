import Api from '@/services/api'

export default {
  fetchTeams() {
    return Api().get('/teams')
  },
  addTeam (team) {
    return Api().post('/addTeams', team,
      { headers: {'Content-type': 'application/json'} })
  }
}
