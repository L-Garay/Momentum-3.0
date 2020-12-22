<template>
  <div class="newsSection">
    <div class="input">
      <input
        type="text"
        placeholder="New search"
        v-model="news.query"
        v-autowidth="{ maxWidth: '400px', minWidth: '70px', comfortZone: 20 }"
      />
      <i class="fas fa-search" @click="submitNewsQuery"></i>
    </div>
    <div class="content">
      <div class="pictures">
        <div
          v-for="news in NewsWithPicture"
          :key="news.name"
          class="pictureContent"
        >
          <a :href="news.webSearchUrl" target="_blank">
            <img :src="news.image.url" alt="No image available" />
            <h5>{{ news.name }}</h5>
          </a>
        </div>
      </div>
      <div class="textContent">
        <ul>
          <li v-for="news in NewsNoPicture" :key="news.name">
            <a :href="news.webSearchUrl" target="_blank"
              ><p>{{ news.name }}</p></a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'NewsCompoenent',
  data() {
    return {
      news: {
        query: '',
      },
    };
  },
  mounted() {
    this.$store.dispatch('getNews');
  },
  computed: {
    NewsWithPicture() {
      return this.$store.state.newsWithPicture;
    },
    NewsNoPicture() {
      return this.$store.state.newsNoPicture;
    },
  },
  methods: {
    submitNewsQuery() {
      if (this.news.query !== '') {
        console.log(this.news.query);
        this.$store.dispatch('getNewNews', this.news);
        this.news.query = '';
      } else {
        this.news.query = '';
      }
    },
  },
};
</script>

<style scoped>
.newsSection {
  width: 830px;
  height: 500px;
}
.input {
  text-align: center;
  margin: 10px 0;
}
.input input {
  margin-right: 10px;
}
.fas:hover {
  cursor: pointer;
}
.content {
  display: flex;
  flex-wrap: wrap;
  height: 450px;
}
.pictures {
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  max-height: 440px;
  overflow-y: auto;
}
.pictureContent {
  width: 170px;
}
.pictureContent h5 {
  max-width: 140px;
  font-size: 17px;
}
.textContent {
  max-height: 440px;
  padding-right: 30px;
  overflow-y: auto;
}
a {
  color: black;
}
a:hover {
  color: blue;
}
</style>
