<template>
  <div class="quoteWrapper">
    <div
      class="quoteSection"
      @mouseover="showAuthor = true"
      @mouseleave="showAuthor = false"
    >
      <div class="quoteDiv">
        <p class="quote">
          {{ Quote.quote || 'Loading...' }}
        </p>
      </div>
      <div class="authorDiv">
        <transition name="fade">
          <p v-show="showAuthor" class="author">
            Author: {{ Quote.author || 'Loading...' }}
          </p>
        </transition>
      </div>
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
/* Component styling */
.quoteWrapper {
  text-align: center;
  width: 735px;
  height: 100px;
}
p {
  font-size: 20px;
  color: white;
  text-shadow: 3px 3px 3px black;
  margin-bottom: 0;
}
/* Quote transition styling */
p.quote {
  /* This declares that this element has a transition, specifically a transform type, and it sets the time of the tranformation at .35 seconds and sets the style of transformation to 'ease-out' (slow end) */
  transition: transform 0.4s ease-out;
}
.quoteSection:hover p.quote {
  /* This determines when transformation will occur (when the user hovers over the div.quoteSection element), what will be transforming (the p.quote element), and then it sets the transformation type to translate along the y-axis and move the quote element up 10px  */
  transform: translate3d(0px, -15px, 0px);
}

/* These are the positioning styles for the quote and author elements */
div.quoteDiv,
div.authorDiv {
  left: 9.5%;
  width: 620px;
  position: absolute;
}
div.quoteDiv {
  padding-bottom: 6px;
  bottom: 10px;
}
div.authorDiv {
  bottom: 0;
  height: 28px;
}
div.authorDiv p.author {
  font-size: 15px;
}

/* Author transition styling */

/*These are the very first and last states of the transition; therefore the opacity should be 0, and when the author is first appearing we want it to 'come down' from the quote so we translate it down by 8px (Although to be honest I'm not sure how its transitioning back up, I think it may be with how the Vue devs setup their <transition></transition> tags; and they 'magically' know that when you are entering you are translating -8px down...so when you are leaving it automatically translates 8px up) */

.fade-enter,
.fade-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
/* These two handle the actual transitioning movement in and out, it will affect all changing elements that are wrapped within the <transition></transition> tags (so just the author text), it sets the transition time at .35 sec and the transition type as ease-out (slow end) while also raising the opacity slightly */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
  opacity: 0.05;
}
/* These are the 'middle states', they are what you will see once the enter transition is done, and right as the leave transition is starting. Therefore, we obviously want the opacity to be 1 so the author text is visible. */
.fade-leave,
.fade-enter-to {
  opacity: 1;
}

/* Media querries */
@media (max-width: 1024px) {
  p {
    font-size: 15px;
  }
}
</style>
