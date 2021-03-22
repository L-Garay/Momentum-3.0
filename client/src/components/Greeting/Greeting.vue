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
    <div class="btn" @click="showMenu">
      <i class="fas fa-ellipsis-h"></i>
    </div>
    <greeting-menu
      class="greetingMenu"
      v-if="show.menu"
      @showMenu="showMenu"
      @createNewUser="createNewUser"
    />
  </div>
  <!-- NOTE Below is template for when there is a user 'logged in' -->
  <div class="greeting " v-else>
    <h1>Good {{ timeOfDay }}, {{ User.user.name }}.</h1>
    <div class="btn" @click="showMenu">
      <i class="fas fa-ellipsis-h"></i>
    </div>
    <greeting-menu
      class="greetingMenu"
      v-if="show.menu"
      @showMenu="showMenu"
      @createNewUser="createNewUser"
    />
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Swal from 'sweetalert2';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
import GreetingMenu from '@/components/Greeting/GreetingMenu.vue';
export default {
  name: 'Greeting',
  components: {
    GreetingMenu,
  },
  data() {
    return {
      timeOfDay: 'evening',
      show: {
        menu: false,
      },
      user: {
        name: '',
        militaryTimeSelected: false,
        calculatorSelected: false,
        newsSelected: false,
        gamesSelected: false,
        createdTodoLists: [],
        contacts: [],
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
    showMenu() {
      this.show.menu = !this.show.menu;
    },
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
  color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  height: 200px;
}
.greetingMenu {
  position: absolute;
  right: -5em;
  bottom: -0.5em;
}
h1 {
  margin-left: 1em;
  text-shadow: 3px 3px 5px black;
  font-size: 3.75rem;
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
</style>
