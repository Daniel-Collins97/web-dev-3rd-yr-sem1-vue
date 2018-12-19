import Api from '@/services/api'

export default {
  fetchMembers () {
    return Api().get('/users')
  }
}
