<template>
  <div
    class="greetingMenu"
    :style="{
      width: dimensions.width + 'px',
      height: dimensions.height + 'px',
    }"
  >
    <div class="topMenu" v-show="show.top">
      <p class="create" @click="createNewUser">Create User</p>
      <p class="change" @click="toggleMenu('change')">Change User</p>
      <p class="delete" @click="toggleMenu('delete')">Delete User</p>
    </div>
    <div class="changeMenu" v-show="show.change">
      <i class="fas fa-arrow-left back" @click="back"></i>
      <p
        v-for="user in ChangeUsers"
        :key="user._id"
        @click="getUserById(user._id)"
      >
        {{ user.name }}
      </p>
    </div>
    <div class="deleteMenu" v-show="show.delete">
      <i class="fas fa-arrow-left back" @click="back"></i>
      <p
        v-for="user in Users"
        :key="user._id"
        @click="deleteUserById(user._id)"
      >
        {{ user.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GreetingMenuComponent',
  data() {
    return {
      show: {
        top: true,
        change: false,
        delete: false,
      },
      dimensions: {
        height: 80,
        width: 120,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      document.addEventListener('click', this.greetingEventListener, false);
      console.log('set up');
    }, 1000);
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
    greetingEventListener(event) {
      if (!this.$el.contains(event.target)) {
        console.log(event.target, 'target');
        console.log(this.$el, 'element');
        this.$emit('showMenu');
        document.removeEventListener(
          'click',
          this.greetingEventListener,
          false
        );
      }
    },
    toggleMenu(menu) {
      this.show.top = false;
      if (menu == 'change') {
        this.show.delete = false;
        this.show.change = true;
      } else if (menu == 'delete') {
        this.show.change = false;
        this.show.delete = true;
      }
    },
    back() {
      this.show.delete = false;
      this.show.change = false;
      this.show.top = true;
    },
    createNewUser() {
      this.$emit('createNewUser');
    },
    async getUserById(id) {
      await this.$store.dispatch('getUserById', id);
      // Let the Clock component know that the user has changed, and pass in the new user and their time prefernce
      let newUser = this.$store.state.user.user;
      this.$root.$emit('changedUser', newUser);
    },
  },
};
</script>

<style scoped>
div.greetingMenu {
  color: white;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 6px 6px 6px 6px;
}
div.greetingMenu p {
  font-size: 14px;
  margin: 3px 0 0 6px;
}
div.greetingMenu p:hover {
  cursor: pointer;
}
p.create:hover {
  color: rgb(5, 185, 5);
}
p.change:hover {
  color: goldenrod;
}
p.delete:hover {
  color: red;
}
i.back {
  font-size: 12px;
  margin-left: 6px;
  margin-bottom: 0;
}
i.back:hover {
  color: goldenrod;
  cursor: pointer;
}
</style>
