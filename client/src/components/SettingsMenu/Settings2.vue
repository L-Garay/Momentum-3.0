<template>
  <div class="settingsComponent">
    <div class="content">
      <div class="leftMenu">
        <div class="menu">
          <div class="mainItems">
            <p class="menuItem" @click="toggleComponent('general')">General</p>
            <p class="menuItem" @click="toggleComponent('photos')">Photos</p>
            <p class="menuItem" @click="toggleComponent('quotes')">Quotes</p>
            <p class="menuItem" @click="toggleComponent('utilities')">
              Utilities
            </p>
            <p class="menuItem" @click="toggleComponent('weather')">Weather</p>
            <p class="menuItem" @click="toggleComponent('news')">News</p>
            <p class="menuItem" @click="toggleComponent('clock')">Clock</p>
          </div>
          <div class="secondaryItems">
            <p class="extraItem"><small>ReadMe</small></p>
            <p class="extraItem"><small>Help</small></p>
          </div>
        </div>
      </div>
      <div class="mainSection">
        <div class="components">
          <general-menu v-if="show.general" />
          <photos-menu v-if="show.photos" />
          <quotes-menu v-if="show.quotes" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralMenu from '@/components/SettingsMenu/Menus/General/GeneralMenu.vue';
import PhotosMenu from '@/components/SettingsMenu/Menus/PhotosMenu.vue';
import QuotesMenu from '@/components/SettingsMenu/Menus/QuotesMenu.vue';
export default {
  name: 'Settings2',
  components: {
    GeneralMenu,
    PhotosMenu,
    QuotesMenu,
  },
  data() {
    return {
      show: {
        general: true,
        photos: false,
        quotes: false,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.settingsEventListener, false);
    }, 500);
  },
  computed: {},
  methods: {
    settingsEventListener(event) {
      if (!this.$el.contains(event.target)) {
        this.$emit('toggleSettings');
        document.removeEventListener(
          'click',
          this.settingsEventListener,
          false
        );
      }
    },
    toggleComponent(component) {
      switch (component) {
        case 'general':
          this.show.general = true;
          this.show.photos = false;
          this.show.quotes = false;
          break;
        case 'photos':
          this.show.general = false;
          this.show.photos = true;
          this.show.quotes = false;
          break;
        case 'quotes':
          this.show.general = false;
          this.show.photos = false;
          this.show.quotes = true;
          break;
        default:
          this.show.general = true;
          this.show.photos = false;
          break;
      }
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
div.settingsComponent {
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 6px 6px 6px 6px;
  width: 650px;
  height: 415px;
  position: absolute;
  bottom: 130%;
  z-index: 5;
}
div.content {
  width: 630px;
  height: 395px;
  margin: auto;
  margin-top: 10px;
  display: flex;
}
div.leftMenu {
  width: 115px;
  height: 395px;
  border-right: 1pt solid white;
}
div.menu p {
  padding-left: 7px;
}
div.mainItems {
  height: 300px;
  padding-top: 12px;
}
p.menuItem {
  margin-bottom: 10px;
  color: rgb(194, 194, 194);
}
p.menuItem:hover {
  cursor: pointer;
  color: white;
  text-shadow: 1px 1px 5px white;
}
div.secondaryItems {
  height: 95px;
}
p.extraItem {
  color: rgb(172, 134, 39);
}
p.extraItem:hover {
  cursor: pointer;
  color: goldenrod;
  text-shadow: 1px 1px 5px goldenrod;
}
div.mainSection {
  height: 395px;
  width: 515px;
}
</style>
