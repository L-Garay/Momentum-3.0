<template>
  <div>
    <div class="clock" v-if="militaryTimeSelected">{{ militaryTime }}</div>
    <div class="clock" v-else>{{ time }}</div>
  </div>
</template>

<script>
export default {
  name: 'Clock',
  data() {
    return {
      time: '',
      militaryTime: '',
      militaryTimeSelected: false,
    };
  },
  mounted() {
    this.getTime();

    // These come from the Settings component when the user manually switches the setting
    this.$root.$on('setMilitaryTime', () => {
      this.militaryTimeSelected = true;
    });
    this.$root.$on('setStandardTime', () => {
      this.militaryTimeSelected = false;
    });

    // These come from the Greeting component when the user is switched, and so user preference is switched
    this.$root.$on('checkLastUser', (result) => {
      if (result.militaryTimeSelected == true) {
        this.militaryTimeSelected = true;
      } else if (result.militaryTimeSelected == false) {
        this.militaryTimeSelected = false;
      }
    });
    this.$root.$on('changedUser', (newUser) => {
      if (newUser.militaryTimeSelected == true) {
        this.militaryTimeSelected = true;
      } else if (newUser.militaryTimeSelected == false) {
        this.militaryTimeSelected = false;
      }
    });
  },
  computed: {},
  methods: {
    getTime() {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();

      m = this.checkTime(m);

      let time = h + ':' + m;
      this.militaryTime = time;

      if (this.militaryTimeSelected == false) {
        h = this.checkTime(h);
        let session = 'AM';
        if (h == 0) {
          h = 12;
        }
        if (h > 12) {
          h = h - 12;
          session = 'PM';
        }
        let time = h + ':' + m + ' ' + session;
        this.time = time;
      }
      setTimeout(this.getTime, 1000);
    },
    checkTime(n) {
      if (n < 10) {
        n = '0' + n;
      } // add zero in front of numbers < 10
      return n;
    },
  },
};
</script>

<style scoped>
.clock {
  font-size: 11rem;
  color: white;
  text-align: center;
  text-shadow: 3px 3px 5px black;
}
</style>
