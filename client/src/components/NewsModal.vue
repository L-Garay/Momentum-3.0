<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
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
      showNews: false,
      showFinance: true,
      showSports: false,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    toggleNews() {
      this.showNews = true;
      this.showFinance = false;
      this.showSports = false;
    },
    toggleFinance() {
      this.showNews = false;
      this.showFinance = true;
      this.showSports = false;
    },
    toggleSports() {
      this.showNews = false;
      this.showFinance = false;
      this.showSports = true;
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
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: black;
}

.modal-body {
  max-height: 500px;
  max-width: 900px;
  margin: 20px 0;
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
