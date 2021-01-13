<template>
  <div class="leagueSection">
    <div class="previousSection">
      <div class="header">
        <h5>Previous Games</h5>
      </div>
      <div class="listSection">
        <div class="game" v-for="game in Previous" :key="game.idEvent">
          <p class="time">{{ game.dateEvent }} @ {{ game.strTime }}</p>
          <div class="scores">
            <p>{{ game.strHomeTeam }} {{ game.intHomeScore }}</p>
            <p>vs</p>
            <p>{{ game.strAwayTeam }} {{ game.intAwayScore }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="leagueNewsSection">
      <div class="header">
        <h5>{{ leagueData.name }}</h5>
      </div>
      <div class="newsSection">
        <div class="news" v-for="news in News" :key="news.name">
          <img :src="news.image.url" alt="should be an image" />
          <div class="text">
            <a :href="news.webSearchUrl" target="_blank">
              <h5>{{ news.name }}</h5>
              <p>{{ news.description }}</p></a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="upcomingSection">
      <div class="header">
        <h5>Upcoming Games</h5>
      </div>
      <div class="listSection">
        <div v-if="this.$store.state.sports.upcoming15 == null" class="noGames">
          <p>No games scheduled currently, check back soon!</p>
        </div>
        <div v-else class="game" v-for="game in Upcoming" :key="game.idEvent">
          <p class="time">{{ game.dateEvent }} @ {{ game.strTime }}</p>
          <div class="scores">
            <p>{{ game.strHomeTeam }}</p>
            <p>vs</p>
            <p>{{ game.strAwayTeam }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SportsLeagues',
  props: ['leagueData'],
  components: {},
  data() {
    return {};
  },
  mounted() {},
  computed: {
    Previous() {
      return this.$store.state.sports.previous15;
    },
    Upcoming() {
      return this.$store.state.sports.upcoming15;
    },
    News() {
      return this.$store.state.sports.leagueNews;
    },
  },
  methods: {},
};
</script>

<style scoped>
.leagueSection {
  display: flex;
}
.header {
  text-align: center;
}
.header h5 {
  /* position: relative; */
  border-bottom: 2px solid white;
}
/* .header h5::after {
  position: absolute;
  content: '';
  height: 2px;
  width: 50%;
  bottom: 0;
  background: white;
} */

p {
  padding-left: 3px;
}

/* News section styling */
.newsSection {
  width: 475px;
  max-height: 405px;
  overflow-y: auto;
}
div.news {
  display: flex;
}
div.news img {
  height: 100px;
  width: 100px;
  padding-left: 5px;
}
div.text h5 {
  font-size: 18px;
  padding-left: 5px;
}
div.text p {
  font-size: 14px;
}
div.text a {
  color: white;
}
div.text a:hover {
  text-decoration-color: blue;
  text-shadow: 1pt 1pt 2pt grey;
}

/* Upcoming/Previous games styling */
.previousSection {
  width: 200px;
}
.upcomingSection {
  width: 180px;
}
.listSection {
  max-height: 405px;
  overflow-y: auto;
}
.game {
  border: 1pt solid white;
}
.scores p {
  margin-bottom: 0;
  font-size: 14px;
}
.time {
  font-size: 11px;
  margin-bottom: 0;
}
.noGames {
  text-align: center;
  padding-top: 150px;
}
</style>
