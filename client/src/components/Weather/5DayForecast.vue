<template>
  <div class="forecastComponent" id="test">
    <div class="mainDisplayArea">
      <div v-if="show.today" class="weatherDataArea">
        <div class="mainWeatherData">
          <div class="dateLocation">
            <p>
              {{ Today.name }} / {{ weather.date.month }} {{ weather.date.day }}
            </p>
            <p v-show="show.today == false"><small>Today</small></p>
          </div>
          <div class="weatherData">
            <div class="tempCondition">
              <h1 v-if="use.metric" class="temp">
                {{ Math.round(Today.main.temp - 32 / 1.8) }}
                <p id="degree">&#176;</p>
              </h1>
              <h1 v-else class="temp">
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
                <p v-if="use.metric">
                  <small
                    >Feels Like:
                    {{
                      Math.round(Today.main.feels_like - 32 / 1.8)
                    }}&#176;</small
                  >
                </p>
                <p v-else>
                  <small
                    >Feels Like:
                    {{ Math.round(Today.main.feels_like) }}&#176;</small
                  >
                </p>
                <p>
                  <small>Humidity: {{ Today.main.humidity }}%</small>
                </p>
                <p v-if="use.metric">
                  <small
                    >Wind Speed:
                    {{ Math.round(Today.wind.speed * 1.609) }}/kph</small
                  >
                </p>
                <p v-else>
                  <small
                    >Wind Speed: {{ Math.round(Today.wind.speed) }}/mph</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="weatherDataArea">
        <div class="mainWeatherData">
          <div class="dateLocation">
            <p>
              {{ Today.name }} /
              {{
                this.$luxon(Current.date, {
                  input: { format: 'yyyy-MM-dd' },
                  output: 'date_full',
                }).slice(0, 10)
              }}
            </p>
            <p @click="switchWeather('Today')"><small>Today</small></p>
          </div>
          <div class="weatherData">
            <div class="tempCondition">
              <h1 v-if="use.metric" class="temp">
                {{ Math.round(Current.high - 32 / 1.8) }}
                <p id="degree">&#176;</p>
              </h1>
              <h1 v-else class="temp">
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
                <p v-if="use.metric">
                  <small
                    >Feels Like:
                    {{ Math.round(Current.feels_like_high - 32 / 1.8) }} -
                    {{
                      Math.round(Current.feels_like_low - 32 / 1.8)
                    }}&#176;</small
                  >
                </p>
                <p v-else>
                  <small
                    >Feels Like: {{ Math.round(Current.feels_like_high) }} -
                    {{ Math.round(Current.feels_like_low) }}&#176;</small
                  >
                </p>
                <p>
                  <small
                    >Humidity: {{ Current.humidity_high }} -
                    {{ Current.humidity_low }}%</small
                  >
                </p>
                <p v-if="use.metric">
                  <small
                    >Wind Speed:
                    {{ Math.round(Current.wind_speed_high * 1.609) }} -
                    {{ Math.round(Current.wind_speed_low * 1.609) }}/kph</small
                  >
                </p>
                <p v-else>
                  <small
                    >Wind Speed: {{ Math.round(Current.wind_speed_high) }} -
                    {{ Math.round(Current.wind_speed_low) }}/mph</small
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="settingsArea">
        <div class="unitSwitch">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="metricSwitch"
              @input="switchUnits"
            />
            <label class="custom-control-label" for="metricSwitch"
              >Toggle Metric Units</label
            >
          </div>
        </div>
        <div class="locationSwitch">
          <p @click="changeLocation">
            Change Location <i class="fas fa-pencil-alt"></i>
          </p>
          <input
            v-if="city.change"
            v-on:blur="onClickOutside"
            type="text"
            ref="focus"
            v-model="city.name"
            v-on:keyup.enter="submitNewCity"
            v-autowidth="{
              maxWidth: '140px',
              minWidth: '70px',
              comfortZone: 10,
            }"
          />
        </div>
      </div>
    </div>
    <div class="forecastArea container-fluid">
      <div class="row">
        <div class="col forecast" @click="switchWeather('DayOne')">
          <p class="weekday">
            {{
              this.$luxon(DayOne.date, {
                input: { format: 'yyyy-MM-dd' },
                output: 'date_medd',
              }).slice(0, 3)
            }}
          </p>
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
          <p class="weekday">
            {{
              this.$luxon(DayTwo.date, {
                input: { format: 'yyyy-MM-dd' },
                output: 'date_medd',
              }).slice(0, 3)
            }}
          </p>
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
          <p class="weekday">
            {{
              this.$luxon(DayThree.date, {
                input: { format: 'yyyy-MM-dd' },
                output: 'date_medd',
              }).slice(0, 3)
            }}
          </p>
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
          <p class="weekday">
            {{
              this.$luxon(DayFour.date, {
                input: { format: 'yyyy-MM-dd' },
                output: 'date_medd',
              }).slice(0, 3)
            }}
          </p>
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
          <p class="weekday">
            {{
              this.$luxon(DayFive.date, {
                input: { format: 'yyyy-MM-dd' },
                output: 'date_medd',
              }).slice(0, 3)
            }}
          </p>
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
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
import VueLuxon from 'vue-luxon';
Vue.use(VueLuxon);
export default {
  name: 'FiveDayForecastComponent',
  props: ['weatherData'],
  data() {
    return {
      weather: this.weatherData,
      show: {
        today: true,
      },
      use: {
        metric: false,
      },
      city: {
        change: false,
        name: '',
      },
    };
  },
  beforeUpdate() {
    this.weather = this.weatherData;
  },
  mounted() {
    // TODO use this code to check if a user's prefference is metric units and then switch the 'use.metric' boolean along with adding/removing the 'checked' attribute from the input
    // document.getElementById('metricSwitch').setAttribute('checked', 'checked');
    // document.getElementById('metricSwitch').removeAttribute('checked');
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
    switchUnits() {
      if (this.use.metric == false) {
        this.use.metric = true;
      } else if (this.use.metric == true) {
        this.use.metric = false;
      }
      console.log(this.use.metric);
    },
    changeLocation() {
      this.city.name = '';
      this.city.change = true;
      this.$nextTick(() => this.$refs.focus.focus());
    },
    async submitNewCity() {
      await this.$store.dispatch('getNewWeather', this.city);
      this.city.change = false;
    },
    onClickOutside() {
      this.city.name = '';
      this.city.change = false;
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
div.locationSwitch {
  text-align: center;
}
div.locationSwitch p {
  text-align: start;
}
div.locationSwitch p:hover {
  cursor: pointer;
}
div.locationSwitch input {
  border: none;
  border-bottom: 1pt solid white;
  text-align: center;
  background-color: transparent;
  color: white;
}
div.locationSwitch input:focus {
  outline: none;
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
