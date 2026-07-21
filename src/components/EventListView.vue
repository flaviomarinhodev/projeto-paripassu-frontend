<template>
  <div class="event-list">
    <h2 class="event-list__title">Upcoming events</h2>

    <AlertMessage
      :message="errorMessage"
      type="error"
      @close="errorMessage = ''"
    />

    <div v-if="loading" class="event-list__loading">Loading events...</div>

    <div v-else>
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @register="goToRegistration"
      />

      <p v-if="events.length === 0" class="event-list__empty">
        No events available at the moment.
      </p>
    </div>
  </div>
</template>

<script>
import EventCard from '../components/EventCard.vue'
import AlertMessage from '../components/AlertMessage.vue'
import eventService from '../api/eventService'

export default {
  name: 'EventListView',
  components: {
    EventCard,
    AlertMessage
  },
  data () {
    return {
      events: [],
      loading: true,
      errorMessage: ''
    }
  },
  created () {
    this.loadEvents()
  },
  methods: {
    async loadEvents () {
      this.loading = true
      try {
        const response = await eventService.listAll()
        this.events = response.data
      } catch (error) {
        this.errorMessage = 'Could not load the event list. Please try again.'
      } finally {
        this.loading = false
      }
    },
    goToRegistration (eventId) {
      this.$router.push({ name: 'event-registration', params: { id: eventId } })
    }
  }
}
</script>

<style scoped>
.event-list__title {
  font-size: 22px;
  margin-bottom: 20px;
  color: var(--color-text);
}

.event-list__loading,
.event-list__empty {
  color: #777;
  font-size: 14px;
}
</style>