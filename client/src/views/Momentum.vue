<template>
  <div
    class="momentum"
    id="backgroundImg"
    :style="{ 'background-image': 'url(' + photo.urls.regular + ')' }"
  >
    <div class="container-fluid top">
      <div class="row justify-content-between">
        <div class="col-4"><settings /></div>
        <div class="col-4 mr-3"><weather /></div>
      </div>
    </div>
    <div class="container-fluid middle">
      <div class="row">
        <!-- Time and greeting here -->
      </div>
    </div>
    <div class="container-fluid ">
      <div class="row justify-content-center bottom ">
        <div class="col-6 ">
          <quote />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Weather from '@/components/Weather.vue';
import Quote from '@/components/Quote.vue';
import Settings from '@/components/MomentumSettings.vue';
export default {
  name: 'momentum',
  components: {
    Weather,
    Quote,
    Settings,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('getPhoto');
  },
  computed: {
    photo() {
      return this.$store.state.photo;
    },
  },
};
</script>

<style>
.momentum {
  height: 100vh;
  width: 100vw;
}
#backgroundImg {
  background-size: cover;
  background-position: center;
  background-repeat: none;
}
.top {
  height: 23vh;
}
.middle {
  height: 63vh;
}
.bottom {
  height: 14vh;
  align-items: flex-end;
}
</style>
