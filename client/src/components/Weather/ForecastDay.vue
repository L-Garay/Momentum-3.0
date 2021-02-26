<template>
  <div class="col forecast" :class="{ forecastActive: Active }">
    <p class="weekday">
      {{
        this.$luxon(forecastData.date, {
          input: { format: 'yyyy-MM-dd' },
          output: 'date_medd',
        }).slice(0, 3)
      }}
    </p>
    <div class="forecastData">
      <div class="forecastCondition">
        <i v-if="forecastData.condition == 'Clear'" class="fas fa-sun icon"></i>
        <i
          v-else-if="forecastData.condition == 'Rain'"
          class="fas fa-cloud-showers-heavy icon"
        ></i>
        <i
          v-else-if="forecastData.condition == 'Clouds'"
          class="fas fa-cloud icon"
        ></i>
        <i
          v-else-if="forecastData.condition == 'Snow'"
          class="far fa-snowflake icon"
        ></i>
        <i
          v-else-if="forecastData.condition == 'Fog'"
          class="fas fa-smog icon"
        ></i>
        <i
          v-else-if="forecastData.condition == 'Mist'"
          class="fas fa-smog icon"
        ></i>
        <i
          v-else-if="forecastData.condition == 'Haze'"
          class="fas fa-smog icon"
        ></i>
        <i v-else class="fas fa-question icon"></i>
      </div>
      <div v-if="Metric" class="forecastTemp">
        <div class="forecastHigh">
          <p>
            <small>{{ Math.round(forecastData.high - 32 / 1.8) }}&#176;</small>
          </p>
        </div>
        <div class="forecastLow">
          <p>
            <small>{{ Math.round(forecastData.low - 32 / 1.8) }}&#176;</small>
          </p>
        </div>
      </div>
      <div v-else class="forecastTemp">
        <div class="forecastHigh">
          <p>
            <small>{{ Math.round(forecastData.high) }}&#176;</small>
          </p>
        </div>
        <div class="forecastLow">
          <p>
            <small>{{ Math.round(forecastData.low) }}&#176;</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueLuxon from 'vue-luxon';
Vue.use(VueLuxon);
export default {
  name: 'ForecastDayComponent',
  props: ['forecastData', 'activeData', 'metricData'],
  data() {
    return {};
  },
  computed: {
    Active() {
      return this.activeData;
    },
    Metric() {
      return this.metricData;
    },
  },
};
</script>

<style scoped>
div.forecast {
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 8px;
  padding-left: 0px;
  padding-right: 0px;
  text-align: center;
}
div.forecast:hover {
  cursor: pointer;
  background-color: rgba(119, 136, 153, 0.2);
}
.forecastActive {
  background-color: rgba(119, 136, 153, 0.2);
  color: white;
}
div.forecast:hover div.forecastLow {
  color: white;
}
div.forecast p {
  margin-bottom: 0;
}
div.forecastData {
  display: flex;
  justify-content: center;
  align-items: center;
}
div.forecastCondition i {
  font-size: 20px;
  padding-right: 5px;
}
div.forecastTemp {
  padding-left: 5px;
}
div.forecastLow {
  color: rgb(153, 153, 153);
  margin-top: -4px;
}
</style>
