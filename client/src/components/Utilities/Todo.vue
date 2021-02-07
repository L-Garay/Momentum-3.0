<template>
  <div class="todoList">
    <div id="todoDropdown">
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
              <div class="customLists">
                <p class="dropdown-item" @click="todoListSelected = 'Todos'">
                  Todos
                </p>
              </div>
              <div class="customLists">
                <p
                  class="dropdown-item"
                  @click="todoListSelected = 'Completed'"
                >
                  Completed
                </p>
              </div>
              <div
                class="d-flex customLists"
                v-for="todoList in TodoLists"
                :key="todoList.id"
              >
                <p
                  class="dropdown-item"
                  @click="selectCustomTodoList(todoList)"
                >
                  {{ todoList.name }}
                </p>
                <i
                  class="fas fa-trash-alt"
                  @click="deleteTodoList(todoList)"
                ></i>
              </div>
              <div class="customLists">
                <p
                  class="dropdown-item"
                  v-if="showListInput == false"
                  @click="toggleListInput"
                >
                  Create a new list <i class="fas fa-plus"></i>
                </p>
              </div>
            </div>
          </div>
          <div class="listInput">
            <input
              class="listInputBox"
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
              v-show="showListInput"
            />
          </div>
        </div>
        <div class="todoItems">
          <div class="todos" v-if="todoListSelected == 'Todos'">
            <div
              class="noTodos"
              v-if="this.$store.state.todo.todos.length == 0"
            >
              <p>
                You don't have any todos, click the button below to create one.
              </p>
            </div>
            <div
              v-else
              class="descriptions"
              v-for="todo in Todos"
              :key="todo._id"
            >
              <div class="seperate d-flex">
                <i
                  class="far fa-square fa-sm"
                  v-if="todo.completed == false"
                  @click="updateTodo(todo)"
                ></i
                ><i
                  class="fas fa-check-square fa-sm"
                  v-else
                  @click="updateTodo(todo)"
                ></i>
                <p>
                  {{ todo.description }}
                </p>
              </div>
              <i class="fas fa-trash-alt fa-sm" @click="deleteTodo(todo)"></i>
            </div>
          </div>
          <div
            class="completedTodos"
            v-else-if="todoListSelected == 'Completed'"
          >
            <div
              class="noTodos"
              v-if="this.$store.state.todo.completedTodos.length == 0"
            >
              <p>
                You don't have any completed todos, time to get to work!
              </p>
            </div>
            <div
              v-else
              class="descriptions"
              v-for="todo in CompletedTodos"
              :key="todo.id"
            >
              <div class="seperate d-flex">
                <i
                  class="far fa-square fa-sm"
                  v-if="todo.completed == false"
                  @click="updateTodo(todo)"
                ></i
                ><i
                  class="fas fa-check-square fa-sm"
                  v-else
                  @click="updateTodo(todo)"
                ></i>
                <p>
                  {{ todo.description }}
                </p>
              </div>
              <i class="fas fa-trash-alt fa-sm" @click="deleteTodo(todo)"></i>
            </div>
          </div>
          <div class="customListTodos" v-else>
            <div
              class="noTodos"
              v-if="this.$store.state.todo.customListTodos.length == 0"
            >
              <p>
                You don't have any todos, click the button below to create one.
              </p>
            </div>
            <div
              class="descriptions"
              v-for="todo in CustomListTodos"
              :key="todo.id"
            >
              <div class="seperate d-flex">
                <i
                  class="far fa-square fa-sm"
                  v-if="todo.completed == false"
                  @click="updateTodo(todo)"
                ></i
                ><i
                  class="fas fa-check-square fa-sm"
                  v-else
                  @click="updateTodo(todo)"
                ></i>
                <p>
                  {{ todo.description }}
                </p>
              </div>
              <i class="fas fa-trash-alt fa-sm" @click="deleteTodo(todo)"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="input">
        <button
          class="createBtn"
          @click="toggleTodoInput"
          v-if="showTodoInput == false"
        >
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
    this.$store.dispatch('getTodosByUserId', this.$store.state.user.user.id);
    this.$store.dispatch(
      'getTodoListsByUserId',
      this.$store.state.user.user.id
    );
  },
  computed: {
    Todos() {
      return this.$store.state.todo.todos;
    },
    CompletedTodos() {
      return this.$store.state.todo.completedTodos;
    },
    TodoLists() {
      return this.$store.state.todo.usersTodoLists;
    },
    CustomListTodos() {
      return this.$store.state.todo.customListTodos;
    },
  },
  methods: {
    //#region --Helper Methods--
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
    onClickOutside() {
      this.showTodoInput = false;
      this.showListInput = false;
    },
    //#endregion

    //#region --Todo Methods--
    submitTodo() {
      this.todo.userId = this.$store.state.user.user.id;
      if (
        this.todoListSelected == 'Completed' ||
        this.todoListSelected == 'Todos'
      ) {
        this.$store.dispatch('submitTodo', this.todo);
      } else {
        let list = this.$store.state.todo.usersTodoLists.find(
          (list) => list.name == this.todoListSelected
        );
        this.todo.listId = list._id;
        this.$store.dispatch('submitCustomTodo', this.todo);
      }
      this.todo.description = '';
      this.showTodoInput = false;
    },
    updateTodo(todo) {
      if (todo.completed == true) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
      this.$store.dispatch('updateTodo', todo);
    },
    deleteTodo(todo) {
      if (todo.listId !== null) {
        this.$store.dispatch('deleteCustomTodo', todo);
      } else {
        this.$store.dispatch('deleteTodo', todo);
      }
    },
    //#endregion

    //#region --List Methods--
    submitList() {
      this.list.userId = this.$store.state.user.user.id;
      this.$store.dispatch('submitList', this.list);
      this.list.name = '';
      this.showListInput = false;
    },
    selectCustomTodoList(todoList) {
      this.todoListSelected = todoList.name;
      this.$store.dispatch('getTodosByListId', todoList._id);
    },
    deleteTodoList(todoList) {
      this.$store.dispatch('deleteTodoList', todoList);
    },
    //#endregion
  },
};
</script>

<style scoped>
/* Modal top level */
div.todoList {
  text-align: center;
  text-align: -webkit-center;
  margin-top: 12px;
}
#todoDropdown {
  background-color: transparent;
  border: none;
  width: 475px;
  height: 355px;
  background-color: transparent;
}
/* Header section styling */
.header {
  border-bottom: 1pt solid white;
  padding-bottom: 10pt;
}
/* List button and list styling */
div.customLists:hover {
  background-color: rgba(128, 128, 128, 0.39);
}
button.btn {
  background-color: transparent;
  border-radius: 5px 5px 5px 5px;
  border: 1pt solid white;
  margin: 10px 0 0 7px;
  color: white;
}
button.btn:hover {
  background-color: lightgray;
  color: black;
  box-shadow: 1pt 0pt 6pt white;
}
button.btn:active {
  background-color: white !important;
  color: black !important;
}
button.btn:focus {
  background-color: rgba(128, 128, 128, 0.39);
  border: 1pt solid white;
  color: white;
  box-shadow: 1pt 0pt 10pt rgba(0, 0, 0, 0.692) !important;
}
p.dropdown-item {
  margin-bottom: 0;
}
p.dropdown-item:hover {
  cursor: pointer;
  background-color: rgba(128, 128, 128, 0.03);
}
.dropdown-menu {
  max-height: 185px;
  overflow-y: auto;
}
/* List input styling */

.listInput {
  padding: 13px 0 0 20px;
}
input.listInputBox {
  border: none;
  border-bottom: 1pt solid white;
  background-color: transparent;
  color: white;
}
input.listInputBox::placeholder {
  color: white;
}
input.listInputBox:-ms-input-placeholder {
  color: white;
}
input.listInputBox:focus {
  outline: none;
}
/* Todo list styling */
.descriptions {
  display: flex;
  justify-content: space-between;
}
.content {
  color: white;
  text-align: start;
  height: 315px;
}
.todoItems {
  max-height: 235px;
  padding-top: 5px;
  overflow-y: auto;
}
.noTodos {
  text-align: center;
  margin-top: 75px;
  padding: 0 12px;
}
/* Create todo button styling */
.input {
  text-align: center;
  height: 50px;
}
.input input {
  border: none;
  border-bottom: 1pt solid white;
  background-color: transparent;
  color: white;
}
.input input::placeholder {
  color: white;
}
.input input:-ms-input-placeholder {
  color: white;
}
.input input:focus {
  outline: none;
}
button.createBtn {
  color: white;
  background-color: transparent;
  border: none;
}
button.createBtn:hover {
  color: white;
  text-shadow: 10px 0px 20px white;
}
button.createBtn:active {
  outline: none;
}
div.input::after {
  position: absolute;
  content: '';
  width: 70%;
  height: 1px;
  bottom: 15%;
  right: 15%;
  background: white;
}
/* Font awesome styling */
i.far,
i.fas {
  padding: 6.5px 12px 0 5px;
}
i.fas.fa-trash-alt {
  color: rgba(255, 0, 0, 0.384);
}
i.fas.fa-trash-alt:hover {
  color: red;
  cursor: pointer;
}

i.far.fa-square.fa-sm:hover::before,
i.fas.fa-check-square.fa-sm:hover::before,
i.fas.fa-trash-alt.fa-sm:hover::before {
  cursor: pointer;
}
</style>
