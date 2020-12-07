<template>
  <div
    class="momentum"
    id="backgroundImg"
    :style="{ 'background-image': 'url(' + photo.urls.regular + ')' }"
  >
    <div class="container-fluid top">
      <div class="row justify-content-between">
        <div class="col-1">
          <settings
            @openPhotosModal="openPhotosModal"
            @openQuotesModal="openQuotesModal"
          />
        </div>
        <div class="col-4 mr-3"><weather /></div>
      </div>
    </div>
    <div class="container-fluid middle">
      <div class="row">
        <div class="col-6 offset-3">
          <clock />
          <greeting />
        </div>
        <photo-modal
          v-if="showPhotoModal"
          @close-photos-modal="closePhotosModal"
        />
        <quote-modal
          v-if="showQuoteModal"
          @close-quotes-modal="closeQuotesModal"
        />
        <!-- NOTE Can't use bootstrap modal because for some reason I get an error saying the '$' symbol when trying to programatically open/close it using bootstrap's $('#myModal').modal(options) is 'undefined'. I have tried using a cdn directly from jquery, I have tried npm i-ing jquery directly into the project and neither work.  I have tried reordering the cdns, I have tried nmp i-ing bootstrap directly, and neither work.  I have no idea why it's not working. So the workaround is to use a modal made by the vue devs found at https://vuejs.org/v2/examples/modal.html?
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
        </div> -->
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
import PhotoModal from '@/components/PhotoModal.vue';
import QuoteModal from '@/components/QuoteModal.vue';

export default {
  name: 'momentum',
  components: {
    Weather,
    Quote,
    Settings,
    Clock,
    Greeting,
    PhotoModal,
    QuoteModal,
  },
  data() {
    return {
      showPhotoModal: false,
      showQuoteModal: false,
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
      this.showPhotoModal = true;
    },
    closePhotosModal() {
      this.showPhotoModal = false;
    },
    openQuotesModal() {
      this.showQuoteModal = true;
    },
    closeQuotesModal() {
      this.showQuoteModal = false;
    },
  },
};
</script>

<style scoped>
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
