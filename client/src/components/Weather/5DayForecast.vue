<template>
  <div class="forecastComponent" id="test">
    <div class="mainDisplayArea">
      <div v-if="show.today" class="weatherDataArea">
        <div class="mainWeatherData">
          <div class="dateLocation">
            <p>{{ Today.name }} / Date goes here</p>
            <p v-show="show.today == false"><small>Today</small></p>
          </div>
          <div class="weatherData">
            <div class="tempCondition">
              <h1 class="temp">
                {{ Math.round(Today.main.temp) }}
                <p id="degree">&#176;</p>
              </h1>
              <div class="condition">
                <i v-if="weather.condition.sunny" class="fas fa-sun icon"></i>
                <i
                  v-else-if="weather.condition.rain"
                  class="fas fa-cloud-showers-heavy icon"
                ></i>
                <i
                  v-else-if="weather.condition.cloudy"
                  class="fas fa-cloud icon"
                ></i>
                <i
                  v-else-if="weather.condition.snow"
                  class="far fa-snowflake icon"
                ></i>
                <i
                  v-else-if="weather.condition.fog"
                  class="fas fa-smog icon"
                ></i>
                <i
                  v-else-if="weather.condition.mist"
                  class="fas fa-smog icon"
                ></i>
                <i v-else class="fas fa-question icon"></i>
              </div>
            </div>
            <div class="extraWeatherData">
              <div v-if="show.today" class="today">
                <p>
                  <small>Feels Like: {{ Today.main.feels_like }}&#176;</small>
                </p>
                <p>
                  <small>Humidity: {{ Today.main.humidity }}%</small>
                </p>
                <p>
                  <small>Wind Speed: {{ Today.wind.speed }}/mph</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="weatherDataArea">
        <div class="mainWeatherData">
          <div class="dateLocation">
            <p>{{ Current.name || 'fix me' }} / Date goes here</p>
            <p @click="switchWeather('Today')"><small>Today</small></p>
          </div>
          <div class="weatherData">
            <div class="tempCondition">
              <h1 class="temp">
                {{ Math.round(Current.high) }}
                <p id="degree">&#176;</p>
              </h1>
              <div class="condition">
                <i
                  v-if="Current.condition == 'Clear'"
                  class="fas fa-sun icon"
                ></i>
                <i
                  v-else-if="Current.condition == 'Rain'"
                  class="fas fa-cloud-showers-heavy icon"
                ></i>
                <i
                  v-else-if="Current.condition == 'Clouds'"
                  class="fas fa-cloud icon"
                ></i>
                <i
                  v-else-if="Current.condition == 'Snow'"
                  class="far fa-snowflake icon"
                ></i>
                <i
                  v-else-if="Current.condition == 'Fog'"
                  class="fas fa-smog icon"
                ></i>
                <i
                  v-else-if="Current.condition == 'Mist'"
                  class="fas fa-smog icon"
                ></i>
                <i v-else class="fas fa-question icon"></i>
              </div>
            </div>
            <div class="extraWeatherData">
              <div class="extraWeather">
                <p>
                  <small
                    >Feels Like: {{ Current.feels_like_high }} -
                    {{ Current.feels_like_low }}&#176;</small
                  >
                </p>
                <p>
                  <small
                    >Humidity: {{ Current.humidity_high }} -
                    {{ Current.humidity_low }}%</small
                  >
                </p>
                <p>
                  <small
                    >Wind Speed: {{ Current.wind_speed_high }} -
                    {{ Current.wind_speed_low }}/mph</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="settingsArea"></div>
    </div>
    <div class="forecastArea container-fluid">
      <div class="row">
        <div class="col forecast" @click="switchWeather('DayOne')">
          <p class="weekday">DayOne</p>
          <div class="forecastData">
            <div class="forecastCondition">
              <i v-if="DayOne.condition == 'Clear'" class="fas fa-sun icon"></i>
              <i
                v-else-if="DayOne.condition == 'Rain'"
                class="fas fa-cloud-showers-heavy icon"
              ></i>
              <i
                v-else-if="DayOne.condition == 'Clouds'"
                class="fas fa-cloud icon"
              ></i>
              <i
                v-else-if="DayOne.condition == 'Snow'"
                class="far fa-snowflake icon"
              ></i>
              <i
                v-else-if="DayOne.condition == 'Fog'"
                class="fas fa-smog icon"
              ></i>
              <i
                v-else-if="DayOne.condition == 'Mist'"
                class="fas fa-smog icon"
              ></i>
              <i v-else class="fas fa-question icon"></i>
            </div>
            <div class="forecastTemp">
              <div class="forecastHigh">
                <p>
                  <small>{{ Math.round(DayOne.high) }}&#176;</small>
                </p>
              </div>
              <div class="forecastLow">
                <p>
                  <small>{{ Math.round(DayOne.low) }}&#176;</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col forecast" @click="switchWeather('DayTwo')">
          <p class="weekday">DayTwo</p>
          <div class="forecastData">
            <div class="forecastCondition">
              <i v-if="DayTwo.condition == 'Clear'" class="fas fa-sun icon"></i>
              <i
                v-else-if="DayTwo.condition == 'Rain'"
                class="fas fa-cloud-showers-heavy icon"
              ></i>
              <i
                v-else-if="DayTwo.condition == 'Clouds'"
                class="fas fa-cloud icon"
              ></i>
              <i
                v-else-if="DayTwo.condition == 'Snow'"
                class="far fa-snowflake icon"
              ></i>
              <i
                v-else-if="DayTwo.condition == 'Fog'"
                class="fas fa-smog icon"
              ></i>
              <i
                v-else-if="DayTwo.condition == 'Mist'"
                class="fas fa-smog icon"
              ></i>
              <i v-else class="fas fa-question icon"></i>
            </div>
            <div class="forecastTemp">
              <div class="forecastHigh">
                <p>
                  <small>{{ Math.round(DayTwo.high) }}&#176;</small>
                </p>
              </div>
              <div class="forecastLow">
                <p>
                  <small>{{ Math.round(DayTwo.low) }}&#176;</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col forecast" @click="switchWeather('DayThree')">
          <p class="weekday">DayThree</p>
          <div class="forecastData">
            <div class="forecastCondition">
              <i
                v-if="DayThree.condition == 'Clear'"
                class="fas fa-sun icon"
              ></i>
              <i
                v-else-if="DayThree.condition == 'Rain'"
                class="fas fa-cloud-showers-heavy icon"
              ></i>
              <i
                v-else-if="DayThree.condition == 'Clouds'"
                class="fas fa-cloud icon"
              ></i>
              <i
                v-else-if="DayThree.condition == 'Snow'"
                class="far fa-snowflake icon"
              ></i>
              <i
                v-else-if="DayThree.condition == 'Fog'"
                class="fas fa-smog icon"
              ></i>
              <i
                v-else-if="DayThree.condition == 'Mist'"
                class="fas fa-smog icon"
              ></i>
              <i v-else class="fas fa-question icon"></i>
            </div>
            <div class="forecastTemp">
              <div class="forecastHigh">
                <p>
                  <small>{{ Math.round(DayThree.high) }}&#176;</small>
                </p>
              </div>
              <div class="forecastLow">
                <p>
                  <small>{{ Math.round(DayThree.low) }}&#176;</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col forecast" @click="switchWeather('DayFour')">
          <p class="weekday">DayFour</p>
          <div class="forecastData">
            <div class="forecastCondition">
              <i
                v-if="DayFour.condition == 'Clear'"
                class="fas fa-sun icon"
              ></i>
              <i
                v-else-if="DayFour.condition == 'Rain'"
                class="fas fa-cloud-showers-heavy icon"
              ></i>
              <i
                v-else-if="DayFour.condition == 'Clouds'"
                class="fas fa-cloud icon"
              ></i>
              <i
                v-else-if="DayFour.condition == 'Snow'"
                class="far fa-snowflake icon"
              ></i>
              <i
                v-else-if="DayFour.condition == 'Fog'"
                class="fas fa-smog icon"
              ></i>
              <i
                v-else-if="DayFour.condition == 'Mist'"
                class="fas fa-smog icon"
              ></i>
              <i v-else class="fas fa-question icon"></i>
            </div>
            <div class="forecastTemp">
              <div class="forecastHigh">
                <p>
                  <small>{{ Math.round(DayFour.high) }}&#176;</small>
                </p>
              </div>
              <div class="forecastLow">
                <p>
                  <small>{{ Math.round(DayFour.low) }}&#176;</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col forecast" @click="switchWeather('DayFive')">
          <p class="weekday">DayFive</p>
          <div class="forecastData">
            <div class="forecastCondition">
              <i
                v-if="DayFive.condition == 'Clear'"
                class="fas fa-sun icon"
              ></i>
              <i
                v-else-if="DayFive.condition == 'Rain'"
                class="fas fa-cloud-showers-heavy icon"
              ></i>
              <i
                v-else-if="DayFive.condition == 'Clouds'"
                class="fas fa-cloud icon"
              ></i>
              <i
                v-else-if="DayFive.condition == 'Snow'"
                class="far fa-snowflake icon"
              ></i>
              <i
                v-else-if="DayFive.condition == 'Fog'"
                class="fas fa-smog icon"
              ></i>
              <i
                v-else-if="DayFive.condition == 'Mist'"
                class="fas fa-smog icon"
              ></i>
              <i v-else class="fas fa-question icon"></i>
            </div>
            <div class="forecastTemp">
              <div class="forecastHigh">
                <p>
                  <small>{{ Math.round(DayFive.high) }}&#176;</small>
                </p>
              </div>
              <div class="forecastLow">
                <p>
                  <small>{{ Math.round(DayFive.low) }}&#176;</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiveDayForecastComponent',
  props: ['weatherData'],
  data() {
    return {
      weather: this.weatherData,
      show: {
        today: true,
      },
    };
  },
  beforeUpdate() {
    this.weather = this.weatherData;
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.setupEventListener, false);
    }, 1000);
  },
  computed: {
    Today() {
      return this.$store.state.weather.weather;
    },
    Current() {
      return this.$store.state.weather.forecast.current;
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
    setupEventListener(event) {
      if (!this.$el.contains(event.target)) {
        this.$emit('closeForecast');
        this.show.today = true;
        document.removeEventListener('click', this.setupEventListener, false);
      }
    },
    switchWeather(day) {
      switch (day) {
        case 'DayOne':
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayOne;
          this.show.today = false;
          break;
        case 'DayTwo':
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayTwo;
          this.show.today = false;
          break;
        case 'DayThree':
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayThree;
          this.show.today = false;
          break;
        case 'DayFour':
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayFour;
          this.show.today = false;
          break;
        case 'DayFive':
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayFive;
          this.show.today = false;
          break;
        case 'Today':
          this.$store.state.weather.forecast.current = this.$store.state.weather.weather;
          this.show.today = true;
          break;
        default:
          this.$store.state.weather.forecast.current = this.$store.state.weather.weather;
          break;
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
  height: 165px;
  display: flex;
}
div.weatherDataArea {
  width: 310px;
}
div.weatherData {
  display: flex;
}
div.dateLocation {
  display: flex;
}
div.dateLocation p:last-of-type {
  color: gray;
  margin-left: 12px;
}
div.dateLocation p:last-of-type:hover {
  color: white;
  cursor: pointer;
}
h1.temp {
  display: flex;
}
p.degree {
  margin-top: -10px;
  font-size: 74px;
}
div.settingsArea {
  width: 165px;
  border-left: 1pt solid white;
}
div.forecastArea {
  border-top: 1pt solid white;
  height: 85px;
}
div.forecastData {
  display: flex;
  justify-content: center;
  align-items: center;
}
div.forecast {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: center;
}
div.forecast p {
  margin-bottom: 0;
}
div.forecast:hover {
  cursor: pointer;
  background-color: lightslategrey;
}
</style>
