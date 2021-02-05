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
                <i v-if="weather.condition.sunny" class="fas fa-sun"></i>
                <i
                  v-else-if="weather.condition.rain"
                  class="fas fa-cloud-showers-heavy"
                ></i>
                <i
                  v-else-if="weather.condition.cloudy"
                  class="fas fa-cloud"
                ></i>
                <i
                  v-else-if="weather.condition.snow"
                  class="far fa-snowflake"
                ></i>
                <i v-else-if="weather.condition.fog" class="fas fa-smog"></i>
                <i v-else-if="weather.condition.mist" class="fas fa-smog"></i>
                <i v-else class="fas fa-question"></i>
              </div>
            </div>
            <div class="extraWeatherData">
              <div class="today">
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
              <div v-if="use.metric" class="low">
                <h5>{{ Math.round(Current.low - 32 / 1.8) }}&#176;</h5>
              </div>
              <div v-else class="low">
                <h5>{{ Math.round(Current.low) }}&#176;</h5>
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
          <div v-if="city.change" class="locationInput">
            <input
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
            <i
              class="fas fa-crosshairs"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Use current coordinates"
              @click="useCoordinates"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="forecastArea container-fluid">
      <div class="row">
        <forecast-day
          @click.native="switchWeather('DayOne')"
          :activeData="active.dayOne"
          :forecastData="DayOne"
          :metricData="use.metric"
        />
        <forecast-day
          @click.native="switchWeather('DayTwo')"
          :activeData="active.dayTwo"
          :forecastData="DayTwo"
          :metricData="use.metric"
        />
        <forecast-day
          @click.native="switchWeather('DayThree')"
          :activeData="active.dayThree"
          :forecastData="DayThree"
          :metricData="use.metric"
        />
        <forecast-day
          @click.native="switchWeather('DayFour')"
          :activeData="active.dayFour"
          :forecastData="DayFour"
          :metricData="use.metric"
        />
        <forecast-day
          @click.native="switchWeather('DayFive')"
          :activeData="active.dayFive"
          :forecastData="DayFive"
          :metricData="use.metric"
        />
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
import ForecastDay from '@/components/Weather/ForecastDay.vue';
export default {
  name: 'FiveDayForecastComponent',
  props: ['weatherData'],
  components: {
    ForecastDay,
  },
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
      active: {
        dayOne: true,
        dayTwo: false,
        dayThree: false,
        dayFour: false,
        dayFive: false,
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
          console.log('hit me');
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayOne;
          this.show.today = true;
          this.active.dayOne = true;
          this.active.dayTwo = false;
          this.active.dayThree = false;
          this.active.dayFour = false;
          this.active.dayFive = false;
          break;
        case 'DayTwo':
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayTwo;
          this.show.today = false;
          this.active.dayOne = false;
          this.active.dayTwo = true;
          this.active.dayThree = false;
          this.active.dayFour = false;
          this.active.dayFive = false;
          break;
        case 'DayThree':
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayThree;
          this.show.today = false;
          this.active.dayOne = false;
          this.active.dayTwo = false;
          this.active.dayThree = true;
          this.active.dayFour = false;
          this.active.dayFive = false;
          break;
        case 'DayFour':
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayFour;
          this.show.today = false;
          this.active.dayOne = false;
          this.active.dayTwo = false;
          this.active.dayThree = false;
          this.active.dayFour = true;
          this.active.dayFive = false;
          break;
        case 'DayFive':
          this.$store.state.weather.forecast.current = this.$store.state.weather.forecast.dayFive;
          this.show.today = false;
          this.active.dayOne = false;
          this.active.dayTwo = false;
          this.active.dayThree = false;
          this.active.dayFour = false;
          this.active.dayFive = true;
          break;
        case 'Today':
          this.$store.state.weather.forecast.current = this.$store.state.weather.weather;
          this.show.today = true;
          this.active.dayOne = true;
          this.active.dayTwo = false;
          this.active.dayThree = false;
          this.active.dayFour = false;
          this.active.dayFive = false;
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
      setTimeout(() => {
        this.city.name = '';
        this.city.change = false;
      }, 200);
    },
    useCoordinates() {
      console.log('hit me');
      this.$emit('useCoordinates');
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
  padding: 10px 0 0 25px;
}
div.dateLocation p {
  margin-bottom: 0;
  font-size: 22px;
}
div.dateLocation p:last-of-type {
  color: gray;
  margin-left: 12px;
  font-size: 18px;
  margin-top: 3px;
}
div.dateLocation p:last-of-type:hover {
  color: white;
  cursor: pointer;
}
div.tempCondition {
  padding-left: 25px;
  width: 130px;
  margin-top: -7px;
}
h1.temp {
  display: flex;
  margin-bottom: 0;
  font-size: 56px;
}
p.degree {
  margin-top: -10px;
  font-size: 74px;
}
div.condition i {
  font-size: 40px;
  margin-top: -10px;
  padding-left: 10px;
}
div.low {
  position: absolute;
  bottom: 115px;
  left: 85px;
}
div.low h5 {
  font-size: 36px;
  color: rgb(153, 153, 153);
}
div.extraWeatherData {
  padding-left: 20px;
  align-self: center;
  padding-right: 5px;
}
div.extraWeatherData p {
  margin-bottom: 0;
  font-size: 17px;
}
div.settingsArea {
  width: 165px;
  height: 125px;
  padding-top: 8px;
  border-left: 1pt solid white;
  align-self: center;
}
div.unitSwitch {
  padding-left: 7px;
  margin-bottom: 4px;
}
label.custom-control-label:hover,
input.custom-control-input:hover {
  cursor: pointer;
}
div.locationSwitch {
  text-align: center;
  padding-left: 7px;
}
div.locationSwitch p {
  text-align: start;
  margin-bottom: 5px;
}
div.locationSwitch p:hover {
  cursor: pointer;
  text-shadow: 2px 0px 8px white;
}
div.locationSwitch input {
  margin-left: 12px;
  border: none;
  border-bottom: 1pt solid white;
  text-align: center;
  background-color: transparent;
  color: white;
}
div.locationSwitch input:focus {
  outline: none;
}
div.locationSwitch .locationInput {
  display: flex;
  justify-content: center;
}
div.locationInput i {
  align-self: center;
  font-size: 16px;
  margin-left: 10px;
  color: rgba(163, 163, 163, 0.685);
}
div.locationInput i:hover {
  cursor: pointer;
  color: white;
}
div.forecastArea {
  border-top: 1pt solid white;
  height: 85px;
}
</style>
