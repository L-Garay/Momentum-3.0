<template>
  <div class="storySection">
    <div class="content">
      <div class="mainSection">
        <h4
          class="title"
          :style="{ width: width + 'px', marginLeft: margin + 'px' }"
        >
          {{ newsData.name }}
        </h4>
        <div class="highlightedSection">
          <div class="highlightedStories">
            <div class="story" v-for="story in Highlighted" :key="story.name">
              <h5>{{ story.name }}</h5>
              <img :src="story.image.url" alt="should be an image" />
              <a :href="story.webSearchUrl" target="_blank">
                <p>{{ story.description }}</p></a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="otherSection">
        <h5>Other Stories</h5>
        <div class="otherStories">
          <ul>
            <li v-for="story in NoPicture" :key="story.name">
              <a :href="story.webSearchUrl" target="_blank">
                {{ story.name }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsLayout',
  props: ['newsData'],
  components: {},
  data() {
    return {
      width: this.newsData.width,
      margin: this.newsData.margin,
    };
  },
  mounted() {},
  beforeUpdate() {
    this.width = this.newsData.width;
    this.margin = this.newsData.margin;
  },
  computed: {
    Highlighted() {
      return this.$store.state.news.category.highlighted;
    },
    NoPicture() {
      return this.$store.state.news.newsNoPicture;
    },
  },
  methods: {},
};
</script>

<style scoped>
.content {
  display: flex;
}
h4.title {
  text-align: center;
  position: relative;
  max-width: 315px;
  margin-left: 157.5px;
}
h4.title::after {
  position: absolute;
  content: '';
  width: 75%;
  height: 2px;
  left: 13%;
  bottom: 0;
  background: white;
}
.highlightedSection {
  width: 630px;
  max-height: 395px;
  overflow-y: auto;
}
.story {
  text-align: start;
  border-top: 1pt solid white;
  padding: 5px 5px 5px 10px;
}
.story img {
  width: 150px;
}
.story p {
  margin-bottom: 0;
  color: whitesmoke;
}
.story p:hover {
  text-shadow: 1pt 1pt 2pt grey;
}

/* Other Story section styling */
.otherSection {
  width: 225px;
  max-height: 435px;
}
.otherSection h5 {
  text-align: center;
  position: relative;
}
.otherSection h5::after {
  position: absolute;
  content: '';
  height: 1px;
  width: 60%;
  bottom: 0;
  left: 20%;
  background: white;
}
.otherStories {
  max-height: 400px;
  overflow-y: auto;
}
.otherStories ul {
  padding-inline-start: 20px;
}
.otherStories li {
  margin-bottom: 5px;
}
.otherStories a {
  color: white;
}
.otherStories a:hover {
  text-decoration-color: blue;
  text-shadow: 1pt 1pt 2pt grey;
}
</style>
