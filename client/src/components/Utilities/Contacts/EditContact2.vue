<template>
  <div class="detailsWrapper">
    <div class="detailsBody">
      <div class="detailsRow1">
        <div class="nameBirthdateWrapper">
          <div class="namesWrapper">
            <div class="labelGroup">
              <p class="label nameLabel">
                <small
                  >Name:
                  <p
                    class="deleteLabel"
                    v-show="showDelete"
                    @click="deleteProperty('lastName')"
                  >
                    <small> Delete</small>
                  </p>
                </small>
              </p>
            </div>
            <div class="namesGroup">
              <div class="firstNameWrapper">
                <div
                  class="firstName"
                  v-if="edit.firstName == false && hasEdited.firstName == false"
                >
                  <p @click="switchEdit('firstName')">
                    {{ contactData.firstName }}
                  </p>
                </div>
                <div class="firstNameEdit" v-else-if="edit.firstName == true">
                  <input
                    class="XlargeInput"
                    type="text"
                    ref="focusFirstName"
                    v-model="newContact.firstName"
                    v-on:keyup.enter="finishEditing('firstName')"
                    v-on:blur="cancelEditing('firstName')"
                    v-autowidth="{
                      maxWidth: '140px',
                      minWidth: '80px',
                      comfortZone: 5,
                    }"
                  />
                </div>
                <div
                  v-else-if="
                    hasEdited.firstName == true && edit.firstName == false
                  "
                >
                  <p class="editedFirstName" @click="switchEdit('firstName')">
                    {{ newContact.firstName }}
                  </p>
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
                </div>
                <div
                  v-else-if="contactData.lastName && edit.lastName == true"
                  class="lastNameEdit"
                >
                  <input
                    class="XlargeInput"
                    type="text"
                    ref="focusLastName"
                    v-model="newContact.lastName"
                    v-on:keyup.enter="finishEditing('lastName')"
                    v-on:blur="cancelEditing('lastName')"
                    v-autowidth="{
                      maxWidth: '140px',
                      minWidth: '80px',
                      comfortZone: 5,
                    }"
                  />
                </div>
                <div
                  class="lastName"
                  v-else-if="
                    hasEdited.lastName == true && edit.lastName == false
                  "
                >
                  <p class="editedLastName" @click="switchEdit('lastName')">
                    {{ newContact.lastName }}
                  </p>
                </div>
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
              <div class="labelGroup">
                <p class="label">
                  <small
                    >Birthdate:
                    <p
                      class="deleteLabel"
                      v-show="showDelete"
                      @click="deleteProperty('birthdate')"
                    >
                      <small> Delete</small>
                    </p></small
                  >
                </p>
              </div>
              <div class="flexWrapper">
                <p @click="switchEdit('birthdate')">
                  {{ contactData.birthdate }}
                </p>
              </div>
            </div>
            <div
              v-else-if="contactData.birthdate && edit.birthdate == true"
              class="birthdateEdit"
            >
              <div class="labelGroup">
                <p class="label">
                  <small
                    >Birthdate:
                    <p
                      class="deleteLabel"
                      v-show="showDelete"
                      @click="deleteProperty('birthdate')"
                    >
                      <small> Delete</small>
                    </p></small
                  >
                </p>
              </div>
              <input
                class="smallInput"
                type="text"
                ref="focusBirthdate"
                v-model="newContact.birthdate"
                v-on:keyup.enter="finishEditing('birthdate')"
                v-on:blur="cancelEditing('birthdate')"
                v-autowidth="{
                  maxWidth: '140px',
                  minWidth: '80px',
                  comfortZone: 5,
                }"
              />
            </div>
            <div
              class="birthdate "
              v-else-if="hasEdited.birthdate == true && edit.birthdate == false"
            >
              <div class="labelGroup">
                <p class="label">
                  <small
                    >Birthdate:
                    <p
                      class="deleteLabel"
                      v-show="showDelete"
                      @click="deleteProperty('birthdate')"
                    >
                      <small> Delete</small>
                    </p></small
                  >
                </p>
              </div>
              <p class="editedBirthdate" @click="switchEdit('birthdate')">
                {{ newContact.birthdate }}
              </p>
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
                <div class="labelGroup">
                  <p class="label">
                    <small
                      >Phone:
                      <p
                        class="deleteLabel"
                        v-show="showDelete"
                        @click="deleteProperty('phone')"
                      >
                        <small> Delete</small>
                      </p></small
                    >
                  </p>
                </div>
                <p @click="switchEdit('phone')">{{ contactData.phone }}</p>
              </div>
              <div
                v-else-if="contactData.phone && edit.phone == true"
                class="phoneEdit"
              >
                <div class="labelGroup">
                  <p class="label">
                    <small
                      >Phone:
                      <p
                        class="deleteLabel"
                        v-show="showDelete"
                        @click="deleteProperty('phone')"
                      >
                        <small> Delete</small>
                      </p></small
                    >
                  </p>
                </div>
                <input
                  class="mediumInput"
                  type="text"
                  ref="focusPhone"
                  v-model="newContact.phone"
                  v-on:keyup.enter="finishEditing('phone')"
                  v-on:blur="cancelEditing('phone')"
                  v-autowidth="{
                    maxWidth: '140px',
                    minWidth: '80px',
                    comfortZone: 5,
                  }"
                />
              </div>
              <div
                class="phone "
                v-else-if="hasEdited.phone == true && edit.phone == false"
              >
                <div class="labelGroup">
                  <p class="label">
                    <small
                      >Phone:
                      <p
                        class="deleteLabel"
                        v-show="showDelete"
                        @click="deleteProperty('phone')"
                      >
                        <small> Delete</small>
                      </p></small
                    >
                  </p>
                </div>
                <p class="editedPhone" @click="switchEdit('phone')">
                  {{ newContact.phone }}
                </p>
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
                <div class="labelGroup">
                  <p class="label">
                    <small
                      >Email:
                      <p
                        class="deleteLabel"
                        v-show="showDelete"
                        @click="deleteProperty('email')"
                      >
                        <small> Delete</small>
                      </p></small
                    >
                  </p>
                </div>
                <p @click="switchEdit('email')">{{ contactData.email }}</p>
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
                <div class="labelGroup">
                  <p class="label">
                    <small
                      >Email:
                      <p
                        class="deleteLabel"
                        v-show="showDelete"
                        @click="deleteProperty('email')"
                      >
                        <small> Delete</small>
                      </p></small
                    >
                  </p>
                </div>
                <p @click="switchEdit('email')">{{ contactData.email }}</p>
              </div>
              <div
                v-else-if="contactData.email && edit.email == true"
                class="emailEdit"
              >
                <div class="labelGroup">
                  <p class="label">
                    <small
                      >Email:
                      <p
                        class="deleteLabel"
                        v-show="showDelete"
                        @click="deleteProperty('email')"
                      >
                        <small> Delete</small>
                      </p></small
                    >
                  </p>
                </div>
                <input
                  class="mediumInput"
                  type="text"
                  ref="focusEmail"
                  v-model="newContact.email"
                  v-on:keyup.enter="finishEditing('email')"
                  v-on:blur="cancelEditing('email')"
                  v-autowidth="{
                    maxWidth: '140px',
                    minWidth: '80px',
                    comfortZone: 5,
                  }"
                />
              </div>
              <div
                class="email "
                v-else-if="hasEdited.email == true && edit.email == false"
              >
                <div class="labelGroup">
                  <p class="label">
                    <small
                      >Email:
                      <p
                        class="deleteLabel"
                        v-show="showDelete"
                        @click="deleteProperty('email')"
                      >
                        <small> Delete</small>
                      </p></small
                    >
                  </p>
                </div>

                <p class="editedEmail" @click="switchEdit('email')">
                  {{ newContact.email }}
                </p>
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
              <div class="labelGroup">
                <p class="label">
                  <small
                    >Company:
                    <p
                      class="deleteLabel"
                      v-show="showDelete"
                      @click="deleteProperty('company')"
                    >
                      <small> Delete</small>
                    </p></small
                  >
                </p>
              </div>
              <p @click="switchEdit('company')">{{ contactData.company }}</p>
            </div>
            <div
              v-else-if="contactData.company && edit.company == true"
              class="companyEdit"
            >
              <div class="labelGroup">
                <p class="label">
                  <small
                    >Company:
                    <p
                      class="deleteLabel"
                      v-show="showDelete"
                      @click="deleteProperty('company')"
                    >
                      <small> Delete</small>
                    </p></small
                  >
                </p>
              </div>
              <input
                class="mediumInput"
                type="text"
                ref="focusCompany"
                v-model="newContact.company"
                v-on:keyup.enter="finishEditing('company')"
                v-on:blur="cancelEditing('company')"
                v-autowidth="{
                  maxWidth: '140px',
                  minWidth: '80px',
                  comfortZone: 5,
                }"
              />
            </div>
            <div v-else-if="hasEdited.company == true && edit.company == false">
              <div class="labelGroup">
                <p class="label">
                  <small
                    >Company:
                    <p
                      class="deleteLabel"
                      v-show="showDelete"
                      @click="deleteProperty('company')"
                    >
                      <small> Delete</small>
                    </p></small
                  >
                </p>
              </div>
              <p class="editedCompany" @click="switchEdit('company')">
                {{ newContact.company }}
              </p>
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
            <div class="labelGroup">
              <p class="label">
                <small
                  >Address:
                  <p
                    class="deleteLabel"
                    v-show="showDelete"
                    @click="deleteProperty('address')"
                  >
                    <small> Delete</small>
                  </p></small
                >
              </p>
            </div>
            <p @click="switchEdit('address')">{{ contactData.address }}</p>
          </div>
          <div
            v-else-if="contactData.address && edit.address == true"
            class="addressEdit"
          >
            <div class="labelGroup">
              <p class="label">
                <small
                  >Address:
                  <p
                    class="deleteLabel"
                    v-show="showDelete"
                    @click="deleteProperty('address')"
                  >
                    <small> Delete</small>
                  </p></small
                >
              </p>
            </div>
            <input
              class="largeInput"
              type="text"
              ref="focusAddress"
              v-model="newContact.address"
              v-on:keyup.enter="finishEditing('address')"
              v-on:blur="cancelEditing('address')"
              v-autowidth="{
                maxWidth: '350px',
                minWidth: '150px',
                comfortZone: 5,
              }"
            />
          </div>
          <div v-else-if="hasEdited.address == true && edit.address == false">
            <div class="labelGroup">
              <p class="label">
                <small
                  >Address:
                  <p
                    class="deleteLabel"
                    v-show="showDelete"
                    @click="deleteProperty('address')"
                  >
                    <small> Delete</small>
                  </p></small
                >
              </p>
            </div>
            <p class="editedAddress" @click="switchEdit('address')">
              {{ newContact.address }}
            </p>
          </div>
        </div>
      </div>
      <div class="detailsRow2">
        <div class="notesWrapper" v-if="contactData.notes">
          <div class="labelGroup">
            <p class="label">
              <small
                >Notes:
                <p
                  class="deleteLabel"
                  v-show="showDelete"
                  @click="deleteProperty('notes')"
                >
                  <small> Delete</small>
                </p></small
              >
            </p>
          </div>
          <div
            class="notes"
            @click="switchEdit('notes')"
            v-if="
              contactData.notes &&
                edit.notes == false &&
                hasEdited.notes == false
            "
          >
            <p>{{ contactData.notes }}</p>
          </div>
          <div
            v-else-if="contactData.notes && edit.notes == true"
            class="notesEdit"
          >
            <textarea
              id="NotesTextArea"
              ref="focusNotes"
              cols="75"
              rows="5"
              v-model="newContact.notes"
              v-on:keyup.enter="finishEditing('notes')"
              v-on:blur="cancelEditing('notes')"
            ></textarea>
          </div>
          <div
            class=" notes"
            @click="switchEdit('notes')"
            v-else-if="hasEdited.notes == true && edit.notes == false"
          >
            <p class="editedNotes">{{ newContact.notes }}</p>
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
  props: ['contactData', 'showDeleteData'],
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
  computed: {
    showDelete() {
      return this.showDeleteData;
    },
  },
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
div.detailsWrapper {
  height: 355px;
}
div.detailsBody {
  height: 290px;
}
div.detailsRow1 {
  height: 165px;
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

input.smallInput {
  font-size: 13px;
}
input.mediumInput {
  font-size: 14px;
}
input.largeInput {
  font-size: 15px;
}
input.XlargeInput {
  font-size: 20px;
}

p.editedFirstName,
p.editedLastName,
p.editedPhone,
p.editedEmail,
p.editedCompany,
p.editedAddress,
p.editedNotes,
p.editedBirthdate {
  color: goldenrod;
}

/* Row 1 styling */
/* Name/Birthdate styling */
div.namesWrapper {
  font-size: 23px;
  width: 320px;
  flex-direction: column;
}
div.namesGroup {
  display: flex;
}
div.firstNameWrapper {
  min-width: 40px;
  max-width: 160px;
  overflow-x: auto;
}

div.lastNameWrapper {
  margin: 0px 0 0 10px;
  max-width: 160px;
  overflow-x: auto;
}
div.birthdateWrapper {
  font-size: 14px;
  align-self: center;
  position: absolute;
  top: 14%;
  right: 13%;
}
div.nameBirthdateWrapper {
  height: 55px;
}

/* Phone/Email/Company styling */
div.phoneEmailCompanyWrapper {
  font-size: 15px;
  height: 50px;
}
div.phoneWrapper {
  width: 110px;
}

div.emailWrapper {
  width: 180px;
  overflow-x: auto;
  margin-left: 10px;
}
div.emailWrapper::-webkit-scrollbar,
div.firstNameWrapper::-webkit-scrollbar,
div.lastNameWrapper::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: rgb(90, 90, 90);
}
div.emailWrapper::-webkit-scrollbar-thumb,
div.firstNameWrapper::-webkit-scrollbar-thumb,
div.lastNameWrapper::-webkit-scrollbar-thumb {
  background: goldenrod;
}
div.companyWrapper {
  width: 110px;
  font-size: 14px;
  position: absolute;
  top: 25%;
  right: 7%;
}
div.companyEdit input {
  margin-left: -15px;
}

/* Address styling */
div.addressWrapper {
  font-size: 15px;
  height: 50px;
}
div.addressEdit,
div.phoneEdit,
div.emailEdit,
div.companyEdit {
  text-align: start;
}

/* Row 2 styling */
div.notesWrapper {
  font-size: 13px;
}
div.notes p {
  padding: 0 5px;
}

/* Button styling */
div.buttons {
  justify-content: center;
}
div.buttons .btn {
  margin: 0 5px;
}
div.reminder p {
  text-align: center;
}

/* Label styling */
div.labelGroup {
  display: flex;
}
div.labelGroup p {
  font-size: 13px;
}
p.deleteLabel {
  padding-left: 5px;
  color: rgba(189, 65, 65, 0.685);
}
p.deleteLabel:hover {
  cursor: pointer;
  color: red;
}
p.label {
  color: goldenrod;
  margin-bottom: 3px;
}
p.label small {
  display: flex;
}
</style>
