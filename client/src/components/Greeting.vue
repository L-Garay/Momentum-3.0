<template>
  <!-- NOTE Template for when there is no currently 'logged in' user -->
  <div class="greeting " v-if="User.noUser">
    <h1>Good {{ timeOfDay }},</h1>
    <input
      v-on:blur="onClickOutside"
      ref="focus"
      type="text"
      v-model="user.name"
      v-on:keyup.enter="submitNewUser"
      v-autowidth="{ maxWidth: '550px', minWidth: '100px', comfortZone: 30 }"
    />
    <div class="dropdown" v-if="User.userCount > 0">
      <div id="dLabel" role="button" data-toggle="dropdown" class="btn">
        <i class="fas fa-ellipsis-h"></i>
      </div>
      <ul
        class="dropdown-menu multi-level"
        role="menu"
        aria-labelledby="dropdownMenu"
      >
        <li class="dropdown-submenu" v-if="User.userShowChange">
          <a tabindex="-1">Change user</a>
          <ul class="dropdown-menu">
            <li
              v-for="user in ChangeUsers"
              :key="user._id"
              @click="getUserById(user._id)"
            >
              {{ user.name }}
            </li>
          </ul>
        </li>
        <li class="dropdown-submenu">
          <a tabindex="-1">Delete user</a>
          <ul class="dropdown-menu">
            <li v-for="user in Users" :key="user._id">
              {{ user.name }}
              <i
                class="fas fa-user-times user"
                @click="deleteUserById(user.id)"
              ></i>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <!-- NOTE Below is template for when there is a user 'logged in' -->
  <div class="greeting " v-else>
    <h1>Good {{ timeOfDay }}, {{ User.user.name }}.</h1>
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
        <li class="dropdown-submenu" v-if="User.userShowChange">
          <a tabindex="-1">Change user</a>
          <ul class="dropdown-menu">
            <li
              v-for="user in ChangeUsers"
              :key="user._id"
              @click="getUserById(user._id)"
            >
              {{ user.name }}
            </li>
          </ul>
        </li>
        <li class="dropdown-submenu">
          <a tabindex="-1">Delete user</a>
          <ul class="dropdown-menu">
            <li v-for="user in Users" :key="user._id">
              {{ user.name }}
              <i
                class="fas fa-user-times user"
                @click="deleteUserById(user.id)"
              ></i>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Swal from 'sweetalert2';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);

export default {
  name: 'Greeting',
  data() {
    return {
      timeOfDay: 'evening',
      user: {
        name: '',
        militaryTimeSelected: false,
        calculatorSelected: false,
        newsSelected: false,
        gamesSelected: false,
        createdTodoLists: [],
      },
    };
  },
  beforeMount() {
    this.checkForLastUser();
  },
  mounted() {
    this.getTimeOfDay();
    this.$store.dispatch('showChange');
  },
  computed: {
    User() {
      return this.$store.state.user;
    },
    Users() {
      return this.$store.state.user.users;
    },
    ChangeUsers() {
      return this.$store.state.user.changeUser;
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

    // Check for last 'logged in' user when first starting the app
    async checkForLastUser() {
      let result = await this.$store.dispatch('getLastUser');
      if (result === undefined) {
        this.$store.state.user.noUser = true;
      } else if (result) {
        this.$store.state.user.noUser = false;
        this.$store.state.user.user = result;
        this.$root.$emit('checkLastUser', result);
      }
      // Now that a user has been set (or not), update the time preference (defaults to standard if there is no user)
      this.$store.dispatch('getAllUsers');
    },
    createNewUser() {
      this.$store.state.user.noUser = true;
      this.user.name = '';
      this.$nextTick(() => this.$refs.focus.focus());
    },
    submitNewUser() {
      this.$store.dispatch('newUser', this.user);
      let user = this.user;
      this.$root.$emit('submitNewUser', user);
      this.user.name = '';
    },

    async getUserById(id) {
      await this.$store.dispatch('getUserById', id);
      // Let the Clock component know that the user has changed, and pass in the new user and their time prefernce
      let newUser = this.$store.state.user.user;
      this.$root.$emit('changedUser', newUser);
    },
    // Third party package called SweetAlerts2
    deleteUserById(id) {
      Swal.fire({
        title: 'Are you sure?',
        text:
          "You won't be able to revert this and all saved photos and quotes will also be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.$store.dispatch('deleteUserById', id);
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        }
      });
    },
    onClickOutside() {
      this.user.name = '';
      this.$store.state.user.noUser = false;
    },
  },
};
</script>

<style scoped>
.greeting {
  font-size: 4rem;
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
}
h1 {
  text-shadow: 3px 3px 5px black;
}
input {
  border: none;
  border-bottom: 1pt solid black;
  height: 50px;
  text-align: center;
  background-color: rgba(169, 169, 169, 0.514);
  color: white;
  font-size: 2.3rem;
  text-shadow: 3px 3px 5px black;
}
input:focus {
  outline: none;
}
div.btn {
  background-color: transparent;
  border-radius: 50%;
  height: 36px;
}
div.btn:hover {
  background-color: rgba(128, 128, 128, 0.479);
}
i {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.753);
  text-shadow: 1pt 1pt 1pt black;
}
i:hover {
  cursor: pointer;
  color: white;
  opacity: 1;
}
i.user {
  float: right;
  color: rgba(255, 0, 0, 0.507);
  padding-right: 5px;
}
i.user:hover {
  color: red;
}
li {
  padding: 3px 0 3px 5px;
}
li:hover {
  cursor: pointer;
  background-color: rgb(128, 128, 128, 0.2);
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
