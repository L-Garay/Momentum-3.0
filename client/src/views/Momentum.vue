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
          <weather @click="toggle5DayForecast" />
          <transition name="fade">
            <div v-if="show5DayForecast">
              <forecast />
            </div>
          </transition>
        </div>
        <div class="col-1">
          <!-- <calculator /> -->
          <calculator v-if="toggledCalculator" class="calculator" />
        </div>
      </div>
    </div>
    <div class="container-fluid middle">
      <div class="row">
        <div class="col-6 offset-3 mt-4">
          <clock />
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
        <!-- NOTE Can't use bootstrap modal because for some reason I get an error saying the '$' symbol when trying to programatically open/close it using bootstrap's $('#myModal').modal(options) is 'undefined'. I have tried using a cdn directly from jquery, I have tried npm i-ing jquery directly into the project and neither work.  I have tried reordering the cdns, I have tried nmp i-ing bootstrap directly, and neither work.  I have no idea why it's not working. So the workaround is to use a modal made by the vue devs found at https://vuejs.org/v2/examples/modal.html?
          <div
          class="modal"
          id="photosModal"
          ref="photosModal"
          tabindex="-1"
          role="dialog"
        >
          <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalScrollableTitle">
                  Modal title
                </h5>
                <button type="button" class="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="container-fluid ">
      <div class="row justify-content-center bottom ">
        <div class="col-1">
          <settings
            @openPhotosModal="openPhotosModal"
            @openQuotesModal="openQuotesModal"
            @toggleCalculator="toggleCalculator"
            @toggleNews="toggleNews"
            @toggleGames="toggleGames"
          />
        </div>
        <div class="col-6 offset-2">
          <quote />
        </div>
        <div class="col-1 offset-2">
          <p class="utilities" @click="toggleUtilities">Utilities</p>
          <transition name="fade">
            <div v-if="showUtilities">
              <utilities /></div
          ></transition>
        </div>
        <!-- <div class="col-1 offset-2 todoList">
          <p class="toggle" @click="toggleTodos">Todos</p>
          <transition name="fade">
            <div v-if="showTodosModal">
              <todo /></div
          ></transition>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Weather from '@/components/Weather/Weather.vue';
import Forecast from '@/components/Weather/5DayForecast.vue';
import Quote from '@/components/Quote.vue';
import Settings from '@/components/Settings.vue';
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
    Settings,
    Clock,
    Greeting,
    PhotoModal,
    QuoteModal,
    Calculator,
    NewsModal,
    Utilities,
    Game,
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
    // Weather control
    toggle5DayForecast() {
      if (this.show5DayForecast == true) {
        this.show5DayForecast = false;
      } else if (this.show5DayForecast == false) {
        this.show5DayForecast = true;
      }
    },
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
.bottom {
  height: 14vh;
  align-items: flex-end;
}

/* Calculator component styling */
.calculator {
  margin-top: -10px;
  float: left;
}

/* Todo component styling */
.todoList {
  text-align: center;
}
p.utilities {
  color: white;
  font-size: 1.3rem;
  text-shadow: 3px 3px 3px black;
}
p.utilities:hover {
  cursor: pointer;
  font-size: 1.4rem;
  text-shadow: 4px 4px 3px black;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* Toggle element styling */
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
