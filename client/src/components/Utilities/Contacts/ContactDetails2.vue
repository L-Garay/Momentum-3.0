<template>
  <div
    class="detailsWrapper"
    v-if="editContact == false && straightToEdit == false"
  >
    <div class="detailsBody">
      <div class="detailsRow1">
        <div class="nameBirthdateWrapper">
          <div class="namesWrapper">
            <div class="firstNameWrapper">
              <div class="firstName" v-if="hasConfirmed == false">
                <p class="label"><small>Name:</small></p>
                <p>{{ contactData.firstName }}</p>
              </div>
              <div v-else class="confirmed">
                <p class="label"><small>Name:</small></p>
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
              <p class="label"><small>Birthdate:</small></p>
              <p>{{ contactData.birthdate }}</p>
            </div>
            <div
              class="confirmed"
              v-else-if="newContact.birthdate && hasConfirmed == true"
            >
              <p class="label"><small>Birthdate:</small></p>
              <p>{{ newContact.birthdate }}</p>
            </div>
          </div>
        </div>
        <div class="phoneEmailCompanyWrapper">
          <div class="phoneEmailWrapper">
            <div class="phoneWrapper">
              <div
                class="phone"
                v-if="contactData.phone && hasConfirmed == false"
              >
                <p class="label"><small>Phone:</small></p>
                <p>{{ contactData.phone }}</p>
              </div>
              <div class="confirmed" v-else-if="hasConfirmed == true">
                <p class="label"><small>Phone:</small></p>
                <p>{{ newContact.phone }}</p>
              </div>
            </div>
            <div class="emailWrapper">
              <div
                class="email"
                v-if="
                  contactData.email &&
                    contactData.phone &&
                    hasConfirmed == false
                "
              >
                <p class="label"><small>Email:</small></p>
                <p>{{ contactData.email }}</p>
              </div>
              <div
                class="confirmed email"
                v-else-if="newContact.phone && hasConfirmed == true"
              >
                <p class="label"><small>Email:</small></p>
                <p>{{ newContact.email }}</p>
              </div>
            </div>
            <!-- If there is an email, but no phone, we need to push the email all the way to the left.  -->
            <div class="emailNoPhoneWrapper">
              <div
                class="emailNoPhone"
                v-if="
                  contactData.email &&
                    !contactData.phone &&
                    hasConfirmed == false
                "
              >
                <p class="label"><small>Email:</small></p>
                <p>{{ contactData.email }}</p>
              </div>
              <!-- Since someone could add a phone number when editing a contact, this needs to check that there still is no phone in the new updated contact. -->
              <div
                class="confirmed emailNoPhone"
                v-else-if="!newContact.phone && hasConfirmed == true"
              >
                <p class="label"><small>Email:</small></p>
                <p>{{ newContact.email }}</p>
              </div>
            </div>
          </div>
          <div class="companyWrapper">
            <div
              class="company"
              v-if="contactData.company && hasConfirmed == false"
            >
              <p class="label"><small>Company:</small></p>
              <p>{{ contactData.company }}</p>
            </div>
            <div
              class="confirmed"
              v-else-if="newContact.company && hasConfirmed == true"
            >
              <p class="label"><small>Company:</small></p>
              <p>{{ newContact.company }}</p>
            </div>
          </div>
        </div>
        <div class="addressWrapper">
          <div
            class="address"
            v-if="contactData.address && hasConfirmed == false"
          >
            <p class="label"><small>Address:</small></p>
            <p>{{ contactData.address }}</p>
          </div>
          <div
            class="confirmed"
            v-else-if="newContact.address && hasConfirmed == true"
          >
            <p class="label"><small>Address:</small></p>
            <p>{{ newContact.address }}</p>
          </div>
        </div>
      </div>
      <div class="detailsRow2">
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
  <edit-contact-2
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
// import EditContact from '@/components/Utilities/Contacts/EditContact.vue';
import EditContact2 from '@/components/Utilities/Contacts/EditContact2.vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'ContactDetailsComponent2',
  props: ['contactData', 'toEdit'],
  components: {
    EditContact2,
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
  margin-bottom: 0;
  text-align: start;
}
div.detailsWrapper {
  height: 355px;
}
div.detailsBody {
  height: 300px;
}
div.detailsRow1 {
  height: 200px;
}
div.notes {
  height: 100px;
  overflow-y: auto;
  background-color: rgb(71, 71, 71);
  border-radius: 4px 4px 4px 4px;
}
div.detailsFooter {
  height: 55px;
  padding-top: 10px;
}
div.nameBirthdateWrapper,
div.namesWrapper,
div.phoneEmailCompanyWrapper,
div.phoneEmailWrapper,
div.buttons {
  display: flex;
}

/* Row 1 styling */
/* Name/Birthdate styling */
div.namesWrapper {
  font-size: 36px;
}
div.lastNameWrapper {
  margin: 11px 0 0 15px;
}
div.birthdateWrapper {
  font-size: 15px;
  margin-left: 45px;
  align-self: center;
  color: rgb(231, 231, 231);
}

/* Phone/Email/Company styling */
div.phoneEmailCompanyWrapper {
  font-size: 18px;
}
div.emailWrapper,
div.companyWrapper {
  margin-left: 20px;
}

/* Address styling */
div.addressWrapper {
  font-size: 22px;
}

/* Row 2 styling */
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

/* Label styling */
p.label {
  margin-bottom: 0;
  font-size: 13px;
  color: goldenrod;
}
div.birthdateWrapper p.label {
  margin-bottom: 0;
}
div.namesWrapper p.label {
  margin-bottom: -8px;
}
</style>
