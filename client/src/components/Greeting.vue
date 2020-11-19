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
      <a
        id="dLabel"
        role="button"
        data-toggle="dropdown"
        class="btn btn-primary"
      >
        <i class="fas fa-ellipsis-h"></i>
      </a>
      <ul
        class="dropdown-menu multi-level"
        role="menu"
        aria-labelledby="dropdownMenu"
      >
        <li><a @click="createNewUser">Create new user</a></li>
        <li class="divider"></li>
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

a:hover {
  cursor: pointer;
}
li:hover {
  cursor: pointer;
}

/* NOTE Dropdown settings */

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
