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
          <div class="extraLoctionTimes"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClockMenuComponent',
  props: ['militaryChoice'],
  data() {
    return {};
  },
  mounted() {
    this.checkMilitaryTime();
  },
  computed: {
    MilitaryTime() {
      return this.militaryChoice;
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
  height: 308px;
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
  height: 308px;
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
</style>
