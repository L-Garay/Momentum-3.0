<template>
  <div class="quotesMenuComponent">
    <div class="content">
      <div class="header">
        <div class="topRow">
          <div class="title">
            <h3>Quotes</h3>
            <p>
              Get a new quote everytime you 'log in', or you can save your
              favorites and select which one you want to view for that session.
              Coming soon: you will be able to upload your own quotes and select
              them whenever you want!
            </p>
          </div>
          <div class="uploadQuoteSection">
            <button class="btn" disabled>Upload Quote +</button>
          </div>
        </div>
        <div class="bottomRow">
          <div class="buttonControls">
            <button @click="getNewQuote">Get New Quote</button>
            <button @click="saveQuote">Save Quote</button>
            <button @click="switchQuotes('saved')">Choose Quote</button>
            <button @click="switchQuotes('uploaded')">My Uploads</button>
          </div>
        </div>
      </div>
      <div class="mainSection">
        <div class="savedQuotesSection" id="test" v-if="show.savedQuotes">
          <h5 v-if="this.$store.state.quote.savedQuotes.length == 0">
            No saved quotes yet, save some and you'll find them here!
          </h5>
          <div
            v-else
            class="quote"
            v-for="quote in savedQuotes"
            :key="quote.id"
          >
            <div class="quoteText" @click="selectQuote(quote._id)">
              <p>{{ quote.quote }}</p>
              <small>Author: {{ quote.author }}</small>
            </div>
            <div class="quoteDeleteIcon">
              <i class="fas fa-trash-alt" @click="deleteQuote(quote._id)"></i>
            </div>
          </div>
        </div>
        <!-- NOTE Need to setup uploading Quotes -->
        <div class="savedQuotesSection" v-if="show.uploadedQuotes">
          <h5>
            No uploaded Quotes yet, add some and you'll find them here!
          </h5>
          <!-- <div
            v-else
            class="image"
            v-for="photo in savedQuotes"
            :key="photo.id"
          >
            <img
              :src="photo.urls.thumbUrl"
              alt="should be small image"
              @click="selectPhoto(photo._id)"
            />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuotesMenuComponent',
  data() {
    return {
      show: {
        savedQuotes: true,
        uploadedQuotes: false,
      },
    };
  },
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
    getNewQuote() {
      this.$store.dispatch('getQuote');
    },
    saveQuote() {
      let savedQuote = {
        quote: this.$store.state.quote.quote.quote,
        author: this.$store.state.quote.quote.author,
        userId: this.$store.state.user.user.id,
      };
      this.$store.dispatch('saveQuote', savedQuote);
    },
    selectQuote(id) {
      this.$store.dispatch('getQuoteById', id);
    },
    deleteQuote(id) {
      this.$store.dispatch('deleteQuote', id);
    },
    switchQuotes(type) {
      if (type === 'saved') {
        this.show.savedQuotes = true;
        this.show.uploadedQuotes = false;
      } else if (type === 'uploaded') {
        this.show.savedQuotes = false;
        this.show.uploadedQuotes = true;
      }
    },
  },
};
</script>

<style scoped>
div.quotesMenuComponent {
  height: 395px;
  width: 515px;
}
div.content {
  height: 385px;
  width: 505px;
  margin-left: auto;
  margin-top: 5px;
  color: white;
}

div.topRow {
  display: flex;
}
div.title p {
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
}
div.uploadQuoteSection {
  position: relative;
}
div.uploadQuoteSection button {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 12px;
  background-color: white;
  border: 1pt solid black;
  border-radius: 6px 6px 6px 6px;
  width: 110px;
  padding: 4px 6px;
}
div.bottomRow {
  text-align: center;
  position: relative;
}
div.bottomRow::after {
  position: absolute;
  content: '';
  width: 85%;
  height: 2px;
  right: 40px;
  background: white;
}
div.buttonControls {
  margin-bottom: 10px;
}
div.buttonControls button {
  margin: 0 5px;
  font-size: 12px;
  background-color: white;
  border: 1pt solid black;
  border-radius: 6px 6px 6px 6px;
  padding: 4px 6px;
}
div.mainSection {
  max-height: 240px;
  overflow-y: auto;
}
div.mainSection::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: rgb(90, 90, 90);
}
div.mainSection::-webkit-scrollbar-thumb {
  background: goldenrod;
}
div.savedQuotesSection {
  width: 500px;
  padding-top: 7px;
}
div.savedQuotesSection h5 {
  text-align: center;
  margin-top: 70px;
}
div.quote {
  display: flex;
  margin-bottom: 10px;
}
div.quoteText {
  width: 470px;
}
div.quoteText p {
  margin-bottom: -5px;
}
div.quoteText p:hover {
  cursor: pointer;
  text-shadow: 1px 1px 10px white, 1px 1px 10px white;
}
div.quoteText small {
  color: grey;
}
div.quoteText small:hover {
  color: white;
}
div.quoteDeleteIcon {
  color: rgb(114, 33, 33);
}
div.quoteDeleteIcon:hover {
  cursor: pointer;
  color: red;
}
</style>
