import httpClient from './httpClient'

export default {
  listAll () {
    return httpClient.get('/events')
  },

  findById (id) {
    return httpClient.get(`/events/${id}`)
  }
}