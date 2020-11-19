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
    savedPhotos: [],
    weather: null,
    quote: null,
    user: null,
    users: [],
  },
  mutations: {
    //#region --Photo Methods--
    setPhoto(state, photo) {
      state.photo = photo;
    },
    setSavedPhotos(state, photos) {
      state.savedPhotos = photos;
    },
    //#endregion
    //#region --Weather Methods--
    setWeather(state, weather) {
      state.weather = weather;
    },
    //#endregion
    //#region --Quote Methods--
    setQuote(state, quote) {
      state.quote = quote;
    },
    //#endregion
    //#region --User Methods--
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
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
    async savePhoto({ dispatch, state }, savedPhoto) {
      let combo = {
        original: state.photo,
        updated: savedPhoto,
      };
      await api.post('photos', combo);
      dispatch('getSavedPhotosByUserId', state.user.id);
    },
    async getSavedPhotosByUserId({ commit }, id) {
      console.log(id);
      let res = await api.get('users/' + id + '/photos');
      commit('setSavedPhotos', res.data);
    },
    //#endregion
    //#region --Weather Methods--
    async getWeather({ commit }, coord) {
      try {
        let res = await api.post('weather', coord);
        commit('setWeather', res.data);
      } catch (error) {
        console.log(error.toJSON());
      }
    },
    async getNewWeather({ commit }, cityName) {
      try {
        let res = await api.post('weather/change', cityName);
        commit('setWeather', res.data);
      } catch (error) {
        console.log(error.toJSON());
      }
    },
    //#endregion
    //#region --Quote Methods--

    async getQuote({ commit }) {
      try {
        let res = await api.get('quotes');
        commit('setQuote', res.data);
      } catch (error) {
        console.log(error.toJSON());
      }
    },
    //#endregion
    //#region --User Methods--
    async newUser({ commit }, user) {
      let res = await api.post('users', user);
      await api.post('lastuser', res.data);
      commit('setUser', res.data);
    },
    async getAllUsers({ commit }) {
      let res = await api.get('users');
      commit('setUsers', res.data);
    },
    async getUserById({ commit }, id) {
      let res = await api.get('users/' + id);
      commit('setUser', res.data);
    },
    async getLastUser() {
      let res = await api.get('lastuser');
      return res.data;
    },
    //#endregion
  },
  modules: {},
});
