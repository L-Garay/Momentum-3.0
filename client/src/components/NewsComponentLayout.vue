<template>
  <div class="storySection">
    <h5>This is the {{ newsData.name }} component.</h5>
    <div class="highlightedSection">
      <div class="highlightedStories">
        <p v-for="story in Highlighted" :key="story.name">{{ story.name }}</p>
      </div>
    </div>
    <div class="otherSection">
      <div class="otherStories"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsLayout',
  props: ['newsData'],
  components: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {
    Highlighted() {
      return this.$store.state.news.category.highlighted;
    },
    Others() {
      return this.$store.state.news.category.others;
    },
  },
  methods: {},
};
</script>

<style scoped></style>
