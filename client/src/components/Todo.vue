<template>
  <div class="todoList">
    <div class="toggleBtn">
      <h5 @click="toggleDropdown">Todos</h5>
    </div>
    <div v-if="showDropdown" id="todoDropdown">
      <div class="content">
        <p>content will go here</p>
        <p>more content</p>
        <p>even more content</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  data() {
    return {
      showDropdown: false,
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
  },
};
</script>

<style scoped>
.todoList {
  position: relative;
  display: inline-block;
}
h5 {
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
}
</style>
