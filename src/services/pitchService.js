import Api from '@/services/api'

export default {
  fetchPitches () {
    return Api().get('/pitches')
  },
  addPitch (pitch) {
    return Api().post('/addPitch', pitch,
      { headers: {'Content-type': 'application/json'} })
  }
}
