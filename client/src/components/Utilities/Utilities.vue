<template>
  <div class="utilitiesComponent">
    <div class="content">
      <div class="header">
        <div class="navbar">
          <p @click="toggleUtility('Todos')">Todos</p>
          <p @click="toggleUtility('Calendar')">Calendar</p>
          <p @click="toggleUtility('Contacts')">Contacts</p>
        </div>
      </div>
      <div class="mainSection">
        <div class="components">
          <todo v-if="show.todo" />
          <calendar v-if="show.calendar" />
          <contacts v-if="show.contacts" />
        </div>
      </div>
      <div class="footer">
        <!-- This is where the close/exit button will be -->
      </div>
    </div>
  </div>
</template>

<script>
import Todo from '@/components/Utilities/Todo.vue';
import Calendar from '@/components/Utilities/Calendar.vue';
import Contacts from '@/components/Utilities/Contacts.vue';
export default {
  name: 'UtilitiesComponent',
  components: {
    Todo,
    Calendar,
    Contacts,
  },
  data() {
    return {
      show: {
        todo: true,
        calendar: false,
        contacts: false,
      },
    };
  },
  mounted() {},
  computed: {},
  methods: {
    toggleUtility(utility) {
      switch (utility) {
        case 'Todos':
          this.show.todo = true;
          this.show.calendar = false;
          this.show.contacts = false;
          break;
        case 'Calendar':
          this.show.todo = false;
          this.show.calendar = true;
          this.show.contacts = false;
          break;
        case 'Contacts':
          this.show.todo = false;
          this.show.calendar = false;
          this.show.contacts = true;
          break;

        default:
          this.show.todo = true;
          this.show.calendar = false;
          this.show.contacts = false;
          break;
      }
    },
  },
};
</script>

<style scoped>
.utilitiesComponent {
  background-color: rgba(245, 245, 245, 0.815);
  border: 1pt solid black;
  width: 575px;
  height: 450px;
  position: absolute;
  z-index: 5;
  bottom: 70px;
  right: 30px;
}

div.navbar p:hover {
  cursor: pointer;
}
</style>
