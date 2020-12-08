<template>
  <div class="todoList">
    <div class="toggleBtn">
      <h4 @click="toggleDropdown">Todos</h4>
    </div>
    <div v-if="showDropdown" id="todoDropdown">
      <div class="content">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ todoListSelected }}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p class="dropdown-item" @click="todoListSelected = 'Todos'">
              Todos
            </p>
            <p class="dropdown-item" @click="todoListSelected = 'Completed'">
              Completed
            </p>
            <p class="dropdown-item">
              This will be a v-for every user created list
            </p>
            <p class="dropdown-item" v-if="showListInput == false">
              Create a new list
            </p>
            <input
              v-on:blur="onClickOutside"
              ref="listFocus"
              type="text"
              v-model="list.name"
              v-on:keyup.enter="submitList"
              v-autowidth="{
                maxWidth: '150px',
                minWidth: '50px',
                comfortZone: 10,
              }"
              v-else
            />
          </div>
        </div>
        <div class="todoItems">
          <div class="todos" v-if="todoListSelected == 'Todos'">
            <p v-for="todo in Todos" :key="todo._id">
              {{ todo.description }}
            </p>
          </div>
          <div
            class="completedTodos"
            v-else-if="todoListSelected == 'Completed'"
          >
            <p v-for="todo in CompletedTodos" :key="todo.id">
              {{ todo.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="input">
        <button @click="toggleInputBox" v-if="showTodoInput == false">
          Create a new Todo
        </button>
        <input
          v-on:blur="onClickOutside"
          ref="todoFocus"
          type="text"
          v-model="todo.description"
          v-on:keyup.enter="submitTodo"
          v-autowidth="{
            maxWidth: '250px',
            minWidth: '100px',
            comfortZone: 10,
          }"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'Todo',
  data() {
    return {
      showDropdown: false,
      showTodoInput: false,
      showListInput: false,
      todo: {
        description: '',
        completed: false,
        userId: '',
        listId: '',
      },
      todoListSelected: 'Todos',
      list: {
        name: '',
        todos: [],
        userId: '',
      },
    };
  },
  mounted() {
    this.$store.dispatch('getTodosByUserId', this.$store.state.user.id);
  },
  computed: {
    Todos() {
      return this.$store.state.todos;
    },
    CompletedTodos() {
      return this.$store.state.completedTodos;
    },
  },
  methods: {
    toggleDropdown() {
      if (this.showDropdown) {
        this.showDropdown = false;
      } else if (this.showDropdown == false) {
        this.showDropdown = true;
        this.$store.dispatch('getTodosByUserId', this.$store.state.user.id);
      }
    },
    toggleInputBox() {
      if (this.showInputBox) {
        this.showInputBox = false;
      } else if (this.showInputBox == false) {
        this.showInputBox = true;
        this.$nextTick(() => this.$refs.todoFocus.focus());
      }
    },
    submitTodo() {
      this.todo.userId = this.$store.state.user.id;
      this.$store.dispatch('submitTodo', this.todo);
      this.todo.description = '';
      this.showInputBox = false;
    },
    onClickOutside() {
      this.showTodoInput = false;
      this.showListInput = false;
    },
  },
};
</script>

<style scoped>
.todoList {
  position: relative;
  display: inline-block;
}
h4 {
  color: white;
  padding: 0 15px 10px 0;
  cursor: pointer;
}
#todoDropdown {
  background-color: lightslategray;
  border: 1pt solid black;
  width: 350px;
  height: 325px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  right: 0%;
}
.content {
  color: white;
  text-align: start;
  height: 275px;
}
h5 {
  color: white;
  border-bottom: 1pt solid white;
  padding-left: 5px;
}
.input {
  text-align: center;
  height: 50px;
}
button {
  background-color: red;
  border-radius: 10px 10px 10px 10px;
  border: none;
  margin-top: 10px;
}

p.dropdown-item {
  margin-bottom: 0;
}
p.dropdown-item:hover {
  cursor: pointer;
  background-color: rgba(128, 128, 128, 0.39);
}
</style>
