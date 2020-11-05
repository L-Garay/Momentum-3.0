import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let base = window.location.host.includes('localhost:8080')
  ? '//localhost:3000/'
  : '/';

let api = axios.create({ baseURL: base + 'api/' });
export default new Vuex.Store({
  state: {
    photo: null,
    weather: null,
  },
  mutations: {
    //#region --Photo Methods--
    setPhoto(state, photo) {
      state.photo = photo;
    },
    //#endregion
    //#region --Weather Methods--
    setWeather(state, weather) {
      state.weather = weather;
    },
    //#endregion
  },
  actions: {
    //#region --Photo Methods--
    async getPhoto({ commit }) {
      try {
        let res = await api.get('photos');
        commit('setPhoto', res.data);
      } catch (error) {
        console.log(error.toJSON());
      }
    },
    //#endregion
    //#region --Weather Methods--
    async getWeather({ commit }, coord) {
      try {
        let res = await api.get('weather', coord);
        debugger;
        commit('setWeather', res.data);
      } catch (error) {
        console.log(error.toJSON());
      }
    },
    //#endregion
  },
  modules: {},
});
