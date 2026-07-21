import httpClient from './httpClient'

export default {
  register (payload, idempotencyKey) {
    return httpClient.post('/registrations', payload, {
      headers: {
        'Idempotency-Key': idempotencyKey
      }
    })
  }
}