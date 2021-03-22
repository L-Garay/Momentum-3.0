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
    <div class="subMenu" v-show="show.change">
      <i class="fas fa-arrow-left back" @click="back"></i>
      <div class="nameList">
        <p
          v-for="user in ChangeUsers"
          :key="user._id"
          @click="getUserById(user._id)"
          class="change"
        >
          {{ user.name }}
        </p>
      </div>
    </div>
    <div class="subMenu" v-show="show.delete">
      <i class="fas fa-arrow-left back" @click="back"></i>
      <div class="nameList">
        <p
          v-for="user in Users"
          :key="user._id"
          @click="deleteUserById(user._id)"
          class="delete"
        >
          {{ user.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
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
      this.$emit('showMenu');
      document.removeEventListener('click', this.greetingEventListener, false);
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
div.greetingMenu p:first-child {
  margin-top: 0;
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
div.topMenu {
  padding-top: 5px;
}
div.subMenu {
  display: flex;
}
div.nameList {
  flex-direction: column;
  max-height: 75px;
  overflow-y: auto;
  padding-right: 15px;
  margin-top: 3px;
}
div.nameList::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  background-color: rgb(90, 90, 90);
}
div.nameList::-webkit-scrollbar-thumb {
  background: goldenrod;
}
i.back {
  font-size: 12px;
  margin: 6px 0 0 6px;
  height: 14px;
}
i.back:hover::before {
  color: goldenrod;
  cursor: pointer;
}
</style>
