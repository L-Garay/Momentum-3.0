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
        <h4 class="greeting">Welcome to the News!</h4>
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
import NewsLayout from '@/components/NewsComponentLayout.vue';
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'NewsCompoenent',
  components: { NewsLayout },
  data() {
    return {
      newsCategory: 'Politics',
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
h4.greeting {
  text-align: center;
  position: relative;
}
h4.greeting::after {
  position: absolute;
  content: '';
  width: 50%;
  height: 2px;
  bottom: 0;
  left: 25%;
  background: white;
}
.content {
  display: flex;
}
.mainSection {
  width: 600px;
  max-height: 330px;
}
.highlightedStory {
  text-align: center;
  margin-bottom: 3px;
}
.highlightedStory h5 {
  text-align: start;
  max-height: 51px;
  overflow-y: hidden;
}
.highlightedStory p {
  text-align: start;
  font-size: 14px;
  padding-right: 5px;
  margin-bottom: 0;
}
.highlightedStory p,
.highlightedStory h5 {
  padding-left: 10px;
}
.column {
  columns: 2;
  border: 1pt solid white;
}
.column li {
  font-size: 12px;
}
/* Other news styling */
.otherSection {
  width: 250px;
  border: 1pt solid white;
}
.otherStories h5 {
  text-align: center;
}
.stories {
  max-height: 375px;
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
</style>
