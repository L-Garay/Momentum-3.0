<template>
  <div class="newsSection">
    <div class="headerSection">
      <div class="navbar">
        <p @click="toggleNews('Home')">Home</p>
        <p @click="toggleNews('US')">US</p>
        <p @click="toggleNews('Politics')">Politics</p>
        <p @click="toggleNews('World')">World</p>
        <p @click="toggleNews('Science')">Science/Technology</p>
        <p @click="toggleNews('Business')">Business</p>
        <p @click="toggleNews('Entertainment')">Entertainment</p>
        <p @click="toggleNews('Health')">Health</p>
        <div class="input">
          <input
            type="text"
            placeholder="New search"
            v-model="news.query"
            v-autowidth="{
              maxWidth: '400px',
              minWidth: '70px',
              comfortZone: 20,
            }"
            v-on:keyup.enter="toggleNews('Search')"
          />
          <i class="fas fa-search" @click="toggleNews('Search')"></i>
        </div>
      </div>
    </div>
    <div class="contentSection">
      <div class="home" v-if="show.home">
        <div class="content">
          <div class="mainSection">
            <div class="highlightedStory">
              <a :href="Highlighted.webSearchUrl" target="_blank">
                <h5>{{ Highlighted.name }}</h5>
                <img
                  src="https://www.conchovalleyhomepage.com/wp-content/uploads/sites/83/2020/05/BREAKING-NEWS-GENERIC-1.jpg?w=330&h=160&crop=1"
                  alt="should be an image"
                />
                <p>{{ Highlighted.description }}</p></a
              >
            </div>
            <div class="justText">
              <ul class="column">
                <li v-for="story in JustText" :key="story.name">
                  <a :href="story.webSearchUrl" target="_blank">
                    {{ story.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="otherSection">
            <div class="otherStories">
              <h5>Other Stories</h5>
            </div>
            <div class="stories">
              <div class="story" v-for="story in Others" :key="story.name">
                <a :href="story.webSearchUrl" target="_blank">
                  <img :src="story.image.url" alt="should be an image" />
                  <p>{{ story.name }}</p></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="searchSection" v-if="show.search">
        <div class="header">
          <h5>Search Results</h5>
        </div>
        <div class="results">
          <div class="result" v-for="story in Search" :key="story.name">
            <img :src="story.image.url" alt="should be an image" />
            <div class="text">
              <a :href="story.webSearchUrl" target="_blank">
                <h5>{{ story.name }}</h5>
                <p>{{ story.description }}</p></a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="categories">
        <news-layout v-if="show.business" :newsData="business" />
        <news-layout v-if="show.entertainment" :newsData="entertainment" />
        <news-layout v-if="show.health" :newsData="health" />
        <news-layout v-if="show.politics" :newsData="politics" />
        <news-layout v-if="show.science" :newsData="science" />
        <news-layout v-if="show.us" :newsData="us" />
        <news-layout v-if="show.world" :newsData="world" />
      </div>
    </div>
  </div>
</template>

<script>
import NewsLayout from '@/components/Optional/News/News/NewsComponentLayout.vue';
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'NewsCompoenent',
  components: { NewsLayout },
  data() {
    return {
      news: {
        query: '',
        isSearch: true,
      },
      show: {
        home: true,
        business: false,
        entertainment: false,
        health: false,
        politics: false,
        science: false,
        us: false,
        world: false,
        search: false,
      },
      business: {
        name: 'Business',
        topic: 'Business',
        width: 155,
        margin: 237.5,
      },
      entertainment: {
        name: 'Entertainment',
        topic: 'Entertainment',
        width: 230,
        margin: 200,
      },
      health: { name: 'Health', topic: 'Health', width: 120, margin: 255 },
      politics: {
        name: 'Politics',
        topic: 'Politics',
        width: 130,
        margin: 250,
      },
      science: {
        name: 'Science/Technology',
        topic: 'ScienceAndTechnology',
        width: 320,
        margin: 155,
      },
      us: { name: 'United States', topic: 'US', width: 225, margin: 202.5 },
      world: { name: 'World', topic: 'World', width: 110, margin: 260 },
    };
  },
  mounted() {},
  computed: {
    Highlighted() {
      return this.$store.state.news.home.main;
    },
    Others() {
      return this.$store.state.news.home.others;
    },
    JustText() {
      return this.$store.state.news.home.justText;
    },
    Search() {
      return this.$store.state.news.search.news;
    },
  },
  methods: {
    async toggleNews(news) {
      switch (news) {
        case 'Home':
          this.show.home = true;
          this.show.business = false;
          this.show.entertainment = false;
          this.show.health = false;
          this.show.politics = false;
          this.show.science = false;
          this.show.us = false;
          this.show.world = false;
          this.show.search = false;
          this.$store.dispatch('getNewsTrending');
          break;
        case 'Business':
          this.show.home = false;
          this.show.business = true;
          this.show.entertainment = false;
          this.show.health = false;
          this.show.politics = false;
          this.show.science = false;
          this.show.us = false;
          this.show.world = false;
          this.show.search = false;
          this.$store.dispatch('getNewsCategory', this.business);
          break;
        case 'Entertainment':
          this.show.home = false;
          this.show.business = false;
          this.show.entertainment = true;
          this.show.health = false;
          this.show.politics = false;
          this.show.science = false;
          this.show.us = false;
          this.show.world = false;
          this.show.search = false;
          this.$store.dispatch('getNewsCategory', this.entertainment);
          break;
        case 'Health':
          this.show.business = false;
          this.show.entertainment = false;
          this.show.health = true;
          this.show.politics = false;
          this.show.science = false;
          this.show.us = false;
          this.show.world = false;
          this.show.search = false;
          this.$store.dispatch('getNewsCategory', this.health);
          break;
        case 'Politics':
          this.show.home = false;
          this.show.business = false;
          this.show.entertainment = false;
          this.show.health = false;
          this.show.politics = true;
          this.show.science = false;
          this.show.us = false;
          this.show.world = false;
          this.show.search = false;
          this.$store.dispatch('getNewsCategory', this.politics);
          break;
        case 'Science':
          this.show.home = false;
          this.show.business = false;
          this.show.entertainment = false;
          this.show.health = false;
          this.show.politics = false;
          this.show.science = true;
          this.show.us = false;
          this.show.world = false;
          this.show.search = false;
          this.$store.dispatch('getNewsCategory', this.science);
          break;
        case 'US':
          this.show.home = false;
          this.show.business = false;
          this.show.entertainment = false;
          this.show.health = false;
          this.show.politics = false;
          this.show.science = false;
          this.show.us = true;
          this.show.world = false;
          this.show.search = false;
          this.$store.dispatch('getNewsCategory', this.us);
          break;
        case 'World':
          this.show.home = false;
          this.show.business = false;
          this.show.entertainment = false;
          this.show.health = false;
          this.show.politics = false;
          this.show.science = false;
          this.show.us = false;
          this.show.world = true;
          this.show.search = false;
          this.$store.dispatch('getNewsCategory', this.world);
          break;
        case 'Search':
          if (this.news.query !== '') {
            await this.$store.dispatch('getNewNews', this.news);
            this.show.search = true;
            this.show.home = false;
            this.show.business = false;
            this.show.entertainment = false;
            this.show.health = false;
            this.show.politics = false;
            this.show.science = false;
            this.show.us = false;
            this.show.world = false;
            this.news.query = '';
          } else {
            this.news.query = '';
          }
          break;

        default:
          console.log('That is not an option, check the category name.');
          break;
      }
    },
  },
};
</script>

<style scoped>
.newsSection {
  width: 890px;
  height: 500px;
  background-color: rgba(169, 169, 169, 0.596);
  color: white;
}
a {
  color: white;
}
a:hover {
  text-decoration-color: blue;
  text-shadow: 1pt 1pt 2pt grey;
}
/* Navbar styling */
.navbar {
  border-bottom: 1pt solid white;
  padding: 1px 15px;
}
.navbar p {
  margin-bottom: 0;
}
.navbar p:hover {
  cursor: pointer;
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
/* Main section styling */
.content {
  display: flex;
}
.mainSection {
  width: 600px;
  max-height: 446px;
}
.highlightedStory {
  text-align: center;
  border-left: 1pt solid white;
}
.highlightedStory h5 {
  text-align: start;
  height: 55px;
  overflow-y: hidden;
}
.highlightedStory p {
  height: 83px;
  text-align: start;
  font-size: 14px;
  padding-right: 5px;
  margin-bottom: 0;
}
.highlightedStory p,
.highlightedStory h5 {
  padding-left: 10px;
}
.justText {
  height: 141px;
  border: 1pt solid white;
  border-bottom: none;
  border-right: none;
}
.column {
  columns: 2;
}
ul.column {
  margin-bottom: 0;
  padding-inline-start: 25px;
}
.column li {
  font-size: 12px;
}
/* Other home news styling */
.otherSection {
  width: 250px;
  border: 1pt solid white;
  border-bottom: none;
}
.otherStories h5 {
  text-align: center;
}
.stories {
  max-height: 413px;
  overflow-y: auto;
  padding-left: 10px;
}
.story a {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 5px 0;
  padding: 3px;
  /* border: 1pt solid white; */
}
.story img {
  height: 75px;
  width: 75px;
}
.story p {
  padding-left: 4px;
}

/* Search results styling */
div.header {
  text-align: center;
  position: relative;
}
div.header::after {
  position: absolute;
  content: '';
  width: 20%;
  height: 2px;
  left: 40%;
  bottom: 0;
  background: white;
}
.results {
  max-height: 415px;
  overflow-y: auto;
}
.result {
  display: flex;
  margin: 8px 3px 8px 10px;
}
.text {
  padding-left: 10px;
}
</style>
