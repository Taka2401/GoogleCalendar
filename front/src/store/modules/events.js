import axios from "axios";
import { isDateWithinInterval, compareDates } from "../../functions/datetime";
import { serializeEvent } from "../../functions/serializers";

const apiUrl = "http://localhost:3000";

const state = {
  events: [],
  event: null,
  isEditMode: false,
  clickedDate: null,
};

const getters = {
  // events: (state) =>
  //   state.events.map((event) => {
  //     return {
  //       ...event,
  //       start: new Date(event.start),
  //       end: new Date(event.end),
  //     };
  //   }),
  // event: (state) =>
  //   state.event
  //     ? {
  //         ...state.event,
  //         start: new Date(state.event.start),
  //         end: new Date(state.event.end),

  //         // カレンダーでクリックした時の日付を文字列に変換して代入
  //         startDate: format(new Date(state.event.start), 'yyyy/MM/dd'),
  //         endDate: format(new Date(state.event.end), 'yyyy/MM/dd'),
  //       }
  //     : null,

  // カレンダーのvisibilityがtrueのデータだけ残した配列を返す
  events: (state) =>
    state.events
      .filter((event) => event.calendar.visibility)
      .map((event) => serializeEvent(event)),
  event: (state) => serializeEvent(state.event),
  dayEvents: (state) =>
    state.events
      .map((event) => serializeEvent(event))
      .filter((event) =>
        isDateWithinInterval(state.clickedDate, event.startDate, event.endDate)
      )
      // startの日時が早い順にソート
      .sort(compareDates),
  isEditMode: (state) => state.isEditMode,
  clickedDate: (state) => state.clickedDate,
};

const mutations = {
  setEvents: (state, events) => (state.events = events),

  // event変数には先ほどのレスポンスデータが入る
  // state.events配列にeventデータを追加
  appendEvent: (state, event) => (state.events = [...state.events, event]),
  setEvent: (state, event) => (state.event = event),

  // eventsステートから削除した予定だけ除く処理
  removeEvent: (state, event) =>
    (state.events = state.events.filter((e) => e.id !== event.id)),
  resetEvent: (state) => (state.event = null),

  // eventsステートの中にある更新前のデータを更新後のデータに入れ替える処理
  updateEvent: (state, event) =>
    (state.events = state.events.map((e) => (e.id === event.id ? event : e))),
  setEditMode: (state, bool) => (state.isEditMode = bool),
  setClickedDate: (state, date) => (state.clickedDate = date),
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
    commit("appendEvent", res.data);
  },
  async deleteEvent({ commit }, id) {
    // 引数に予定のidを受け取り、削除APIを叩いて予定を削除
    const res = await axios.delete(`${apiUrl}/events/${id}`);
    commit("removeEvent", res.data);
    commit("resetEvent");
  },
  async updateEvent({ commit }, event) {
    const res = await axios.put(`${apiUrl}/events/${event.id}`, event);
    commit("updateEvent", res.data);
  },
  setEvent({ commit }, event) {
    commit("setEvent", event);
  },
  setEditMode({ commit }, bool) {
    commit("setEditMode", bool);
  },
  setClickedDate({ commit }, date) {
    commit("setClickedDate", date);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
