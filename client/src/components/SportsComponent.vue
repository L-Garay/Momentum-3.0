<template>
  <div class="sportsSection" v-if="gotSports">
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
          <h5>{{ HighlightedNews.name }}</h5>
          <img :src="HighlightedNews.image.url" alt="should be story image" />
          <p>
            <a :href="HighlightedNews.webSearchUrl" target="_blank">{{
              HighlightedNews.description
            }}</a>
          </p>
        </div>
        <div class="otherHighlightedStories">
          <div
            class="otherHighlighted"
            v-for="(other, index) in OtherHighlighted"
            :key="index"
            @click="switchHighlighted(other)"
          >
            <img :src="other.image.url" alt="should be image" />
            <p>{{ other.name }}</p>
          </div>
        </div>
      </div>
      <div class="otherStories">
        <div class="stories">
          <div class="story" v-for="(story, index) in SportsNews" :key="index">
            <a :href="story.webSearchUrl" target="_blank">
              <img :src="story.image.url" alt="should be image" />
              <p>{{ story.name }}</p></a
            >
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
      gotSports: false,
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
        topic: 'Sports_NFL',
        isSports: true,
        id: 4391,
      },
      ncaaf: {
        name: 'National Collegiate Athletic Association Football',
        topic: 'Sports_CFB',
        isSports: true,
        id: 4479,
      },
      nba: {
        name: 'National Basketball Association',
        topic: 'Sports_NBA',
        isSports: true,
        id: 4387,
      },
      ncaab: {
        name: 'National Collegiate Athletic Association Basketball',
        topic: 'Sports_CBB',
        isSports: true,
        id: 4607,
      },
      mlb: {
        name: 'Major League Baseball',
        topic: 'Sports_MLB',
        isSports: true,
        id: 4424,
      },
      nhl: {
        name: 'National Hockey League',
        topic: 'Sports_NHL',
        isSports: true,
        id: 4380,
      },
      mls: {
        name: 'Major League Soccer',
        topic: 'Sports_Soccer',
        isSports: true,
        id: 4346,
      },
      epl: {
        name: 'English Premier League',
        topic: 'Sports_Soccer',
        isSports: true,
        id: 4328,
      },
    };
  },
  beforeMount() {
    this.getSportsNews();
  },
  mounted() {},
  computed: {
    SportsNews() {
      return this.$store.state.sports.news;
    },
    HighlightedNews() {
      return this.$store.state.sports.highlightedNews;
    },
    OtherHighlighted() {
      return this.$store.state.sports.otherHighlighted;
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
          this.$store.dispatch('getSportsNews', 'Sports');
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
            (this.show.epl = false),
            this.$store.dispatch('getGames', this.nfl.id);
          this.$store.dispatch('getNewsCategory', this.nfl);
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
          this.$store.dispatch('getGames', this.ncaaf.id);
          this.$store.dispatch('getNewsCategory', this.ncaaf);
          break;
        case 'NBA':
          (this.show.default = false),
            (this.show.nfl = false),
            (this.show.ncaaf = false),
            (this.show.nba = true),
            (this.show.ncaab = false),
            (this.show.mlb = false),
            (this.show.nhl = false),
            (this.show.mls = false),
            (this.show.epl = false);
          this.$store.dispatch('getGames', this.nba.id);
          this.$store.dispatch('getNewsCategory', this.nba);
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
          this.$store.dispatch('getGames', this.ncaab.id);
          this.$store.dispatch('getNewsCategory', this.ncaab);
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
          this.$store.dispatch('getGames', this.mlb.id);
          this.$store.dispatch('getNewsCategory', this.mlb);
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
          this.$store.dispatch('getGames', this.nhl.id);
          this.$store.dispatch('getNewsCategory', this.nhl);
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
          this.$store.dispatch('getGames', this.mls.id);
          this.$store.dispatch('getNewsCategory', this.mls);
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
          this.$store.dispatch('getGames', this.epl.id);
          this.$store.dispatch('getNewsCategory', this.epl);
          break;

        default:
          console.log('That is not an option');
          break;
      }
    },
    async getSportsNews() {
      await this.$store.dispatch('getSportsNews', 'Sports');
      this.gotSports = true;
    },
    switchHighlighted(other) {
      this.$store.dispatch('switchHighlighted', other);
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
/* Highlighted news section styling */
.highlightedStory {
  width: 590px;
}
div.highlighted {
  border-bottom: 1pt solid white;
}
div.highlighted img {
  height: 125px;
  width: 150px;
}
div.highlighted a {
  font-size: 16px;
  color: white;
}
div.highlighted a:hover {
  text-decoration-color: blue;
}
div.highlighted p {
  margin-bottom: 3px;
  max-height: 95px;
  overflow: hidden;
}

/* Other highlighted news section styling */
.otherHighlightedStories {
  display: flex;
}
div.otherHighlighted {
  font-size: 12px;
  text-align: center;
  padding: 10px;
}
div.otherHighlighted:hover {
  cursor: pointer;
}
div.otherHighlighted p {
  margin-bottom: 0;
  text-align: start;
}

/* Other news section styling */
.otherStories {
  width: 290px;
  height: 440px;
  overflow-y: auto;
  padding-top: 10px;
  border-left: 1pt solid white;
}
.story a {
  display: flex;
  font-size: 13px;
  margin: 0px 0 0px 2px;
  border-bottom: 1pt solid white;
  color: white;
}
.story a:hover {
  text-decoration-color: blue;
}
.story img {
  height: 100px;
  width: 100px;
  padding: 5px 3px 5px 3px;
}
.story:hover {
  box-shadow: 0pt 0pt 5pt white;
}
.story p {
  align-self: center;
  margin-bottom: 0;
}
</style>
