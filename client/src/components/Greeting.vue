<template>
  <div class="greeting" v-if="noUser">
    Good {{ timeOfDay }},
    <input
      ref="focus"
      type="text"
      v-model="user.name"
      v-on:keyup.enter="submitNewUser"
      v-autowidth="{ maxWidth: '550px', minWidth: '100px', comfortZone: 30 }"
    />
  </div>
  <div class="greeting" v-else>
    Good {{ timeOfDay }}, {{ User.name }}
    <i class="fas fa-pencil-alt" @click="createNewUser"></i>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'Greeting',
  data() {
    return {
      noUser: true,
      timeOfDay: null,
      user: {
        name: '',
        militaryTimeSelected: false,
      },
    };
  },
  mounted() {
    this.getTimeOfDay();
    this.checkForLastUser();
  },
  computed: {
    User() {
      return this.$store.state.user;
    },
  },
  methods: {
    submitNewUser() {
      this.$store.dispatch('newUser', this.user);
      this.noUser = false;
    },
    async checkForLastUser() {
      let result = await this.$store.dispatch('getLastUser');
      console.log(result);
      if (result === undefined) {
        this.noUser = true;
      } else if (result) {
        this.noUser = false;
        this.$store.state.user = result;
      }
    },
    createNewUser() {
      (this.noUser = true), (this.user.name = '');
      this.$nextTick(() => this.$refs.focus.focus());
    },
    getTimeOfDay() {
      let hours = new Date().getHours(); // 0 - 23
      if (hours < 12) {
        this.timeOfDay = 'morning';
      } else if (hours > 12 && hours < 17) {
        this.timeOfDay = 'afternoon';
      }
      setTimeout(this.getTimeOfDay, 6000); //every minute (I don't know how this will effect app speed)
    },
  },
};
</script>

<style scoped>
.greeting {
  font-size: 3rem;
  color: white;
  text-align: center;
}
input {
  border: none;
  border-bottom: 1pt solid black;
  /* max-width: 500px; */
  text-align: center;
  background-color: rgba(169, 169, 169, 0.514);
  color: white;
}
input:focus {
  outline: none;
}
i {
  color: green;
  opacity: 0.1;
}
i:hover {
  cursor: pointer;
  opacity: 1;
}
</style>
