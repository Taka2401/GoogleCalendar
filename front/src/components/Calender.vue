<template>
  <div>
    <h1>Calendar</h1>
    <p>events:</p>
    <p>{{ events }}</p>
    <button type="submit">fetchEvents</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: []
    }
  },
  methods: {
    submit() {
      axios.get('http://localhost:3000')(res => {
        this.events = res.data
      })
    }
  },
};
</script>
