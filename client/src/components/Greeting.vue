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
    <div class="dropdown">
      <div id="dLabel" role="button" data-toggle="dropdown" class="btn">
        <i class="fas fa-ellipsis-h"></i>
      </div>
      <ul
        class="dropdown-menu multi-level"
        role="menu"
        aria-labelledby="dropdownMenu"
      >
        <li @click="createNewUser">Create new user</li>
        <li class="dropdown-submenu">
          <a tabindex="-1">Change user</a>
          <ul class="dropdown-menu">
            <li
              v-for="user in Users"
              :key="user._id"
              @click="getUserById(user._id)"
            >
              {{ user.name }}
            </li>
          </ul>
        </li>
      </ul>
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
      timeOfDay: 'evening',
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
    getTimeOfDay() {
      let hour = new Date().getHours();
      if (hour < 12) {
        this.timeOfDay = 'morning';
      } else if (hour >= 12 && hour < 17) {
        this.timeOfDay = 'afternoon';
      }
      setTimeout(this.getTimeOfDay, 3000 * 10);
    },
    dropdown() {
      document.getElementById('usersDropdown').classList.toggle('show');
    },
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
      this.$root.$emit('sendUser', result);
    },
    createNewUser() {
      this.noUser = true;
      this.user.name = '';
      this.$nextTick(() => this.$refs.focus.focus());
    },
    getUserById(id) {
      this.$store.dispatch('getUserById', id);
    },
    onClickOutside() {
      this.noUser = false;
      this.showAllUsers = false;
    },
    showAllUsersList() {
      this.showAllUsers = true;
      // $('.dropdown-toggle').dropdown('show');
    },
  },
};
</script>

<style scoped>
.greeting {
  font-size: 3rem;
  color: white;
  justify-content: center;
  align-items: center;
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
div.btn {
  background-color: rgba(255, 255, 255, 0.61);
  border-radius: 50%;
  height: 36px;
}
div.btn:hover {
  background-color: rgba(128, 128, 128, 0.678);
  border: 1pt solid black;
}
i {
  font-size: 1.25rem;
  color: black;
}
i:hover {
  cursor: pointer;
  color: white;
  opacity: 1;
}
li {
  padding: 3px 0 3px 5px;
}
li:hover {
  cursor: pointer;
  background-color: rgb(128, 128, 128, 0.5);
}

/* NOTE Dropdown settings */
.dropdown {
  padding-left: 12px;
}
.dropdown-submenu {
  position: relative;
}

.dropdown-submenu > .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  margin-left: -1px;
  -webkit-border-radius: 0 6px 6px 6px;
  -moz-border-radius: 0 6px 6px;
  border-radius: 0 6px 6px 6px;
}

.dropdown-submenu:hover > .dropdown-menu {
  display: block;
}

.dropdown-submenu > a:after {
  display: block;
  content: ' ';
  float: right;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 5px 0 5px 5px;
  border-left-color: #ccc;
  margin-top: 5px;
  margin-right: -10px;
}

.dropdown-submenu:hover > a:after {
  border-left-color: #fff;
}

.dropdown-submenu.pull-left {
  float: none;
}

.dropdown-submenu.pull-left > .dropdown-menu {
  left: -100%;
  margin-left: 10px;
  -webkit-border-radius: 6px 0 6px 6px;
  -moz-border-radius: 6px 0 6px 6px;
  border-radius: 6px 0 6px 6px;
}
</style>
