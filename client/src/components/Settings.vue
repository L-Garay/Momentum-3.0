<template>
  <div class="dropdown">
    <div id="dLabel" role="button" data-toggle="dropdown" class="toggleButton">
      <p>Settings</p>
    </div>
    <ul
      id="dropdownMenu"
      class="dropdown-menu multi-level"
      role="menu"
      aria-labelledby="dropdownMenu"
    >
      <li class="dropdown-submenu test">
        <a tabindex="-1">Photos</a>
        <ul class="dropdown-menu">
          <li @click.stop="getNewPhoto">
            Get New Photo
          </li>
          <li @click.stop="savePhoto">
            Save Photo
          </li>
          <li @click.stop="openPhotosModal">
            Choose Saved Photo
          </li>
        </ul>
      </li>
      <li class="dropdown-submenu test">
        <a tabindex="-1">Quotes</a>
        <ul class="dropdown-menu">
          <li @click.stop="getNewQuote">
            Get New Quote
          </li>
          <li @click.stop="saveQuote">
            Save Quote
          </li>
          <li @click.stop="openQuotesModal">
            Choose Saved Quote
          </li>
        </ul>
      </li>
      <li class="dropdown-submenu test">
        <a tabindex="-1">Clock</a>
        <ul class="dropdown-menu">
          <li @click.stop="setMilitaryTime">
            Military Time
          </li>
          <li @click.stop="setStandardTime">
            Standard Time
          </li>
        </ul>
      </li>
      <li class="test" @click.stop="toggleCalculator">Toggle Calculator</li>
      <li class="test" @click.stop="toggleNews">Toggle News</li>
      <li class="test" @click.stop="toggleGames">Toggle Games</li>
    </ul>
  </div>
  <!--  NOTE This was the original modal, however the way it was setup meant you had to click the button to open AND close the modal, you couldn't click on the screen and have it disappear. However, I liked that when you selected 'Get Photo/Quote' or 'Save Photo/Quote' and the time options, it didn't close; as this allowed the user to quickly get new photos or quotes without having to navigate back to those buttons everytime. So I guess this would come down to user preference. I'm leaving it here to be able to change if needed; both are fully functional.

    <div class="momentum-settings">
    <div class="dropdown">
      <button
        @click="toggleSettings()"
        v-on:blur="toggleSettings()"
        class="dropbtn btn-dark"
      >
        settings
      </button>
      <div id="myDropdown" class="dropdown-content">
        <div class="dropdown2">
          <button class="dropbtn2 ">Photos</button>
          <div class="dropdown-content2">
            <button
              class="btn btn-none btn-sm option-button"
              @click="getNewPhoto"
            >
              Get Photo
            </button>
            <button
              class="btn btn-none btn-sm option-button"
              @click="savePhoto"
            >
              Save Photo
            </button>
            <button
              class="btn btn-none btn-sm option-button"
              @click="openPhotosModal"
            >
              Choose Photo
            </button>
          </div>
        </div>
        <div class="dropdown2">
          <button class="dropbtn2">Quotes</button>
          <div class="dropdown-content2">
            <button class="btn btn-none btn-sm option-button">
              New Quote
            </button>
            <button class="btn btn-none btn-sm option-button">
              Save Quote
            </button>
          </div>
        </div>
        <div class="dropdown2">
          <button class="dropbtn2">Clock</button>
          <div class="dropdown-content2">
            <button class="btn btn-none btn-sm option-button">
              Military Time
            </button>
            <button class="btn btn-none btn-sm option-button">
              Standard Time
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
   -->
</template>

<script>
// document.getElementById('dropdownMenu').addEventListener('click', (event) => {
//   console.log('hit the event listener');
//   event.stopPropagation();
// });
// window.onclick = (event) => {
//   console.log('hit the onclick');
//   if (!event.target.matches('.toggleButton')) {
//     let dropdowns = document.getElementsByClassName('test');
//     for (let i = 0; i < dropdowns.length; i++) {
//       let openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// };
export default {
  name: 'Settings',
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {
    // Open and close settings dropdown
    toggleSettings() {
      document.getElementById('myDropdown').classList.toggle('show');
    },

    //#region --Photo Methods--
    getNewPhoto() {
      this.$store.dispatch('getPhoto');
    },
    savePhoto() {
      let savedPhoto = {
        id: this.$store.state.photo.photo.id,
        width: this.$store.state.photo.photo.width,
        height: this.$store.state.photo.photo.height,
        urls: {
          fullUrl: this.$store.state.photo.photo.urls.full,
          regular: this.$store.state.photo.photo.urls.regular,
          thumbUrl: this.$store.state.photo.photo.urls.thumb,
        },
        download_location: this.$store.state.photo.photo.links
          .download_location,
        userName: this.$store.state.photo.photo.user.username,
        name: this.$store.state.photo.photo.user.name,
        unsplashLink: this.$store.state.photo.photo.links.html,
        userId: this.$store.state.user.user.id,
      };
      this.$store.dispatch('savePhoto', savedPhoto);
    },
    openPhotosModal() {
      this.$emit('openPhotosModal');
      // document.getElementById('myDropdown').classList.toggle('show');
    },
    //#endregion

    //#region -- Quote Methods--
    getNewQuote() {
      this.$store.dispatch('getQuote');
    },
    saveQuote() {
      let savedQuote = {
        quote: this.$store.state.quote.quote.quote,
        author: this.$store.state.quote.quote.author,
        userId: this.$store.state.user.user.id,
      };
      this.$store.dispatch('saveQuote', savedQuote);
    },
    openQuotesModal() {
      this.$emit('openQuotesModal');
      // document.getElementById('myDropdown').classList.toggle('show');
    },
    //#endregion

    //#region -- Time Methods
    setMilitaryTime() {
      this.$root.$emit('setMilitaryTime');
      this.$store.state.user.user.militaryTimeSelected = true;
      this.$store.dispatch('updateUserById', this.$store.state.user.user);
    },
    setStandardTime() {
      this.$root.$emit('setStandardTime');
      this.$store.state.user.user.militaryTimeSelected = false;
      this.$store.dispatch('updateUserById', this.$store.state.user.user);
    },
    //#endregion

    //#region --Calculator Methods--
    toggleCalculator() {
      this.$emit('toggleCalculator');
      let user = this.$store.state.user.user;
      if (user.calculatorSelected == true) {
        this.$store.state.user.user.calculatorSelected = false;
      } else {
        this.$store.state.user.user.calculatorSelected = true;
      }
      this.$store.dispatch('updateUserById', this.$store.state.user.user);
    },
    //#endregion
    //#region --News Methods--
    toggleNews() {
      this.$emit('toggleNews');
      let user = this.$store.state.user.user;
      if (user.newsSelected == true) {
        this.$store.state.user.user.newsSelected = false;
      } else {
        this.$store.state.user.user.newsSelected = true;
      }
      this.$store.dispatch('updateUserById', this.$store.state.user.user);
    },
    //#endregion
    //#region --Games Methods--
    toggleGames() {
      this.$emit('toggleGames');
      let user = this.$store.state.user.user;
      if (user.gamesSelected == true) {
        this.$store.state.user.user.gamesSelected = false;
      } else {
        this.$store.state.user.user.gamesSelected = true;
      }
      this.$store.dispatch('updateUserById', this.$store.state.user.user);
    },
    //#endregion
  },
};
</script>

<style scoped>
p {
  color: rgb(255, 255, 255);
  font-size: 1.3rem;
  text-shadow: 2px 2px 3px rgb(0, 0, 0);
  margin-top: 10px;
}
p:hover {
  color: white;
  cursor: pointer;
  font-size: 1.4rem;
  text-shadow: 4px 4px 3px black;
}

li {
  padding: 3px 0 3px 5px;
}
li:hover {
  cursor: pointer;
  background-color: rgb(128, 128, 128, 0.2);
}

/* NOTE Dropdown style */
/* .dropdown {
  padding-left: 12px;
} */
.dropdown-submenu {
  position: relative;
}
ul.dropdown-menu.multi-level {
  top: 0 !important;
  left: 0 !important;
}
.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  margin-left: -1px;
  -webkit-border-radius: 0 6px 6px 6px;
  -moz-border-radius: 0 6px 6px;
  border-radius: 0 6px 6px 6px;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}

.dropdown-submenu > a:after {
  display: block;
  content: ' ';
  float: right;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-left-color: #ccc;
  margin-top: 5px;
  margin-right: -10px;
}

.dropdown-submenu:hover > a:after {
  border-left-color: #fff;
}

.dropdown-submenu.pull-left {
  float: none;
}

.dropdown-submenu.pull-left > .dropdown-menu {
  left: -100%;
  margin-left: 10px;
  -webkit-border-radius: 6px 0 6px 6px;
  -moz-border-radius: 6px 0 6px 6px;
  border-radius: 6px 0 6px 6px;
}

/* NOTE These are the styles for the original dropdown template

.momentum-settings {
  position: fixed;
}
.option-button {
  width: 140px;
  height: 50px;
}
.option-button:hover {
  background-color: #777;
  color: #fff;
}
.dropbtn {
  min-width: 75px;
  color: white;
  padding: 7px;
  border-radius: 5px;
  font-size: 13px;
  border: none;
  cursor: pointer;
  margin-top: 40px;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  margin-top: 2px;
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropbtn2:hover {
  background-color: #777;
  color: #fff;
}
.dropdown-content a {
  color: black;
  padding: 10px 14px;
  text-decoration: none;
  display: block;
}
.dropbtn2 {
  background-color: #fff;
  min-width: 120px;
  color: black;
  padding: 14px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: start;
}
.dropdown2 {
  position: relative;
  display: inline-block;
}
.dropdown-content2 {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 140px;
  top: 0;
  margin-left: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content2 a {
  color: black;
  padding: 10px 14px;
  text-decoration: none;
  display: block;
  font-size: 14px;
}
.show {
  display: block;
}
.dropdown2:hover .dropdown-content2 {
  display: block;
}


 */
</style>
