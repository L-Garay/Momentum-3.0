<template>
  <div class="generalCustomizationComponent">
    <div class="title">
      <h5>Customize</h5>
    </div>
    <div class="fontControlSection">
      <div class="controls">
        <div class="label">Font</div>
        <div class="fonts">
          <div class="topRow">
            <div
              id="default"
              class="fontOption default selected"
              @click="changeFont('default')"
            >
              Default
            </div>
            <div class="fontOptionDivider">|</div>
            <div id="mono" class="fontOption mono" @click="changeFont('mono')">
              Monospace
            </div>
            <div class="fontOptionDivider">|</div>
            <div
              id="serif"
              class="fontOption serif"
              @click="changeFont('serif')"
            >
              Serif
            </div>
          </div>
          <div class="bottomRow">
            <div
              id="pompiere"
              class="fontOption pompiere"
              @click="changeFont('pompiere')"
            >
              Pompiere
            </div>
            <div class="fontOptionDivider">|</div>
            <div
              id="charm"
              class="fontOption charm"
              @click="changeFont('charm')"
            >
              Charm
            </div>
            <div class="fontOptionDivider">|</div>
            <div
              id="baloo"
              class="fontOption baloo"
              @click="changeFont('baloo')"
            >
              Baloo Bhai
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="themeControlSection">
      <div class="controls">
        <div class="label comingSoon">Theme<small>**Coming Soon**</small></div>
        <div class="dropleft">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            disabled
          >
            Select Theme
          </button>
          <div class="dropdown-menu">
            <p class="dropdown-item" type="text">Theme1</p>
            <p class="dropdown-item" type="text">
              Theme2
            </p>
            <p class="dropdown-item" type="text">
              Theme3
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeneralCustomizationComponent',
  data() {
    return {};
  },
  methods: {
    changeFont(font) {
      this.$store.state.user.user.selected.font = font;
      this.$emit('madeChange');
      this.$root.$emit('changeFont', font);
      this.highlightFont(font);
    },
    highlightFont(font) {
      switch (font) {
        case 'default':
          document.getElementById('default').classList.add('selected');
          document.getElementById('mono').classList.remove('selected');
          document.getElementById('serif').classList.remove('selected');
          document.getElementById('pompiere').classList.remove('selected');
          document.getElementById('charm').classList.remove('selected');
          document.getElementById('baloo').classList.remove('selected');
          break;
        case 'mono':
          document.getElementById('default').classList.remove('selected');
          document.getElementById('mono').classList.add('selected');
          document.getElementById('serif').classList.remove('selected');
          document.getElementById('pompiere').classList.remove('selected');
          document.getElementById('charm').classList.remove('selected');
          document.getElementById('baloo').classList.remove('selected');
          break;
        case 'serif':
          document.getElementById('default').classList.remove('selected');
          document.getElementById('mono').classList.remove('selected');
          document.getElementById('serif').classList.add('selected');
          document.getElementById('pompiere').classList.remove('selected');
          document.getElementById('charm').classList.remove('selected');
          document.getElementById('baloo').classList.remove('selected');
          break;
        case 'pompiere':
          document.getElementById('default').classList.remove('selected');
          document.getElementById('mono').classList.remove('selected');
          document.getElementById('serif').classList.remove('selected');
          document.getElementById('pompiere').classList.add('selected');
          document.getElementById('charm').classList.remove('selected');
          document.getElementById('baloo').classList.remove('selected');
          break;
        case 'charm':
          document.getElementById('default').classList.remove('selected');
          document.getElementById('mono').classList.remove('selected');
          document.getElementById('serif').classList.remove('selected');
          document.getElementById('pompiere').classList.remove('selected');
          document.getElementById('charm').classList.add('selected');
          document.getElementById('baloo').classList.remove('selected');
          break;
        case 'baloo':
          document.getElementById('default').classList.remove('selected');
          document.getElementById('mono').classList.remove('selected');
          document.getElementById('serif').classList.remove('selected');
          document.getElementById('pompiere').classList.remove('selected');
          document.getElementById('charm').classList.remove('selected');
          document.getElementById('baloo').classList.add('selected');
          break;

        default:
          document.getElementById('default').classList.add('selected');
          document.getElementById('mono').classList.remove('selected');
          document.getElementById('serif').classList.remove('selected');
          document.getElementById('pompiere').classList.remove('selected');
          document.getElementById('charm').classList.remove('selected');
          document.getElementById('baloo').classList.remove('selected');
          break;
      }
    },
  },
};
</script>

<style scoped>
div.title h5 {
  margin-bottom: 5px;
  padding-left: 10px;
}
div.controls {
  display: flex;
  justify-content: space-between;
  padding-top: 18.5px;
}
div.label {
  padding-left: 30px;
}
div.label.comingSoon {
  display: flex;
  flex-direction: column;
}
div.label.comingSoon small {
  font-size: 11px;
}
/* Font options styling */
div.fonts {
  width: 200px;
  font-size: 12px;
}
div.topRow,
div.bottomRow {
  display: flex;
}
div.fontOption {
  margin-left: 5px;
}
div.fontOption:hover {
  cursor: pointer;
  color: goldenrod;
}
div.fontOption.default {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
div.fontOption.mono {
  font-family: monospace;
}
div.fontOption.serif {
  font-family: serif;
}
div.fontOption.pompiere {
  font-family: 'Pompiere', cursive;
}
div.fontOption.charm {
  font-family: 'Charm', cursive;
}
div.fontOption.baloo {
  font-family: 'Baloo Bhai 2', cursive;
}
div.fontOptionDivider {
  margin-left: 5px;
}
/* Dropdown button styling */
div.dropleft {
  padding-right: 20px;
}
button.btn {
  background-color: transparent;
  color: white;
  border: 1pt solid white;
  padding: 3px 6px;
  font-size: 14px;
}
button.btn:hover {
  background-color: lightgray;
  border: 1pt solid black;
  box-shadow: 0pt 0pt 6pt white, 0pt 0pt 6pt white;
  text-shadow: 1px 1px 1px black;
  color: goldenrod;
}
button.btn:active {
  color: white !important;
  outline: none !important;
  box-shadow: none !important;
  border: 1pt solid white !important;
  text-shadow: 1px 1px 1px black !important;
  background-color: goldenrod !important;
}
button.btn:focus {
  background-color: lightgray;
  outline: none;
  text-shadow: 1px 1px 1px black;
  box-shadow: 0pt 0pt 12pt goldenrod;
  color: goldenrod;
}
button.btn:disabled {
  background-color: transparent;
  color: white;
  border: 1pt solid white;
  box-shadow: none;
}

/* Dropdown menu styling */
div.dropdown-menu {
  background-color: rgb(85, 85, 85);
  border: 1px solid white;
}
div.dropdown-menu p {
  margin-bottom: 0;
  color: white;
  font-size: 12px;
}
p.dropdown-item:hover {
  cursor: pointer;
  color: goldenrod;
  background-color: rgb(116, 116, 116);
}

/* Font Control styling */
div.fontControlSection {
  width: 485px;
  height: 75px;
  border-top: 1px solid grey;
}
div.fontControlSection div.title {
  padding-left: 10px;
}
.selected {
  color: goldenrod;
}

/* Theme Control styling */
div.themeControlSection {
  width: 485px;
  height: 75px;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}
</style>
