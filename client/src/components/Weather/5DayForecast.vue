<template>
  <div class="forecastComponent" id="test">
    <div class="mainDisplayArea">
      <div class="weatherDataArea">
        <div class="mainWeatherData">
          <div class="dateLocation">
            <p>{{ Today.name }} / Date goes here</p>
          </div>
          <div class="tempCondition">
            <h1 class="temp">
              {{ Math.round(Today.main.temp) }}
              <p id="degree"><small>&#176;</small></p>
            </h1>
            <div class="condition">
              <i v-if="sunny" class="fas fa-sun icon"></i>
              <i v-else-if="rain" class="fas fa-cloud-showers-heavy icon"></i>
              <i v-else-if="cloudy" class="fas fa-cloud icon"></i>
              <i v-else-if="snow" class="far fa-snowflake icon"></i>
              <i v-else-if="fog" class="fas fa-smog icon"></i>
              <i v-else-if="mist" class="fas fa-smog icon"></i>
              <i v-else class="fas fa-question icon"></i>
            </div>
          </div>
          <div class="extraWeatherData"></div>
        </div>
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
    return {
      // Possible weather conditions
      sunny: false,
      rain: false,
      snow: false,
      cloudy: false,
      fog: false,
      mist: false,
      unkownCondition: false,
    };
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.setupEventListener());
    }, 1000);
    // setTimeout(() => {
    //   document.addEventListener('click', (event) => {
    //     this.eventListenerTest(event);
    //   });
    // }, 1000);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.setupEventListener());
  },
  computed: {
    Today() {
      return this.$store.state.weather.weather;
    },
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
  methods: {
    setupEventListener() {
      document.addEventListener('click', (event) => {
        this.eventListenerTest(event);
      });
    },
    eventListenerTest(event) {
      console.log('doiddi');
      // let component = document.getElementById('test');
      if (!this.$el.contains(event.target)) {
        this.$emit('closeForecast');
        console.log('removed');
        document.removeEventListener('click', this.setupEventListener());
      }
    },
  },
};
</script>

<style scoped>
div.forecastComponent {
  position: absolute;
  right: 15px;
  top: 95px;
  z-index: 1000;
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
