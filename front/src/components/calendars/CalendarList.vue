<template>
  <v-list dense>
    <v-list-item>
      <v-list-item-content>
        <v-subheader>マイカレンダー</v-subheader>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click="initCalendar">
          <v-icon size="16px">mdi-plus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-list-item-group :value="selectedItem">
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

    <!-- calendarステートの値がnullではない時にCalendarFormDialogコンポーネントをダイアログ表示 -->
    <v-dialog :value="calendar !== null" @click:outside="closeDialog" width="600">
      <CalendarFormDialog v-if="calendar !== null" />
    </v-dialog>
  </v-list>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CalendarFormDialog from './CalendarFormDialog';

export default {
  components: { CalendarFormDialog },
  data: () => ({
    selectedItem: null,
  }),
  computed: {
    ...mapGetters('calendars', ['calendars']),
    ...mapGetters('calendars', ['calendars', 'calendar']),
  },
  created() {
    // コンポーネントが呼び出された時にAPIからカレンダーデータを取得しcalendarsステートにデータを保持
    this.fetchCalendars();
  },
  methods: {
    // Vuexストアで定義したfetchCalendarsアクションを呼び出し
    ...mapActions('calendars', ['fetchCalendars', 'setCalendar']),
    initCalendar() {
      this.setCalendar({
        name: '',
        visibility: true,
      });
    },
    closeDialog() {
      this.setCalendar(null);
    },
  },
};
</script>
