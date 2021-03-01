<template>
  <div
    class="detailsWrapper"
    v-if="editContact == false && straightToEdit == false"
  >
    <div class="detailsBody">
      <div class="detailsRow1">
        <div class="nameBirthdateWrapper">
          <!-- NOTE Names -->
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
                <div
                  class="confirmed lastName"
                  v-else-if="hasConfirmed == true"
                >
                  <p>{{ newContact.lastName }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- NOTE Birthdate -->
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
          <!-- NOTE Phone -->
          <div class="phoneEmailWrapper">
            <div
              class="phoneWrapper"
              v-if="contactData.phone || newContact.phone"
            >
              <div class="phone" v-if="hasConfirmed == false">
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
            <!-- NOTE Email -->
            <div
              class="emailWrapper"
              v-if="
                (contactData.email && contactData.phone) ||
                  (newContact.email && newContact.phone)
              "
            >
              <!-- If there is an email AND a phone -->
              <div class="email" v-if="hasConfirmed == false">
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
            <!-- NOTE If there is an Email BUT no Phone, we need to push the Email all the way to the left.  -->
            <div
              class="emailNoPhoneWrapper"
              v-if="contactData.email && !contactData.phone"
            >
              <div class="emailNoPhone" v-if="hasConfirmed == false">
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
          <!-- NOTE Company -->
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
        <!-- NOTE Address -->
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
        <!-- NOTE Notes -->
        <div class="notesWrapper" v-if="contactData.notes || newContact.notes">
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
      <!-- NOTE Back and Edit buttons -->
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
  <!-- NOTE Edit Contact component -->
  <edit-contact
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
Vue.use(VueInputAutoWidth);
import EditContact from '@/components/Utilities/Contacts/EditContact.vue';
export default {
  name: 'ContactDetailsComponent2',
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
      showDelete: false,
    };
  },
  mounted() {},
  computed: {},
  methods: {
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
    },
    confirmed() {
      this.hasConfirmed = true;
    },
    setNewContact(newContact) {
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
div.nameBirthdateWrapper,
div.namesWrapper,
div.phoneEmailCompanyWrapper,
div.phoneEmailWrapper,
div.buttons,
div.namesGroup,
div.birthdateEdit,
div.labelGroup,
p.label small {
  display: flex;
}

/* Row 1 */
/* (Name and Birthdate) */
div.detailsRow1 {
  height: 165px;
}
div.nameBirthdateWrapper {
  height: 55px;
}
div.namesWrapper {
  font-size: 23px;
  width: 320px;
  flex-direction: column;
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
  width: 90px;
  font-size: 14px;
  position: absolute;
  top: 14%;
  right: 11.25%;
}
div.birthdateEdit {
  flex-direction: column;
}

/* (Phone/Email/Company) */
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
div.companyWrapper {
  width: 110px;
  font-size: 14px;
  position: absolute;
  top: 25%;
  right: 7%;
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

/* (Address) */
div.addressWrapper {
  font-size: 15px;
  height: 50px;
}

/* Row 2 styling */
/* (Notes) */
div.notesWrapper {
  font-size: 13px;
}
div.notes {
  height: 100px;
  overflow-y: auto;
  background-color: rgb(71, 71, 71);
  border-radius: 4px 4px 4px 4px;
}
div.notes p {
  padding: 0 5px;
}

/* Button styling */
div.detailsFooter {
  height: 55px;
  padding-top: 10px;
}
div.buttons {
  justify-content: center;
}
div.buttons .btn {
  margin: 0 5px;
}
div.buttons button {
  background-color: transparent;
  border-radius: 5px 5px 5px 5px;
  border: 1pt solid white;
  color: white;
  padding: 1px 6px;
}
div.buttons button:hover {
  background-color: lightgray;
  border: 1pt solid black;
  box-shadow: 0pt 0pt 6pt white, 0pt 0pt 6pt white;
  text-shadow: 1px 1px 1px black;
}
div.buttons div.backButton button:hover {
  color: red;
}
div.buttons div.editButton button:hover {
  color: goldenrod;
}
div.buttons button:active {
  color: white !important;
  outline: none !important;
  box-shadow: none !important;
  border: 1pt solid white !important;
  text-shadow: 1px 1px 1px black;
}
div.buttons div.backButton button:active {
  background-color: red;
}
div.buttons div.editButton button:active {
  background-color: goldenrod;
}
div.buttons button:focus {
  background-color: lightgray;
  outline: none;
  text-shadow: 1px 1px 1px black;
}
div.buttons div.backButton button:focus {
  box-shadow: 0pt 0pt 12pt red;
  color: red;
}
div.buttons div.editButton button:focus {
  box-shadow: 0pt 0pt 12pt goldenrod;
  color: goldenrod;
}

/* Label styling */
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
</style>
