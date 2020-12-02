<template>
  <div class="dropdown">
    <div id="dLabel" role="button" data-toggle="dropdown">
      <p>Settings</p>
    </div>
    <ul
      class="dropdown-menu multi-level"
      role="menu"
      aria-labelledby="dropdownMenu"
    >
      <li class="dropdown-submenu">
        <a tabindex="-1">Photos</a>
        <ul class="dropdown-menu">
          <li @click="getNewPhoto">
            Get New Photo
          </li>
          <li @click="savePhoto">
            Save Photo
          </li>
          <li @click="openPhotosModal">
            Choose Saved Photo
          </li>
        </ul>
      </li>
      <li class="dropdown-submenu">
        <a tabindex="-1">Quotes</a>
        <ul class="dropdown-menu">
          <li @click="getNewQuote">
            Get New Quote
          </li>
          <li @click="saveQuote">
            Save Quote
          </li>
          <li @click="openQuotesModal">
            Choose Saved Quote
          </li>
        </ul>
      </li>
      <li class="dropdown-submenu">
        <a tabindex="-1">Clock</a>
        <ul class="dropdown-menu">
          <li @click="setMilitaryTime">
            Military Time
          </li>
          <li @click="setStandardTime">
            Standard Time
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  props: ['bus'],
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
        id: this.$store.state.photo.id,
        width: this.$store.state.photo.width,
        height: this.$store.state.photo.height,
        urls: {
          fullUrl: this.$store.state.photo.urls.full,
          regular: this.$store.state.photo.urls.regular,
          thumbUrl: this.$store.state.photo.urls.thumb,
        },
        downloadLocation: this.$store.state.photo.links.download_location,
        userName: this.$store.state.photo.user.username,
        name: this.$store.state.photo.user.name,
        unsplashLink: this.$store.state.photo.links.html,
        userId: this.$store.state.user.id,
      };
      this.$store.dispatch('savePhoto', savedPhoto);
    },
    openPhotosModal() {
      this.$emit('openPhotosModal');
      document.getElementById('myDropdown').classList.toggle('show');
    },
    //#endregion
    //#region -- Quote Methods--
    getNewQuote() {
      this.$store.dispatch('getQuote');
    },
    saveQuote() {
      let savedQuote = {
        quote: this.$store.state.quote.quote,
        author: this.$store.state.quote.author,
        userId: this.$store.state.user.id,
      };
      this.$store.dispatch('saveQuote', savedQuote);
    },
    openQuotesModal() {
      this.$emit('openQuotesModal');
      document.getElementById('myDropdown').classList.toggle('show');
    },
    //#endregion
    //#region -- Time Methods
    setMilitaryTime() {
      this.$root.$emit('setMilitaryTime');
      this.$store.state.user.militaryTimeSelected = true;
      this.$store.dispatch('updateUserById', this.$store.state.user);
    },
    setStandardTime() {
      this.$root.$emit('setStandardTime');
      this.$store.state.user.militaryTimeSelected = false;
      this.$store.dispatch('updateUserById', this.$store.state.user);
    },
    //#endregion
  },
};
</script>

<style scoped>
p {
  color: rgb(221, 221, 221);
  font-size: 1.3rem;
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  margin-top: 10px;
}
p:hover {
  color: white;
  font-size: 1.4rem;
  text-shadow: 2px 2px 2px black;
}
i {
  font-size: 1.25rem;
  color: black;
}
i:hover {
  cursor: pointer;
  color: white;
  opacity: 1;
}
i.user {
  float: right;
  color: rgba(255, 0, 0, 0.404);
  padding-right: 5px;
}
i.user:hover {
  color: red;
}
li {
  padding: 3px 0 3px 5px;
}
li:hover {
  cursor: pointer;
  background-color: rgb(128, 128, 128, 0.2);
}

/* NOTE Dropdown style */
.dropdown {
  padding-left: 12px;
}
.dropdown-submenu {
  position: relative;
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
</style>
