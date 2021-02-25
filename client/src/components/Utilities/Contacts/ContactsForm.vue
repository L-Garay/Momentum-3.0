<template>
  <div class="contactForm">
    <form>
      <div class="form-row">
        <div class="col-md-3 mb-3 mr-3">
          <label class="left" for="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Bob"
            name="firstName"
            required
            v-model="contact.firstName"
            v-autowidth="{
              maxWidth: '115px',
              minWidth: '80px',
              comfortZone: 5,
            }"
          />
        </div>
        <div class="col-md-5 mb-3 ">
          <label class="left" for="validationDefault02">Last name</label>
          <input
            type="text"
            id="validationDefault02"
            placeholder="Smith"
            v-model="contact.lastName"
            v-autowidth="{
              maxWidth: '115px',
              minWidth: '80px',
              comfortZone: 5,
            }"
          />
        </div>
        <div class="col-md-3 mb-2">
          <label class="left" for="validationDefault04">Birthdate</label>
          <input
            type="text"
            id="validationDefault04"
            placeholder="MM-DD-YYYY"
            v-model="contact.birthdate"
            v-autowidth="{
              maxWidth: '115px',
              minWidth: '80px',
              comfortZone: 5,
            }"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-3 mb-3 mr-3">
          <label class="left" for="validationDefaultUsername">Phone #</label>
          <input
            type="text"
            id="validationDefaultUsername"
            placeholder="(208) 123-4567"
            v-model="contact.phone"
            v-autowidth="{
              maxWidth: '120px',
              minWidth: '90px',
              comfortZone: 5,
            }"
          />
        </div>
        <div class="col-md-5 mb-3">
          <label class="left" for="validationDefaultUsername">Email</label>
          <input
            type="text"
            id="validationDefaultUsername"
            placeholder="work@mail.com"
            v-model="contact.email"
            v-autowidth="{
              maxWidth: '180px',
              minWidth: '90px',
              comfortZone: 5,
            }"
          />
        </div>
        <div class="col-md-3 mb-2 mr-3">
          <label class="left" for="validationDefault04">Company</label>
          <input
            type="text"
            id="validationDefault04"
            placeholder="Big Tech LLC"
            v-model="contact.company"
            v-autowidth="{
              maxWidth: '125px',
              minWidth: '80px',
              comfortZone: 5,
            }"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-9 mb-3 address">
          <label class="left" for="validationDefault03">Address</label>
          <input
            type="text"
            id="validationDefault03"
            placeholder="123 N Juliana St, Boise, Idaho 83642"
            v-model="contact.address"
            v-autowidth="{
              maxWidth: '355px',
              minWidth: '110px',
              comfortZone: 10,
            }"
          />
        </div>
      </div>
      <div class="form-row notes-row">
        <div id="notes" class="col-md-9 mb-3 mt-1">
          <label for="NotesTextArea">Notes</label>
          <textarea
            id="NotesTextArea"
            rows="3"
            placeholder="You can put any extra information or reminders here"
            v-model="contact.notes"
          ></textarea>
        </div>
      </div>
      <div class="btnGroup">
        <button class="Btn cancelBtn" type="button" @click="cancel">
          Cancel
        </button>
        <button
          id="submitButton"
          class="Btn submitBtn"
          type="button"
          @click="createContact"
        >
          Submit form
        </button>
      </div>
    </form>
    <div class="errorModalWrapper" v-if="showErrorModal">
      <div class="errorModal">
        <div class="errors">
          <div class="error" v-for="error in this.errors.errors" :key="error">
            <p>{{ error }}</p>
          </div>
        </div>
        <div class="confirmationButton">
          <div class="button">
            <button type="button" @click="closeErrorModal">I understand</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactsFormComponent',
  data() {
    return {
      contact: {},
      errors: {
        hasErrors: false,
        errors: [],
      },
      showErrorModal: true,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    createContact() {
      this.validateForm(this.contact);
      if (this.errors.hasErrors == false) {
        this.contact.userId = this.$store.state.user.user._id;
        this.$store.dispatch('createContact', this.contact);
        if (this.contact.lastName) {
          let name = this.contact.lastName;
          this.$root.$emit('submittedForm', name);
        } else {
          let name = this.contact.firstName;
          this.$root.$emit('submittedForm', name);
        }
        this.contact = {};
      } else {
        console.log(this.errors);
        // // Display the errors in the template
        this.displayErrorModal();
      }
    },
    validateForm() {
      // first name
      if (!this.contact.firstName) {
        let error = `Please provide a first name that is at least 2 characters long.`;
        this.errors.errors.push(error);
        this.errors.hasErrors = true;
      } else if (this.contact.firstName.length < 2) {
        let error = `"${this.contact.firstName}" is too short. Please make sure it is atleast 2 characters long.`;
        this.errors.errors.push(error);
        this.errors.hasErrors = true;
      }
      // email
      if (this.contact.email) {
        let regex = new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (regex.test(this.contact.email) == false) {
          let error = `The address "${this.contact.email}" is not valid. Please provide a valid email address.`;
          this.errors.errors.push(error);
          this.errors.hasErrors = true;
        }
      }
      // phone
      if (this.contact.phone) {
        let regex = new RegExp(
          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
        );
        if (regex.test(this.contact.phone) == false) {
          let error = `The phone number "${this.contact.phone}" is not valid. Please provide a valid phone number.`;
          this.errors.errors.push(error);
          this.errors.hasErrors = true;
        }
      }
    },
    displayErrorModal() {
      this.showErrorModal = true;
    },
    closeErrorModal() {
      this.showErrorModal = false;
      this.errors.errors = [];
      this.errors.hasErrors = false;
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
div.errorModalWrapper {
  height: 200px;
  width: 200px;
  background-color: white;
  color: red;
  position: absolute;
  bottom: 15%;
  left: 30%;
  border-radius: 5px 5px 5px 5px;
}
div.errors {
  height: 165px;
  padding: 5px 5px;
}
div.error {
  margin-bottom: 7px;
}
div.error p {
  font-size: 11px;
  margin-bottom: 0;
}
div.confirmationButton {
  height: 35px;
}
.form-row {
  height: 70px;
}
.form-row.notes-row {
  height: 110px;
  align-content: center;
}
.col-md-3,
.col-md-5,
.col-md-7,
.col-md-9 {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 0;
}
label.left {
  text-align: start;
}
input {
  background-color: transparent;
  border: none;
  border-bottom: 1pt solid white;
  color: goldenrod;
}
input:focus {
  background-color: rgba(116, 116, 116, 0.534);
  border: none;
  border: 1pt solid goldenrod;
  outline: none;
}
input::placeholder {
  color: rgb(170, 170, 170);
}

div#notes {
  margin: auto;
}
textarea {
  background-color: rgba(116, 116, 116, 0.534);
  color: goldenrod;
  resize: none;
  outline: none;
}
textarea::placeholder {
  color: lightgray;
}
textarea:focus {
  border: 1pt solid goldenrod;
}
div.btnGroup {
  height: 35px;
}
button.Btn {
  background-color: transparent;
  border-radius: 5px 5px 5px 5px;
  border: 1pt solid white;
  color: white;
  margin: 0 5px;
  margin-top: 4px;
}
button.Btn:hover {
  background-color: lightgray;
  color: black;
  border: 1pt solid black;
  box-shadow: 0pt 0pt 6pt white, 0pt 0pt 6pt white;
  text-shadow: 1px 1px 1px black;
}
button.cancelBtn:hover {
  color: red;
}
button.submitBtn:hover {
  color: goldenrod;
}
button.cancelBtn:active {
  background-color: red !important;
}
button.submitBtn:active {
  background-color: goldenrod !important;
}
button.Btn:active {
  color: white !important;
  outline: none;
  border: 1pt solid black;
}
button.Btn:focus {
  background-color: rgba(128, 128, 128, 0.39);
  border: 1pt solid white;
  color: white;
}
button.cancelBtn:focus {
  box-shadow: 1pt 0pt 10pt red !important;
}
button.submitBtn:focus {
  box-shadow: 1pt 0pt 10pt goldenrod !important;
}
</style>
