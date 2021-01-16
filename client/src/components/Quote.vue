<template>
  <div
    class="Quote"
    @mouseover="showAuthor = true"
    @mouseleave="showAuthor = false"
  >
    <div class="center">
      <p class="quote">
        {{ '"' + Quote.quote + '"' || 'Loading...' }}
      </p>
      <transition name="fade">
        <p v-show="showAuthor" class="author">
          Author: {{ Quote.author || 'Loading...' }}
        </p>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Quote',
  data() {
    return {
      showAuthor: false,
    };
  },
  mounted() {
    this.$store.dispatch('getQuote');
  },
  computed: {
    Quote() {
      return this.$store.state.quote.quote;
    },
  },
  methods: {},
};
</script>

<style scoped>
.Quote {
  text-align: center;
  padding-bottom: 10px;
}
.center {
  transition: transform 0.35s ease-in-out;
}
.Quote:hover .center {
  transform: translate3d(0px, -10px, 0px);
}
.Quote:hover p.quote {
  padding-bottom: 0;
}
.Quote:hover p.author {
  margin-top: 0;
}
p {
  font-size: 20px;
  color: white;
  text-shadow: 3px 3px 5px black;
  margin-bottom: 0;
}
p.quote {
  padding-bottom: 5px;
}

p.author {
  margin-top: -25px;
  font-size: 15px;
}

.fade-enter-active {
  transition: all 0.35s ease;
  opacity: 0.05;
}
.fade-leave-active {
  transition: all 0.35s ease;
  opacity: 0.05;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

@media (max-width: 1024px) {
  p {
    font-size: 15px;
  }
}
</style>
