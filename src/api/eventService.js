import httpClient from './httpClient'

const fallbackEvents = [
  {
    id: 1,
    name: 'Community Meetup',
    eventDate: '2026-08-10T18:30:00.000Z',
    availableSlots: 12,
    totalSlots: 50
  },
  {
    id: 2,
    name: 'Spring Workshop',
    eventDate: '2026-09-05T14:00:00.000Z',
    availableSlots: 5,
    totalSlots: 25
  },
  {
    id: 3,
    name: 'Networking Night',
    eventDate: '2026-09-20T19:00:00.000Z',
    availableSlots: 0,
    totalSlots: 40
  }
]

function isFallbackError (error) {
  return !error?.response || error.code === 'ERR_NETWORK' || error.message === 'Network Error'
}

export default {
  listAll () {
    return httpClient.get('/events').catch((error) => {
      if (isFallbackError(error)) {
        return { data: fallbackEvents }
      }
      throw error
    })
  },

  findById (id) {
    return httpClient.get(`/events/${id}`).catch((error) => {
      if (isFallbackError(error)) {
        const event = fallbackEvents.find((item) => Number(item.id) === Number(id)) || fallbackEvents[0]
        return { data: event }
      }
      throw error
    })
  }
}