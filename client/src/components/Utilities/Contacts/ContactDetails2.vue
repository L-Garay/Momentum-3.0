<template>
  <div
    class="detailsWrapper"
    v-if="editContact == false && straightToEdit == false"
  >
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
                <div class="firstName" v-if="hasConfirmed == false">
                  <!-- <p class="label"><small>Name:</small></p> -->
                  <p>{{ contactData.firstName }}</p>
                </div>
                <div v-else class="confirmed">
                  <!-- <p class="label"><small>Name:</small></p> -->
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
                <div
                  class="confirmed lastName"
                  v-else-if="hasConfirmed == true"
                >
                  <p>{{ newContact.lastName }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="birthdateWrapper">
            <div
              class="birthdate"
              v-if="contactData.birthdate && hasConfirmed == false"
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
              <p>{{ contactData.birthdate }}</p>
            </div>
            <div
              class="confirmed"
              v-else-if="newContact.birthdate && hasConfirmed == true"
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
                <p>{{ contactData.phone }}</p>
              </div>
              <div
                class="confirmed"
                v-else-if="hasConfirmed == true && newContact.phone"
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
                <p>{{ contactData.email }}</p>
              </div>
              <div
                class="confirmed email"
                v-else-if="
                  newContact.phone && newContact.email && hasConfirmed == true
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
                <p>{{ contactData.email }}</p>
              </div>
              <!-- Since someone could add a phone number when editing a contact, this needs to check that there still is no phone in the new updated contact. -->
              <div
                class="confirmed emailNoPhone"
                v-else-if="
                  !newContact.phone && hasConfirmed == true && newContact.email
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
                <p>{{ newContact.email }}</p>
              </div>
            </div>
          </div>
          <div class="companyWrapper">
            <div
              class="company"
              v-if="contactData.company && hasConfirmed == false"
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
              <p>{{ contactData.company }}</p>
            </div>
            <div
              class="confirmed"
              v-else-if="newContact.company && hasConfirmed == true"
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
              <p>{{ newContact.company }}</p>
            </div>
          </div>
        </div>
        <div class="addressWrapper">
          <div
            class="address"
            v-if="contactData.address && hasConfirmed == false"
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
            <p>{{ contactData.address }}</p>
          </div>
          <div
            class="confirmed"
            v-else-if="newContact.address && hasConfirmed == true"
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
            <p>{{ newContact.address }}</p>
          </div>
        </div>
      </div>
      <div class="detailsRow2">
        <div class="notesWrapper" v-if="contactData.notes && newContact.notes">
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
    :showDeleteData="showDelete"
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
      showDelete: false,
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
      this.showDelete = true;
    },
    stopEditing() {
      this.editContact = false;
      this.straightToEdit = false;
      this.showDelete = false;
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
div.nameBirthdateWrapper {
  height: 55px;
}
div.birthdateWrapper {
  width: 90px;
  font-size: 14px;
  position: absolute;
  top: 14%;
  right: 11.25%;
}
div.birthdateEdit {
  display: flex;
  flex-direction: column;
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

/* Address styling */
div.addressWrapper {
  font-size: 15px;
  height: 50px;
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
