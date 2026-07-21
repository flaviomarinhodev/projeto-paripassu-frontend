import Vue from 'vue'
import VueRouter from 'vue-router'
import EventListView from './components/EventListView.vue'
import EventRegistrationView from './components/EventRegistrationView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventListView
  },
  {
    path: '/events/:id/register',
    name: 'event-registration',
    component: EventRegistrationView,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router