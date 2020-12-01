<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Saved Photos</h3>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="container-fluid">
                <div class="row">
                  <div
                    class="col-4 image"
                    v-for="photo in savedPhotos"
                    :key="photo.id"
                  >
                    <img
                      :src="photo.urls.thumbUrl"
                      alt="should be small"
                      @click="selectPhoto(photo._id)"
                    />
                    <button @click="deletePhoto(photo._id)">
                      Delete Me
                    </button>
                  </div>
                </div>
              </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PictureModal',
  mounted() {
    this.$store.dispatch('getSavedPhotosByUserId', this.$store.state.user.id);
  },
  computed: {
    savedPhotos() {
      return this.$store.state.savedPhotos;
    },
  },
  methods: {
    selectPhoto(id) {
      this.$store.dispatch('getPhotoById', id);
    },
    deletePhoto(id) {
      this.$store.dispatch('deletePhotoById', id);
    },
  },
};
</script>

<style scoped>
.image {
  text-align: center;
  margin-bottom: 10px;
}
img {
  height: 123px;
  width: 185px;
  cursor: pointer;
  padding-bottom: 10px;
}

/* Modal styles */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 750px;
  height: 600px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: black;
}

.modal-body {
  max-height: 400px;
  max-width: 690px;
  margin: 20px 0;
  overflow-y: auto;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
