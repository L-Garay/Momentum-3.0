<template>
  <div class="optionsWrapper">
    <div class="optionsColumn1">
      <div v-if="HasProperty.lastName == false" class="option">
        <p><small @click="toggleAdd('lastName')">Add Last Name</small></p>
        <div v-if="added.lastName == false" class="inputWrapper">
          <input
            type="text"
            ref="focusLastName"
            v-model="newContact.lastName"
            v-on:keyup.enter="finishAdding('lastName')"
            v-autowidth="{
              maxWidth: '120px',
              minWidth: '100px',
              comfortZone: 5,
            }"
          />
        </div>
        <div v-else class="addedProperty">
          <p>{{ newContact.lastName }}</p>
        </div>
      </div>
      <div v-if="HasProperty.phone == false" class="option">
        <p><small @click="toggleAdd('phone')">Add Phone</small></p>
        <div v-if="added.phone == false" class="inputWrapper">
          <input
            type="text"
            ref="focusPhone"
            v-model="newContact.phone"
            v-on:keyup.enter="finishAdding('phone')"
            v-autowidth="{
              maxWidth: '120px',
              minWidth: '100px',
              comfortZone: 5,
            }"
          />
        </div>
        <div v-else class="addedProperty">
          <p>{{ newContact.phone }}</p>
        </div>
      </div>
      <div v-if="HasProperty.email == false" class="option">
        <p><small @click="toggleAdd('email')">Add Email</small></p>
        <div v-if="added.email == false" class="inputWrapper">
          <input
            type="text"
            ref="focusEmail"
            v-model="newContact.email"
            v-on:keyup.enter="finishAdding('email')"
            v-autowidth="{
              maxWidth: '160px',
              minWidth: '100px',
              comfortZone: 5,
            }"
          />
        </div>
        <div v-else class="addedProperty">
          <p>{{ newContact.email }}</p>
        </div>
      </div>
      <div v-if="HasProperty.notes == false" class="option">
        <p><small @click="toggleAdd('notes')">Add Notes</small></p>
        <div v-if="added.notes == false" class="textAreaWrapper">
          <textarea
            id="addNotesTextArea"
            ref="focusNotes"
            rows="3"
            v-model="newContact.notes"
            v-on:keyup.enter="finishAdding('notes')"
          ></textarea>
        </div>
        <div v-else class="addedProperty">
          <p>{{ newContact.notes }}</p>
        </div>
      </div>
    </div>
    <div class="optionsColumn2">
      <div v-if="HasProperty.address == false" class="option">
        <p><small @click="toggleAdd('address')">Add Address</small></p>
        <div v-if="added.address == false" class="inputWrapper">
          <input
            type="text"
            ref="focusAddress"
            v-model="newContact.address"
            v-on:keyup.enter="finishAdding('address')"
            v-autowidth="{
              maxWidth: '120px',
              minWidth: '100px',
              comfortZone: 5,
            }"
          />
        </div>
        <div v-else class="addedProperty">
          <p>{{ newContact.address }}</p>
        </div>
      </div>
      <div v-if="HasProperty.city == false" class="option">
        <p><small @click="toggleAdd('city')">Add City</small></p>
        <div v-if="added.city == false" class="inputWrapper">
          <input
            type="text"
            ref="focusCity"
            v-model="newContact.city"
            v-on:keyup.enter="finishAdding('city')"
            v-autowidth="{
              maxWidth: '120px',
              minWidth: '100px',
              comfortZone: 5,
            }"
          />
        </div>
        <div v-else class="addedProperty">
          <p>{{ newContact.city }}</p>
        </div>
      </div>
      <div v-if="HasProperty.state == false" class="option">
        <p><small @click="toggleAdd('state')">Add State</small></p>
        <div v-if="added.state == false" class="inputWrapper">
          <input
            type="text"
            ref="focusState"
            v-model="newContact.state"
            v-on:keyup.enter="finishAdding('state')"
            v-autowidth="{
              maxWidth: '120px',
              minWidth: '100px',
              comfortZone: 5,
            }"
          />
        </div>
        <div v-else class="addedProperty">
          <p>{{ newContact.state }}</p>
        </div>
      </div>
      <div v-if="HasProperty.zip == false" class="option">
        <p><small @click="toggleAdd('zip')">Add Zip</small></p>
        <div v-if="added.zip == false" class="inputWrapper">
          <input
            type="text"
            ref="focusZip"
            v-model="newContact.zip"
            v-on:keyup.enter="finishAdding('zip')"
            v-autowidth="{
              maxWidth: '120px',
              minWidth: '100px',
              comfortZone: 5,
            }"
          />
        </div>
        <div v-else class="addedProperty">
          <p>{{ newContact.zip }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'AddToContactComponent',
  props: ['contactData', 'property'],
  data() {
    return {
      newContact: { ...this.contactData },
      added: {
        lastName: false,
        phone: false,
        email: false,
        address: false,
        city: false,
        state: false,
        zip: false,
        notes: false,
      },
    };
  },
  mounted() {},
  computed: {
    HasProperty() {
      return this.property;
    },
  },
  methods: {
    toggleAdd(field) {
      switch (field) {
        case 'lastName':
          this.$nextTick(() => this.$refs.focusLastName.focus());
          break;
        case 'phone':
          this.$nextTick(() => this.$refs.focusPhone.focus());
          break;
        case 'email':
          this.$nextTick(() => this.$refs.focusEmail.focus());
          break;
        case 'address':
          this.$nextTick(() => this.$refs.focusAddress.focus());
          break;
        case 'city':
          this.$nextTick(() => this.$refs.focusCity.focus());
          break;
        case 'state':
          this.$nextTick(() => this.$refs.focusState.focus());
          break;
        case 'zip':
          this.$nextTick(() => this.$refs.focusZip.focus());
          break;
        case 'notes':
          this.$nextTick(() => this.$refs.focusNotes.focus());
          break;

        default:
          this.editContact = false;
          break;
      }
    },
    finishAdding(field) {
      switch (field) {
        case 'lastName':
          if (this.newContact.lastName) {
            this.added.lastName = true;
            this.$emit('added', this.newContact);
          }
          break;
        case 'phone':
          if (this.newContact.phone) {
            this.added.phone = true;
            this.$emit('added', this.newContact);
          }

          break;
        case 'email':
          if (this.newContact.email) {
            this.added.email = true;
            this.$emit('added', this.newContact);
          }

          break;
        case 'address':
          if (this.newContact.address) {
            this.added.address = true;
            this.$emit('added', this.newContact);
          }

          break;
        case 'city':
          if (this.newContact.city) {
            this.added.city = true;
            this.$emit('added', this.newContact);
          }

          break;
        case 'state':
          if (this.newContact.state) {
            this.added.state = true;
            this.$emit('added', this.newContact);
          }

          break;
        case 'zip':
          if (this.newContact.zip) {
            this.added.zip = true;
            this.$emit('added', this.newContact);
          }

          break;
        case 'notes':
          if (this.newContact.notes) {
            this.added.notes = true;
            this.$emit('added', this.newContact);
          }

          break;

        default:
          this.editContact = false;
          break;
      }
    },
  },
};
</script>

<style scoped>
div.optionsWrapper {
  display: flex;
}
div.optionsColumn2 {
  margin-left: 20px;
}
div.option {
  display: flex;
}
div.option p {
  margin-bottom: 0;
  width: 80px;
  text-align: start;
}
div.inputWrapper {
  height: 35px;
  width: 110px;
}
div.textAreaWrapper {
  height: 80px;
  width: 170px;
}
</style>
