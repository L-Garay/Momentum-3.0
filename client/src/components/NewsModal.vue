<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <!-- <div
          class="modal-container"
          :style="{ 'background-image': 'url(' + backgroundImgUrl + ')' }"
          NOTE For some reason, background doesn't work when trying to point to picture in assests folder, but if point to the actual photo path on the unsplash website, it works. See also main Momentum.vue for how it works to get main background image (also pointing to a direct path, not locally stored photo).
        > -->
        <div
          class="modal-container"
          :style="{
            'background-image': 'url(' + backgroundImgUrl + ')',
          }"
        >
          <div class="modal-header">
            <h2 @click="toggleNews">News</h2>
            <h2 @click="toggleFinance">Finance</h2>
            <h2 @click="toggleSports">Sports</h2>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="container-fluid">
                <div class="row">
                  <news-component v-if="showNews" />
                  <finance-component v-if="showFinance" />
                  <sports-component v-if="showSports" />
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button"
                @click="$emit('close-news-modal')"
              >
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import NewsComponent from '@/components/NewsComponent.vue';
import FinanceComponent from '@/components/FinanceComponent.vue';
import SportsComponent from '@/components/SportsComponent.vue';

export default {
  name: 'NewsModal',
  components: {
    NewsComponent,
    FinanceComponent,
    SportsComponent,
  },
  data() {
    return {
      showNews: true,
      showFinance: false,
      showSports: false,
      // NOTE As alluded to earlier, instead of this variable pointing to pictures saved in the assets folder, it appears it needs to be pointed at a direct path to the picture from unsplash.
      backgroundImgUrl:
        'https://images.unsplash.com/photo-1460494936962-50da3863c15b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80',
    };
  },
  mounted() {},
  computed: {},
  methods: {
    toggleNews() {
      this.showNews = true;
      this.showFinance = false;
      this.showSports = false;
      this.backgroundImgUrl =
        'https://images.unsplash.com/photo-1460494936962-50da3863c15b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80';
    },
    toggleFinance() {
      this.showNews = false;
      this.showFinance = true;
      this.showSports = false;
      this.backgroundImgUrl =
        'https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
    },
    toggleSports() {
      this.showNews = false;
      this.showFinance = false;
      this.showSports = true;
      this.backgroundImgUrl =
        'https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
    },
  },
};
</script>

<style scoped>
h2:hover {
  cursor: pointer;
}

/* Modal styles */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 950px;
  height: 700px;
  margin: 0px auto;
  padding: 20px 30px;
  /* background-color: rgb(230, 46, 46); */
  /* background-image: url('../assets/Skyline.jpg'); */
  background-size: cover;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  color: white;
  text-shadow: 1pt 1pt 2pt black;
}

.modal-header h3 {
  margin-top: 0;
  color: black;
}

.modal-body {
  max-height: 500px;
  max-width: 900px;
  padding-top: 0;

  /* overflow-y: auto; */
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
