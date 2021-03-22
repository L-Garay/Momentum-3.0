<template>
  <div class="forecastComponent">
    <div class="mainDisplayArea">
      <div class="header">
        <div class="dateLocation" v-if="show.today">
          <div class="locationWrapper">
            <p class="location" v-if="city.change == false">
              {{ Today.name }}
            </p>
            <div v-else class="locationInput">
              <input
                v-on:blur="onClickOutside"
                type="text"
                ref="focus"
                v-model="city.name"
                v-on:keyup.enter="submitNewCity"
                v-autowidth="{
                  maxWidth: '215px',
                  minWidth: '70px',
                  comfortZone: 5,
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
          <p class="date">/ {{ weather.date.month }} {{ weather.date.day }}</p>
          <p class="today" v-show="show.today == false"><small>Today</small></p>
        </div>
        <div class="dateLocation" v-else>
          <div class="locationWrapper">
            <p v-if="city.change == false" class="location">
              {{ Today.name }}
            </p>
            <div v-else class="locationInput">
              <input
                v-on:blur="onClickOutside"
                type="text"
                ref="focus"
                v-model="city.name"
                v-on:keyup.enter="submitNewCity"
                v-autowidth="{
                  maxWidth: '215px',
                  minWidth: '70px',
                  comfortZone: 5,
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

          <p class="date">
            /
            {{
              this.$luxon(Current.date, {
                input: { format: 'yyyy-MM-dd' },
                output: 'date_full',
              }).slice(0, -6)
            }}
          </p>
          <p class="today" @click="switchWeather('Today')">
            <small>Today</small>
          </p>
        </div>
      </div>
      <div class="body">
        <!-- This is the current weather -->
        <div v-if="show.today" class="weatherDataArea">
          <div class="mainWeatherData">
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
                  <i v-else-if="weather.condition.haze" class="fas fa-smog"></i>
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
        <!-- This is displayed when a user selects another date -->
        <div v-else class="weatherDataArea">
          <div class="mainWeatherData">
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
                  <i
                    v-else-if="Current.condition == 'Haze'"
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
              <!-- These are the feels like, humidty, and wind speed -->
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
                      {{
                        Math.round(Current.wind_speed_low * 1.609)
                      }}/kph</small
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
          <div class="locationSwitch">
            <p @click="changeLocation">
              Change Location <i class="fas fa-pencil-alt"></i>
            </p>
          </div>
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
// For the new city input
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
// For formattign the dates
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

    // This will add the event listener 1 second after the component is mounted
    setTimeout(() => {
      document.addEventListener('click', this.setupEventListener, false);
      console.log('set up');
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
    // This is the actual event listener, it has to be named in order to properly remove the event listener. It is checking to see if whatever you clicked on is contained within 'this.$el' (which I believe in the context of Vue refers to the current component, in this case the 5DayForecast component), and if it is not within it then close the modal/component and remove the event listener.
    setupEventListener(event) {
      if (!this.$el.contains(event.target)) {
        console.log(event.target, 'target');
        console.log(this.$el, 'element');
        this.$emit('closeForecast');
        this.show.today = true;
        document.removeEventListener('click', this.setupEventListener, false);
      }
    },
    // When a user clicks on one of the forecast days
    switchWeather(day) {
      switch (day) {
        case 'DayOne':
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
      this.$emit('checkCondition');
    },
    onClickOutside() {
      // The reason this is on a timeout is because I want the user to be able to click the 'Change location' 'button' again and have it close the input; however without the timer it would just continually open the input (never close it). But, by adding in the timeout to the function the user can click on the 'button' again and even by doing so they will technically open the input again...since they clicked out of the input it will run the :on-blur method, which is this one...which will then wait .2 seconds before closing the input (almost no noticeable lag)
      setTimeout(() => {
        this.city.name = '';
        this.city.change = false;
      }, 200);
    },
    useCoordinates() {
      this.$emit('useCoordinates');
    },
  },
};
</script>

<style scoped>
div.forecastComponent {
  position: absolute;
  right: 15px;
  top: 105px;
  z-index: 1000;
  height: 250px;
  width: 475px;
  background-color: rgba(0, 0, 0, 0.85);
  color: white;
  border-radius: 6px 6px 6px 6px;
}

div.mainDisplayArea {
  height: 165px;
}
/* Header (Date/Location) styling */
div.header {
  height: 40px;
}
div.dateLocation {
  display: flex;
  padding: 3px 0 0 25px;
}
div.locationWrapper {
  max-width: 245px;
  overflow-x: auto;
}
div.locationWrapper::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: rgb(90, 90, 90);
}
div.locationWrapper::-webkit-scrollbar-thumb {
  background: goldenrod;
}
div.dateLocation p.date {
  padding-left: 5px;
}
div.dateLocation p {
  margin-bottom: 0;
  font-size: 22px;
}
div.dateLocation p.today {
  color: gray;
  margin-left: 12px;
  font-size: 18px;
  margin-top: 3px;
}
div.dateLocation p.today:hover {
  color: goldenrod;
  cursor: pointer;
}
div.locationInput input {
  margin-top: 5px;
  outline: none;
  border: none;
  border-bottom: 1pt solid white;
  text-align: center;
  background-color: rgba(85, 85, 85, 0.507);
  color: goldenrod;
}
div.locationInput i {
  align-self: center;
  font-size: 16px;
  margin-left: 10px;

  color: rgba(163, 163, 163, 0.685);
}
div.locationInput i:hover {
  cursor: pointer;
  color: goldenrod;
}

/* Main weather  data */
div.weatherDataArea {
  width: 310px;
}
div.weatherData {
  display: flex;
}
div.body {
  display: flex;
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
/* Extra weather data */
div.extraWeatherData {
  padding-left: 20px;
  align-self: center;
  padding-right: 5px;
}
div.extraWeatherData p {
  margin-bottom: 0;
  font-size: 17px;
}

/* Settings  */
div.settingsArea {
  width: 175px;
  height: 85px;
  padding-top: 6px;
  align-self: center;
}
div.settingsArea::after {
  position: absolute;
  content: '';
  width: 2px;
  height: 40%;
  top: 18%;
  background: white;
}
div.settingsArea p {
  padding-left: 12px;
}
div.unitSwitch {
  padding-left: 18px;
  margin-top: 10px;
}
/* Metric unit switch  */
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
/* Location switch */
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
  text-shadow: 1px 0px 8px white, 1px 0px 8px white;
}

/* 5 day forecast area */
div.forecastArea {
  height: 85px;
}
div.forecastArea::after {
  position: absolute;
  content: '';
  width: 97.5%;
  height: 1px;
  bottom: 34%;
  right: 1.25%;
  background: white;
}
</style>
