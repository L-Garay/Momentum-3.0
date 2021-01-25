<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Saved Quotes</h3>
          </div>

          <div class="modal-body">
            <slot name="body">
              <h4 v-if="this.$store.state.quote.savedQuotes.length == 0">
                Save some quotes and see them here!
              </h4>
              <ul v-else>
                <li v-for="quote in savedQuotes" :key="quote.id">
                  <p @click="selectQuote(quote._id)">
                    {{ quote.quote }} Author: {{ quote.author }}
                  </p>
                  <i
                    class="far fa-trash-alt"
                    @click="deleteQuote(quote._id)"
                  ></i>
                </li>
              </ul>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button"
                @click="$emit('close-quotes-modal')"
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
export default {
  name: 'QuoteModal',
  mounted() {
    this.$store.dispatch(
      'getSavedQuotesByUserId',
      this.$store.state.user.user.id
    );
  },
  computed: {
    savedQuotes() {
      return this.$store.state.quote.savedQuotes;
    },
  },
  methods: {
    selectQuote(id) {
      this.$store.dispatch('getQuoteById', id);
    },
    deleteQuote(id) {
      this.$store.dispatch('deleteQuote', id);
    },
  },
};
</script>

<style scoped>
li {
  padding: 4px 0px;
  display: flex;
}
p:hover {
  cursor: pointer;
}
i {
  color: rgb(255, 0, 0, 0.3);
  padding-top: 10px;
}
i:hover {
  color: red;
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
  width: 650px;
  height: 500px;
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
  max-height: 300px;
  max-width: 590px;
  margin: 20px 0;
  overflow-y: auto;
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
