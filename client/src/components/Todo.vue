<template>
  <div class="todoList">
    <div class="toggleBtn">
      <h4 @click="toggleDropdown">Todos</h4>
    </div>
    <div v-if="showDropdown" id="todoDropdown">
      <div class="content">
        <div class="header d-flex">
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
              <p
                class="dropdown-item"
                v-for="todoList in TodoLists"
                :key="todoList.id"
                @click="selectCustomTodoList(todoList)"
              >
                {{ todoList.name }}
              </p>
              <p
                class="dropdown-item"
                v-if="showListInput == false"
                @click="toggleListInput"
              >
                Create a new list <i class="fas fa-plus"></i>
              </p>
            </div>
          </div>
          <div class="listInput">
            <input
              v-on:blur="onClickOutside"
              ref="listFocus"
              type="text"
              placeholder="New list name"
              v-model="list.name"
              v-on:keyup.enter="submitList"
              v-autowidth="{
                maxWidth: '150px',
                minWidth: '50px',
                comfortZone: 10,
              }"
              v-if="showListInput"
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
          <div class="customListTodos" v-else>
            <p v-for="todo in CustomListTodos" :key="todo.id">
              {{ todo.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="input">
        <button @click="toggleTodoInput" v-if="showTodoInput == false">
          Create a new Todo
        </button>
        <input
          v-on:blur="onClickOutside"
          ref="todoFocus"
          type="text"
          placeholder="What is your todo?"
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
        listId: null,
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
    TodoLists() {
      return this.$store.state.usersTodoLists;
    },
    CustomListTodos() {
      return this.$store.state.customListTodos;
    },
  },
  methods: {
    toggleDropdown() {
      if (this.showDropdown) {
        this.showDropdown = false;
      } else if (this.showDropdown == false) {
        this.showDropdown = true;
        this.$store.dispatch('getTodosByUserId', this.$store.state.user.id);
        this.$store.dispatch('getTodoListsByUserId', this.$store.state.user.id);
      }
    },
    toggleTodoInput() {
      if (this.showTodoInput) {
        this.showTodoInput = false;
      } else if (this.showTodoInput == false) {
        this.showTodoInput = true;
        this.$nextTick(() => this.$refs.todoFocus.focus());
      }
    },
    toggleListInput() {
      if (this.showListInput) {
        this.showListInput = false;
      } else if (this.showListInput == false) {
        this.showListInput = true;
        this.$nextTick(() => this.$refs.listFocus.focus());
      }
    },
    submitTodo() {
      this.todo.userId = this.$store.state.user.id;
      if (
        this.todoListSelected == 'Completed' ||
        this.todoListSelected == 'Todos'
      ) {
        this.$store.dispatch('submitTodo', this.todo);
      } else {
        let list = this.$store.state.usersTodoLists.find(
          (list) => list.name == this.todoListSelected
        );
        this.todo.listId = list._id;
        this.$store.dispatch('submitTodo', this.todo);
      }

      this.todo.description = '';
      this.showTodoInput = false;
    },
    submitList() {
      this.list.userId = this.$store.state.user.id;
      this.$store.dispatch('submitList', this.list);
      this.list.name = '';
      this.showListInput = false;
    },
    selectCustomTodoList(todoList) {
      this.todoListSelected = todoList.name;
      this.$store.dispatch('getTodosByListId', todoList._id);
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

.listInput {
  padding: 13px 0 0 20px;
}
</style>
