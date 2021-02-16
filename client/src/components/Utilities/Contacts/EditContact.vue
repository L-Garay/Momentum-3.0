<template>
  <div class="detailsWrapper">
    <div class="detailsBody">
      <div class="detailsRow1">
        <div class="firstNameWrapper">
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
            <i
              @click="cancelEditing('firstName')"
              class="far fa-times-circle"
            ></i>
          </div>
          <div
            v-else-if="hasEdited.firstName == true && edit.firstName == false"
            class="editedFirstName"
          >
            <p>{{ newContact.firstName }}</p>
            <i @click="switchEdit('firstName')" class="fas fa-edit fa-xs"></i>
          </div>
        </div>
        <div class="lastNameWrapper">
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
            /><i
              @click="cancelEditing('lastName')"
              class="far fa-times-circle"
            ></i>
          </div>
          <div
            v-else-if="hasEdited.lastName == true && edit.lastName == false"
            class="editedLastName"
          >
            <p>{{ newContact.lastName }}</p>
            <i @click="switchEdit('lastName')" class="fas fa-edit fa-xs"></i>
          </div>
        </div>
      </div>
      <div class="detailsRow2">
        <div class="phoneWrapper">
          <div
            v-if="
              contactData.phone &&
                edit.phone == false &&
                hasEdited.phone == false
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
            /><i
              @click="cancelEditing('phone')"
              class="far fa-times-circle"
            ></i>
          </div>
          <div
            v-else-if="hasEdited.phone == true && edit.phone == false"
            class="editedPhone"
          >
            <p>{{ newContact.phone }}</p>
            <i @click="switchEdit('phone')" class="fas fa-edit fa-xs"></i>
          </div>
        </div>
        <div class="emailWrapper">
          <div
            v-if="
              contactData.email &&
                edit.email == false &&
                hasEdited.email == false
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
            /><i
              @click="cancelEditing('email')"
              class="far fa-times-circle"
            ></i>
          </div>
          <div
            v-else-if="hasEdited.email == true && edit.email == false"
            class="editedEmail"
          >
            <p>{{ newContact.email }}</p>
            <i @click="switchEdit('email')" class="fas fa-edit fa-xs"></i>
          </div>
        </div>
      </div>
      <div class="detailsRow3">
        <div class="addressWrapper">
          <div
            v-if="
              contactData.address &&
                edit.address == false &&
                hasEdited.address == false
            "
            class="address"
          >
            <p>{{ contactData.address }},</p>
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
            /><i
              @click="cancelEditing('address')"
              class="far fa-times-circle"
            ></i>
          </div>
          <div
            v-else-if="hasEdited.address == true && edit.address == false"
            class="editedAddress"
          >
            <p>{{ newContact.address }},</p>
            <i @click="switchEdit('address')" class="fas fa-edit fa-xs"></i>
          </div>
        </div>
        <div class="cityWrapper">
          <div
            v-if="
              contactData.city && edit.city == false && hasEdited.city == false
            "
            class="city"
          >
            <p>{{ contactData.city }},</p>
            <i @click="switchEdit('city')" class="fas fa-edit fa-xs"></i>
          </div>
          <div
            v-else-if="contactData.city && edit.city == true"
            class="cityEdit"
          >
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
            /><i @click="cancelEditing('city')" class="far fa-times-circle"></i>
          </div>
          <div
            v-else-if="hasEdited.city == true && edit.city == false"
            class="editedCity"
          >
            <p>{{ newContact.city }}</p>
            <i @click="switchEdit('city')" class="fas fa-edit fa-xs"></i>
          </div>
        </div>
        <div class="stateWrapper">
          <div
            v-if="
              contactData.state &&
                edit.state == false &&
                hasEdited.city == false
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
            /><i
              @click="cancelEditing('state')"
              class="far fa-times-circle"
            ></i>
          </div>
          <div
            v-else-if="hasEdited.state == true && edit.state == false"
            class="editedState"
          >
            <p>{{ newContact.state }}</p>
            <i @click="switchEdit('state')" class="fas fa-edit fa-xs"></i>
          </div>
        </div>
        <div class="zipWrapper">
          <div
            v-if="
              contactData.zip && edit.zip == false && hasEdited.zip == false
            "
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
            /><i @click="cancelEditing('zip')" class="far fa-times-circle"></i>
          </div>
          <div
            v-else-if="hasEdited.zip == true && edit.zip == false"
            class="editedZip"
          >
            <p>{{ newContact.zip }}</p>
            <i @click="switchEdit('zip')" class="fas fa-edit fa-xs"></i>
          </div>
        </div>
      </div>
      <div class="detailsRow4">
        <div class="notesWrapper">
          <div
            v-if="
              contactData.notes &&
                edit.notes == false &&
                hasEdited.notes == false
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
            <textarea
              id="NotesTextArea"
              cols="55"
              rows="7"
              v-model="newContact.notes"
              v-on:keyup.enter="finishEditing('notes')"
            ></textarea
            ><i @click="cancelEditing('notes')" class="far fa-times-circle"></i>
          </div>
          <div
            v-else-if="hasEdited.notes == true && edit.notes == false"
            class="editedNotes notes"
          >
            <p>{{ newContact.notes }}</p>
            <i @click="switchEdit('notes')" class="fas fa-edit fa-xs"></i>
          </div>
        </div>
      </div>
      <div class="detailsRow5">
        <add-to-contact
          :contactData="newContact"
          :property="hasProperty"
          @added="addedProperty"
        />
      </div>
    </div>
    <div class="detailsFooter">
      <div class="detailsRow6">
        <div class="buttons">
          <div class="backButton">
            <button
              class="btn btn-secondary"
              type="button"
              @click="stopEditing"
            >
              Cancel
            </button>
          </div>
          <div class="submitButton">
            <button
              id="confirmBtn"
              class="btn btn-primary"
              type="button"
              @click="updateContact"
            >
              Confirm
            </button>
          </div>
        </div>
        <div class="reminder">
          <p v-show="disabled == false">
            <small>**Don't forget to confirm your changes**</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
import AddToContact from '@/components/Utilities/Contacts/AddToContact.vue';
export default {
  name: 'EditContactComponent',
  props: ['contactData'],
  components: {
    AddToContact,
  },
  data() {
    return {
      newContact: { ...this.contactData },
      hasProperty: {
        lastName: false,
        phone: false,
        email: false,
        address: false,
        city: false,
        state: false,
        zip: false,
        notes: false,
      },
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
      disabled: true,
    };
  },
  mounted() {
    document.getElementById('confirmBtn').disabled = true;
    this.checkForProperties();
  },
  computed: {},
  methods: {
    checkForProperties() {
      if (this.contactData.lastName) {
        this.hasProperty.lastName = true;
      }
      if (this.contactData.phone) {
        this.hasProperty.phone = true;
      }
      if (this.contactData.email) {
        this.hasProperty.email = true;
      }
      if (this.contactData.address) {
        this.hasProperty.address = true;
      }
      if (this.contactData.city) {
        this.hasProperty.city = true;
      }
      if (this.contactData.state) {
        this.hasProperty.state = true;
      }
      if (this.contactData.zip) {
        this.hasProperty.zip = true;
      }
      if (this.contactData.notes) {
        this.hasProperty.notes = true;
      }
    },
    stopEditing() {
      this.$emit('stopEditing');
      this.newContact = { ...this.contactData };
      document.getElementById('confirmBtn').disabled = false;
      this.disabled = false;
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
    cancelEditing(field) {
      switch (field) {
        case 'firstName':
          this.edit.firstName = false;
          break;
        case 'lastName':
          this.edit.lastName = false;
          break;
        case 'phone':
          this.edit.phone = false;
          break;
        case 'email':
          this.edit.email = false;
          break;
        case 'address':
          this.edit.address = false;
          break;
        case 'city':
          this.edit.city = false;
          break;
        case 'state':
          this.edit.state = false;
          break;
        case 'zip':
          this.edit.zip = false;
          break;
        case 'notes':
          this.edit.notes = false;
          break;

        default:
          this.editContact = false;
          break;
      }
    },
    finishEditing(field) {
      switch (field) {
        case 'firstName':
          if (this.newContact.firstName) {
            this.hasEdited.firstName = true;
            this.edit.firstName = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'lastName':
          if (this.newContact.lastName) {
            this.hasEdited.lastName = true;
            this.edit.lastName = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'phone':
          if (this.newContact.phone) {
            this.hasEdited.phone = true;
            this.edit.phone = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'email':
          if (this.newContact.email) {
            this.hasEdited.email = true;
            this.edit.email = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'address':
          if (this.newContact.address) {
            this.hasEdited.address = true;
            this.edit.address = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'city':
          if (this.newContact.city) {
            this.hasEdited.city = true;
            this.edit.city = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'state':
          if (this.newContact.state) {
            this.hasEdited.state = true;
            this.edit.state = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'zip':
          if (this.newContact.zip) {
            this.hasEdited.zip = true;
            this.edit.zip = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'notes':
          if (this.newContact.notes) {
            this.hasEdited.notes = true;
            this.edit.notes = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        default:
          this.editContact = false;
          break;
      }
    },
    addedProperty(newContact) {
      this.newContact = newContact;
      document.getElementById('confirmBtn').disabled = false;
      this.disabled = false;
    },
    updateContact() {
      this.$store.dispatch('updateContact', this.newContact);
      this.$emit('newContact', this.newContact);
      this.$emit('hasConfirmed');
      this.$emit('stopEditing');
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 8px;
}
div.detailsBody {
  height: 300px;
}
div.detailsFooter {
  height: 55px;
}
div.detailsRow1 {
  display: flex;
  font-size: 33px;
}
div.detailsRow1 div.lastName {
  margin-left: 10px;
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
  font-size: 25px;
}
div.detailsRow2 div.email {
  margin-left: 45px;
}

div.detailsRow3 {
  display: flex;
  font-size: 20px;
  margin-bottom: 2px;
}
div.detailsRow3 div.city,
div.detailsRow3 div.state,
div.detailsRow3 div.zip {
  margin-left: 5px;
}
div.notes {
  height: 163px;
  overflow-y: auto;
  background-color: rgba(116, 116, 116, 0.534);
  text-align: start;
  font-size: 13px;
}
textarea {
  font-size: 14px;
}
div.detailsFooter {
  padding-top: 15px;
}
div.detailsRow6 {
  justify-content: center;
}
div.buttons {
  display: flex;
  justify-content: center;
}
button.btn {
  margin: 0 5px;
}
</style>
