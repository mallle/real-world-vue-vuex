<template>
  <div class="notification-bar">
    <div class="notification-bar" :class="notificationTypeClass">
      <p>{{ notification.message }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    //will set the timer to 5 seconds after the NotificationBar component is
    // mounted to the DOM
    this.timeout = setTimeout(() => this.remove(this.notification), 5000)
  },
  beforeDestroy() {
    //destroy the timeout then the component is destroyed
    clearTimeout(this.timeout)
  },
  methods: mapActions('notification', ['remove'])
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
