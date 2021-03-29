<template>
  <div
    class="momentum"
    id="backgroundImg"
    :style="{ 'background-image': 'url(' + Photo.urls.regular + ')' }"
    v-if="gotPhoto"
  >
    <div class="container-fluid top">
      <div class="row">
        <div class="col-1">
          <transition name="fade">
            <div v-if="show.news" class="toggle" @click="openNewsModal">
              <i class="far fa-newspaper fa-2x"></i>
              <p>News</p>
            </div></transition
          >
        </div>
        <div class="col-1">
          <transition name="fade">
            <div v-if="show.games" class="toggle games" @click="openGames">
              <i class="fas fa-gamepad fa-2x"></i>
              <p>Games</p>
            </div></transition
          >
        </div>
        <div class="col-3 offset-7">
          <transition name="fade">
            <div v-show="show.weather"><weather /></div
          ></transition>
        </div>
        <div class="col-1">
          <transition name="fade">
            <calculator v-if="show.calculator" class="calculator"
          /></transition>
        </div>
      </div>
    </div>
    <div class="container-fluid middle">
      <div class="row">
        <div class="col-6 offset-3 clock">
          <clock />
        </div>
        <div class="container-fluid">
          <div class="row greetingRow">
            <div class="greetingWrapper">
              <div class=" greeting">
                <greeting />
              </div>
            </div>
          </div>
        </div>
        <news-modal v-if="toggle.news" @close-news-modal="closeNewsModal" />
        <game v-if="toggle.games" @close-games="closeGames" />
      </div>
    </div>
    <div class="container-fluid ">
      <div class="row justify-content-center bottom ">
        <div class="col-1 settingsUtilitiesHeight">
          <p class="toggleMenu" @click="toggleSettings">Settings</p>
          <transition name="fade">
            <div v-if="toggle.settings">
              <settings-2
                @toggleSettings="toggleSettings"
                :showData="show"
              /></div
          ></transition>
        </div>
        <div class="col-6 offset-2 quote">
          <transition name="fade"> <quote v-show="show.quote"/></transition>
        </div>
        <div class="col-1 offset-2 settingsUtilitiesHeight">
          <transition name="fade">
            <p
              v-show="show.utilities"
              class="toggleMenu text-right"
              @click="toggleUtilities"
            >
              Utilities
            </p></transition
          >
          <transition name="fade">
            <div v-if="toggle.utilities">
              <utilities /></div
          ></transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Weather from '@/components/Weather/Weather.vue';
import Quote from '@/components/Quote.vue';
import Settings2 from '@/components/SettingsMenu/Settings2.vue';
import Clock from '@/components/Greeting/Clock.vue';
import Greeting from '@/components/Greeting/Greeting.vue';
import Calculator from '@/components/Optional/Calculator/Calculator.vue';
import NewsModal from '@/components/Modals/NewsModal.vue';
import Utilities from '@/components/Utilities/UtilitiesComponent.vue';
import Game from '@/components/Optional/Games/GameComponent.vue';

export default {
  name: 'momentum',
  components: {
    Weather,
    Quote,
    Settings2,
    Clock,
    Greeting,
    Calculator,
    NewsModal,
    Utilities,
    Game,
  },
  data() {
    return {
      gotPhoto: false,
      show: {
        utilities: true,
        weather: true,
        quote: true,
        calculator: false,
        news: false,
        games: false,
      },
      toggle: {
        settings: false,
        utilities: false,
        news: false,
        games: false,
      },
    };
  },
  mounted() {
    this.getPhotoBackground();
    this.$root.$on('checkLastUser', (result) => {
      this.checkCaclulator(result);
      this.checkNews(result);
      this.checkGames(result);
      this.checkWeather(result);
      this.checkQuote(result);
      this.checkUtilities(result);
      this.checkFont(result);
    });
    this.$root.$on('changedUser', (newUser) => {
      console.log('hit changed user in the momentum view');
      this.checkCaclulator(newUser);
      this.checkNews(newUser);
      this.checkGames(newUser);
      this.checkWeather(newUser);
      this.checkQuote(newUser);
      this.checkUtilities(newUser);
      this.checkFont(newUser);
    });
    this.$root.$on('submitNewUser', (user) => {
      this.checkCaclulator(user);
      this.checkNews(user);
      this.checkGames(user);
      this.checkWeather(user);
      this.checkQuote(user);
      this.checkUtilities(user);
      this.checkFont(user);
    });
    this.$root.$on('showComponents', (component) => {
      this.showComponents(component);
    });
  },
  computed: {
    Photo() {
      return this.$store.state.photo.photo;
    },
  },
  methods: {
    showComponents(component) {
      switch (component) {
        case 'weather':
          this.show.weather = !this.show.weather;
          this.$store.state.user.user.selected.weather = this.show.weather;
          break;
        case 'utilities':
          this.show.utilities = !this.show.utilities;
          this.$store.state.user.user.selected.utilities = this.show.utilities;
          break;
        case 'quote':
          this.show.quote = !this.show.quote;
          this.$store.state.user.user.selected.quote = this.show.quote;
          break;
        case 'news':
          this.show.news = !this.show.news;
          this.$store.state.user.user.selected.news = this.show.news;
          break;
        case 'calc':
          this.show.calculator = !this.show.calculator;
          this.$store.state.user.user.selected.calculator = this.show.calculator;
          break;
        case 'games':
          this.show.games = !this.show.games;
          this.$store.state.user.user.selected.games = this.show.games;
          break;

        default:
          this.show.weather = true;
          this.show.quote = true;
          this.show.utilities = true;
          this.show.games = false;
          this.show.news = false;
          this.show.calculator = false;
          break;
      }
    },
    async getPhotoBackground() {
      await this.$store.dispatch('getPhoto');
      this.gotPhoto = true;
    },
    // News Modal control
    openNewsModal() {
      this.toggle.news = true;
    },
    closeNewsModal() {
      this.toggle.news = false;
    },
    checkNews(user) {
      if (user.selected.news == true) {
        this.show.news = true;
      } else {
        this.show.news = false;
      }
    },
    checkWeather(user) {
      if (user.selected.weather == true) {
        this.show.weather = true;
      } else {
        this.show.weather = false;
      }
    },
    checkQuote(user) {
      if (user.selected.quote == true) {
        this.show.quote = true;
      } else {
        this.show.quote = false;
      }
    },
    checkUtilities(user) {
      if (user.selected.utilities == true) {
        this.show.utilities = true;
      } else {
        this.show.utilities = false;
      }
    },
    checkFont(user) {
      let font = user.selected.font;
      this.$root.$emit('checkFont', font);
    },
    // Calculator control
    checkCaclulator(user) {
      if (user.selected.calculator == true) {
        this.show.calculator = true;
      } else {
        this.show.calculator = false;
      }
    },
    // Games control
    openGames() {
      this.toggle.games = true;
    },
    closeGames() {
      this.toggle.games = false;
    },
    checkGames(user) {
      if (user.selected.games == true) {
        this.show.games = true;
      } else {
        this.show.games = false;
      }
    },
    // Utilities control
    toggleUtilities() {
      if (this.toggle.utilities == false) {
        this.toggle.utilities = true;
      } else if (this.toggle.utilities == true) {
        this.toggle.utilities = false;
      }
    },
    // Settings
    toggleSettings() {
      if (this.toggle.settings == false) {
        this.toggle.settings = true;
      } else if (this.toggle.settings == true) {
        this.toggle.settings = false;
      }
    },
  },
};
</script>

<style scoped>
.momentum {
  height: 100vh;
  width: 100vw;
}
#backgroundImg {
  background-size: cover;
  background-position: center;
  background-repeat: none;
}
.top {
  height: 23vh;
}
.middle {
  height: 63vh;
}
.middle .row {
  padding-top: 3em;
}
div.middle div.row.greetingRow {
  justify-content: center;
  padding-top: 0;
}
.bottom {
  height: 14vh;
  align-items: flex-end;
}
div.settingsUtilitiesHeight {
  height: 50px;
}

/* Calculator component styling */
.calculator {
  margin-top: -10px;
  float: left;
}

/* Todo component styling */
p.toggleMenu {
  color: white;
  font-size: 1.3rem;
  text-shadow: 3px 3px 3px black;
}
p.toggleMenu:hover {
  cursor: pointer;
  font-size: 1.4rem;
  text-shadow: 4px 4px 3px black;
}
/* Toggling element styling */

/* Transition styling */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* Toggle element styling (News, Games, Calculator squares) */
.toggle {
  color: black;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1pt solid black;
  text-align: center;
  height: 60px;
  width: 60px;
  padding-top: 5px;
  margin-top: 17px;
  margin-right: 20px;
}
div.toggle:hover {
  border: solid 2pt black;
  background-color: white;
  cursor: pointer;
  font-weight: bold;
}
div.toggle p {
  font-size: 12px;
  text-shadow: 1pt 1pt 1pt white;
}

/* Games styling */
.toggle.games {
  margin-left: -65px;
}
</style>
