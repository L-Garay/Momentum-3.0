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
          <div v-if="toggledNews" class="toggle" @click="openNewsModal">
            <i class="far fa-newspaper fa-2x"></i>
            <p>News</p>
          </div>
        </div>
        <div class="col-1">
          <div v-if="toggledGames" class="toggle games" @click="openGames">
            <i class="fas fa-gamepad fa-2x"></i>
            <p>Games</p>
          </div>
        </div>
        <div class="col-3 offset-7">
          <div><weather /></div>
        </div>
        <div class="col-1">
          <calculator v-if="toggledCalculator" class="calculator" />
        </div>
      </div>
    </div>
    <div class="container-fluid middle">
      <div class="row">
        <div class="col-6 offset-3 clock">
          <clock />
        </div>
        <div class="col-8 offset-2 greeting">
          <greeting />
        </div>
        <photo-modal
          v-if="showPhotoModal"
          @close-photos-modal="closePhotosModal"
        />
        <quote-modal
          v-if="showQuoteModal"
          @close-quotes-modal="closeQuotesModal"
        />
        <news-modal v-if="showNewsModal" @close-news-modal="closeNewsModal" />
        <game v-if="showGames" @close-games="closeGames" />
      </div>
    </div>
    <div class="container-fluid ">
      <div class="row justify-content-center bottom ">
        <div class="col-1 settingsUtilitiesHeight">
          <p class="toggleMenu" @click="toggleSettings">Settings</p>
          <transition name="fade">
            <div v-if="show.settings">
              <settings-2 @toggleSettings="toggleSettings" /></div
          ></transition>
        </div>
        <div class="col-6 offset-2 quote">
          <quote />
        </div>
        <div class="col-1 offset-2 settingsUtilitiesHeight">
          <p class="toggleMenu text-right" @click="toggleUtilities">
            Utilities
          </p>
          <transition name="fade">
            <div v-if="showUtilities">
              <utilities /></div
          ></transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Weather from '@/components/Weather/Weather.vue';
// import Forecast from '@/components/Weather/5DayForecast.vue';
import Quote from '@/components/Quote.vue';
// import Settings from '@/components/Settings.vue';
import Settings2 from '@/components/SettingsMenu/Settings2.vue';
import Clock from '@/components/Greeting/Clock.vue';
import Greeting from '@/components/Greeting/Greeting.vue';
import PhotoModal from '@/components/Modals/PhotoModal.vue';
import QuoteModal from '@/components/Modals/QuoteModal.vue';
import Calculator from '@/components/Optional/Calculator/Calculator.vue';
import NewsModal from '@/components/Modals/NewsModal.vue';
import Utilities from '@/components/Utilities/UtilitiesComponent.vue';
import Game from '@/components/Optional/Games/GameComponent.vue';

export default {
  name: 'momentum',
  components: {
    Weather,
    Quote,
    // Settings,
    Settings2,
    Clock,
    Greeting,
    PhotoModal,
    QuoteModal,
    Calculator,
    NewsModal,
    Utilities,
    Game,
    // Forecast,
  },
  data() {
    return {
      showPhotoModal: false,
      showQuoteModal: false,
      showTodosModal: false,
      toggledCalculator: false,
      showCalculator: false,
      toggledNews: false,
      showNewsModal: false,
      toggledGames: false,
      showGames: false,
      showUtilities: false,
      show5DayForecast: false,
      gotPhoto: false,
      show: {
        settings: false,
      },
    };
  },
  mounted() {
    this.getPhotoBackground();
    this.$root.$on('checkLastUser', (result) => {
      this.checkCaclulator(result);
      this.checkNews(result);
      this.checkGames(result);
    });
    this.$root.$on('changedUser', (newUser) => {
      console.log('hit changed user in the momentum view');
      this.checkCaclulator(newUser);
      this.checkNews(newUser);
      this.checkGames(newUser);
    });
    this.$root.$on('submitNewUser', (user) => {
      this.checkCaclulator(user);
      this.checkNews(user);
      this.checkGames(user);
    });
  },
  computed: {
    Photo() {
      return this.$store.state.photo.photo;
    },
  },
  methods: {
    async getPhotoBackground() {
      await this.$store.dispatch('getPhoto');
      this.gotPhoto = true;
    },
    // Photo Modal control
    openPhotosModal() {
      this.showPhotoModal = true;
    },
    closePhotosModal() {
      this.showPhotoModal = false;
    },
    // Quote Modal control
    openQuotesModal() {
      this.showQuoteModal = true;
    },
    closeQuotesModal() {
      this.showQuoteModal = false;
    },
    // // Weather control
    // toggle5DayForecast() {
    //   if (this.show5DayForecast == true) {
    //     this.show5DayForecast = false;
    //   } else if (this.show5DayForecast == false) {
    //     this.show5DayForecast = true;
    //   }
    // },
    // News Modal control
    toggleNews() {
      if (this.toggledNews == true) {
        this.toggledNews = false;
      } else if (this.toggledNews == false) {
        this.toggledNews = true;
      }
    },
    openNewsModal() {
      this.showNewsModal = true;
    },
    closeNewsModal() {
      this.showNewsModal = false;
    },
    checkNews(user) {
      if (user.newsSelected == true) {
        this.toggledNews = true;
      } else {
        this.toggledNews = false;
      }
    },
    // Todos Control
    toggleTodos() {
      if (this.showTodosModal == true) {
        this.showTodosModal = false;
      } else {
        this.showTodosModal = true;
      }
    },
    // Calculator control
    toggleCalculator() {
      if (this.toggledCalculator == false) {
        this.toggledCalculator = true;
      } else {
        this.toggledCalculator = false;
      }
    },
    checkCaclulator(user) {
      if (user.calculatorSelected == true) {
        this.toggledCalculator = true;
      } else {
        this.toggledCalculator = false;
      }
    },
    // Games control
    toggleGames() {
      if (this.toggledGames == true) {
        this.toggledGames = false;
      } else {
        this.toggledGames = true;
      }
    },
    openGames() {
      this.showGames = true;
    },
    closeGames() {
      this.showGames = false;
    },
    checkGames(user) {
      if (user.gamesSelected == true) {
        this.toggledGames = true;
      } else {
        this.toggledGames = false;
      }
    },
    // Utilities control
    toggleUtilities() {
      if (this.showUtilities == false) {
        this.showUtilities = true;
      } else if (this.showUtilities == true) {
        this.showUtilities = false;
      }
    },
    // Settings
    toggleSettings() {
      if (this.show.settings == false) {
        this.show.settings = true;
      } else if (this.show.settings == true) {
        this.show.settings = false;
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
.middle .row .greeting {
  max-width: 1200px;
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
