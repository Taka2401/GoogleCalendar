import axios from 'axios';
import { serializeCalendar } from '../../functions/serializers';

const apiUrl = 'http://localhost:3000';

const state = {
  calendars: [],
};

const getters = {
  calendars: state => state.calendars.map(calendar => serializeCalendar(calendar)),
};

const mutations = {
  setCalendars: (state, calendars) => (state.calendars = calendars),
};

const actions = {
  async fetchCalendars({ commit }) {
    const res = await axios.get(`${apiUrl}/calendars`);
    commit('setCalendars', res.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
