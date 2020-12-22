<template>
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
</template>

<script>
export default {
  name: 'NewsCompoenent',
  data() {
    return {};
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
};
</script>

<style scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  width: 830px;
}
.pictures {
  width: 550px;
  display: flex;
  flex-wrap: wrap;
  max-height: 500px;
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
  max-height: 500px;
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
