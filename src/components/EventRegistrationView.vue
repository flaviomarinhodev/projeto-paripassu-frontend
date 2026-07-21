<template>
  <div class="registration">
    <button class="registration__back" @click="$router.push('/')">&larr; Back to events</button>

    <div v-if="loadingEvent" class="registration__loading">Loading event...</div>

    <div v-else-if="event">
      <h2 class="registration__title">{{ event.name }}</h2>
      <p class="registration__subtitle">
        {{ formattedDate }} &middot; {{ event.availableSlots }} / {{ event.totalSlots }} slots available
      </p>

      <AlertMessage
        :message="errorMessage"
        type="error"
        @close="errorMessage = ''"
      />

      <AlertMessage
        :message="successMessage"
        type="success"
        @close="successMessage = ''"
      />

      <form v-if="!registrationConfirmed" class="registration__form" @submit.prevent="submitRegistration">
        <label class="registration__label" for="participantName">Full name</label>
        <input
          id="participantName"
          v-model="form.participantName"
          type="text"
          class="registration__input"
          placeholder="e.g. Jane Doe"
          required
        />

        <label class="registration__label" for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="registration__input"
          placeholder="e.g. jane.doe@email.com"
          required
        />

        <button
          type="submit"
          class="registration__submit"
          :disabled="submitting || event.availableSlots === 0"
        >
          {{ submitting ? 'Processing...' : (event.availableSlots === 0 ? 'Sold out' : 'Confirm registration') }}
        </button>
      </form>

      <div v-else class="registration__confirmed">
        <p>Your registration has been confirmed. A confirmation email has been sent to {{ form.email }}.</p>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from '../components/AlertMessage.vue'
import eventService from '../api/eventService'
import registrationService from '../api/registrationService'
import { generateIdempotencyKey } from '../api/idempotency'

export default {
  name: 'EventRegistrationView',
  components: {
    AlertMessage
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      event: null,
      loadingEvent: true,
      submitting: false,
      registrationConfirmed: false,
      errorMessage: '',
      successMessage: '',
      form: {
        participantName: '',
        email: ''
      },
      idempotencyKey: generateIdempotencyKey()
    }
  },
  computed: {
    formattedDate () {
      if (!this.event) return ''
      const date = new Date(this.event.eventDate)
      return date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  created () {
    this.loadEvent()
  },
  methods: {
    async loadEvent () {
      this.loadingEvent = true
      this.errorMessage = ''
      try {
        const response = await eventService.findById(this.id)
        this.event = response.data
      } catch (error) {
        this.errorMessage = 'Could not load the event details. Please try again.'
      } finally {
        this.loadingEvent = false
      }
    },
    async submitRegistration () {
      if (!this.event) {
        return
      }

      this.submitting = true
      this.errorMessage = ''
      this.successMessage = ''

      const payload = {
        eventId: Number(this.id),
        participantName: this.form.participantName.trim(),
        email: this.form.email.trim()
      }

      try {
        await registrationService.register(payload, this.idempotencyKey)
        this.registrationConfirmed = true
        this.successMessage = 'Your registration has been confirmed.'
      } catch (error) {
        const backendMessage = error.response?.data?.message || error.response?.data?.error
        if (error.response?.status === 409) {
          this.errorMessage = 'This event is no longer available for new registrations.'
        } else if (backendMessage) {
          this.errorMessage = backendMessage
        } else {
          this.errorMessage = 'We could not complete your registration. Please try again.'
        }
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
.registration {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.registration__back {
  align-self: flex-start;
  background: none;
  border: none;
  color: var(--vscode-blue);
  cursor: pointer;
  font-size: 14px;
  padding: 0;
}

.registration__title {
  margin: 0 0 8px 0;
  color: var(--color-text);
}

.registration__subtitle {
  margin: 0 0 20px 0;
  color: #555;
}

.registration__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 420px;
}

.registration__label {
  font-weight: 600;
  color: var(--color-text);
}

.registration__input {
  border: 1px solid #D7E7F5;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
}

.registration__submit {
  margin-top: 8px;
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background-color: var(--vscode-blue);
  color: var(--color-white);
  font-weight: 600;
  cursor: pointer;
}

.registration__submit:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.registration__confirmed {
  padding: 16px;
  border-radius: 8px;
  background-color: var(--vscode-blue-light);
  color: var(--vscode-blue-dark);
}
</style>

