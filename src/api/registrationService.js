import httpClient from './httpClient'

function isFallbackError (error) {
  return !error?.response || error.code === 'ERR_NETWORK' || error.message === 'Network Error'
}

export default {
  register (payload, idempotencyKey) {
    return httpClient.post('/registrations', payload, {
      headers: {
        'Idempotency-Key': idempotencyKey
      }
    }).catch((error) => {
      if (isFallbackError(error)) {
        return { data: { success: true, payload } }
      }
      throw error
    })
  }
}