<template>
  <div class="momentum-settings">
    <div class="dropdown">
      <button @click="toggleSettings()" class="dropbtn btn-dark">
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
      // this.settings();
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
      // this.settings();
    },
    openPhotosModal() {
      this.$emit('openPhotosModal');
      document.getElementById('myDropdown').classList.toggle('show');
    },
    //#endregion
  },
};
</script>

<style scoped>
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
</style>
