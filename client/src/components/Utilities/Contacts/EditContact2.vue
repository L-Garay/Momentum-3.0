<template>
  <div class="detailsWrapper">
    <div class="detailsBody">
      <div class="detailsRow1">
        <div class="nameBirthdateWrapper">
          <div class="namesWrapper">
            <div class="firstNameWrapper">
              <div
                class="firstName"
                v-if="edit.firstName == false && hasEdited.firstName == false"
              >
                <p class="label"><small>Name:</small></p>
                <p @click="switchEdit('firstName')">
                  {{ contactData.firstName }}
                </p>
              </div>
              <div class="firstNameEdit" v-else-if="edit.firstName == true">
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
                v-else-if="
                  hasEdited.firstName == true && edit.firstName == false
                "
                class="editedFirstName"
              >
                <p>{{ newContact.firstName }}</p>
                <i
                  @click="switchEdit('firstName')"
                  class="fas fa-edit fa-xs"
                ></i>
              </div>
              <div v-else class="confirmed">
                <p class="label"><small>Name:</small></p>
                <p>{{ newContact.firstName }}</p>
              </div>
            </div>
            <div class="lastNameWrapper">
              <div
                class="lastName"
                v-if="
                  contactData.lastName &&
                    edit.lastName == false &&
                    hasEdited.lastName == false
                "
              >
                <p @click="switchEdit('lastName')">
                  {{ contactData.lastName }}
                </p>
                <i
                  @click="deleteProperty('lastName')"
                  class="delete deleteLastName fas fa-trash-alt"
                ></i>
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
                class="editedLastName lastName"
                v-else-if="hasEdited.lastName == true && edit.lastName == false"
              >
                <p @click="switchEdit('lastName')">{{ newContact.lastName }}</p>
                <i
                  @click="deleteProperty('lastName')"
                  class="delete deleteLastName fas fa-trash-alt"
                ></i>
              </div>
            </div>
          </div>
          <div class="birthdateWrapper">
            <div
              class="birthdate"
              v-if="
                contactData.birthdate &&
                  edit.birthdate == false &&
                  hasEdited.birthdate == false
              "
            >
              <p class="label"><small>Birthdate:</small></p>
              <div class="flexWrapper">
                <p @click="switchEdit('birthdate')">
                  {{ contactData.birthdate }}
                </p>
                <i
                  @click="deleteProperty('birthdate')"
                  class="delete deleteBirthdate fas fa-trash-alt"
                ></i>
              </div>
            </div>
            <div
              v-else-if="contactData.birthdate && edit.birthdate == true"
              class="birthdateEdit"
            >
              <input
                type="text"
                ref="focusBirthdate"
                v-model="newContact.birthdate"
                v-on:keyup.enter="finishEditing('birthdate')"
                v-autowidth="{
                  maxWidth: '140px',
                  minWidth: '80px',
                  comfortZone: 5,
                }"
              /><i
                @click="cancelEditing('birthdate')"
                class="far fa-times-circle"
              ></i>
            </div>
            <div
              class="birthdate"
              v-else-if="hasEdited.birthdate == true && edit.birthdate == false"
            >
              <p class="label"><small>Birthdate:</small></p>
              <p @click="switchEdit('birthdate')">{{ newContact.birthdate }}</p>
              <i
                @click="deleteProperty('birthdate')"
                class="delete deleteBirthdate fas fa-trash-alt"
              ></i>
            </div>
          </div>
        </div>
        <div class="phoneEmailCompanyWrapper">
          <div class="phoneEmailWrapper">
            <div class="phoneWrapper">
              <div
                class="phone"
                v-if="
                  contactData.phone &&
                    edit.phone == false &&
                    hasEdited.phone == false
                "
              >
                <p class="label"><small>Phone:</small></p>
                <p @click="switchEdit('phone')">{{ contactData.phone }}</p>
                <i
                  @click="deleteProperty('phone')"
                  class="delete deleteRow2 fas fa-trash-alt"
                ></i>
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
                class="phone editedPhone"
                v-else-if="hasEdited.phone == true && edit.phone == false"
              >
                <p class="label"><small>Phone:</small></p>
                <p @click="switchEdit('phone')">{{ newContact.phone }}</p>
                <i
                  @click="deleteProperty('phone')"
                  class="delete deleteRow2 fas fa-trash-alt"
                ></i>
              </div>
            </div>
            <div class="emailWrapper">
              <div
                class="email"
                v-if="
                  contactData.email &&
                    contactData.phone &&
                    edit.email == false &&
                    hasEdited.email == false
                "
              >
                <p class="label"><small>Email:</small></p>
                <p @click="switchEdit('email')">{{ contactData.email }}</p>
                <i
                  @click="deleteProperty('email')"
                  class="delete deleteRow2 fas fa-trash-alt"
                ></i>
              </div>
              <div
                class="emailNoPhone"
                v-else-if="
                  contactData.email &&
                    !contactData.phone &&
                    edit.email == false &&
                    hasEdited.email == false
                "
              >
                <p class="label"><small>Email:</small></p>
                <p @click="switchEdit('email')">{{ contactData.email }}</p>
                <i
                  @click="deleteProperty('email')"
                  class="delete deleteRow2 fas fa-trash-alt"
                ></i>
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
                class="email editedEmail"
                v-else-if="hasEdited.email == true && edit.email == false"
              >
                <p class="label"><small>Email:</small></p>
                <p>{{ newContact.email }}</p>
                <i
                  @click="deleteProperty('email')"
                  class="delete deleteRow2 fas fa-trash-alt"
                ></i>
              </div>
            </div>
            <!-- If there is an email, but no phone, we need to push the email all the way to the left.  -->
            <!-- <div class="emailNoPhoneWrapper">
              <div
                class="emailNoPhone"
                v-if="
                  contactData.email &&
                    !contactData.phone &&
                    edit.email == false &&
                    hasEdited.email == false
                "
              >
                <p class="label"><small>Email:</small></p>
                <p @click="switchEdit('email')">{{ contactData.email }}</p>
                <i
                  @click="deleteProperty('email')"
                  class="delete deleteRow2 fas fa-trash-alt"
                ></i>
              </div> -->
            <!-- Since someone could add a phone number when editing a contact, this needs to check that there still is no phone in the new updated contact. -->
            <!-- <div
                class="confirmed emailNoPhone"
                v-else-if="!newContact.phone && hasConfirmed == true"
              >
                <p class="label"><small>Email:</small></p>
                <p>{{ newContact.email }}</p>
              </div>
            </div> -->
          </div>
          <div class="companyWrapper">
            <div
              class="company"
              v-if="
                contactData.company &&
                  edit.company == false &&
                  hasEdited.company == false
              "
            >
              <p class="label"><small>Company:</small></p>
              <p @click="switchEdit('company')">{{ contactData.company }}</p>
              <i
                @click="deleteProperty('company')"
                class="delete deleteRow2 fas fa-trash-alt"
              ></i>
            </div>
            <div
              v-else-if="contactData.company && edit.company == true"
              class="companyEdit"
            >
              <input
                type="text"
                ref="focusCompany"
                v-model="newContact.company"
                v-on:keyup.enter="finishEditing('company')"
                v-autowidth="{
                  maxWidth: '140px',
                  minWidth: '80px',
                  comfortZone: 5,
                }"
              /><i
                @click="cancelEditing('company')"
                class="far fa-times-circle"
              ></i>
            </div>
            <div
              class="confirmed"
              v-else-if="hasEdited.phone == true && edit.phone == false"
            >
              <p class="label"><small>Company:</small></p>
              <p @click="switchEdit('phone')">{{ newContact.phone }}</p>
              <i
                @click="deleteProperty('phone')"
                class="delete deleteRow2 fas fa-trash-alt"
              ></i>
            </div>
          </div>
        </div>
        <div class="addressWrapper">
          <div
            class="address"
            v-if="
              contactData.address &&
                edit.address == false &&
                hasEdited.address == false
            "
          >
            <p class="label"><small>Address:</small></p>
            <p @click="switchEdit('address')">{{ contactData.address }},</p>
            <i
              @click="deleteProperty('address')"
              class="delete deleteRow3 fas fa-trash-alt"
            ></i>
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
            class="confirmed"
            v-else-if="hasEdited.address == true && edit.address == false"
          >
            <p class="label"><small>Address:</small></p>
            <p @click="switchEdit('address')">{{ newContact.address }},</p>
            <i
              @click="deleteProperty('address')"
              class="delete deleteRow3 fas fa-trash-alt"
            ></i>
          </div>
        </div>
      </div>
      <div class="detailsRow2">
        <div class="notesWrapper">
          <div
            class="notes"
            v-if="
              contactData.notes &&
                edit.notes == false &&
                hasEdited.notes == false
            "
          >
            <p @click="switchEdit('notes')">{{ contactData.notes }}</p>
            <i
              @click="deleteProperty('notes')"
              class="delete deleteRow4 fas fa-trash-alt"
            ></i>
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
            class="confirmed notes"
            v-else-if="hasEdited.notes == true && edit.notes == false"
          >
            <p @click="switchEdit('notes')">{{ newContact.notes }}</p>
            <i
              @click="deleteProperty('notes')"
              class="delete deleteRow4 fas fa-trash-alt"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="detailsFooter">
      <div class="buttons">
        <div class="cancelButton">
          <button class="btn btn-secondary" type="button" @click="stopEditing">
            Cancel
          </button>
        </div>
        <div class="addButton">
          <button class="btn btn-primary" type="button">
            Add Fields
          </button>
        </div>
        <div class="confirmButton">
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
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
// import AddToContact from '@/components/Utilities/Contacts/AddToContact.vue';
export default {
  name: 'EditContactComponent',
  props: ['contactData'],
  components: {
    // AddToContact,
  },
  data() {
    return {
      newContact: { ...this.contactData },
      hasProperty: {
        lastName: false,
        phone: false,
        email: false,
        address: false,
        birthdate: false,
        company: false,
        notes: false,
      },
      edit: {
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        address: false,
        birthdate: false,
        company: false,
        notes: false,
      },
      hasEdited: {
        firstName: false,
        lastName: false,
        phone: false,
        email: false,
        address: false,
        birthdate: false,
        company: false,
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
      if (this.contactData.company) {
        this.hasProperty.company = true;
      }
      if (this.contactData.birthdate) {
        this.hasProperty.birthdate = true;
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
          this.edit.company = false;
          this.edit.birthdate = false;
          this.edit.notes = false;
          this.$nextTick(() => this.$refs.focusFirstName.focus());
          break;
        case 'lastName':
          this.edit.firstName = false;
          this.edit.lastName = true;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.company = false;
          this.edit.birthdate = false;
          this.edit.notes = false;
          this.$nextTick(() => this.$refs.focusLastName.focus());
          break;
        case 'phone':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = true;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.company = false;
          this.edit.birthdate = false;
          this.edit.notes = false;
          this.$nextTick(() => this.$refs.focusPhone.focus());
          break;
        case 'email':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = true;
          this.edit.address = false;
          this.edit.company = false;
          this.edit.birthdate = false;
          this.edit.notes = false;
          this.$nextTick(() => this.$refs.focusEmail.focus());
          break;
        case 'address':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = true;
          this.edit.company = false;
          this.edit.birthdate = false;
          this.edit.notes = false;
          this.$nextTick(() => this.$refs.focusAddress.focus());
          break;
        case 'company':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.company = true;
          this.edit.birthdate = false;
          this.edit.notes = false;
          this.$nextTick(() => this.$refs.focusCompany.focus());
          break;
        case 'birthdate':
          this.edit.firstName = false;
          this.edit.lastName = false;
          this.edit.phone = false;
          this.edit.email = false;
          this.edit.address = false;
          this.edit.company = false;
          this.edit.birthdate = true;
          this.edit.notes = false;
          this.$nextTick(() => this.$refs.focusBirthdate.focus());
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
          this.$nextTick(() => this.$refs.focusNotes.focus());
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
        case 'company':
          this.edit.company = false;
          break;
        case 'birthdate':
          this.edit.birthdate = false;
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
        case 'company':
          if (this.newContact.company) {
            this.hasEdited.company = true;
            this.edit.company = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'birthdate':
          if (this.newContact.birthdate) {
            this.hasEdited.birthdate = true;
            this.edit.birthdate = false;
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
  margin-bottom: 0;
  text-align: start;
}
div.flexWrapper {
  display: flex;
}
i.delete {
  color: rgba(189, 65, 65, 0.685);
}
i.delete:hover {
  cursor: pointer;
  color: red;
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
div.firstNameEdit input {
  margin-top: 10px;
}
div.firstNameEdit i,
div.lastNameEdit i {
  font-size: 17px;
  position: absolute;
  top: 12%;
}
div.lastName {
  display: flex;
}
div.lastName i.deleteLastName {
  font-size: 14px;
  align-self: center;
  padding: 10px 0 0 5px;
}
div.birthdateEdit i {
  font-size: 13px;
  position: absolute;
  top: 15%;
}
div.birthdate i.deleteBirthdate {
  font-size: 11px;
  align-self: center;
  padding: 1px 0 0 6px;
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
