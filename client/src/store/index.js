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
    savedQuotes: [],
    user: null,
    users: [],
    todos: [],
    completedTodos: [],
    customListTodos: [],
    customListTodosDontUse: [],
    usersTodoLists: [],
    newsWithPicture: [],
    newsNoPicture: [],
    finance: {
      currentFinanceNews: [],
      allFinanceNews: [],
      // financeWinners: [],
      // financeLosers: [],
      financeWinnersLosers: [],
      undervalued: [],
      technology: [],
      growers: [],
    },
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
    setSavedQuotes(state, quotes) {
      state.savedQuotes = quotes;
    },
    //#endregion

    //#region --User Methods--
    setUser(state, user) {
      state.user = user || {};
    },
    setUsers(state, users) {
      state.users = users || [];
    },
    resetUser(state) {
      state.user = null;
    },
    //#endregion

    //#region --Todo Methods--
    setTodos(state, todos) {
      let completedArr = [];
      let todoArr = [];
      let customListTodos = [];
      todos.forEach((t) => {
        if (t.listId !== null) {
          customListTodos.push(t);
        } else if (t.completed == true) {
          completedArr.push(t);
        } else if (t.completed == false) {
          todoArr.push(t);
        }
      });
      // NOTE This method will recieve every single todo a user has, regardless of if it belongs to a custom list or not. However, in reality we only care about the todos without a listId property (the ones with a listId will be handled by the 'setCustomTodos' method), and so to ensure that the customTodosArray is not overwritten and filled with ALL custom todos I created essentialy a fake or dump array to store ALL custom todos.
      state.todos = todoArr;
      state.completedTodos = completedArr;
      state.customListTodosDontUse = customListTodos;
      // NOTE after updating a todo's completed property it will run this method. We want to check to see if any of the newly fetched custom todos are completed or not, if they are, remove them from the customListTodos array and insert it into the completedTodos array
      state.customListTodosDontUse.forEach((t) => {
        if (t.completed == true) {
          let todoIndexToRemove = state.customListTodos.findIndex(
            (todo) => todo._id == t._id
          );
          state.customListTodos.splice(todoIndexToRemove, 1);
          state.completedTodos.push(t);
        }
      });
    },
    setCustomTodos(state, todos) {
      state.customListTodos = todos;
    },
    //#endregion

    //#region --TodoList Methods--
    setTodoLists(state, todoLists) {
      state.usersTodoLists = todoLists;
    },
    //#endregion

    //#region --News Methods--
    setNews(state, news) {
      state.newsWithPicture = news.slice(0, 20);
      state.newsNoPicture = news.slice(20);
    },
    //#endregion

    //#region --Finance Methods--
    setFinanceNews(state, news) {
      state.finance.currentFinanceNews = news.slice(0, 10);
      state.finance.allFinanceNews = news;
    },
    setNewFinanceNews(state, indexes) {
      state.finance.currentFinanceNews = state.finance.allFinanceNews.slice(
        indexes.start,
        indexes.finish
      );
    },
    // setWinners(state, winners) {
    //   state.financeWinners = winners;
    // },
    // setLosers(state, losers) {
    //   state.financeLosers = losers;
    // },
    setWinnersLosers(state, combined) {
      state.finance.financeWinnersLosers = combined;
    },
    setUndervalued(state, stocks) {
      state.finance.undervalued = stocks;
    },
    setTechnology(state, stocks) {
      state.finance.technology = stocks;
    },
    setGrowers(state, stocks) {
      state.finance.growers = stocks;
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
    async getSavedPhotosByUserId({ commit }, id) {
      console.log(id);
      let res = await api.get('users/' + id + '/photos');
      commit('setSavedPhotos', res.data);
    },
    async getPhotoById({ commit }, id) {
      let res = await api.get('photos/' + id);
      commit('setPhoto', res.data);
    },
    async savePhoto({ dispatch, state }, savedPhoto) {
      // original is used to send back to unsplash for their method to keep track, updated goes to DB
      let combo = {
        original: state.photo,
        updated: savedPhoto,
      };
      await api.post('photos', combo);
      dispatch('getSavedPhotosByUserId', state.user.id);
    },
    async deletePhotoById({ dispatch, state }, id) {
      await api.delete('photos/' + id);
      dispatch('getSavedPhotosByUserId', state.user.id);
    },
    //#endregion

    //#region --Weather Methods--
    async getWeather({ commit }, coord) {
      try {
        let res = await api.post('weather', coord);
        commit('setWeather', res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getNewWeather({ commit }, cityName) {
      try {
        let res = await api.post('weather/change', cityName);
        commit('setWeather', res.data);
      } catch (error) {
        console.log(error);
      }
    },
    //#endregion

    //#region --Quote Methods--
    async getQuote({ commit }) {
      try {
        let res = await api.get('quotes');
        commit('setQuote', res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getSavedQuotesByUserId({ commit }, id) {
      let res = await api.get('users/' + id + '/quotes');
      commit('setSavedQuotes', res.data);
    },
    async getQuoteById({ commit }, id) {
      let res = await api.get('quotes/' + id);
      commit('setQuote', res.data);
    },
    async saveQuote({ commit }, savedQuote) {
      let res = await api.post('quotes', savedQuote);
      commit('setQuote', res.data);
    },
    async deleteQuote({ dispatch, state }, id) {
      await api.delete('quotes/' + id);
      dispatch('getSavedQuotesByUserId', state.user.id);
    },
    //#endregion

    //#region --User Methods--
    async newUser({ commit, dispatch }, user) {
      let res = await api.post('users', user);
      await api.post('lastuser', res.data);
      commit('setUser', res.data);
      dispatch('getAllUsers');
    },
    async getAllUsers({ commit }) {
      let res = await api.get('users');
      commit('setUsers', res.data);
    },
    async getUserById({ commit }, id) {
      let res = await api.get('users/' + id);
      await api.post('lastuser', res.data);
      commit('setUser', res.data);
    },
    async getLastUser() {
      let res = await api.get('lastuser');
      return res.data;
    },
    async updateUserById({ commit }, user) {
      api.put('lastuser', user);
      let res = await api.put('users', user);
      commit('setUser', res.data);
    },
    async deleteUserById({ dispatch }, id) {
      await api.delete('users/' + id);
      dispatch('getAllUsers').then(() => {
        dispatch('resetUser', id);
      });
    },
    resetUser({ commit, state }, id) {
      if (state.users.length == 0 || state.user.id == id) {
        commit('resetUser');
      }
    },
    //#endregion

    //#region --Todo Methods--
    async submitTodo({ dispatch }, todo) {
      await api.post('todos', todo);
      dispatch('getTodosByUserId', todo.userId);
    },
    async submitCustomTodo({ dispatch }, todo) {
      await api.post('todos', todo);
      dispatch('getTodosByListId', todo.listId);
    },
    async getTodosByUserId({ commit }, id) {
      let res = await api.get('users/' + id + '/todos');
      commit('setTodos', res.data);
    },
    async getTodosByListId({ commit }, id) {
      let res = await api.get('todoLists/' + id + '/todos');
      commit('setCustomTodos', res.data);
    },
    async updateTodo({ dispatch }, todo) {
      await api.put('todos/' + todo._id, todo);
      dispatch('getTodosByUserId', todo.userId);
    },
    async deleteTodo({ dispatch }, todo) {
      await api.delete('todos/' + todo._id);
      dispatch('getTodosByUserId', todo.userId);
    },
    async deleteCustomTodo({ dispatch }, todo) {
      await api.delete('todos/' + todo._id);
      dispatch('getTodosByListId', todo.listId);
    },
    //#endregion

    //#region --TodoList Methods--
    async submitList({ dispatch }, list) {
      await api.post('todoLists', list);
      dispatch('getTodoListsByUserId', list.userId);
    },
    async getTodoListsByUserId({ commit }, id) {
      let res = await api.get('users/' + id + '/todoLists');
      commit('setTodoLists', res.data);
    },
    async deleteTodoList({ dispatch }, todoList) {
      await api.delete('todoLists/' + todoList._id);
      dispatch('getTodoListsByUserId', todoList.userId);
    },
    //#endregion

    //#region --News Methods--
    async getNews({ commit }) {
      let res = await api.get('news');
      commit('setNews', res.data.value);
    },
    async getNewNews({ commit }, news) {
      let res = await api.post('news/change', news);
      let customArr = [];
      res.data.value.forEach((n) => {
        if (Object.prototype.hasOwnProperty.call(n, 'image')) {
          n.image.url = n.image.thumbnail.contentUrl;
          n.webSearchUrl = n.url;
          customArr.unshift(n);
        } else {
          n.image = {
            url:
              'https://www.conchovalleyhomepage.com/wp-content/uploads/sites/83/2020/05/BREAKING-NEWS-GENERIC-1.jpg?w=100&h=100&crop=1',
          };
          n.webSearchUrl = n.url;
          customArr.push(n);
        }
      });
      commit('setNews', customArr);
    },
    //#endregion

    //#region --Finance Methods--
    async getFinanceNews({ commit }) {
      let res = await api.get('finance/news');
      commit('setFinanceNews', res.data);
    },
    nextNews({ commit, state }) {
      let lastElementIndex = state.finance.currentFinanceNews.length - 1;
      let newsToFind = state.finance.currentFinanceNews[lastElementIndex];
      let indexOfNewsToFind = state.finance.allFinanceNews.indexOf(newsToFind);

      let indexes = {
        start: indexOfNewsToFind + 1,
        finish: indexOfNewsToFind + 11,
      };
      commit('setNewFinanceNews', indexes);
    },
    previousNews({ commit, state }) {
      let newsToFind = state.finance.currentFinanceNews[0];
      let indexOfNewsToFind = state.finance.allFinanceNews.indexOf(newsToFind);

      let indexes = {
        start: indexOfNewsToFind - 10,
        finish: indexOfNewsToFind,
      };
      commit('setNewFinanceNews', indexes);
    },
    async getWinnersLosers({ commit }) {
      let win = await api.get('finance/win');
      let lose = await api.get('finance/lose');
      // commit('setWinners', win.data.quotes);
      // commit('setLosers', lose.data.quotes);
      let combined = [];
      combined.push(win.data.quotes);
      combined.push(lose.data.quotes.reverse());
      let combinedFlat = combined.flat();
      combinedFlat.forEach((s) => {
        if (Math.sign(s.regularMarketChangePercent) == 1) {
          s.positive = true;
        } else if (Math.sign(s.regularMarketChangePercent) == -1) {
          s.positive = false;
        }
      });
      commit('setWinnersLosers', combinedFlat);
    },
    async getUndervalued({ commit }) {
      let res = await api.get('finance/undervalued');
      commit('setUndervalued', res.data.quotes);
    },
    async getTechnology({ commit }) {
      let res = await api.get('finance/technology');
      commit('setTechnology', res.data.quotes);
    },
    async getGrowers({ commit }) {
      let res = await api.get('finance/growers');
      commit('setGrowers', res.data.quotes);
    },
    //#endregion
  },
  modules: {},
});
