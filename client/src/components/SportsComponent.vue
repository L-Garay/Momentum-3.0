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
      <div class="highlightedStory">
        <div class="highlighted">
          <h3>{{ HighlightedNews.name }}</h3>
          <img
            :src="HighlightedNews.image.thumbnail.contentUrl"
            alt="should be story image"
          />
          <p>
            <a :href="HighlightedNews.url" target="_blank">{{
              HighlightedNews.description
            }}</a>
          </p>
        </div>
      </div>
      <div class="otherStories">
        <div class="stories">
          <div class="story" v-for="(story, index) in SportsNews" :key="index">
            <img
              :src="story.image.thumbnail.contentUrl"
              alt="should be image"
            />
            <p>{{ story.name }}</p>
          </div>
        </div>
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
    SportsNews() {
      return this.$store.state.sports.news;
    },
    HighlightedNews() {
      return this.$store.state.sports.highlightedNews;
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
.sportsSection {
  width: 890px;
  height: 500px;
  background-color: rgba(169, 169, 169, 0.637);
}
.headerSection {
  border-bottom: 1pt solid white;
}
.navbar p {
  margin-right: 30px;
}
.navbar p:hover {
  cursor: pointer;
}
.defaultMainView {
  display: flex;
}
.highlightedStory {
  width: 590px;
}
div.highlighted img {
  height: 200px;
  width: 250px;
}
div.highlighted a {
  font-size: 20px;
  color: white;
}
div.highlighted a:hover {
  text-decoration-color: blue;
}
.otherStories {
  width: 290px;
  height: 440px;
  overflow-y: auto;
  padding-top: 10px;
}
</style>
