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
      // NOTE change this conditional to check for user preference in future --- right now it is just controlled by dev
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
      setTimeout(this.getTime, 500);
    },
    checkTime(h) {
      if (h < 10) {
        h = '0' + h;
      } // add zero in front of numbers < 10
      return h;
    },
  },
};
</script>

<style>
.clock {
  font-size: clamp(6rem, 8rem, 9rem);
  color: white;
  text-align: center;
}
</style>
