<template>
  <div class="event-card">
    <div class="event-card__info">
      <h3 class="event-card__title">{{ event.name }}</h3>
      <p class="event-card__date">{{ formattedDate }}</p>
      <p class="event-card__slots">
        <span :class="slotsBadgeClass">
          {{ event.availableSlots }} / {{ event.totalSlots }} slots available
        </span>
      </p>
    </div>
    <button
      class="event-card__button"
      :disabled="event.availableSlots === 0"
      @click="$emit('register', event.id)"
    >
      {{ event.availableSlots === 0 ? 'Sold out' : 'Register' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedDate () {
      const date = new Date(this.event.eventDate)
      return date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    slotsBadgeClass () {
      return this.event.availableSlots === 0
        ? 'badge badge--danger'
        : 'badge badge--success'
    }
  }
}
</script>

<style scoped>
.event-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #D7E7F5;
  border-radius: 10px;
  padding: 20px 24px;
  margin-bottom: 16px;
  background-color: var(--color-white);
  box-shadow: 0 1px 3px rgba(0, 122, 204, 0.08);
}

.event-card__title {
  margin: 0 0 6px 0;
  font-size: 17px;
  color: var(--color-text);
}

.event-card__date {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #555;
}

.badge {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
}

.badge--success {
  background-color: var(--vscode-blue-light);
  color: var(--vscode-blue-dark);
}

.badge--danger {
  background-color: #FBEAEA;
  color: var(--color-danger);
}

.event-card__button {
  background-color: var(--vscode-blue);
  color: var(--color-white);
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.event-card__button:hover:not(:disabled) {
  background-color: var(--vscode-blue-dark);
}

.event-card__button:disabled {
  background-color: #B9C7D3;
  cursor: not-allowed;
}
</style>