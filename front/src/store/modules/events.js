import axios from "axios";

const apiUrl = "http://localhost:3000";

const state = {
  events: [],
  event: null,
  isEditMode: false,
};

const getters = {
  events: (state) =>
    state.events.map((event) => {
      return {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      };
    }),
  event: (state) =>
    state.event
      ? {
          ...state.event,
          start: new Date(state.event.start),
          end: new Date(state.event.end),
        }
      : null,
  isEditMode: (state) => state.isEditMode,
};

const mutations = {
  setEvents: (state, events) => (state.events = events),

  // event変数には先ほどのレスポンスデータが入る
  // state.events配列にeventデータを追加
  appendEvent: (state, event) => (state.events = [...state.events, event]),
  setEvent: (state, event) => (state.event = event),
  setEditMode: (state, bool) => (state.isEditMode = bool),
};

const actions = {
  async fetchEvents({ commit }) {
    const res = await axios.get(`${apiUrl}/events`);
    commit("setEvents", res.data); // mutationを呼び出す
  },
  async createEvent({ commit }, event) {
    // eventデータをパラメータとしてPOSTリクエストを送る
    const res = await axios.post(`${apiUrl}/events`, event);
    // レスポンスデータをappendEventミューテーションに渡す
    commit('appendEvent', res.data);
  },
  setEvent({ commit }, event) {
    commit("setEvent", event);
  },
  setEditMode({ commit }, bool) {
    commit("setEditMode", bool);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
