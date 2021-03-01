<template>
  <div class="detailsWrapper">
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
              <!-- NOTE First Name -->
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
                      maxWidth: '150px',
                      minWidth: '50px',
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
              <!-- NOTE Last Name -->
              <div class="lastNameWrapper">
                <div
                  class="lastName"
                  v-if="
                    contactData.lastName &&
                      edit.lastName == false &&
                      hasEdited.lastName == false
                  "
                >
                  <p
                    :class="{ deleted: hasDeleted.lastName }"
                    @click="switchEdit('lastName')"
                  >
                    {{ contactData.lastName }}
                  </p>
                </div>
                <div
                  v-else-if="
                    (contactData.lastName && edit.lastName == true) ||
                      (newContact.lastName && edit.lastName == true)
                  "
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
                      maxWidth: '150px',
                      minWidth: '50px',
                      comfortZone: 5,
                    }"
                  />
                </div>
                <div
                  class="lastName"
                  v-else-if="
                    (hasEdited.lastName == true && edit.lastName == false) ||
                      (hasAdded.lastName == true && edit.lastName == false)
                  "
                >
                  <p
                    :class="{
                      edited: hasEdited.lastName,
                      deleted: hasDeleted.lastName,
                      added: hasAdded.lastName,
                    }"
                    @click="switchEdit('lastName')"
                  >
                    {{ newContact.lastName }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- NOTE Birthdate -->
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
                <p
                  :class="{ deleted: hasDeleted.birthdate }"
                  @click="switchEdit('birthdate')"
                >
                  {{ contactData.birthdate }}
                </p>
              </div>
            </div>
            <div
              v-else-if="
                (contactData.birthdate && edit.birthdate == true) ||
                  (newContact.birthdate && edit.birthdate == true)
              "
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
              v-else-if="
                (hasEdited.birthdate == true && edit.birthdate == false) ||
                  (hasAdded.birthdate == true && edit.birthdate == false)
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
              <p
                :class="{
                  edited: hasEdited.birthdate,
                  deleted: hasDeleted.birthdate,
                  added: hasAdded.birthdate,
                }"
                @click="switchEdit('birthdate')"
              >
                {{ newContact.birthdate }}
              </p>
            </div>
          </div>
        </div>
        <!-- NOTE Phone/Email/Company -->
        <div class="phoneEmailCompanyWrapper">
          <div class="phoneEmailWrapper">
            <!-- NOTE Phone -->
            <div
              class="phoneWrapper"
              v-if="contactData.phone || newContact.phone"
            >
              <div
                class="phone"
                v-if="
                  edit.phone == false &&
                    hasEdited.phone == false &&
                    hasAdded.phone == false
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
                <p
                  :class="{ deleted: hasDeleted.phone }"
                  @click="switchEdit('phone')"
                >
                  {{ contactData.phone }}
                </p>
              </div>
              <div
                v-else-if="
                  (contactData.phone && edit.phone == true) ||
                    (newContact.phone && edit.phone == true)
                "
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
                v-else-if="
                  (hasEdited.phone == true && edit.phone == false) ||
                    (hasAdded.phone == true && edit.phone == false)
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
                <p
                  :class="{
                    edited: hasEdited.phone,
                    deleted: hasDeleted.phone,
                    added: hasAdded.phone,
                  }"
                  @click="switchEdit('phone')"
                >
                  {{ newContact.phone }}
                </p>
              </div>
            </div>
            <!-- NOTE Email -->
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
                <p
                  :class="{ deleted: hasDeleted.email }"
                  @click="switchEdit('email')"
                >
                  {{ contactData.email }}
                </p>
              </div>
              <div
                v-else-if="
                  (contactData.email && edit.email == true) ||
                    (newContact.email && edit.email == true)
                "
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
                    maxWidth: '170px',
                    minWidth: '80px',
                    comfortZone: 5,
                  }"
                />
              </div>
              <div
                class="email "
                v-else-if="
                  (hasEdited.email == true && edit.email == false) ||
                    (hasAdded.email == true && edit.email == false)
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

                <p
                  :class="{
                    edited: hasEdited.email,
                    deleted: hasDeleted.email,
                    added: hasAdded.email,
                  }"
                  @click="switchEdit('email')"
                >
                  {{ newContact.email }}
                </p>
              </div>
            </div>
          </div>
          <!-- NOTE Company -->
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
              <p
                :class="{ deleted: hasDeleted.company }"
                @click="switchEdit('company')"
              >
                {{ contactData.company }}
              </p>
            </div>
            <div
              v-else-if="
                (contactData.company && edit.company == true) ||
                  (newContact.company && edit.company == true)
              "
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
            <div
              v-else-if="
                (hasEdited.company == true && edit.company == false) ||
                  (hasAdded.company == true && edit.company == false)
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
              <p
                :class="{
                  edited: hasEdited.company,
                  deleted: hasDeleted.company,
                  added: hasAdded.company,
                }"
                @click="switchEdit('company')"
              >
                {{ newContact.company }}
              </p>
            </div>
          </div>
        </div>
        <!-- NOTE Address -->
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
            <p
              :class="{ deleted: hasDeleted.address }"
              @click="switchEdit('address')"
            >
              {{ contactData.address }}
            </p>
          </div>
          <div
            v-else-if="
              (contactData.address && edit.address == true) ||
                (newContact.address && edit.address == true)
            "
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
          <div
            v-else-if="
              (hasEdited.address == true && edit.address == false) ||
                (hasAdded.address == true && edit.address == false)
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
            <p
              :class="{
                edited: hasEdited.address,
                deleted: hasDeleted.address,
                added: hasAdded.address,
              }"
              @click="switchEdit('address')"
            >
              {{ newContact.address }}
            </p>
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
          <div
            class="notes"
            @click="switchEdit('notes')"
            v-if="
              edit.notes == false &&
                hasEdited.notes == false &&
                hasAdded.notes == false
            "
          >
            <p :class="{ deleted: hasDeleted.notes }">
              {{ contactData.notes }}
            </p>
          </div>
          <div
            v-else-if="
              (contactData.notes && edit.notes == true) ||
                (newContact.notes && edit.notes == true)
            "
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
            v-else-if="
              (hasEdited.notes == true && edit.notes == false) ||
                (hasAdded.notes == true && edit.notes == false)
            "
          >
            <p
              :class="{
                edited: hasEdited.notes,
                deleted: hasDeleted.notes,
                added: hasAdded.notes,
              }"
            >
              {{ newContact.notes }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="detailsFooter">
      <!-- NOTE Buttons -->
      <div class="buttons">
        <div class="cancelButton">
          <button class="btn" type="button" @click="stopEditing">
            Cancel
          </button>
        </div>
        <div class="addButton">
          <button class="btn" type="button" @click="showAddToContact = true">
            Add Fields
          </button>
        </div>
        <div class="confirmButton">
          <button
            id="confirmBtn"
            class="btn"
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
    <!-- NOTE Add To Contact component -->
    <div class="addToContactComponent">
      <add-to-contact
        v-if="showAddToContact"
        :propertyData="hasProperty"
        :contactData="newContact"
        @cancelAdd="cancelAdd"
        @confirmAdditions="checkAddedProperties"
      />
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
  props: ['contactData', 'showDeleteData'],
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
      hasDeleted: {
        lastName: false,
        phone: false,
        email: false,
        address: false,
        birthdate: false,
        company: false,
        notes: false,
      },
      hasAdded: {
        lastName: false,
        phone: false,
        email: false,
        address: false,
        birthdate: false,
        company: false,
        notes: false,
      },
      disabled: true,
      showAddToContact: false,
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
    // NOTE Checkt to see if the contact data being passed down has any of the optional properties
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
    },
    // NOTE The argument is determined by which property the user clicks on, and then this will determine which input to show (based on v-if)
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
    // NOTE Determines which input to close
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
    // NOTE This is when the user hits the 'enter' key and essentially soft-confirms their changes; this will record what property was changed and then enable the actual submission of the contact
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
            this.hasDeleted.lastName = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'phone':
          if (this.newContact.phone) {
            this.hasEdited.phone = true;
            this.edit.phone = false;
            this.hasDeleted.phone = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'email':
          if (this.newContact.email) {
            this.hasEdited.email = true;
            this.edit.email = false;
            this.hasDeleted.email = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'address':
          if (this.newContact.address) {
            this.hasEdited.address = true;
            this.edit.address = false;
            this.hasDeleted.address = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'company':
          if (this.newContact.company) {
            this.hasEdited.company = true;
            this.edit.company = false;
            this.hasDeleted.company = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'birthdate':
          if (this.newContact.birthdate) {
            this.hasEdited.birthdate = true;
            this.edit.birthdate = false;
            this.hasDeleted.birthdate = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        case 'notes':
          if (this.newContact.notes) {
            this.hasEdited.notes = true;
            this.edit.notes = false;
            this.hasDeleted.notes = false;
            document.getElementById('confirmBtn').disabled = false;
            this.disabled = false;
          }
          break;
        default:
          this.editContact = false;
          break;
      }
    },
    // NOTE All this does is record what property the user wants to delete, and then enable them to confirm their decision
    deleteProperty(field) {
      switch (field) {
        case 'lastName': {
          this.hasDeleted.lastName = true;
          document.getElementById('confirmBtn').disabled = false;
          this.disabled = false;
          break;
        }
        case 'phone': {
          this.hasDeleted.phone = true;
          document.getElementById('confirmBtn').disabled = false;
          this.disabled = false;
          break;
        }
        case 'email': {
          this.hasDeleted.email = true;
          document.getElementById('confirmBtn').disabled = false;
          this.disabled = false;
          break;
        }
        case 'address': {
          this.hasDeleted.address = true;
          document.getElementById('confirmBtn').disabled = false;
          this.disabled = false;
          break;
        }
        case 'company': {
          this.hasDeleted.company = true;
          document.getElementById('confirmBtn').disabled = false;
          this.disabled = false;
          break;
        }
        case 'birthdate': {
          this.hasDeleted.birthdate = true;
          document.getElementById('confirmBtn').disabled = false;
          this.disabled = false;
          break;
        }
        case 'notes': {
          this.hasDeleted.notes = true;
          document.getElementById('confirmBtn').disabled = false;
          this.disabled = false;
          break;
        }

        default:
          this.editContact = false;
          break;
      }
    },
    // TODO ************* Don't forget to add in form validation here also *****************
    // NOTE This will check for any properties that were designated to be deleted, then ***CHECK FORM VALIDATION*** and then send off the contact to be updated and notify parent components of update.
    updateContact() {
      this.checkForDeletions();
      this.$store.dispatch('updateContact', this.newContact);
      this.$root.$emit('setUpdatedContact', this.newContact);
      this.$emit('newContact', this.newContact);
      this.$emit('hasConfirmed');
      this.$emit('stopEditing');
    },
    // NOTE This checks the different boolean values and then appropriatlly deletes the designated properties; the reason I wait until the end is because the user may initally want to delete a property but then change their mind, so all they would have to do is hit 'cancel' and nothing would have actually occured (versus actually deleting the property right when they click on 'delete' and then when they change their mind having to reassign it from an older/original version stored somewhere).
    checkForDeletions() {
      if (this.hasDeleted.lastName) {
        delete this.newContact.lastName;
      }
      if (this.hasDeleted.phone) {
        delete this.newContact.phone;
      }
      if (this.hasDeleted.email) {
        delete this.newContact.email;
      }
      if (this.hasDeleted.birthdate) {
        delete this.newContact.birthdate;
      }
      if (this.hasDeleted.company) {
        delete this.newContact.company;
      }
      if (this.hasDeleted.address) {
        delete this.newContact.address;
      }
      if (this.hasDeleted.notes) {
        delete this.newContact.notes;
      }
    },
    cancelAdd() {
      this.showAddToContact = false;
    },
    // NOTE This will check contact data that was passed up from the child Add To Contact component, and then switch some booleans accordingly which will then influence how the tempalte is rendered (to include the newly added properties).
    checkAddedProperties(contactInfo) {
      this.newContact = contactInfo.newContact;
      this.hasAdded = contactInfo.hasConfirmed;
      document.getElementById('confirmBtn').disabled = false;
      this.disabled = false;
      this.cancelAdd();
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
div.addressEdit,
div.phoneEdit,
div.emailEdit,
div.companyEdit {
  text-align: start;
}

/* Input */
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
/* Confirmations */
.edited {
  color: goldenrod;
}
.deleted {
  color: rgb(202, 22, 22);
}
.added {
  color: rgb(5, 185, 5);
}

/* Row 1 */
/* (Name and Birthdate) */
div.detailsRow1 {
  height: 165px;
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
  flex-direction: column;
}

/* (Phone/Email/Company)  */
div.phoneEmailCompanyWrapper {
  font-size: 15px;
  height: 50px;
}
div.phoneWrapper {
  width: 110px;
  margin-right: 10px;
}
div.emailWrapper {
  width: 180px;
  overflow-x: auto;
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

/* (Address)  */
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
div.notes {
  height: 100px;
  overflow-y: auto;
  background-color: rgb(71, 71, 71);
  border-radius: 4px 4px 4px 4px;
}

/* Button styling */
div.detailsFooter {
  height: 55px;
  padding-top: 10px;
}
div.buttons {
  justify-content: center;
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
div.buttons div.cancelButton button:hover {
  color: red;
}
div.buttons div.addButton button:hover {
  color: rgb(5, 185, 5);
}
div.buttons div.confirmButton button:hover {
  color: goldenrod;
}
div.buttons button:disabled {
  color: white !important;
  background-color: transparent;
  text-shadow: none;
  box-shadow: none;
  border: 1pt solid white;
}
div.buttons button:active {
  color: white !important;
  outline: none !important;
  box-shadow: none !important;
  border: 1pt solid white !important;
  text-shadow: 1px 1px 1px black;
}
div.buttons div.cancelButton button:active {
  background-color: red;
}
div.buttons div.addButton button:active {
  background-color: rgb(5, 185, 5);
}
div.buttons div.confirmButton button:active {
  background-color: goldenrod;
}
div.buttons button:focus {
  background-color: lightgray;
  outline: none;
  text-shadow: 1px 1px 1px black;
}
div.buttons div.cancelButton button:focus {
  box-shadow: 0pt 0pt 12pt red;
  color: red;
}
div.buttons div.addButton button:focus {
  box-shadow: 0pt 0pt 12pt rgb(5, 185, 5);
  color: rgb(5, 185, 5);
}
div.buttons div.confirmButton button:focus {
  box-shadow: 0pt 0pt 12pt goldenrod;
  color: goldenrod;
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
