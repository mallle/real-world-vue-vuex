<template>
  <div>
    <!-- This is how you can access the state of the store in a template
    <h1>Create Event {{ $store.state.user.name }}</h1>-->
    <!-- This can be used to test some of the computed options below in the script section
      <h1>Create an Event, {{ user.name }}</h1>
    <ul>
      <li v-for="categorie in categories" :key="categorie">{{ categorie }}</li>
    </ul>
    <p>There are {{ categoiesLenght }} categories</p>
    <p>{{ getTodoById(1) }}</p>-->
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      this.$store
        //because we have namespaced the event-module in the store/modules/event.js we need to
        //add event/actionName
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          console.log('There was a problem creating your event')
        })
    },
    createFreshEventObject() {
      //the fist user is the module name, the second user is the state name
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  }
  ///////////////////////
  // object spread operator for the state and map, which allows us to mix in additional computed properties
  // computed: {
  //   localComputed() {
  //     return 'test'
  //   },
  //   ...mapGetters(['getTodoById', 'categoiesLenght']),
  //   ...mapState(['categories', 'user']) // <-- using object spread operator
  // }
  ///////////////////////
  // object spread operator for the state, which allows us to mix in additional computed properties
  // computed: {
  //   getTodo() {
  //     return this.$store.getters.getTodoById
  //   },
  //   catLenght() {
  //     return this.$store.getters.catLenght
  //   },
  //   ...mapState(['categories', 'user']) // <-- using object spread operator
  // }
  ///////////////////////
  //All the following examples take up all the "space" in the computed property and
  //therefor we can not add our own local computed properties - above we will use the
  //object spread operator, which allows us to mix in additional computed properties
  ///////////////////////
  // "unnamed"-states
  // computed: mapState(['categories', 'user'])
  ///////////////////////
  // nameed states
  // computed: mapState({
  //   user: 'user',
  //   categories: 'categories'
  // })
  ///////////////////////
  //If we don't want to use the top-level state we can use this, then we dont need to user
  //. notation in the template <h1>Create an Event, {{ userName }}</h1>
  // computed: mapState({
  //   userName: state => state.user.name,
  //   userID: state => state.user.id,
  //   categories: state => state.user.categories
  // })
  ///////////////////////
  // computed: {
  //   /**
  //    * Use this if you don't want to use import { mapState } from 'vuex'
  //    */
  //   userName() {
  //     /*
  //      * This is how you can access the sore within the default object - remeber this.$store
  //      * We can access store with the $-sign because we registered the store on the vue instance
  //      * in our App.vue file
  //      * */
  //     return this.$store.state.user.name
  //   },
  //   userId() {
  //     return this.$store.state.user.id
  //   }
  // }
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
