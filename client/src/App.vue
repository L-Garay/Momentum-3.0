//* This is where views will be injected
<template>
  <div id="app" class="default" v-if="show.default">
    <router-view />
  </div>
  <div id="app" class="mono" v-else-if="show.mono">
    <router-view />
  </div>
  <div id="app" class="serif" v-else-if="show.serif">
    <router-view />
  </div>
  <div id="app" class="pompiere" v-else-if="show.pompiere">
    <router-view />
  </div>
  <div id="app" class="charm" v-else-if="show.charm">
    <router-view />
  </div>
  <div id="app" class="baloo" v-else-if="show.baloo">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      show: {
        default: true,
        mono: false,
        serif: false,
        pompiere: false,
        charm: false,
        baloo: false,
      },
    };
  },
  mounted() {
    this.$root.$on('changeFont', (font) => {
      switch (font) {
        case 'default':
          this.show.default = true;
          this.show.mono = false;
          this.show.serif = false;
          this.show.pompiere = false;
          this.show.charm = false;
          this.show.baloo = false;
          break;
        case 'mono':
          this.show.default = false;
          this.show.mono = true;
          this.show.serif = false;
          this.show.pompiere = false;
          this.show.charm = false;
          this.show.baloo = false;
          break;
        case 'serif':
          this.show.default = false;
          this.show.mono = false;
          this.show.serif = true;
          this.show.pompiere = false;
          this.show.charm = false;
          this.show.baloo = false;
          break;
        case 'pompiere':
          this.show.default = false;
          this.show.mono = false;
          this.show.serif = false;
          this.show.pompiere = true;
          this.show.charm = false;
          this.show.baloo = false;
          break;
        case 'charm':
          this.show.default = false;
          this.show.mono = false;
          this.show.serif = false;
          this.show.pompiere = false;
          this.show.charm = true;
          this.show.baloo = false;
          break;
        case 'baloo':
          this.show.default = false;
          this.show.mono = false;
          this.show.serif = false;
          this.show.pompiere = false;
          this.show.charm = false;
          this.show.baloo = true;
          break;

        default:
          this.show.default = true;
          this.show.mono = false;
          this.show.serif = false;
          this.show.pompiere = false;
          this.show.charm = false;
          this.show.baloo = false;
          break;
      }
    });
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
div.default {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
div.mono {
  font-family: monospace;
}
div.serif {
  font-family: serif;
}
div.pompiere {
  font-family: 'Pompiere', cursive;
}
div.charm {
  font-family: 'Charm', cursive;
}
div.baloo {
  font-family: 'Baloo Bhai 2', cursive;
}
</style>
