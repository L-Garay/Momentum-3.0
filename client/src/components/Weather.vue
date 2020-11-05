<template>
  <div class="main ml-auto">
    <div class="background">
      <div class="content">
        <h1 class="Condition">
          <div>
            <i class="fas fa-sun icon"></i>
            {{ weather.weather[0].main }}
          </div>
        </h1>
        <h1 class="Temp">
          {{ Math.round(weather.main.temp) }}
          <span id="F">&#8457;</span>
        </h1>
        <h1 class="Time">{{ month }} {{ day }}</h1>
        <div>
          <input
            ref="focus"
            type="text"
            v-model="city.name"
            v-on:keyup.enter="submitNewCity"
            v-autowidth="{
              maxWidth: '100px',
              minWidth: '20px',
              comfortZone: 10,
            }"
            v-if="city.changeCity"
            class="locationInput"
          />
          <h1 class="Location" v-else @click="getNewCity">
            <i class="fas fa-map-marker-alt locationIcon"></i>
            {{ weather.name }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'Weather',
  data() {
    return {
      coord: {
        lat: null,
        lon: null,
      },
      city: {
        changeCity: false,
        name: '',
      },
      day: '',
      month: '',
    };
  },
  mounted() {
    this.getLocation();
    this.getDate();
  },
  computed: {
    weather() {
      return this.$store.state.weather;
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
      let coords = { ...this.coord };
      await this.$store.dispatch('getWeather', coords);
    },
    error(err) {
      console.warn(`Error code: ${err.code}, ${err.message}.`);
    },
    // Will take the input city name string and attempt ot get new weather data
    getNewCity() {
      this.city.changeCity = true;
      this.$nextTick(() => this.$refs.focus.focus());
    },
    async submitNewCity() {
      await this.$store.dispatch('getNewWeather', this.city);
      this.city.changeCity = false;
    },
    // Get current date
    getDate() {
      let date = new Date();
      this.day = date.getDate();
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
      this.month = month[date.getMonth()];
    },
  },
  components: {},
};
</script>

<style>
.main {
  overflow: hidden;
  z-index: 10;
  position: relative;
  margin: 25px 0 100px 0;
  height: 90px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
  background-color: coral;
}

/* Content */

.icon {
  z-index: 1000;
  font-size: 15px !important;
}

.Condition {
  z-index: 1000;
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: 20px;
  left: 20px;
  top: 10px;
}

.Temp {
  z-index: 1000;
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-size: 35px;
  font-weight: 400;
  left: 20px;
  bottom: 5px;
}

#F {
  z-index: 1000;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: 30px;
}

.Time {
  z-index: 1000;
  position: absolute;
  font-family: 'Noto Sans', sans-serif;
  font-size: 18px;
  font-weight: 200;
  right: 20px;
  top: 10px;
}

.locationIcon {
  z-index: 1000;
  font-size: 15px;
  color: white;
}

.Location {
  z-index: 1000;
  position: absolute;
  font-family: 'Noto Sans', sans-serif;
  font-size: 18px;
  font-weight: 200;
  right: 20px;
  bottom: 15px;
}
.locationInput {
  z-index: 1000;
  position: absolute;
  right: 20px;
  bottom: 15px;
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
