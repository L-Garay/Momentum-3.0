<template>
  <div class="clockMenuComponent">
    <div class="content">
      <div class="header">
        <div class="title">
          <h3>Clock</h3>
          <p>
            Change how you want to format your clock, and see what time it is in
            different locations around the world.
          </p>
        </div>
      </div>
      <div class="mainSectionWrapper">
        <div class="mainSection">
          <div class="timeControlSection">
            <h5>Format</h5>
            <div class="controlSection">
              <p>Enable Military Time</p>
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="clockSwitch"
                  @input="enableMilitaryTime"
                />
                <label class="custom-control-label" for="clockSwitch"></label>
              </div>
            </div>
          </div>
          <div class="extraLocationTimes">
            <h5>World Times</h5>
            <div class="searchSection">
              <div class="searchInput">
                <input
                  type="text"
                  ref="focus"
                  v-model="city"
                  v-on:keyup.enter="submitLocation"
                />
                <button class="btn" @click="submitLocation">
                  Submit
                </button>
              </div>
            </div>
            <div class="mainResultSection">
              <div class="mainResult" v-if="didSearch">
                <!-- NOTE Need to format this section properly -->
                <div class="dataColumns">
                  <div class="leftColumn">
                    <div class="name">
                      <b>{{ SearchedTime.name }}</b>
                    </div>
                    <div class="date">
                      {{
                        this.$luxon(SearchedTime.localTime, {
                          input: { format: 'iso', zone: 'local' },
                          output: { zone: 'local', format: 'date_full' },
                        }).slice(0, -6)
                      }}
                    </div>
                    <div class="time">
                      {{
                        this.$luxon(SearchedTime.localTime, {
                          input: { format: 'iso', zone: 'local' },
                          output: { zone: 'local', format: 'times' },
                        })
                      }}
                    </div>
                  </div>
                  <div class="rightColumn">
                    <div class="extraInfo">
                      <p>Time zone: {{ SearchedTime.timeZoneName }}</p>
                      <p>Abbreviation: {{ SearchedTime.timeZoneAbbr }}</p>
                      <p>Time zone Id: {{ SearchedTime.timeZoneId }}</p>
                    </div>
                  </div>
                </div>
                <div class="buttonRow">
                  <div class="buttons">
                    <button class="btn btn-primary addBtn">Add</button>
                    <button class="btn btn-danger cancelBtn">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="addedLocationsSection"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// For formattign the dates
import Vue from 'vue';
import VueLuxon from 'vue-luxon';
Vue.use(VueLuxon);
export default {
  name: 'ClockMenuComponent',
  props: ['militaryChoice'],
  data() {
    return {
      city: '',
      didSearch: false,
    };
  },
  mounted() {
    this.checkMilitaryTime();
  },
  computed: {
    MilitaryTime() {
      return this.militaryChoice;
    },
    SearchedTime() {
      return this.$store.state.clocks.current;
    },
  },
  methods: {
    checkMilitaryTime() {
      if (this.militaryChoice) {
        document
          .getElementById('clockSwitch')
          .setAttribute('checked', 'checked');
      } else if (this.militaryChoice == false) {
        document.getElementById('clockSwitch').removeAttribute('checked');
      }
    },
    enableMilitaryTime() {
      if (this.militaryChoice == true) {
        this.$store.state.user.user.selected.militaryTime = false;
      } else if (this.militaryChoice == false) {
        this.$store.state.user.user.selected.militaryTime = true;
      }
      this.$root.$emit('enableMilitaryTime');
      this.emitChange();
    },
    emitChange() {
      this.$emit('madeChange');
    },
    submitLocation() {
      this.$store.dispatch('getWorldTimes', this.city);
      this.didSearch = true;
    },
  },
};
</script>

<style scoped>
div.clockMenuComponent {
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

/* Main section styling */
div.mainSectionWrapper {
  height: 285px;
  width: 505px;
  overflow-y: auto;
}
div.mainSectionWrapper::-webkit-scrollbar {
  width: 10px;
  height: 5px;
  background-color: rgb(90, 90, 90);
}
div.mainSectionWrapper::-webkit-scrollbar-thumb {
  background: goldenrod;
}
div.mainSection {
  height: 285px;
  width: 485px;
}

/* Time section styling */
div.timeControlSection {
  height: 125px;
}
div.timeControlSection h5 {
  padding-left: 10px;
}

/* ToggleOption styling */
div.controlSection {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
}
div.controlSection p {
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

/* Extra Location styling */
div.extraLocationTimes {
  margin-top: 30px;
}
div.extraLocationTimes h5 {
  padding-left: 10px;
}
div.searchSection div.searchInput {
  text-align: center;
}
div.searchInput {
  position: relative;
}
div.searchInput input {
  width: 215px;
  font-size: 14px;
}
/* Search Input button styling */
div.searchInput button {
  padding: 3px 6px;
  margin-left: 10px;
  background-color: transparent;
  border-radius: 5px 5px 5px 5px;
  border: 1pt solid white;
  color: white;
  font-size: 12px;
  position: absolute;
}
div.searchInput button:hover {
  background-color: lightgray;
  border: 1pt solid black;
  box-shadow: 0pt 0pt 6pt white, 0pt 0pt 6pt white;
  text-shadow: 1px 1px 1px black;
  color: goldenrod;
}
div.searchInput button:active {
  color: white !important;
  outline: none !important;
  box-shadow: none !important;
  border: 1pt solid white !important;
  text-shadow: 1px 1px 1px black;
  background-color: goldenrod !important;
}
div.searchInput button:focus {
  background-color: lightgray;
  outline: none;
  text-shadow: 1px 1px 1px black;
  color: goldenrod;
  box-shadow: 0pt 0pt 12pt goldenrod;
}
/* Main Result section styling */
div.mainResult {
  background-color: lightgreen;
}
div.dataColumns {
  display: flex;
}
div.leftColumn div.name {
  font-size: 18px;
}
div.leftColumn div.time {
  font-size: 20px;
}
</style>
