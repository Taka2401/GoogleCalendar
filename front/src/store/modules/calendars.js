import axios from "axios";
import { serializeCalendar } from "../../functions/serializers";

const apiUrl = "http://localhost:3000";

const state = {
  calendars: [],
  calendar: null,
};

const getters = {
  calendars: (state) =>
    state.calendars.map((calendar) => serializeCalendar(calendar)),
  calendar: (state) => serializeCalendar(state.calendar),
};

const mutations = {
  setCalendars: (state, calendars) => (state.calendars = calendars),
  appendCalendar: (state, calendar) =>
    (state.calendars = [...state.calendars, calendar]),
  setCalendar: (state, calendar) => (state.calendar = calendar),
};

const actions = {
  async fetchCalendars({ commit }) {
    const res = await axios.get(`${apiUrl}/calendars`);
    commit("setCalendars", res.data);
  },
  async createCalendar({ commit }, calendar) {
    const res = await axios.post(`${apiUrl}/calendars`, calendar);
    commit("appendCalendar", res.data);
  },
  setCalendar({ commit }, calendar) {
    commit("setCalendar", calendar);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
