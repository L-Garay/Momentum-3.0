<template>
  <div
    class="momentum"
    id="backgroundImg"
    :style="{ 'background-image': 'url(' + photo.urls.regular + ')' }"
  >
    <div class="container-fluid top">
      <div class="row justify-content-between">
        <div class="col-4"><settings @openPhotosModal="openPhotosModal" /></div>
        <div class="col-4 mr-3"><weather /></div>
      </div>
    </div>
    <div class="container-fluid middle">
      <div class="row">
        <div class="col-6 offset-3">
          <clock />
          <greeting />
        </div>
        <div
          class="modal"
          id="photosModal"
          ref="photosModal"
          tabindex="-1"
          role="dialog"
        >
          <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalScrollableTitle">
                  Modal title
                </h5>
                <button type="button" class="close" data-dismiss="modal">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
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
import Settings from '@/components/Settings.vue';
import Clock from '@/components/Clock.vue';
import Greeting from '@/components/Greeting.vue';
import Vue from 'vue';
export default {
  name: 'momentum',
  components: {
    Weather,
    Quote,
    Settings,
    Clock,
    Greeting,
  },
  data() {
    return {
      bus: new Vue(),
    };
  },
  mounted() {
    this.$store.dispatch('getPhoto');
  },
  computed: {
    photo() {
      return this.$store.state.photo;
    },
  },
  methods: {
    openPhotosModal() {
      console.log('hit me');
      console.log(this.$refs.photosModal);
      // this.$refs.photosModal.open();
      // document
      //   .getElementById('photosModal')
      //   .classList.remove('.modal-backdrop');
      // document.getElementById('photosModal').classList.toggle('show');
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
