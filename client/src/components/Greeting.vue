<template>
  <div class="greeting" v-if="noUser">
    Good {{ timeOfDay }},
    <input
      v-on:blur="onClickOutside"
      ref="focus"
      type="text"
      v-model="user.name"
      v-on:keyup.enter="submitNewUser"
      v-autowidth="{ maxWidth: '550px', minWidth: '100px', comfortZone: 30 }"
    />
  </div>
  <div class="greeting d-flex" v-else>
    <h1>Good {{ timeOfDay }}, {{ User.name }}.</h1>

    <div class="dropdown dropright">
      <button
        class="btn"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
      >
        <i class="fas fa-ellipsis-h"></i>
      </button>
      <div class="dropdown-menu" v-if="!showAllUsers">
        <a class="dropdown-item" @click="createNewUser">Create new user</a>
        <a class="dropdown-item" @click="showAllUsersList">Change user</a>
      </div>
      <div class="dropdown-menu" v-else>
        <ul class="usersList">
          <li v-for="user in Users" :key="user._id">
            {{ user.name }}
          </li>
        </ul>
      </div>
    </div>
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
      showAllUsers: false,
    };
  },
  mounted() {
    this.getTimeOfDay();
    this.checkForLastUser();
    this.$store.dispatch('getAllUsers');
  },
  computed: {
    User() {
      return this.$store.state.user;
    },
    Users() {
      return this.$store.state.users;
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
      this.noUser = true;
      this.user.name = '';
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
    onClickOutside() {
      this.noUser = false;
      this.showAllUsers = false;
    },
    showAllUsersList() {
      this.showAllUsers = true;
      $('.dropdown-toggle').dropdown('show');
    },
  },
};
</script>

<style scoped>
.greeting {
  font-size: 3rem;
  color: white;
  text-align: center;
  justify-content: center;
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
span:hover {
  cursor: pointer;
}
i {
  font-size: 1.25rem;
  color: grey;
  opacity: 0.6;
}
i:hover {
  cursor: pointer;
  color: white;
  opacity: 1;
}
.btn.focus .btn:focus {
  box-shadow: transparent !important;
}
a:hover {
  cursor: pointer;
}
</style>
