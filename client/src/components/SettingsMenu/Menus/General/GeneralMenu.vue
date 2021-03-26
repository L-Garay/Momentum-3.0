<template>
  <div class="generalMenuComponent">
    <div class="content">
      <div class="header">
        <div class="title">
          <h3>General</h3>
          <p>Customize how your dashboard looks.</p>
        </div>
      </div>
      <div class="customizeSectionWrapper">
        <div class="customizeSection">
          <general-customization />
          <div class="toggleShowSection">
            <div class="title">
              <h5>Show</h5>
            </div>
            <div class="toggleOption">
              <p>Utilities</p>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="utilitiesSwitch"
                  @input="showComponents('utilities')"
                />
                <label
                  class="custom-control-label"
                  for="utilitiesSwitch"
                ></label>
              </div>
            </div>
            <div class="toggleOption">
              <p>Weather</p>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="weatherSwitch"
                  @input="showComponents('weather')"
                />
                <label class="custom-control-label" for="weatherSwitch"></label>
              </div>
            </div>
            <div class="toggleOption">
              <p>Quote</p>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="quoteSwitch"
                  @input="showComponents('quote')"
                />
                <label class="custom-control-label" for="quoteSwitch"></label>
              </div>
            </div>
            <div class="toggleOption">
              <p>News</p>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="newsSwitch"
                  @input="showComponents('news')"
                />
                <label class="custom-control-label" for="newsSwitch"></label>
              </div>
            </div>
            <div class="toggleOption">
              <p>Calculator</p>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="calcSwitch"
                  @input="showComponents('calc')"
                />
                <label class="custom-control-label" for="calcSwitch"></label>
              </div>
            </div>
            <div class="toggleOption">
              <p>Games</p>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="gamesSwitch"
                  @input="showComponents('games')"
                />
                <label class="custom-control-label" for="gamesSwitch"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralCustomization from '@/components/SettingsMenu/Menus/General/GeneralCustomization.vue';
export default {
  name: 'GeneralMenuComponent',
  components: {
    GeneralCustomization,
  },
  props: ['componentData'],
  data() {
    return {
      show: { ...this.componentData },
    };
  },
  mounted() {
    this.checkComponents();
  },
  computed: {
    ComponentData() {
      return this.componentData;
    },
  },
  methods: {
    checkComponents() {
      if (this.ComponentData.weather == true) {
        document
          .getElementById('weatherSwitch')
          .setAttribute('checked', 'checked');
      } else if (this.ComponentData.weather == false) {
        document.getElementById('weatherSwitch').removeAttribute('checked');
      }
      if (this.ComponentData.quote == true) {
        document
          .getElementById('quoteSwitch')
          .setAttribute('checked', 'checked');
      } else if (this.ComponentData.quote == false) {
        document.getElementById('quoteSwitch').removeAttribute('checked');
      }
      if (this.ComponentData.utilities == true) {
        document
          .getElementById('utilitiesSwitch')
          .setAttribute('checked', 'checked');
      } else if (this.ComponentData.utilities == false) {
        document.getElementById('utilitiesSwitch').removeAttribute('checked');
      }
      if (this.ComponentData.news == true) {
        document
          .getElementById('newsSwitch')
          .setAttribute('checked', 'checked');
      } else if (this.ComponentData.news == false) {
        document.getElementById('newsSwitch').removeAttribute('checked');
      }
      if (this.ComponentData.games == true) {
        document
          .getElementById('gamesSwitch')
          .setAttribute('checked', 'checked');
      } else if (this.ComponentData.games == false) {
        document.getElementById('gamesSwitch').removeAttribute('checked');
      }
      if (this.ComponentData.calculator == true) {
        document
          .getElementById('calcSwitch')
          .setAttribute('checked', 'checked');
      } else if (this.ComponentData.calculator == false) {
        document.getElementById('calcSwitch').removeAttribute('checked');
      }
    },
    showComponents(component) {
      this.$root.$emit('showComponents', component);
    },
  },
};
</script>

<style scoped>
div.generalMenuComponent {
  height: 395px;
  width: 515px;
}
div.content {
  height: 385px;
  width: 505px;
  margin-left: auto;
  margin-top: 5px;
  color: white;
}
/* Header styling */
div.header {
  padding-left: 10px;
  margin-bottom: 20px;
}
div.title h3,
div.title p {
  margin-bottom: 0;
}
div.title h5 {
  margin-top: 50px;
  padding-left: 10px;
}
/* Customize Section styling */
div.customizeSectionWrapper {
  height: 308px;
  width: 505px;
  overflow-y: auto;
}
div.customizeSectionWrapper::-webkit-scrollbar {
  width: 10px;
  height: 5px;
  background-color: rgb(90, 90, 90);
}
div.customizeSectionWrapper::-webkit-scrollbar-thumb {
  background: goldenrod;
}
div.customizeSection {
  height: 308px;
  width: 485px;
}
/* ToggleOption styling */
div.toggleOption {
  height: 50px;
  border-top: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
div.toggleOption p {
  margin-bottom: 0;
  padding-left: 30px;
}
.custom-switch .custom-control-label::before {
  background-color: white;
  border: 2px solid white;
}
.custom-switch .custom-control-label::after {
  background-color: black;
}
.custom-switch .custom-control-input:checked ~ .custom-control-label::after {
  background-color: goldenrod;
}
.custom-switch .custom-control-input:checked ~ .custom-control-label::before {
  background-color: black;
  border: 2px solid goldenrod;
}
label.custom-control-label:hover,
input.custom-control-input:hover {
  cursor: pointer;
  text-shadow: 1px 0px 12px white, 1px 0px 8px white;
}
</style>
