<template>
  <div class="momentum-settings">
    <div class="dropdown">
      <button @click="settings()" class="dropbtn btn btn-dark btn-sm">
        Settings
      </button>
      <div id="myDropdown" class="dropdown-content">
        <a href="#photo"
          >Photos <button>Choose</button><button>New</button
          ><button>Save</button></a
        >
        <a href="#quote">Quotes <button>New</button><button>Save</button></a>
        <a href="#time"
          >Time <button>Standard</button><button>Military</button></a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "momentum-settings",
  methods: {
    settings() {
      document.getElementById("myDropdown").classList.toggle("show");
    }
  }
};
</script>

<style>
.dropbtn {
  padding: 6px;
  border-radius: 5px;
  cursor: pointer;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 221px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  font-size: 12px;
}
button {
  margin-right: 2px;
  margin-left: 2px;
  font-size: 12px;
}
.dropdown a:hover {
  background-color: #ddd;
}
.show {
  display: block;
}
</style>