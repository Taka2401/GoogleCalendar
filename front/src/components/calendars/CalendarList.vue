<template>
  <v-list dense>
    <v-list-item-group :value="selectedItem">
      <v-subheader>マイカレンダー</v-subheader>
      <v-list-item v-for="calendar in calendars" :key="calendar.id">
        <v-list-item-content class="pa-1">
          <v-checkbox
            dense
            v-model="calendar.visibility"
            :color="calendar.color"
            :label="calendar.name"
            class="pb-2"
            hide-details="true"
          ></v-checkbox>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CalendarList',
  data: () => ({
    selectedItem: null,
  }),
  computed: {
    ...mapGetters('calendars', ['calendars']),
  },
  created() {
    // コンポーネントが呼び出された時にAPIからカレンダーデータを取得しcalendarsステートにデータを保持
    this.fetchCalendars();
  },
  methods: {
    // Vuexストアで定義したfetchCalendarsアクションを呼び出し
    ...mapActions('calendars', ['fetchCalendars']),
  },
};
</script>
