<template>
  <div class="contactForm">
    <form>
      <div class="form-row">
        <div class="col-md-3 mb-3 mr-3">
          <label class="left" for="firstName"
            >First name
            <span v-if="errors.fields.firstName"
              ><small><i class="fas fa-exclamation-circle"></i></small></span
          ></label>
          <input
            type="text"
            id="firstName"
            placeholder="Bob"
            name="firstName"
            required
            v-model="contact.firstName"
            v-on:blur="removeError('firstName')"
            v-autowidth="{
              maxWidth: '115px',
              minWidth: '80px',
              comfortZone: 5,
            }"
          />
        </div>
        <div class="col-md-5 mb-3 ">
          <label class="left" for="validationDefault02"
            >Last name
            <span v-if="errors.fields.lastName"
              ><small><i class="fas fa-exclamation-circle"></i></small></span
          ></label>
          <input
            type="text"
            id="validationDefault02"
            placeholder="Smith"
            v-model="contact.lastName"
            v-on:blur="removeError('lastName')"
            v-autowidth="{
              maxWidth: '115px',
              minWidth: '80px',
              comfortZone: 5,
            }"
          />
        </div>
        <div class="col-md-3 mb-2">
          <label class="left" for="validationDefault04"
            >Birthdate
            <span v-if="errors.fields.birthdate"
              ><small><i class="fas fa-exclamation-circle"></i></small></span
          ></label>
          <input
            type="text"
            id="validationDefault04"
            placeholder="MM-DD-YYYY"
            v-model="contact.birthdate"
            v-on:blur="removeError('birthdate')"
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
          <label class="left" for="validationDefaultUsername"
            >Phone #
            <span v-if="errors.fields.phone"
              ><small><i class="fas fa-exclamation-circle"></i></small></span
          ></label>
          <input
            type="text"
            id="validationDefaultUsername"
            placeholder="(208) 123-4567"
            v-model="contact.phone"
            v-on:blur="removeError('phone')"
            v-autowidth="{
              maxWidth: '120px',
              minWidth: '90px',
              comfortZone: 5,
            }"
          />
        </div>
        <div class="col-md-5 mb-3">
          <label class="left" for="validationDefaultUsername"
            >Email
            <span v-if="errors.fields.email"
              ><small><i class="fas fa-exclamation-circle"></i></small></span
          ></label>
          <input
            type="text"
            id="validationDefaultUsername"
            placeholder="work@mail.com"
            v-model="contact.email"
            v-on:blur="removeError('email')"
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
          <div
            class="progressBar"
            v-on:mousedown.left="startProgress"
            v-on:mouseup.left="stopProgress"
          >
            <div class="progress" style="height: 25px">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                role="progressbar"
                :style="{ width: progressBar.width.toString() + '%' }"
                :aria-valuenow="progressBar.value.toString()"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <p class="progressLabel">
              I understand!
            </p>
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
        fields: {
          firstName: false,
          phone: false,
          email: false,
          birthdate: false,
          lastName: false,
        },
      },
      showErrorModal: false,
      progressBar: {
        width: 0,
        value: 0,
        interval: undefined,
      },
      progressInterval: undefined,
    };
  },
  mounted() {},
  computed: {},
  methods: {
    startProgress() {
      //This will start when the user clicks the progress bar and holds down the mousebutton
      let interval = setInterval(this.increaseProgress, 250);
      this.progressBar.interval = interval; // To clear the interval, it needs a 'name' just like eventListeners (I believe), so we are assigning it to the 'progressBar.interval' so that when I go to clear it, I can use that name to clear the interval.
    },
    increaseProgress() {
      this.progressBar.width += 15;
      this.progressBar.value += 15;
      if (this.progressBar.width >= 120) {
        // Once it reaches 'full' (since the increments won't add up to exactly 100 we need to allow the values to go over 100 to get the full 2 seconds)
        setTimeout(() => {
          // I don't want the modal to close immediately once it reaches full, I want the user to have a second to see it fill up
          this.closeErrorModal();
          this.stopProgress();
        }, 300);
      }
    },
    resetProgress() {
      this.progressBar.width = 0;
      this.progressBar.value = 0;
    },
    stopProgress() {
      this.resetProgress();
      clearInterval(this.progressBar.interval);
    },
    createContact() {
      this.validateForm(this.contact);
      // Validate all the necessary fields first
      if (this.errors.hasErrors == false) {
        // Check to make sure there were no errors
        this.contact.userId = this.$store.state.user.user._id;
        this.$store.dispatch('createContact', this.contact);
        if (this.contact.lastName) {
          let name = this.contact.lastName;
          this.$root.$emit('submittedForm', name);
        } else {
          // Since 'lastName' isn't required, there may not be one and so we need to use the first name to determine where to place the contact
          let name = this.contact.firstName;
          this.$root.$emit('submittedForm', name);
        }
        this.contact = {};
      } else {
        this.displayErrorModal(); //If there were errors, display the error modal
      }
    },
    validateForm() {
      // first name
      let nameRegex = new RegExp(
        /^[a-zA-Z]+$/
      ); /* NOTE this will check for any lower or uppercase letter ONLY */
      if (!this.contact.firstName) {
        /* If there is no first name */
        let error = `Please provide a first name that is at least 2 characters long.`;
        this.errors.errors.push(error); // Push the error into the global error array
        this.errors.hasErrors = true; // Switch this boolean to signify that there is an error
        this.errors.fields.firstName = true; // Switch this boolean to signify that the particular field has an error
      }
      if (this.contact.firstName.length < 2) {
        /* If the first name is less than 2 characters long */
        let error = `"${this.contact.firstName}" is too short. Please make sure the first name is atleast 2 characters long.`;
        this.errors.errors.push(error);
        this.errors.hasErrors = true;
        this.errors.fields.firstName = true;
      }
      if (nameRegex.test(this.contact.firstName[0]) == false) {
        /* If the first letter of the first name is a number */
        let error = `"${this.contact.firstName}" is not a valid name. Please ensure that the first name starts with a letter.`;
        this.errors.errors.push(error);
        this.errors.hasErrors = true;
        this.errors.fields.firstName = true;
      }
      // last name
      if (this.contact.lastName) {
        if (this.contact.lastName.length < 2) {
          /* If the last name is less than 2 characters long */
          let error = `"${this.contact.lastName}" is too short. Please make sure the last name is atleast 2 characters long.`;
          this.errors.errors.push(error);
          this.errors.hasErrors = true;
          this.errors.fields.lastName = true;
        }
        if (nameRegex.test(this.contact.lastName[0]) == false) {
          /* If the first letter of the last name is a number */
          let error = `"${this.contact.lastName}" is not a valid name. Please ensure that the last name starts with a letter.`;
          this.errors.errors.push(error);
          this.errors.hasErrors = true;
          this.errors.fields.lastName = true;
        }
      }
      // birthdate
      if (this.contact.birthdate) {
        let date = new Date();
        let array = [];
        if (this.contact.birthdate.includes('-')) {
          // Check to see if the user put in '-' or '/' between dates
          array = this.contact.birthdate.split('-');
        } else if (this.contact.birthdate.includes('/')) {
          array = this.contact.birthdate.split('/');
        } else if (
          this.contact.birthdate.includes('/') == false &&
          this.contact.birthdate.includes('-') == false
        ) {
          // If they did not, send the error
          let error = `"${this.contact.birthdate}" is not a valid date. Please ensure that the dates are properly seperated with '-' or '/'.`;
          this.errors.errors.push(error);
          this.errors.hasErrors = true;
          this.errors.fields.birthdate = true;
        }
        if (
          this.contact.birthdate.includes('/') == true ||
          this.contact.birthdate.includes('-') == true
        ) {
          // If they did, now we need to check the actual dates
          if (
            // Even if the use '/' or '-' they could still include letters, so we have to check for that by checking to see if we can turn the indexes into numbers and then test if they actually are numbers or not
            isNaN(parseInt(array[0])) == true ||
            isNaN(parseInt(array[1])) == true ||
            isNaN(parseInt(array[2])) == true
          ) {
            let error = `"${this.contact.birthdate}" includes non-number characters. Please make sure the date is only numbers.`;
            this.errors.errors.push(error);
            this.errors.hasErrors = true;
            this.errors.fields.birthdate = true;
          }
          if (
            /* Check to make sure the month, date, and year are all valid (i.e month cant be 0 or greater than 12) */
            parseInt(array[0]) > 12 ||
            parseInt(array[0]) < 1 ||
            parseInt(array[1]) > 31 ||
            parseInt(array[1]) < 1 ||
            parseInt(array[2]) > date.getFullYear() ||
            parseInt(array[2]) < date.getFullYear() - 140
          ) {
            let error = `"${this.contact.birthdate}" is not a valid date. Please ensure that the dates are correct.`;
            this.errors.errors.push(error);
            this.errors.hasErrors = true;
            this.errors.fields.birthdate = true;
          }
        }
      }
      // phone
      if (this.contact.phone) {
        let regex = new RegExp(
          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
        );
        if (regex.test(this.contact.phone) == false) {
          /* Check to make sure the phone number is valid */
          let error = `The phone number "${this.contact.phone}" is not valid. Please provide a valid phone number.`;
          this.errors.errors.push(error);
          this.errors.hasErrors = true;
          this.errors.fields.phone = true;
        }
      }
      // email
      if (this.contact.email) {
        let regex = new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (regex.test(this.contact.email) == false) {
          /* Check to make sure the email is valid */
          let error = `The address "${this.contact.email}" is not valid. Please provide a valid email address.`;
          this.errors.errors.push(error);
          this.errors.hasErrors = true;
          this.errors.fields.email = true;
        }
      }
    },
    displayErrorModal() {
      this.showErrorModal = true;
    },
    closeErrorModal() {
      this.showErrorModal = false;
      this.clearErrors();
    },
    clearErrors() {
      this.errors.errors = [];
      this.errors.hasErrors = false;
    },
    removeError(field) {
      //Called when a user changes the input of a field with an error and then unfocuses that input box
      switch (field) {
        case 'firstName':
          this.errors.fields.firstName = false;
          break;
        case 'lastName':
          this.errors.fields.lastName = false;
          break;
        case 'birthdate':
          this.errors.fields.birthdate = false;
          break;
        case 'phone':
          this.errors.fields.phone = false;
          break;
        case 'email':
          this.errors.fields.email = false;
          break;

        default:
          this.errors.fields.firstName = false;
          this.errors.fields.phone = false;
          this.errors.fields.email = false;
          this.errors.fields.birthdate = false;
          this.errors.fields.lastName = false;
          break;
      }
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
  overflow-y: auto;
  padding: 5px 5px;
  text-align: left;
}
div.errors::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: grey;
}
div.errors::-webkit-scrollbar-thumb {
  background: red;
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
div.progressBar {
  width: 125px;
  padding-top: 5px;
}
div.progressBar:hover {
  cursor: pointer;
}
div.progress {
  background-color: rgb(156, 156, 156);
}
p.progressLabel {
  margin-bottom: 0;
  position: absolute;
  bottom: 4%;
  left: 26.5%;
  color: white;
  text-shadow: 1pt 1pt 2pt black;
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
label span {
  color: red;
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
