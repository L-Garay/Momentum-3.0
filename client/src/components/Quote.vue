<template>
  <div class="quote">
    <transition name="slide">
      <p @mouseover="displayAuthor">{{ Quote.quote || 'Loading...' }}</p>
    </transition>
    <transition name="fade">
      <p v-show="showAuthor">Author: {{ Quote.author || 'Loading...' }}</p>
    </transition>
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
  methods: {
    displayAuthor() {
      if (this.showAuthor == true) {
        this.showAuthor = false;
      } else if (this.showAuthor == false) {
        this.showAuthor = true;
      }
    },
  },
};
</script>

<style scoped>
.quote {
  text-align: center;
}
p {
  font-size: 20px;
  color: white;
  text-shadow: 3px 3px 5px black;
}
p:first-child {
  margin: 0;
}
/* p:first-child:hover {
  transform: translate3d(0px, 11px, 0px);
} */
p:last-child {
  opacity: 0.85;
}
/* .slide-enter-active {
  transition: all 0.4s ease;
}
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter, .slide-leave-to {
  transform: translate3d(10px);
  opacity: 0;
} */
.fade-enter-active {
  transition: all 0.4s ease;
}
.fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
/* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: 1024px) {
  p {
    font-size: 15px;
  }
}
</style>
