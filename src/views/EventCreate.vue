<template>
  <div>
    <!-- This is how you can access the state of the store in a template
    <h1>Create Event {{ $store.state.user.name }}</h1>-->
    <h1>Create an Event, {{ user.name }}</h1>
    <ul>
      <li v-for="categorie in categories" :key="categorie">{{ categorie }}</li>
    </ul>
    <p>There are {{ categoiesLenght }} categories</p>
    <p>{{ getTodoById(1) }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  ///////////////////////
  // object spread operator for the state and map, which allows us to mix in additional computed properties
  computed: {
    localComputed() {
      return 'test'
    },
    ...mapGetters(['getTodoById', 'categoiesLenght']),
    ...mapState(['categories', 'user']) // <-- using object spread operator
  }
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
