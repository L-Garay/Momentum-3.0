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
    photo: {
      photo: null,
      savedPhotos: [],
    },
    weather: {
      weather: {},
      forecast: {
        current: {},
        dayOne: [],
        dayTwo: [],
        dayThree: [],
        dayFour: [],
        dayFive: [],
      },
    },
    quote: {
      quote: {},
      savedQuotes: [],
    },
    user: {
      user: null,
      users: [],
      changeUser: [],
      noUser: true,
      userCount: 0,
      userShowChange: true,
    },
    todo: {
      todos: [],
      completedTodos: [],
      customListTodos: [],
      customListTodosDontUse: [],
      usersTodoLists: [],
    },
    news: {
      newsWithPicture: [],
      newsNoPicture: [],
      category: {
        highlighted: [],
        others: [],
      },
      home: {
        main: {},
        justText: [],
        others: [],
      },
      search: {
        news: [],
      },
    },
    finance: {
      currentFinanceNews: [],
      allFinanceNews: [],
      financeWinnersLosers: [],
      undervalued: [],
      technology: [],
      growers: [],
    },
    sports: {
      highlightedNews: {},
      otherHighlighted: [],
      news: [],
      leagueNews: [],
      upcoming15: [],
      previous15: [],
    },
    contacts: {
      all: [],
      specificLetter: [],
      contact: {},
      currentLetter: 'A',
    },
  },
  mutations: {
    //#region --Photo Methods--
    setPhoto(state, photo) {
      state.photo.photo = photo;
    },
    setSavedPhotos(state, photos) {
      state.photo.savedPhotos = photos;
    },
    //#endregion

    //#region --Weather Methods--
    setWeather(state, weather) {
      state.weather.weather = weather;
      state.weather.forecast.current = weather;
    },
    setNewWeather(state, weather) {
      state.weather.weather = weather.singleDay.data;
      state.weather.forecast.current = weather.singleDay.data;
    },
    setWeatherForecast(state, weather) {
      state.weather.forecast.dayOne = weather[0];
      state.weather.forecast.dayTwo = weather[1];
      state.weather.forecast.dayThree = weather[2];
      state.weather.forecast.dayFour = weather[3];
      state.weather.forecast.dayFive = weather[4];
    },
    //#endregion

    //#region --Quote Methods--
    setQuote(state, quote) {
      state.quote.quote = quote;
    },
    setSavedQuotes(state, quotes) {
      state.quote.savedQuotes = quotes;
    },
    //#endregion

    //#region --User Methods--
    setUser(state, user) {
      state.user.user = user || {};
      if (state.user.noUser == true) {
        state.user.noUser = false;
      }
    },
    setUsers(state, users) {
      state.user.userCount = 0;
      if (state.user.user) {
        let notCurrentUser = users.filter((u) => {
          if (u._id == state.user.user._id) {
            return false;
          } else {
            return true;
          }
        });
        state.user.changeUser = notCurrentUser || [];
        state.user.users = users || [];
      } else if (!state.user.user) {
        // This is for the situation where a 'logged in' user deletes themself but there is still other/another user in the database, so the 'lastUser' was also deleted and the next time the app starts up, no initial user will be set, so the only option is to create a new one, choose the other users or delete them, without this, none of the lists would be populated
        state.user.changeUser = users || [];
        state.user.users = users || [];
      }
      users.forEach(() => {
        state.user.userCount += 1;
      });
    },
    resetUser(state) {
      state.user.user = null;
      state.user.noUser = true;
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
      state.todo.todos = todoArr;
      state.todo.completedTodos = completedArr;
      state.todo.customListTodosDontUse = customListTodos;
      // NOTE after updating a todo's completed property it will run this method. We want to check to see if any of the newly fetched custom todos are completed or not, if they are, remove them from the customListTodos array and insert it into the completedTodos array
      state.todo.customListTodosDontUse.forEach((t) => {
        if (t.completed == true) {
          let todoIndexToRemove = state.todo.customListTodos.findIndex(
            (todo) => todo._id == t._id
          );
          state.todo.customListTodos.splice(todoIndexToRemove, 1);
          state.todo.completedTodos.push(t);
        }
      });
    },
    setCustomTodos(state, todos) {
      state.todo.customListTodos = todos;
    },
    //#endregion

    //#region --TodoList Methods--
    setTodoLists(state, todoLists) {
      state.todo.usersTodoLists = todoLists;
    },
    //#endregion

    //#region --News Methods--
    setNews(state, news) {
      state.news.home.others = news.slice(0, 20);
      state.news.newsWithPicture = news.slice(0, 20);
      state.news.newsNoPicture = news.slice(20);
    },
    setNewsCategory(state, news) {
      console.log('regular', news);
      state.news.category.highlighted = news;
    },
    setHomeNews(state, news) {
      state.news.home.main = news[0];
      state.news.home.justText = news.slice(1, 7);
    },
    setSearchNews(state, news) {
      state.news.search.news = news;
    },
    // setNewsCategoryExtra(state, news) {
    //   console.log('extra', news);
    // },
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

    //#region --Sports Methods--
    setSportsNews(state, sports) {
      // Set the first highlightedNews object with first news article
      let first = sports.shift();
      state.sports.highlightedNews = first;
      // Grab the next three articles and make them the otherHighlighted array
      let nextThree = sports.slice(0, 3);
      state.sports.otherHighlighted = nextThree;
      sports.splice(0, 3);
      // Set the rest
      state.sports.news = sports;
    },
    // setMoreSportsNews(state, sports) {
    //   state.sports.news.push(sports);
    //   state.sports.news = state.sports.news.flat();
    // },
    setNewsSports(state, news) {
      state.sports.leagueNews = news;
    },
    switchHighlighted(state, data) {
      // Grab the current highlightedNews object and push it into otherHighlighted array
      let oldHighlighted = state.sports.highlightedNews;
      state.sports.otherHighlighted.push(oldHighlighted);
      // Remove the highlighted news to be from the otherHighlighted array
      state.sports.otherHighlighted.splice(data.index, 1);
      // Set it as the new highlightedNews object
      state.sports.highlightedNews = data.other;
    },
    setGames(state, games) {
      state.sports.previous15 = games.previous.data.events;
      state.sports.upcoming15 = games.upcoming.data.events;
    },
    //#endregion

    //#region --Contacts Methods--
    setContacts(state, contacts) {
      state.contacts.all = contacts;
    },
    setFilteredContacts(state, contacts) {
      state.contacts.specificLetter = contacts;
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
        original: state.photo.photo,
        updated: savedPhoto,
      };
      await api.post('photos', combo);
      dispatch('getSavedPhotosByUserId', state.user.user.id);
    },
    async deletePhotoById({ dispatch, state }, id) {
      await api.delete('photos/' + id);
      dispatch('getSavedPhotosByUserId', state.user.user.id);
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
    async getNewWeather({ commit }, city) {
      try {
        let weather = {};
        weather.singleDay = await api.post('weather/change', city);
        weather.forecast = await api.post('weather/forecast/new', city);
        console.log('weather', weather);
        commit('setNewWeather', weather);
        // TODO Fix this wet code and make it into it's own seperate function
        // NOTE see TODO above
        // TODO see NOTE above
        // NOTE see TODO above
        // Create basic weather data object
        let day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        // Create empty array to push modified objects into
        let data = [];
        // Split up the data into the proper day 'chunks' -- 8 data points = 1 day (each data point is 3hrs)
        let dayOneRaw = weather.forecast.data.list.slice(0, 8);
        let dayTwoRaw = weather.forecast.data.list.slice(8, 16);
        let dayThreeRaw = weather.forecast.data.list.slice(16, 24);
        let dayFourRaw = weather.forecast.data.list.slice(24, 32);
        let dayFiveRaw = weather.forecast.data.list.slice(32);
        // So for each day chunk we need to grab the day's high/low temp, humidity, wind speed, and feels like values; and to do that I used a forloop to iterate over each 'day' and capture the high and low values.
        for (let i = 0; i < dayOneRaw.length; i++) {
          // Get the day high
          if (dayOneRaw[i].main.temp > day.high) {
            day.high = dayOneRaw[i].main.temp;
          }
          // Get the day low
          if (dayOneRaw[i].main.temp < day.low) {
            day.low = dayOneRaw[i].main.temp;
          }
          // Get the feels high
          if (dayOneRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayOneRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayOneRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayOneRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayOneRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayOneRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayOneRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayOneRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayOneRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayOneRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayOneRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayOneRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayOne';
          // Get the date
          day.date = dayOneRaw[i].dt_txt.slice(0, 10);
        }
        // Then I just used the 5th data point (4th index), which is equivalent to noon, to grab the weather condition for that day.
        day.condition = dayOneRaw[4].weather[0].main;
        // Push it into data array
        data.push(day);
        // Reset the day object
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        for (let i = 0; i < dayTwoRaw.length; i++) {
          // Get the day high
          if (dayTwoRaw[i].main.temp > day.high) {
            day.high = dayTwoRaw[i].main.temp;
          }
          // Get the day low
          if (dayTwoRaw[i].main.temp < day.low) {
            day.low = dayTwoRaw[i].main.temp;
          }
          // Get the feels high
          if (dayTwoRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayTwoRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayTwoRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayTwoRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayTwoRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayTwoRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayTwoRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayTwoRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayTwoRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayTwoRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayTwoRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayTwoRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayTwo';
          // Get the date
          day.date = dayTwoRaw[i].dt_txt.slice(0, 10);
        }
        day.condition = dayTwoRaw[4].weather[0].main;
        data.push(day);
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        for (let i = 0; i < dayThreeRaw.length; i++) {
          // Get the day high
          if (dayThreeRaw[i].main.temp > day.high) {
            day.high = dayThreeRaw[i].main.temp;
          }
          // Get the day low
          if (dayThreeRaw[i].main.temp < day.low) {
            day.low = dayThreeRaw[i].main.temp;
          }
          // Get the feels high
          if (dayThreeRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayThreeRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayThreeRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayThreeRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayThreeRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayThreeRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayThreeRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayThreeRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayThreeRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayThreeRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayThreeRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayThreeRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayThree';
          // Get the date
          day.date = dayThreeRaw[i].dt_txt.slice(0, 10);
        }
        day.condition = dayThreeRaw[4].weather[0].main;
        data.push(day);
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        for (let i = 0; i < dayFourRaw.length; i++) {
          // Get the day high
          if (dayFourRaw[i].main.temp > day.high) {
            day.high = dayFourRaw[i].main.temp;
          }
          // Get the day low
          if (dayFourRaw[i].main.temp < day.low) {
            day.low = dayFourRaw[i].main.temp;
          }
          // Get the feels high
          if (dayFourRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayFourRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayFourRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayFourRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayFourRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayFourRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayFourRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayFourRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayFourRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayFourRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayFourRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayFourRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayFour';
          // Get the date
          day.date = dayFourRaw[i].dt_txt.slice(0, 10);
        }
        day.condition = dayFourRaw[4].weather[0].main;
        data.push(day);
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        for (let i = 0; i < dayFiveRaw.length; i++) {
          // Get the day high
          if (dayFiveRaw[i].main.temp > day.high) {
            day.high = dayFiveRaw[i].main.temp;
          }
          // Get the day low
          if (dayFiveRaw[i].main.temp < day.low) {
            day.low = dayFiveRaw[i].main.temp;
          }
          // Get the feels high
          if (dayFiveRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayFiveRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayFiveRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayFiveRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayFiveRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayFiveRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayFiveRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayFiveRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayFiveRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayFiveRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayFiveRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayFiveRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayFive';
          // Get the date
          day.date = dayFiveRaw[i].dt_txt.slice(0, 10);
        }
        day.condition = dayFiveRaw[4].weather[0].main;
        data.push(day);
        // Finally send the data array (which should now have 5 objects (days) with weather data)
        commit('setWeatherForecast', data);
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
      } catch (error) {
        console.log(error);
      }
    },
    async getWeatherForecast({ commit }, coords) {
      try {
        let res = await api.post('weather/forecast', coords);
        console.log(res.data.list);
        // Create basic weather data object
        let day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        // Create empty array to push modified objects into
        let data = [];
        // Split up the data into the proper day 'chunks' -- 8 data points = 1 day (each data point is 3hrs)
        let dayOneRaw = res.data.list.slice(0, 8);
        let dayTwoRaw = res.data.list.slice(8, 16);
        let dayThreeRaw = res.data.list.slice(16, 24);
        let dayFourRaw = res.data.list.slice(24, 32);
        let dayFiveRaw = res.data.list.slice(32);
        // So for each day chunk we need to grab the day's high/low temp, humidity, wind speed, and feels like values; and to do that I used a forloop to iterate over each 'day' and capture the high and low values.
        for (let i = 0; i < dayOneRaw.length; i++) {
          // Get the day high
          if (dayOneRaw[i].main.temp > day.high) {
            day.high = dayOneRaw[i].main.temp;
          }
          // Get the day low
          if (dayOneRaw[i].main.temp < day.low) {
            day.low = dayOneRaw[i].main.temp;
          }
          // Get the feels high
          if (dayOneRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayOneRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayOneRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayOneRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayOneRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayOneRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayOneRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayOneRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayOneRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayOneRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayOneRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayOneRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayOne';
          // Get the date
          day.date = dayOneRaw[i].dt_txt.slice(0, 10);
        }
        // Then I just used the 5th data point (4th index), which is equivalent to noon, to grab the weather condition for that day.
        day.condition = dayOneRaw[4].weather[0].main;
        // Push it into data array
        data.push(day);
        // Reset the day object
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        for (let i = 0; i < dayTwoRaw.length; i++) {
          // Get the day high
          if (dayTwoRaw[i].main.temp > day.high) {
            day.high = dayTwoRaw[i].main.temp;
          }
          // Get the day low
          if (dayTwoRaw[i].main.temp < day.low) {
            day.low = dayTwoRaw[i].main.temp;
          }
          // Get the feels high
          if (dayTwoRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayTwoRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayTwoRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayTwoRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayTwoRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayTwoRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayTwoRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayTwoRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayTwoRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayTwoRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayTwoRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayTwoRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayTwo';
          // Get the date
          day.date = dayTwoRaw[i].dt_txt.slice(0, 10);
        }
        day.condition = dayTwoRaw[4].weather[0].main;
        data.push(day);
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        for (let i = 0; i < dayThreeRaw.length; i++) {
          // Get the day high
          if (dayThreeRaw[i].main.temp > day.high) {
            day.high = dayThreeRaw[i].main.temp;
          }
          // Get the day low
          if (dayThreeRaw[i].main.temp < day.low) {
            day.low = dayThreeRaw[i].main.temp;
          }
          // Get the feels high
          if (dayThreeRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayThreeRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayThreeRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayThreeRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayThreeRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayThreeRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayThreeRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayThreeRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayThreeRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayThreeRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayThreeRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayThreeRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayThree';
          // Get the date
          day.date = dayThreeRaw[i].dt_txt.slice(0, 10);
        }
        day.condition = dayThreeRaw[4].weather[0].main;
        data.push(day);
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        for (let i = 0; i < dayFourRaw.length; i++) {
          // Get the day high
          if (dayFourRaw[i].main.temp > day.high) {
            day.high = dayFourRaw[i].main.temp;
          }
          // Get the day low
          if (dayFourRaw[i].main.temp < day.low) {
            day.low = dayFourRaw[i].main.temp;
          }
          // Get the feels high
          if (dayFourRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayFourRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayFourRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayFourRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayFourRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayFourRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayFourRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayFourRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayFourRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayFourRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayFourRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayFourRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayFour';
          // Get the date
          day.date = dayFourRaw[i].dt_txt.slice(0, 10);
        }
        day.condition = dayFourRaw[4].weather[0].main;
        data.push(day);
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
        for (let i = 0; i < dayFiveRaw.length; i++) {
          // Get the day high
          if (dayFiveRaw[i].main.temp > day.high) {
            day.high = dayFiveRaw[i].main.temp;
          }
          // Get the day low
          if (dayFiveRaw[i].main.temp < day.low) {
            day.low = dayFiveRaw[i].main.temp;
          }
          // Get the feels high
          if (dayFiveRaw[i].main.feels_like > day.feels_like_high) {
            day.feels_like_high = dayFiveRaw[i].main.feels_like;
          }
          // Get the feels low
          if (dayFiveRaw[i].main.feels_like < day.feels_like_low) {
            day.feels_like_low = dayFiveRaw[i].main.feels_like;
          }
          // Get the humidity high
          if (dayFiveRaw[i].main.humidity > day.humidity_high) {
            day.humidity_high = dayFiveRaw[i].main.humidity;
          }
          // Get the humidity low
          if (dayFiveRaw[i].main.humidity < day.humidity_low) {
            day.humidity_low = dayFiveRaw[i].main.humidity;
          }
          // Get the wind high
          if (dayFiveRaw[i].wind.speed > day.wind_speed_high) {
            day.wind_speed_high = dayFiveRaw[i].wind.speed;
          }
          // Get the wind low
          if (dayFiveRaw[i].wind.speed < day.wind_speed_low) {
            day.wind_speed_low = dayFiveRaw[i].wind.speed;
          }
          // Set name
          day.name = 'dayFive';
          // Get the date
          day.date = dayFiveRaw[i].dt_txt.slice(0, 10);
        }
        day.condition = dayFiveRaw[4].weather[0].main;
        data.push(day);
        // Finally send the data array (which should now have 5 objects (days) with weather data)
        commit('setWeatherForecast', data);
        day = {
          high: 0,
          low: 100,
          condition: undefined,
          feels_like_high: 0,
          feels_like_low: 100,
          humidity_high: 0,
          humidity_low: 100,
          wind_speed_high: 0,
          wind_speed_low: 100,
          date: '',
          name: '',
        };
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
      dispatch('getSavedQuotesByUserId', state.user.user.id);
    },
    //#endregion

    //#region --User Methods--
    async newUser({ commit, dispatch }, user) {
      let res = await api.post('users', user);
      await api.post('lastuser', res.data);
      commit('setUser', res.data);
      dispatch('getAllUsers');
    },
    async getAllUsers({ commit, dispatch }) {
      let res = await api.get('users');
      commit('setUsers', res.data);
      dispatch('showChange');
    },
    async getUserById({ commit, dispatch }, id) {
      let res = await api.get('users/' + id);
      await api.post('lastuser', res.data);
      commit('setUser', res.data);
      dispatch('getAllUsers');
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
    async deleteUserById({ dispatch, state }, id) {
      await api.delete('users/' + id);
      dispatch('getAllUsers').then(() => {
        dispatch('resetUser', id);
        dispatch('showChange', id);
      });
      state.user.userCount -= 1;
    },
    resetUser({ commit, state }, id) {
      if (state.user.users.length == 0 || state.user.user.id == id) {
        commit('resetUser');
      }
    },
    showChange({ state }) {
      if (
        state.user.users.length == 1 &&
        state.user.user._id == state.user.users[0]._id
      ) {
        state.user.userShowChange = false;
      } else if (state.user.users.length > 1) {
        state.user.userShowChange = true;
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
      dispatch('getTodosByListId', todo.listId).then(() => {
        dispatch('getTodosByUserId', todo.userId);
      });
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
    async getNewsTrending({ commit }) {
      let res = await api.get('news/trending');
      commit('setNews', res.data.value);
    },
    async getNewsCategory({ commit }, category) {
      // NOTE For some reason, the Bing News Search API isn't working properly and when using the 'category api', the optional parameters of 'count' and 'offset' only work for the category 'Health'; all other categories are uneffected by those parameters.  This means that I cannot get more than the first 12 stories for each category, besides 'Health'.  No matter how many times I make a call to the 'Politics' category, it will return the same 12 stories. This severly limits the amount of stories per category I can display, but there isn't much I can do about it now; in the future I may switch and migrate to a different API but for now this will work.
      /** Code below is me trying to get multiple sets of results */
      // if (category == 'Health') {
      //   let res = await api.get('news/category/' + category);
      //   commit('setNewsCategory', res.data);
      // } else {
      //   let first = await api.get('news/category/' + category);
      //   let second = await api.get('news/category/v2/' + category);
      //   let res = {
      //     first: first.data.value,
      //     second: second.data.value,
      //   };
      //   commit('setNewsCategoryExtra', res);
      // }
      let res = await api.get('news/category/' + category.topic);
      // dispatch('checkForImage', res.data.value);
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
      if (category.isNewsHome) {
        commit('setHomeNews', customArr);
      } else if (category.isSports) {
        commit('setNewsSports', customArr);
      } else {
        commit('setNewsCategory', customArr);
      }
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
      if (news.isSearch) {
        commit('setSearchNews', customArr);
      } else {
        commit('setNews', customArr);
      }
    },
    // For whatever reason, whatever data gets passed into this function it is not getting read properly.  When you console log the argument getting passed in, it just shows this object that has 'commit, dispatch, getters, state, rootGetters/State' even though when you console log the parameter getting passed in and it is the right data. So somewhere between the dispatch and then the execution of this method, something happens to the data.  This means I'm going to have to rewrite the same code (WET).
    // checkForImage(news) {
    //   console.log('news', news);
    //   console.log('hit the check');
    //   let customArr = [];
    //   news.forEach((n) => {
    //     if (Object.prototype.hasOwnProperty.call(n, 'image')) {
    //       n.image.url = n.image.thumbnail.contentUrl;
    //       n.webSearchUrl = n.url;
    //       customArr.unshift(n);
    //       console.log('has own image');
    //     } else {
    //       n.image = {
    //         url:
    //           'https://www.conchovalleyhomepage.com/wp-content/uploads/sites/83/2020/05/BREAKING-NEWS-GENERIC-1.jpg?w=100&h=100&crop=1',
    //       };
    //       n.webSearchUrl = n.url;
    //       customArr.push(n);
    //       console.log('does not have own image');
    //     }
    //   });
    //   return customArr;
    // },
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

    //#region --Sports Methods--
    async getSportsNews({ commit }, topic) {
      let data = await api.get('sports/news/' + topic);
      let customArr = [];
      data.data.value.forEach((n) => {
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
      commit('setSportsNews', customArr);
    },
    switchHighlighted({ commit, state }, other) {
      let indexToRemove = state.sports.otherHighlighted.indexOf(other);
      let data = { other: other, index: indexToRemove };
      commit('switchHighlighted', data);
    },
    async getGames({ commit }, id) {
      let games = {};
      games.previous = await api.get('sports/games/previous/' + id);
      games.upcoming = await api.get('sports/games/upcoming/' + id);
      commit('setGames', games);
    },
    //#endregion

    //#region --Contacts Methods--
    async createContact({ dispatch }, contact) {
      await api.post('contacts', contact);
      dispatch('getContactsByUserId', contact.userId);
    },
    async getContactsByUserId({ commit }, id) {
      let res = await api.get('users/' + id + '/contacts');
      commit('setContacts', res.data);
    },
    filterContacts({ commit, state }, letter) {
      let letterGroup = state.contacts.all.filter((c) => {
        if (c.lastName) {
          if (
            c.lastName[0] == letter ||
            c.lastName[0].toLowerCase() == letter.toLowerCase()
          ) {
            return true;
          } else {
            return false;
          }
        } else if (!c.lastName) {
          if (
            c.firstName[0] == letter ||
            c.firstName[0].toLowerCase() == letter.toLowerCase()
          ) {
            return true;
          } else {
            return false;
          }
        }
      });
      commit('setFilteredContacts', letterGroup);
    },
    async deleteContact({ dispatch }, contact) {
      await api.delete('contacts/' + contact._id);
      dispatch('fetchContacts', contact);
    },
    async updateContact({ dispatch }, contact) {
      await api.put('contacts/' + contact._id, contact);
      dispatch('fetchContacts', contact);
    },
    async fetchContacts({ dispatch, state }, contact) {
      await dispatch('getContactsByUserId', contact.userId);
      dispatch('filterContacts', state.contacts.currentLetter);
    },
    //#endregion
  },
  modules: {},
});
