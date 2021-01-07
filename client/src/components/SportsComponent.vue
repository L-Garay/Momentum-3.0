<template>
  <div class="sportsSection">
    <div class="headerSection">
      <div class="navbar">
        <p @click="toggleLeague('Home')">Home</p>
        <p @click="toggleLeague('NFL')">NFL</p>
        <p @click="toggleLeague('NCAAF')">NCAAF</p>
        <p @click="toggleLeague('NBA')">NBA</p>
        <p @click="toggleLeague('NCAAB')">NCAAB</p>
        <p @click="toggleLeague('MLB')">MLB</p>
        <p @click="toggleLeague('NHL')">NHL</p>
        <p @click="toggleLeague('MLS')">MLS</p>
        <p @click="toggleLeague('EPL')">EPL</p>
      </div>
    </div>
    <div class="defaultMainView" v-if="show.default">
      <h5>this is the default view</h5>
      <!-- This will be the default main view where news stories about sports will be displayed, there will be one 'highlighted' story on the left side that will have a larger image/desc than the others, then there will be a section on the right that will hold the remaining stories. -->
      <div class="highlightedStory">
        <!-- this is where the highlighted story will go, when a user clicks on this story it will take them to the full article -->
      </div>
      <div class="otherStories">
        <!-- this is where the rest of the stories will go, when a user clicks on one of these it will make it the highlighted story -->
      </div>
    </div>
    <div class="leagueMainView">
      <sports-leagues v-if="show.nfl" :leagueData="nfl" />
      <sports-leagues v-if="show.ncaaf" :leagueData="ncaaf" />
      <sports-leagues v-if="show.nba" :leagueData="nba" />
      <sports-leagues v-if="show.ncaab" :leagueData="ncaab" />
      <sports-leagues v-if="show.mlb" :leagueData="mlb" />
      <sports-leagues v-if="show.nhl" :leagueData="nhl" />
      <sports-leagues v-if="show.mls" :leagueData="mls" />
      <sports-leagues v-if="show.epl" :leagueData="epl" />
      <!-- This is where the (most likely) league component will go, where the league standing, and previous and upcoming 15 games will be displayed  -->
    </div>
  </div>
</template>

<script>
import SportsLeagues from '@/components/SportsLeagues.vue';
export default {
  name: 'SportsCompoenent',
  components: {
    SportsLeagues,
  },
  data() {
    return {
      show: {
        default: true,
        nfl: false,
        ncaaf: false,
        nba: false,
        ncaab: false,
        mlb: false,
        nhl: false,
        mls: false,
        epl: false,
      },
      nfl: {
        name: 'National Football League',
      },
      ncaaf: { name: 'National Collegiate Athletic Association Football' },
      nba: { name: 'National Basketball Association' },
      ncaab: { name: 'National Collegiate Athletic Association Basketball' },
      mlb: { name: 'Major League Baseball' },
      nhl: { name: 'National Hockey League' },
      mls: { name: 'Major League Soccer' },
      epl: { name: 'English Premier League' },
    };
  },
  mounted() {},
  computed: {
    Sports() {
      return this.$store.state.sports.test;
    },
  },
  methods: {
    toggleLeague(league) {
      switch (league) {
        case 'Home':
          (this.show.default = true),
            (this.show.nfl = false),
            (this.show.ncaaf = false),
            (this.show.nba = false),
            (this.show.ncaab = false),
            (this.show.mlb = false),
            (this.show.nhl = false),
            (this.show.mls = false),
            (this.show.epl = false);
          break;
        case 'NFL':
          (this.show.default = false),
            (this.show.nfl = true),
            (this.show.ncaaf = false),
            (this.show.nba = false),
            (this.show.ncaab = false),
            (this.show.mlb = false),
            (this.show.nhl = false),
            (this.show.mls = false),
            (this.show.epl = false);
          break;
        case 'NCAAF':
          (this.show.default = false),
            (this.show.nfl = false),
            (this.show.ncaaf = true),
            (this.show.nba = false),
            (this.show.ncaab = false),
            (this.show.mlb = false),
            (this.show.nhl = false),
            (this.show.mls = false),
            (this.show.epl = false);
          break;
        case 'NBA':
          (this.show.nfl = false),
            (this.show.ncaaf = false),
            (this.show.nba = true),
            (this.show.ncaab = false),
            (this.show.mlb = false),
            (this.show.nhl = false),
            (this.show.mls = false),
            (this.show.epl = false);
          break;
        case 'NCAAB':
          (this.show.default = false),
            (this.show.nfl = false),
            (this.show.ncaaf = false),
            (this.show.nba = false),
            (this.show.ncaab = true),
            (this.show.mlb = false),
            (this.show.nhl = false),
            (this.show.mls = false),
            (this.show.epl = false);
          break;
        case 'MLB':
          (this.show.default = false),
            (this.show.nfl = false),
            (this.show.ncaaf = false),
            (this.show.nba = false),
            (this.show.ncaab = false),
            (this.show.mlb = true),
            (this.show.nhl = false),
            (this.show.mls = false),
            (this.show.epl = false);
          break;
        case 'NHL':
          (this.show.default = false),
            (this.show.nfl = false),
            (this.show.ncaaf = false),
            (this.show.nba = false),
            (this.show.ncaab = false),
            (this.show.mlb = false),
            (this.show.nhl = true),
            (this.show.mls = false),
            (this.show.epl = false);
          break;
        case 'MLS':
          (this.show.default = false),
            (this.show.nfl = false),
            (this.show.ncaaf = false),
            (this.show.nba = false),
            (this.show.ncaab = false),
            (this.show.mlb = false),
            (this.show.nhl = false),
            (this.show.mls = true),
            (this.show.epl = false);
          break;
        case 'EPL':
          (this.show.default = false),
            (this.show.nfl = false),
            (this.show.ncaaf = false),
            (this.show.nba = false),
            (this.show.ncaab = false),
            (this.show.mlb = false),
            (this.show.nhl = false),
            (this.show.mls = false),
            (this.show.epl = true);
          break;

        default:
          console.log('That is not an option');
          break;
      }
    },
  },
};
</script>

<style scoped>
.navbar p {
  margin-right: 30px;
}
.navbar p:hover {
  cursor: pointer;
}
</style>
