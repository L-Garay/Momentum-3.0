<template>
  <div class="weatherWrapper">
    <div @click="toggle5DayForecast" class="main ml-auto" id="changeColor">
      <div class="background">
        <div class="content">
          <div class="locationWrapper">
            <h1 class="location">{{ Weather.name }}</h1>
          </div>
          <h1 class="Temp" v-if="gotWeather">
            {{ Math.round(Weather.main.temp) }}
            <p id="F">&#176;</p>
          </h1>
          <h1 class="Condition">
            <div v-if="weather.condition.sunny">
              <i class="fas fa-sun icon"></i>
            </div>
            <div v-else-if="weather.condition.rain">
              <i class="fas fa-cloud-showers-heavy icon"></i>
            </div>
            <div v-else-if="weather.condition.cloudy">
              <i class="fas fa-cloud icon"></i>
            </div>
            <div v-else-if="weather.condition.snow">
              <i class="far fa-snowflake icon"></i>
            </div>
            <div v-else-if="weather.condition.fog">
              <i class="fas fa-smog icon"></i>
            </div>
            <div v-else-if="weather.condition.mist">
              <i class="fas fa-smog icon"></i>
            </div>
            <div v-else-if="weather.condition.haze">
              <i class="fas fa-smog icon"></i>
            </div>
            <div v-else>
              <i class="fas fa-question icon"></i>
            </div>
          </h1>
        </div>
      </div>
    </div>
    <forecast
      v-if="showForecast"
      @closeForecast="toggle5DayForecast"
      @useCoordinates="getLocation"
      @checkCondition="checkCondition"
      :weatherData="weather"
    />
  </div>
</template>

<script>
import Forecast from '@/components/Weather/5DayForecast.vue';
export default {
  name: 'Weather',
  components: { Forecast },
  data() {
    return {
      gotWeather: false,
      showWeatherColor: false,
      showForecast: false,
      // To get weather
      coord: {
        lat: null,
        lon: null,
      },
      city: {
        changeCity: false,
        name: '',
      },
      // Possible weather conditions
      weather: {
        condition: {
          sunny: false,
          rain: false,
          snow: false,
          cloudy: false,
          fog: false,
          mist: false,
          haze: false,
          unkownCondition: false,
        },
        styling: {
          backgroundColor: '',
          textColor: 'black',
          iconColor: '',
          locationIconColor: 'black',
        },
        date: {
          day: '',
          month: '',
        },
      },
    };
  },
  mounted() {
    this.getLocation();
    this.getDate();
  },
  computed: {
    Weather() {
      return this.$store.state.weather.weather;
    },
  },
  methods: {
    // Need to get current coordinates to get weather for current location
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
      }
    },
    async success(position) {
      this.coord.lat = position.coords.latitude.toString();
      this.coord.lon = position.coords.longitude.toString();
      this.$store.dispatch('getWeatherForecast', this.coord); //This will get the 5 day forecast
      await this.$store.dispatch('getWeather', this.coord); //This will get the current day's weather
      this.checkCondition();
      this.gotWeather = true;
    },
    error(err) {
      console.warn(`Error code: ${err.code}, ${err.message}.`);
    },
    // Get current date
    getDate() {
      let date = new Date();
      this.weather.date.day = date.getDate(); //Get current day
      let month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      this.weather.date.month = month[date.getMonth()]; //Since this returns the number of the month, if we create an array of the names of the month and then use the number returned by the data object as the index, we can get the correct name
    },
    // Check the weather condition to determine the appropriate icon and style the widget accordingly
    checkCondition() {
      console.log('hit checkCondition');
      switch (this.$store.state.weather.weather.weather[0].main) {
        case 'Clear':
          this.weather.condition.sunny = true;
          this.weather.condition.cloudy = false;
          this.weather.condition.rain = false;
          this.weather.condition.snow = false;
          this.weather.condition.fog = false;
          this.weather.condition.mist = false;
          this.weather.condition.haze = false;
          this.weather.styling.textColor = 'black';
          break;
        case 'Clouds':
          this.weather.condition.cloudy = true;
          this.weather.condition.sunny = false;
          this.weather.condition.rain = false;
          this.weather.condition.snow = false;
          this.weather.condition.fog = false;
          this.weather.condition.mist = false;
          this.weather.condition.haze = false;
          this.weather.styling.textColor = 'white';
          break;
        case 'Rain':
          this.weather.condition.rain = true;
          this.weather.condition.cloudy = false;
          this.weather.condition.sunny = false;
          this.weather.condition.snow = false;
          this.weather.condition.fog = false;
          this.weather.condition.mist = false;
          this.weather.condition.haze = false;
          this.weather.styling.textColor = 'white';
          break;
        case 'Snow':
          this.weather.condition.snow = true;
          this.weather.condition.cloudy = false;
          this.weather.condition.sunny = false;
          this.weather.condition.rain = false;
          this.weather.condition.fog = false;
          this.weather.condition.mist = false;
          this.weather.condition.haze = false;
          this.weather.styling.textColor = 'black';
          break;
        case 'Fog':
          this.weather.condition.fog = true;
          this.weather.condition.cloudy = false;
          this.weather.condition.sunny = false;
          this.weather.condition.snow = false;
          this.weather.condition.rain = false;
          this.weather.condition.mist = false;
          this.weather.condition.haze = false;
          this.weather.styling.textColor = 'white';
          break;
        case 'Mist':
          this.weather.condition.fog = false;
          this.weather.condition.cloudy = false;
          this.weather.condition.sunny = false;
          this.weather.condition.snow = false;
          this.weather.condition.rain = false;
          this.weather.condition.mist = true;
          this.weather.condition.haze = false;
          this.weather.styling.textColor = 'white';
          break;
        case 'Haze':
          this.weather.condition.fog = false;
          this.weather.condition.cloudy = false;
          this.weather.condition.sunny = false;
          this.weather.condition.snow = false;
          this.weather.condition.rain = false;
          this.weather.condition.mist = false;
          this.weather.condition.haze = true;
          this.weather.styling.textColor = 'white';
          break;
        default:
          this.weather.condition.unkownCondition = true;
      }
      // this.setBackgroundColor();
    },
    // NOTE This method was originally from when i was filling in this component's elements with color, I have since transitioned into a new design but the idea of having at least some color (like for the weather icon) still apeals to me; you could even allow the user to toggle if they want color or not. However, that is an extra feature that doesn't require immediate attention. I know leaving in giant blocks of unused code is bad practice, but I will come back to this.
    /* setBackgroundColor() {
      // Since the component itself doesn't get re-rendered when a new city is found, had to use getElementById to sort of force change the necessary elements

      // Sunny
      if (
        this.weather.condition.sunny == true &&
        this.$store.state.weather.weather.main.temp > 100
      ) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'rgb(248, 78, 35)';
        this.weather.styling.backgroundColor = 'rgb(248, 78, 35)';
        this.weather.styling.iconColor = 'rgb(252, 196, 15)';
      } else if (
        this.weather.condition.sunny == true &&
        this.$store.state.weather.weather.main.temp >= 70
      ) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'rgb(248, 181, 35)';
        this.weather.styling.backgroundColor = 'rgb(248, 181, 35)';
        this.weather.styling.iconColor = 'rgb(252, 62, 29)';
      } else if (
        this.weather.condition.sunny == true &&
        this.$store.state.weather.weather.main.temp > 50
      ) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'rgb(253, 253, 61)';
        this.weather.styling.backgroundColor = 'rgb(253, 253, 61)';
        this.weather.styling.iconColor = 'rgb(252, 155, 29)';
      } else if (
        this.weather.condition.sunny == true &&
        this.$store.state.weather.weather.main.temp > 0
      ) {
        // this.backgroundColor = "rgb(241, 241, 126)";
        // this.iconColor = "rgb(252, 161, 41)";
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'rgb(241, 241, 126)';
        this.weather.styling.backgroundColor = 'rgb(241, 241, 126)';
        this.weather.styling.iconColor = 'rgb(252, 161, 41)';
      } else if (
        this.weather.condition.sunny == true &&
        this.$store.state.weather.weather.main.temp <= 0
      ) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'rgb(241, 241, 188)';
        this.weather.styling.backgroundColor = 'rgb(241, 241, 188)';
        this.weather.styling.iconColor = 'rgb(252, 161, 41)';
      }

      // Rain
      if (this.weather.condition.rain) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'deepskyblue';
        this.weather.styling.backgroundColor = 'deepskyblue';
        this.weather.styling.locationIconColor = 'grey';
        this.weather.styling.iconColor = 'grey';
      }

      // Snow
      if (this.weather.condition.snow == true) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'white';
        this.weather.styling.backgroundColor = 'white';
        this.weather.styling.iconColor = 'black';
      }

      // Cloudy
      if (this.weather.condition.cloudy) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'grey';
        this.weather.styling.backgroundColor = 'grey';
        this.weather.styling.iconColor = 'white';
        this.weather.styling.locationIconColor = 'white';
      }

      // Fog
      if (this.weather.condition.fog) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'lightslategrey';
        this.weather.styling.backgroundColor = 'lightslategrey';
        this.weather.styling.iconColor = 'rgb(206, 206, 202)';
        this.weather.styling.locationIconColor = 'rgb(206, 206, 202)';
      }

      // Mist
      if (this.weather.condition.mist) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'lightblue';
        this.weather.styling.backgroundColor = 'lightblue';
        this.weather.styling.iconColor = ' rgb(172, 172, 172)';
        this.weather.styling.locationIconColor = ' rgb(172, 172, 172)';
      }
      //TODO Add Haze if needed
      // Unknown
      if (this.weather.condition.unkownCondition) {
        // let change = document.getElementById('changeColor');
        // change.style.backgroundColor = 'white';
        this.weather.styling.backgroundColor = 'white';
        this.weather.styling.iconColor = 'black';
        this.weather.styling.locationIconColor = 'black';
      }
    }, */
    // Toggles weather or not to open the forecast modal
    toggle5DayForecast() {
      if (this.showForecast == true) {
        this.showForecast = false;
      } else if (this.showForecast == false) {
        this.showForecast = true;
      }
    },
    onClickOutside() {
      this.city.changeCity = false;
    },
  },
};
</script>

<style scoped>
.main {
  overflow: hidden;
  z-index: 10;
  position: relative;
  margin-top: 12px;
  height: 90px;
  width: 170px;
  border-radius: 10px;
  background-color: transparent;
  color: white;
  text-shadow: 1pt 1pt 3pt black;
}
.main:hover {
  cursor: pointer;
}

/* Widget styling */

/* For the weather condition icon */
.Condition {
  z-index: 1000;
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: 14px;
  right: 5%;
  top: 30%;
  text-align: center;
}
.icon {
  z-index: 1000;
  font-size: 35px !important;
}

/* For the temperature and farenhiet symbol */
.Temp {
  z-index: 1000;
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-size: 45px;
  font-weight: 400;
  right: 30%;
  top: 20%;
  display: flex;
}
#F {
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
  font-weight: 350;
  font-size: 36px;
}

/* For the location */
.locationWrapper {
  z-index: 1000;
  position: absolute;
  right: 5%;
  top: 0;
  max-width: 150px;
}
.locationWrapper h1.location {
  font-size: 17px;
  font-weight: 200;
  font-family: 'Noto Sans', sans-serif;
  margin-bottom: 0;
  text-shadow: 1pt 1pt 2pt black !important;
  max-width: 150px;
  overflow-x: auto;
}
h1.location::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: rgb(90, 90, 90);
}
h1.location::-webkit-scrollbar-thumb {
  background: goldenrod;
}

@media (max-width: 1024px) {
  .main {
    width: 225px;
  }
  #F {
    font-size: 20px;
  }
  .Temp {
    font-size: 27px;
  }
  .Location {
    font-size: 14px;
  }
  .locationIcon {
    font-size: 12px;
  }
  .Condtion {
    font-size: 12px;
  }
  .Time {
    font-size: 15px;
  }
}
</style>
