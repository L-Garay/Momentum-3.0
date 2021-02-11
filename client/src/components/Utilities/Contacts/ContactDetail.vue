<template>
  <div v-if="editContact == false" class="detailsWrapper">
    <div class="detailsRow1">
      <div class="firstName">
        <p>{{ contactData.firstName }}</p>
      </div>
      <div v-if="contactData.lastName" class="lastName">
        <p>{{ contactData.lastName }}</p>
      </div>
    </div>
    <div class="detailsRow2">
      <div v-if="contactData.phone" class="phone">
        <p>{{ contactData.phone }}</p>
      </div>
      <div v-if="contactData.email" class="email">
        <p>{{ contactData.email }}</p>
      </div>
    </div>
    <div class="detailsRow3">
      <div v-if="contactData.address" class="address">
        <p>{{ contactData.address }}</p>
      </div>
      <div v-if="contactData.city" class="city">
        <p>{{ contactData.city }},</p>
      </div>
      <div v-if="contactData.state" class="state">
        <p>{{ contactData.state }}</p>
      </div>
      <div v-if="contactData.city" class="zip">
        <p>({{ contactData.zip }})</p>
      </div>
    </div>
    <div class="detailsRow4">
      <div v-if="contactData.notes" class="notes">
        <p>{{ contactData.notes }}</p>
      </div>
    </div>
    <div class="detailsRow5">
      <div class="backButton">
        <button class="btn btn-secondary" type="button" @click="back">
          Back
        </button>
      </div>
      <div class="editButton">
        <button class="btn btn-primary" type="button" @click="toggleEdit">
          Edit
        </button>
      </div>
    </div>
  </div>
  <div v-else class="detailsWrapper">
    <div class="detailsRow1">
      <div
        v-if="edit.firstName == false && hasEdited.firstName == false"
        class="firstName"
      >
        <p>{{ contactData.firstName }}</p>
        <i @click="switchEdit('firstName')" class="fas fa-edit fa-xs"></i>
      </div>
      <div v-else-if="edit.firstName == true" class="firstNameEdit">
        <input
          type="text"
          ref="focusFirstName"
          v-model="newContact.firstName"
          v-on:keyup.enter="finishEditing('firstName')"
          v-autowidth="{
            maxWidth: '140px',
            minWidth: '80px',
            comfortZone: 5,
          }"
        />
      </div>
      <div
        v-else-if="hasEdited.firstName == true && edit.firstName == false"
        class="editedFirstName"
      >
        <p>{{ newContact.firstName }}</p>
        <i @click="switchEdit('firstName')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-if="
          contactData.lastName &&
            edit.lastName == false &&
            hasEdited.lastName == false
        "
        class="lastName"
      >
        <p>{{ contactData.lastName }}</p>
        <i @click="switchEdit('lastName')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-else-if="contactData.lastName && edit.lastName == true"
        class="lastNameEdit"
      >
        <input
          type="text"
          ref="focusLastName"
          v-model="newContact.lastName"
          v-on:keyup.enter="finishEditing('lastName')"
          v-autowidth="{
            maxWidth: '140px',
            minWidth: '80px',
            comfortZone: 5,
          }"
        />
      </div>
      <div
        v-else-if="hasEdited.lastName == true && edit.lastName == false"
        class="editedLastName"
      >
        <p>{{ newContact.lastName }}</p>
        <i @click="switchEdit('lastName')" class="fas fa-edit fa-xs"></i>
      </div>
    </div>
    <div class="detailsRow2">
      <div
        v-if="
          contactData.phone && edit.phone == false && hasEdited.phone == false
        "
        class="phone"
      >
        <p>{{ contactData.phone }}</p>
        <i @click="switchEdit('phone')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-else-if="contactData.phone && edit.phone == true"
        class="phoneEdit"
      >
        <input
          type="text"
          ref="focusPhone"
          v-model="newContact.phone"
          v-on:keyup.enter="finishEditing('phone')"
          v-autowidth="{
            maxWidth: '140px',
            minWidth: '80px',
            comfortZone: 5,
          }"
        />
      </div>
      <div
        v-else-if="hasEdited.phone == true && edit.phone == false"
        class="editedPhone"
      >
        <p>{{ newContact.phone }}</p>
        <i @click="switchEdit('phone')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-if="
          contactData.email && edit.email == false && hasEdited.email == false
        "
        class="email"
      >
        <p>{{ contactData.email }}</p>
        <i @click="switchEdit('email')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-else-if="contactData.email && edit.email == true"
        class="emailEdit"
      >
        <input
          type="text"
          ref="focusEmail"
          v-model="newContact.email"
          v-on:keyup.enter="finishEditing('email')"
          v-autowidth="{
            maxWidth: '140px',
            minWidth: '80px',
            comfortZone: 5,
          }"
        />
      </div>
      <div
        v-else-if="hasEdited.email == true && edit.email == false"
        class="editedEmail"
      >
        <p>{{ newContact.email }}</p>
        <i @click="switchEdit('email')" class="fas fa-edit fa-xs"></i>
      </div>
    </div>
    <div class="detailsRow3">
      <div
        v-if="
          contactData.address &&
            edit.address == false &&
            hasEdited.address == false
        "
        class="address"
      >
        <p>{{ contactData.address }}</p>
        <i @click="switchEdit('address')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-else-if="contactData.address && edit.address == true"
        class="phoneEdit"
      >
        <input
          type="text"
          ref="focusAddress"
          v-model="newContact.address"
          v-on:keyup.enter="finishEditing('address')"
          v-autowidth="{
            maxWidth: '140px',
            minWidth: '80px',
            comfortZone: 5,
          }"
        />
      </div>
      <div
        v-else-if="hasEdited.address == true && edit.address == false"
        class="editedAddress"
      >
        <p>{{ newContact.address }}</p>
        <i @click="switchEdit('address')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-if="contactData.city && edit.city == false && hasEdited.city == false"
        class="city"
      >
        <p>{{ contactData.city }},</p>
        <i @click="switchEdit('city')" class="fas fa-edit fa-xs"></i>
      </div>
      <div v-else-if="contactData.city && edit.city == true" class="cityEdit">
        <input
          type="text"
          ref="focusCity"
          v-model="newContact.city"
          v-on:keyup.enter="finishEditing('city')"
          v-autowidth="{
            maxWidth: '140px',
            minWidth: '80px',
            comfortZone: 5,
          }"
        />
      </div>
      <div
        v-else-if="hasEdited.city == true && edit.city == false"
        class="editedCity"
      >
        <p>{{ newContact.city }}</p>
        <i @click="switchEdit('city')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-if="
          contactData.state && edit.state == false && hasEdited.city == false
        "
        class="state"
      >
        <p>{{ contactData.state }}</p>
        <i @click="switchEdit('state')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-else-if="contactData.state && edit.state == true"
        class="stateEdit"
      >
        <input
          type="text"
          ref="focusState"
          v-model="newContact.state"
          v-on:keyup.enter="finishEditing('state')"
          v-autowidth="{
            maxWidth: '140px',
            minWidth: '80px',
            comfortZone: 5,
          }"
        />
      </div>
      <div
        v-else-if="hasEdited.state == true && edit.state == false"
        class="editedState"
      >
        <p>{{ newContact.state }}</p>
        <i @click="switchEdit('state')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-if="contactData.zip && edit.zip == false && hasEdited.zip == false"
        class="zip"
      >
        <p>({{ contactData.zip }})</p>
        <i @click="switchEdit('zip')" class="fas fa-edit fa-xs"></i>
      </div>
      <div v-else-if="contactData.zip && edit.zip == true" class="zipEdit">
        <input
          type="text"
          ref="focusZip"
          v-model="newContact.zip"
          v-on:keyup.enter="finishEditing('zip')"
          v-autowidth="{
            maxWidth: '140px',
            minWidth: '80px',
            comfortZone: 5,
          }"
        />
      </div>
      <div
        v-else-if="hasEdited.zip == true && edit.zip == false"
        class="editedZip"
      >
        <p>{{ newContact.zip }}</p>
        <i @click="switchEdit('zip')" class="fas fa-edit fa-xs"></i>
      </div>
    </div>
    <div class="detailsRow4">
      <div
        v-if="
          contactData.notes && edit.notes == false && hasEdited.notes == false
        "
        class="notes"
      >
        <p>{{ contactData.notes }}</p>
        <i @click="switchEdit('notes')" class="fas fa-edit fa-xs"></i>
      </div>
      <div
        v-else-if="contactData.notes && edit.notes == true"
        class="notesEdit"
      >
        <!-- <input
          type="text"
          ref="focusNotes"
          v-model="newContact.notes"
          v-on:keyup.enter="finishEditing('notes')"
          v-autowidth="{
            maxWidth: '140px',
            minWidth: '80px',
            comfortZone: 5,
          }"
        /> -->
        <textarea
          id="NotesTextArea"
          rows="3"
          v-model="newContact.notes"
        ></textarea>
      </div>
      <div
        v-else-if="hasEdited.notes == true && edit.notes == false"
        class="editedNotes"
      >
        <p>{{ newContact.notes }}</p>
        <i @click="switchEdit('notes')" class="fas fa-edit fa-xs"></i>
      </div>
    </div>
    <div class="detailsRow5">
      <div class="backButton">
        <button class="btn btn-secondary" type="button" @click="toggleEdit">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'ContactDetailComponent',
  props: ['contactData'],
  data() {
    return {
      newContact: { ...this.contactData },
      editContact: false,
      edit: {
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        address: false,
        city: false,
        state: false,
        zip: false,
        notes: false,
      },
      hasEdited: {
        firstName: false,
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
  computed: {},
  methods: {
    back() {
      this.$emit('back');
    },
    toggleEdit() {
      this.editContact = !this.editContact;
    },
    switchEdit(field) {
      switch (field) {
        case 'firstName':
          this.edit.firstName = true;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.city = false;
          this.edit.state = false;
          this.edit.zip = false;
          this.edit.notes = false;
          break;
        case 'lastName':
          this.edit.firstName = false;
          this.edit.lastName = true;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.city = false;
          this.edit.state = false;
          this.edit.zip = false;
          this.edit.notes = false;
          break;
        case 'phone':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = true;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.city = false;
          this.edit.state = false;
          this.edit.zip = false;
          this.edit.notes = false;
          break;
        case 'email':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = true;
          this.edit.address = false;
          this.edit.city = false;
          this.edit.state = false;
          this.edit.zip = false;
          this.edit.notes = false;
          break;
        case 'address':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = true;
          this.edit.city = false;
          this.edit.state = false;
          this.edit.zip = false;
          this.edit.notes = false;
          break;
        case 'city':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.city = true;
          this.edit.state = false;
          this.edit.zip = false;
          this.edit.notes = false;
          break;
        case 'state':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.city = false;
          this.edit.state = true;
          this.edit.zip = false;
          this.edit.notes = false;
          break;
        case 'zip':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.city = false;
          this.edit.state = false;
          this.edit.zip = true;
          this.edit.notes = false;
          break;
        case 'notes':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.city = false;
          this.edit.state = false;
          this.edit.zip = false;
          this.edit.notes = true;
          break;

        default:
          this.editContact = false;
          break;
      }
    },
    finishEditing(field) {
      switch (field) {
        case 'firstName':
          this.hasEdited.firstName = true;
          this.edit.firstName = false;
          break;
        case 'lastName':
          this.hasEdited.lastName = true;
          this.edit.lastName = false;
          break;
        case 'phone':
          this.hasEdited.phone = true;
          this.edit.phone = false;
          break;
        case 'email':
          this.hasEdited.email = true;
          this.edit.email = false;
          break;
        case 'address':
          this.hasEdited.address = true;
          this.edit.address = false;
          break;
        case 'city':
          this.hasEdited.city = true;
          this.edit.city = false;
          break;
        case 'state':
          this.hasEdited.state = true;
          this.edit.state = false;
          break;
        case 'zip':
          this.hasEdited.zip = true;
          this.edit.zip = false;
          break;
        case 'notes':
          this.hasEdited.notes = true;
          this.edit.notes = false;
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
div.detailsRow1 {
  display: flex;
  font-size: 36px;
}
div.detailsRow1 div.lastName {
  margin-left: 7px;
}
div.firstName,
div.lastName,
div.phone,
div.email,
div.address,
div.city,
div.state,
div.zip,
div.notes {
  display: flex;
}
div.firstName i,
div.lastName i {
  font-size: 12px;
}
div.phone i,
div.email i {
  font-size: 10px;
}
div.address i,
div.city i,
div.state i,
div.zip i {
  font-size: 9px;
}
div.notes i {
  font-size: 6px;
}

div.detailsRow2 {
  display: flex;
  font-size: 26px;
}
div.detailsRow2 div.email {
  margin-left: 45px;
}

div.detailsRow3 {
  display: flex;
  font-size: 21px;
}
div.detailsRow3 div.city,
div.detailsRow3 div.state,
div.detailsRow3 div.zip {
  margin-left: 5px;
}

div.detailsRow5 {
  display: flex;
  justify-content: center;
}
</style>
