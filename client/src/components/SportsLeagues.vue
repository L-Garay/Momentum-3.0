<template>
  <div class="leagueSection">
    <div class="previousSection">
      <div class="header">
        <h5>Last Week's Games</h5>
      </div>
      <div class="listSection">
        <div class="game" v-for="game in Previous" :key="game.idEvent">
          <p>
            {{ game.strHomeTeam }} {{ game.intHomeScore }} vs
            {{ game.intAwayScore }} {{ game.strAwayTeam }}
          </p>
        </div>
      </div>
    </div>
    <div class="leagueTableSection">
      <div class="header">
        <h5>{{ leagueData.name }}</h5>
      </div>
      <div class="tableSection"></div>
    </div>
    <div class="upcomingSection">
      <div class="header">
        <h5>Upcoming Games</h5>
      </div>
      <div class="listSection">
        <div class="game" v-for="game in Upcoming" :key="game.idEvent">
          <p class="time">{{ game.dateEvent }} @ {{ game.strTime }}</p>
          <p>{{ game.strEvent }}</p>
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

.previousSection {
  width: 250px;
}
.listSection {
  max-height: 405px;
  overflow-y: auto;
}
.time {
  font-size: 11px;
  margin-bottom: 0;
}
</style>
