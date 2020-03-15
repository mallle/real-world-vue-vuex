import EventService from '@/services/EventService'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  eventsTotal: 0
}

export const mutations = {
  //Event is the payload coming from the component
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  }
}
export const actions = {
  //takes commit from the context Object - using  object destructuring, and event is the payload, comming from the component
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(response => {
        console.log('Total: ' + response.headers['x-total-count'])
        commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        commit('SET_EVENTS', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetchen events: ' + error.message
        }
        //Dispatch a action from the namespace notification, adding the
        //payload there the const notification
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    //because we already have all events in event,
    //we can use the getter to return only one event
    //instead of sending a new API call.
    //If we don't find the event in the current events
    //then we do send another request to the API.
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventService.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          //   console.log('There was an error:', error.response)
          const notification = {
            type: 'error',
            message: 'There was a problem fetchen event: ' + error.message
          }
          //Dispatch a action from the namespace notification, adding the
          //payload there the const notification
          dispatch('notification/add', notification, { root: true })
        })
    }
  }
}
export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
