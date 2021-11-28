<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">{{ calendar.name }}</v-btn>
    </template>
    <v-list max-height="300px">
      <v-list-item v-for="c in calendars" :key="c.id" @click="calendar = c">
        {{ c.name }}
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["value"],
  computed: {
    ...mapGetters("calendars", ["calendars"]),
    calendar: {
      // プロパティが呼び出された時に返す値を定義
      get() {
        // 予定作成時ならデフォルトでcalendarsの最初のデータとして返す
        if (this.value === undefined || this.value === null) {
          this.$emit("input", this.calendars[0]);
          return this.calendars[0];
        }
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
