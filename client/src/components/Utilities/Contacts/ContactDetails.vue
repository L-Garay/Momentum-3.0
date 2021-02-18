<template>
  <div
    class="detailsWrapper"
    v-if="editContact == false && straightToEdit == false"
  >
    <div class="detailsBody">
      <div class="detailsColumn1">
        <div class="namesWrapper">
          <div class="firstNameWrapper">
            <div class="firstName" v-if="hasConfirmed == false">
              <p>{{ contactData.firstName }}</p>
            </div>
            <div v-else class="confirmed">
              <p>{{ newContact.firstName }}</p>
            </div>
          </div>
          <div class="lastNameWrapper">
            <div
              class="lastName"
              v-if="contactData.lastName && hasConfirmed == false"
            >
              <p>{{ contactData.lastName }}</p>
            </div>
            <div class="confirmed lastName" v-else-if="hasConfirmed == true">
              <p>{{ newContact.lastName }}</p>
            </div>
          </div>
        </div>
        <div class="birthdateWrapper">
          <div
            class="birthdate"
            v-if="contactData.birthdate && hasConfirmed == false"
          >
            <p>{{ contactData.birthdate }}</p>
          </div>
          <div
            class="confirmed"
            v-else-if="newContact.birthdate && hasConfirmed == true"
          >
            <p>{{ newContact.birthdate }}</p>
          </div>
        </div>
        <div class="companyWrapper">
          <div
            class="company"
            v-if="contactData.company && hasConfirmed == false"
          >
            <p>{{ contactData.company }}</p>
          </div>
          <div
            class="confirmed"
            v-else-if="newContact.company && hasConfirmed == true"
          >
            <p>{{ newContact.company }}</p>
          </div>
        </div>
        <div class="phoneEmailWrapper">
          <div class="phoneWrapper">
            <div
              class="phone"
              v-if="contactData.phone && hasConfirmed == false"
            >
              <p>{{ contactData.phone }}</p>
            </div>
            <div class="confirmed" v-else-if="hasConfirmed == true">
              <p>{{ newContact.phone }}</p>
            </div>
          </div>
          <div class="emailWrapper">
            <div
              class="email"
              v-if="
                contactData.email && contactData.phone && hasConfirmed == false
              "
            >
              <p>{{ contactData.email }}</p>
            </div>
            <div
              class="confirmed email"
              v-else-if="newContact.phone && hasConfirmed == true"
            >
              <p>{{ newContact.email }}</p>
            </div>
          </div>
          <!-- If there is an email, but no phone, we need to push the email all the way to the left.  -->
          <div class="emailNoPhoneWrapper">
            <div
              class="emailNoPhone"
              v-if="
                contactData.email && !contactData.phone && hasConfirmed == false
              "
            >
              <p>{{ contactData.email }}</p>
            </div>
            <!-- Since someone could add a phone number when editing a contact, this needs to check that there still is no phone in the new updated contact. -->
            <div
              class="confirmed emailNoPhone"
              v-else-if="!newContact.phone && hasConfirmed == true"
            >
              <p>{{ newContact.email }}</p>
            </div>
          </div>
        </div>
        <div class="addressWrapper">
          <div
            class="address"
            v-if="contactData.address && hasConfirmed == false"
          >
            <p>{{ contactData.address }}</p>
          </div>
          <div
            class="confirmed"
            v-else-if="newContact.address && hasConfirmed == true"
          >
            <p>{{ newContact.address }}</p>
          </div>
        </div>
      </div>
      <div class="detailsColumn2">
        <div class="notesWrapper">
          <div class="notes" v-if="contactData.notes && hasConfirmed == false">
            <p>{{ contactData.notes }}</p>
          </div>
          <div
            class="confirmed notes"
            v-else-if="newContact.notes && hasConfirmed == true"
          >
            <p>{{ newContact.notes }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="detailsFooter">
      <div class="buttons">
        <div class="backButton">
          <button class="btn btn-secondary" type="button" @click="back">
            Back
          </button>
        </div>
        <div class="editButton">
          <button class="btn btn-primary" type="button" @click="startEditing">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
  <edit-contact
    v-else-if="editContact == true || straightToEdit == true"
    :contactData="newContact"
    @stopEditing="stopEditing"
    @hasConfirmed="confirmed"
    @newContact="setNewContact"
  />
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
import EditContact from '@/components/Utilities/Contacts/EditContact.vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'ContactDetailsComponent',
  props: ['contactData', 'toEdit'],
  components: {
    EditContact,
  },
  data() {
    return {
      newContact: { ...this.contactData },
      editContact: false,
      hasConfirmed: false,
      straightToEdit: this.toEdit,
    };
  },
  computed: {
    ToEdit() {
      this.checkStraightToEdit();
      return this.toEdit;
    },
  },
  methods: {
    checkStraightToEdit() {
      if (this.toEdit == true) {
        this.editContact = true;
        this.straightToEdit = true;
      } else if (this.toEdit == false) {
        this.editContact = false;
        this.straightToEdit = false;
      }
    },
    back() {
      this.$emit('back');
    },
    startEditing() {
      this.editContact = true;
    },
    stopEditing() {
      this.editContact = false;
      this.straightToEdit = false;
      // this.$emit('stopEditing');
    },
    confirmed() {
      this.hasConfirmed = true;
    },
    setNewContact(newContact) {
      console.log('newContact', newContact);
      this.newContact = newContact;
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 10px;
  text-align: start;
}
div.detailsWrapper {
  height: 355px;
}
div.detailsBody {
  height: 300px;
}
div.detailsFooter {
  height: 55px;
  padding-top: 10px;
}
div.detailsColumn1 {
  width: 250px;
}
div.detailsColumn2 {
  width: 225px;
}
div.detailsBody,
div.namesWrapper,
div.buttons {
  display: flex;
}

/* Column 1 styling */
div.namesWrapper {
  font-size: 28px;
}
div.lastNameWrapper {
  margin-left: 8px;
}
div.phoneEmailWrapper {
  font-size: 20px;
}
div.addressWrapper p {
  width: 250px;
  overflow-x: visible;
}

/* Column 2 styling */
div.notesWrapper {
  font-size: 13px;
}

/* Button styling */
div.buttons {
  justify-content: center;
}
div.buttons .btn {
  margin: 0 5px;
}
</style>
