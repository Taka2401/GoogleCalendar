<template>
  <div>
    <v-sheet height="100vh">
      <v-calendar></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("events", ["events"]),
  },
  methods: {
    ...mapActions("events", ["fetchEvents"]),
  },
};
</script>
