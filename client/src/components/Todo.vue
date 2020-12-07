<template>
  <div class="todoList">
    <div class="toggleBtn">
      <h4 @click="toggleDropdown">Todos</h4>
    </div>
    <div v-if="showDropdown" id="todoDropdown">
      <div class="content">
        <h5>Todo List</h5>
        <p>content will go here</p>
        <p>more content</p>
        <p>even more content</p>
      </div>
      <div class="input">
        <button @click="toggleInputBox" v-if="showInputBox == false">
          Create a new Todo
        </button>
        <input
          v-on:blur="onClickOutside"
          ref="focus"
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
      showInputBox: false,
      todo: {
        description: '',
        complete: false,
        userId: '',
      },
    };
  },
  methods: {
    toggleDropdown() {
      if (this.showDropdown) {
        this.showDropdown = false;
      } else if (this.showDropdown == false) {
        this.showDropdown = true;
      }
    },
    toggleInputBox() {
      if (this.showInputBox) {
        this.showInputBox = false;
      } else if (this.showInputBox == false) {
        this.showInputBox = true;
      }
    },
    onClickOutside() {
      this.showInputBox = false;
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
</style>
