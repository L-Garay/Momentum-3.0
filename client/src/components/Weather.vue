<template>
  <div class="momentum-navbar">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-10 p-0 mt-3">
          <nav class="navbar-light bg-transparent">
            <div class="row d-flex justify-content-end">
              <div class="col-md-4 col-lg-2 bg-dark text-light weather-widget">
                <div class="pt-2 pb-2 pr-3 pl-3">
                  <div class="d-flex justify-content-between">
                    <p class="mb-0">Clouds</p>
                    <p class="mb-0">{{ month }} {{ day }}</p>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <p class="outside-degrees">
                      68 &#8457;
                    </p>
                    <form action="">
                      <input type="text" placeholder="Enter City" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {
      coord: {
        lat: null,
        lon: null,
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
input {
  border-radius: 5px;
  height: 20px;
  width: 90px;
}
.outside-degrees {
  font-size: 22px;
  margin-bottom: 0;
}
.weather-widget {
  border-radius: 5px;
}
@media (min-width: 992px) {
  .col-lg-2 {
    min-width: 250px;
  }
}
</style>
