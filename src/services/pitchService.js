import Api from '@/services/api'

export default {
  fetchPitches () {
    return Api().get('/pitches')
  },
  fetchPitch (id) {
    return Api().get(`/pitches/${id}`)
  },
  updatePitch (id, pitch) {
    console.log('REQUESTING ' + pitch._id + ' ' +
      JSON.stringify(pitch, null, 5))
    return Api().put(`/pitches/${id}/updatePitch`, pitch,
      { headers: {'Content-type': 'application/json'} })
  },
  addPitch (pitch) {
    return Api().post('/addPitch', pitch,
      { headers: {'Content-type': 'application/json'} })
  },
  deletePitch (id) {
    return Api().delete(`/deletePitch/${id}`)
  }
}
