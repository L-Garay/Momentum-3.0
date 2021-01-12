<template>
  <!-- <div class="newsSection">
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
            <img
              v-if="fetchedNewNews"
              :src="news.image.url"
              alt="No image available"
            />
            <img v-else :src="news.image.url" alt="No image available" />
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
  </div> -->
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
          />
          <i class="fas fa-search" @click="submitNewsQuery"></i>
        </div>
      </div>
    </div>
    <div class="contentSection">
      <div class="home" v-if="show.home">
        <!-- this is where the 'trending' stories will go and act as the news component's 'home' page and will have slightly different layout -->
        <h5>This is the home layout</h5>
      </div>
      <news-layout v-if="show.business" :newsData="business" />
      <news-layout v-if="show.entertainment" :newsData="entertainment" />
      <news-layout v-if="show.health" :newsData="health" />
      <news-layout v-if="show.politics" :newsData="politics" />
      <news-layout v-if="show.science" :newsData="science" />
      <news-layout v-if="show.us" :newsData="us" />
      <news-layout v-if="show.world" :newsData="world" />
    </div>
  </div>
</template>

<script>
import NewsLayout from '@/components/NewsComponentLayout.vue';
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'NewsCompoenent',
  components: { NewsLayout },
  data() {
    return {
      fetchedNewNews: false,
      news: {
        query: '',
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
      },
      business: { name: 'Business', width: 155, margin: 237.5 },
      entertainment: { name: 'Entertainment', width: 230, margin: 200 },
      health: { name: 'Health', width: 120, margin: 255 },
      politics: { name: 'Politics', width: 130, margin: 250 },
      science: { name: 'Science/Technology', width: 320, margin: 155 },
      us: { name: 'United States', width: 225, margin: 202.5 },
      world: { name: 'World', width: 110, margin: 260 },
    };
  },
  mounted() {
    // this.$store.dispatch('getNews');
  },
  computed: {
    NewsWithPicture() {
      return this.$store.state.news.newsWithPicture;
    },
    NewsNoPicture() {
      return this.$store.state.news.newsNoPicture;
    },
  },
  methods: {
    toggleNews(news) {
      switch (news) {
        case 'Home':
          (this.show.home = true),
            (this.show.business = false),
            (this.show.entertainment = false),
            (this.show.health = false),
            (this.show.politics = false),
            (this.show.science = false),
            (this.show.us = false),
            (this.show.world = false);
          break;
        case 'Business':
          (this.show.home = false),
            (this.show.business = true),
            (this.show.entertainment = false),
            (this.show.health = false),
            (this.show.politics = false),
            (this.show.science = false),
            (this.show.us = false),
            (this.show.world = false),
            (this.show.epl = false);
          this.$store.dispatch('getNewsCategory', 'Business');
          break;
        case 'Entertainment':
          (this.show.home = false),
            (this.show.business = false),
            (this.show.entertainment = true),
            (this.show.health = false),
            (this.show.politics = false),
            (this.show.science = false),
            (this.show.us = false),
            (this.show.world = false);
          this.$store.dispatch('getNewsCategory', 'Entertainment');
          break;
        case 'Health':
          (this.show.business = false),
            (this.show.entertainment = false),
            (this.show.health = true),
            (this.show.politics = false),
            (this.show.science = false),
            (this.show.us = false),
            (this.show.world = false);
          this.$store.dispatch('getNewsCategory', 'Health');
          break;
        case 'Politics':
          (this.show.home = false),
            (this.show.business = false),
            (this.show.entertainment = false),
            (this.show.health = false),
            (this.show.politics = true),
            (this.show.science = false),
            (this.show.us = false),
            (this.show.world = false);
          this.$store.dispatch('getNewsCategory', 'Politics');
          break;
        case 'Science':
          (this.show.home = false),
            (this.show.business = false),
            (this.show.entertainment = false),
            (this.show.health = false),
            (this.show.politics = false),
            (this.show.science = true),
            (this.show.us = false),
            (this.show.world = false);
          this.$store.dispatch('getNewsCategory', 'Science');
          break;
        case 'US':
          (this.show.home = false),
            (this.show.business = false),
            (this.show.entertainment = false),
            (this.show.health = false),
            (this.show.politics = false),
            (this.show.science = false),
            (this.show.us = true),
            (this.show.world = false);
          this.$store.dispatch('getNewsCategory', 'US');
          break;
        case 'World':
          (this.show.home = false),
            (this.show.business = false),
            (this.show.entertainment = false),
            (this.show.health = false),
            (this.show.politics = false),
            (this.show.science = false),
            (this.show.us = false),
            (this.show.world = true);
          this.$store.dispatch('getNewsCategory', 'World');
          break;

        default:
          console.log('That is not an option');
          break;
      }
    },
    submitNewsQuery() {
      if (this.news.query !== '') {
        this.$store.dispatch('getNewNews', this.news);
        this.news.query = '';
      } else {
        this.news.query = '';
      }
      this.fetchedNewNews = true;
      console.log(this.fetchedNewNews);
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
  width: 275px;
  padding-right: 10px;
  overflow-y: auto;
}
a {
  color: white;
  text-shadow: 1pt 1pt 2pt black;
}
a:hover {
  color: blue;
  text-shadow: 1pt 1pt 2pt white;
}
</style>
