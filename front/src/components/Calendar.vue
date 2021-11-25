<template>
  <div>
    <h1>Calendar</h1>
    <p>events:</p>
    <p>{{ events }}</p>
    <button type="submit" @click="fetchEvents()">fetchEvents</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      events: [],
    };
  },
  methods: {
    fetchEvents() {
      axios
        .get("http://localhost:3000/events")
        .then((res) => {
          this.events = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
