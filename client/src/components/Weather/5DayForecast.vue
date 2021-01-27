<template>
  <div class="forecastComponent">
    <div class="mainDisplayArea">
      <div class="weatherDataArea">
        <div class="mainWeatherData">
          {{ DayOne }}
        </div>
        <div class="extraWeatherData"></div>
      </div>
      <div class="settingsArea"></div>
    </div>
    <div class="forecastArea">
      <!-- This is where the 5 day forecast data will be displayed.  Still haven't decided if I'm going to use a container/row/col design or just use divs, I'll try columns first and see how it looks. -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiveDayForecastComponent',
  data() {
    return {};
  },
  mounted() {},
  computed: {
    DayOne() {
      return this.$store.state.weather.forecast.dayOne;
    },
    DayTwo() {
      return this.$store.state.weather.forecast.dayTwo;
    },
    DayThree() {
      return this.$store.state.weather.forecast.dayThree;
    },
    DayFour() {
      return this.$store.state.weather.forecast.dayFour;
    },
    DayFive() {
      return this.$store.state.weather.forecast.dayFive;
    },
  },
  methods: {},
};
</script>

<style scoped>
div.forecastComponent {
  position: absolute;
  right: 15px;
  top: 95px;
  height: 250px;
  width: 475px;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  border-radius: 6px 6px 6px 6px;
}

div.mainDisplayArea {
  height: 160px;
  display: flex;
}
div.weatherDataArea {
  width: 310px;
}
div.settingsArea {
  width: 165px;
  border-left: 1pt solid white;
}
div.forecastArea {
  border-top: 1pt solid white;
  height: 80px;
}
</style>
