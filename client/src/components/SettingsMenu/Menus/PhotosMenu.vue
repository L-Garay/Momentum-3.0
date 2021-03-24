<template>
  <div class="photosMenuComponent">
    <div class="content">
      <div class="header">
        <div class="topRow">
          <div class="title">
            <h3>Photos</h3>
            <p>
              Get a new photo everytime you 'log in', or you can save your
              favorites and select which one you want to view for that session.
              Coming soon: you will be able to upload your own photos and select
              them whenever you want!
            </p>
          </div>
          <div class="uploadPhotoSection">
            <button class="btn" disabled>Upload Photo +</button>
          </div>
        </div>
        <div class="bottomRow">
          <div class="buttonControls">
            <button @click="getNewPhoto">Get New Photo</button>
            <button @click="savePhoto">Save Photo</button>
            <button @click="switchPhotos('saved')">Choose Photo</button>
            <button @click="switchPhotos('uploaded')">My Uploads</button>
          </div>
        </div>
      </div>
      <div class="mainSection">
        <div class="savedPhotosSection" id="test" v-if="show.savedPhotos">
          <h5 v-if="this.$store.state.photo.savedPhotos.length == 0">
            No saved photos yet, save some and you'll find them here!
          </h5>
          <div
            v-else
            class="image"
            v-for="photo in savedPhotos"
            :key="photo.id"
          >
            <img
              :src="photo.urls.thumbUrl"
              alt="should be small image"
              @click="selectPhoto(photo._id)"
            />
            <i class="fas fa-trash-alt" @click="deletePhoto(photo._id)"></i>
          </div>
        </div>
        <!-- NOTE Need to setup uploading photos -->
        <div class="savedPhotosSection" v-if="show.uploadedPhotos">
          <h5>
            No uploaded photos yet, add some and you'll find them here!
          </h5>
          <!-- <div
            v-else
            class="image"
            v-for="photo in savedPhotos"
            :key="photo.id"
          >
            <img
              :src="photo.urls.thumbUrl"
              alt="should be small image"
              @click="selectPhoto(photo._id)"
            />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotosMenuComponent',
  data() {
    return {
      show: {
        savedPhotos: true,
        uploadedPhotos: false,
      },
    };
  },
  mounted() {
    this.$store.dispatch(
      'getSavedPhotosByUserId',
      this.$store.state.user.user.id
    );
    setTimeout(() => {
      let test = document.getElementById('test');
      test.addEventListener(
        'mouseover',
        function(event) {
          event.target.style.color = 'red';
        },
        false
      );
      test.addEventListener(
        'mouseout',
        function(event) {
          event.target.style.color = 'transparent';
        },
        false
      );
    }, 1000);
  },
  computed: {
    savedPhotos() {
      return this.$store.state.photo.savedPhotos;
    },
  },
  methods: {
    getNewPhoto() {
      this.$store.dispatch('getPhoto');
    },
    savePhoto() {
      let savedPhoto = {
        id: this.$store.state.photo.photo.id,
        width: this.$store.state.photo.photo.width,
        height: this.$store.state.photo.photo.height,
        urls: {
          fullUrl: this.$store.state.photo.photo.urls.full,
          regular: this.$store.state.photo.photo.urls.regular,
          thumbUrl: this.$store.state.photo.photo.urls.thumb,
        },
        download_location: this.$store.state.photo.photo.links
          .download_location,
        userName: this.$store.state.photo.photo.user.username,
        name: this.$store.state.photo.photo.user.name,
        unsplashLink: this.$store.state.photo.photo.links.html,
        userId: this.$store.state.user.user.id,
      };
      this.$store.dispatch('savePhoto', savedPhoto);
    },
    selectPhoto(id) {
      this.$store.dispatch('getPhotoById', id);
    },
    deletePhoto(id) {
      this.$store.dispatch('deletePhotoById', id);
    },
    switchPhotos(type) {
      if (type === 'saved') {
        this.show.savedPhotos = true;
        this.show.uploadedPhotos = false;
      } else if (type === 'uploaded') {
        this.show.savedPhotos = false;
        this.show.uploadedPhotos = true;
      }
    },
  },
};
</script>

<style scoped>
div.photosMenuComponent {
  height: 395px;
  width: 515px;
}
div.content {
  height: 385px;
  width: 505px;
  margin-left: auto;
  margin-top: 5px;
  color: white;
}

div.topRow {
  display: flex;
}
div.title p {
  font-size: 13px;
  margin-top: 10px;
  margin-bottom: 10px;
}
div.uploadPhotoSection {
  position: relative;
}
div.uploadPhotoSection button {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 12px;
  background-color: white;
  border: 1pt solid black;
  border-radius: 6px 6px 6px 6px;
  width: 110px;
  padding: 4px 6px;
}
div.bottomRow {
  text-align: center;
  position: relative;
}
div.bottomRow::after {
  position: absolute;
  content: '';
  width: 85%;
  height: 2px;
  right: 40px;
  background: white;
}
div.buttonControls {
  margin-bottom: 10px;
}
div.buttonControls button {
  margin: 0 5px;
  font-size: 12px;
  background-color: white;
  border: 1pt solid black;
  border-radius: 6px 6px 6px 6px;
  padding: 4px 6px;
}
div.mainSection {
  max-height: 240px;
  overflow-y: auto;
}
div.mainSection::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: rgb(90, 90, 90);
}
div.mainSection::-webkit-scrollbar-thumb {
  background: goldenrod;
}
div.savedPhotosSection {
  display: flex;
  width: 500px;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 7px;
}
div.savedPhotosSection h5 {
  text-align: center;
  margin-top: 70px;
}
div.image {
  margin-top: 7px;
  position: relative;
  margin-bottom: 7px;
}
img {
  height: 100px;
  width: 145px;
  cursor: pointer;
  /* padding-bottom: 10px; */
}
img:hover {
  box-shadow: 0px 0px 10px white;
}
div.image i {
  position: absolute;
  right: 5px;
  top: 5px;
  color: transparent;
}
div.image i:hover {
  cursor: pointer;
}
</style>
