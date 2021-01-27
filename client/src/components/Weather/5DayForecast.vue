<template>
  <div class="forecastComponent" id="test">
    <div class="mainDisplayArea">
      <div class="weatherDataArea">
        <div class="mainWeatherData">
          <div class="dateLocation">
            <p>{{ Today.name }} / Date goes here</p>
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
              <div v-else class="forecast">
                <p>
                  <small
                    >{{ Today.main.feels_like_low }} -
                    {{ Today.main.feels_like_high }}</small
                  >
                </p>
                <p>
                  <small
                    >{{ Today.main.humidity_low }} -
                    {{ Today.main.humidity_high }}</small
                  >
                </p>
                <p>
                  <small
                    >{{ Today.wind_speed_low }} -
                    {{ Today.wind_speed_high }}</small
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
        <div class="col">
          <p class="day">DayOne</p>
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
        <div class="col">
          <p class="day">DayTwo</p>
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
        <div class="col">
          <p class="day">DayThree</p>
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
        <div class="col">
          <p class="day">DayFour</p>
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
        <div class="col">
          <p class="day">DayFive</p>
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
        document.removeEventListener('click', this.setupEventListener, false);
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
div.weatherData {
  display: flex;
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
  height: 80px;
}
div.forecastData {
  display: flex;
}
div.forecastTemp p {
  margin-bottom: 0;
}
</style>
