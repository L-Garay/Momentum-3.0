<template>
  <div class="contactForm">
    <form>
      <div class="form-row">
        <div class="col-md-3 mb-3 mr-4">
          <label class="left" for="firstName">First name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Bob"
            required
            v-model="contact.firstName"
            v-autowidth="{
              maxWidth: '115px',
              minWidth: '80px',
              comfortZone: 10,
            }"
          />
        </div>
        <div class="col-md-3 mb-3 mr-4">
          <label class="left" for="validationDefault02">Last name</label>
          <input
            type="text"
            id="validationDefault02"
            placeholder="Smith"
            v-model="contact.lastName"
            v-autowidth="{
              maxWidth: '115px',
              minWidth: '80px',
              comfortZone: 10,
            }"
          />
        </div>
        <div class="col-md-3 mb-3">
          <label class="left" for="validationDefaultUsername">Phone #</label>
          <input
            type="text"
            id="validationDefaultUsername"
            placeholder="(208) 123-4567"
            v-model="contact.phone"
            v-autowidth="{
              maxWidth: '140px',
              minWidth: '90px',
              comfortZone: 10,
            }"
          />
        </div>
        <div class="col-md-5 mb-3 mr-2">
          <label class="left" for="validationDefaultUsername">Email</label>
          <input
            type="text"
            id="validationDefaultUsername"
            placeholder="work@mail.com"
            v-model="contact.email"
            v-autowidth="{
              maxWidth: '175px',
              minWidth: '90px',
              comfortZone: 10,
            }"
          />
        </div>
        <div class="col-md-5 mb-3">
          <label class="left" for="validationDefault03">Address</label>
          <input
            type="text"
            id="validationDefault03"
            placeholder="123 N Juliana St"
            v-model="contact.address"
            v-autowidth="{
              maxWidth: '200px',
              minWidth: '90px',
              comfortZone: 10,
            }"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-3 mb-2 mr-4">
          <label class="left" for="validationDefault04">City</label>
          <input
            type="text"
            id="validationDefault04"
            placeholder="Springfield"
            v-model="contact.city"
            v-autowidth="{
              maxWidth: '115px',
              minWidth: '80px',
              comfortZone: 10,
            }"
          />
        </div>
        <div class="col-md-3 mb-2 mr-4">
          <label class="left" for="validationDefault04">State</label>
          <input
            type="text"
            id="validationDefault04"
            placeholder="Idaho"
            v-model="contact.state"
            v-autowidth="{
              maxWidth: '115px',
              minWidth: '80px',
              comfortZone: 10,
            }"
          />
        </div>
        <div class="col-md-2 mb-2">
          <label class="left" for="validationDefault05">Zip</label>
          <input
            type="text"
            id="validationDefault05"
            placeholder="12345"
            v-model="contact.zip"
            v-autowidth="{
              maxWidth: '100px',
              minWidth: '70px',
              comfortZone: 10,
            }"
          />
        </div>
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
        <button class="Btn submitBtn" type="button" @click="createContact">
          Submit form
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactsFormComponent',
  data() {
    return {
      contact: {},
    };
  },
  mounted() {},
  computed: {},
  methods: {
    createContact() {
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
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.col-md-2,
.col-md-3,
.col-md-5,
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
button.Btn {
  background-color: transparent;
  border-radius: 5px 5px 5px 5px;
  border: 1pt solid white;
  color: white;
  margin: 0 5px;
}
button.Btn:hover {
  background-color: lightgray;
  color: black;
  border: 1pt solid black;
  box-shadow: 0pt 0pt 6pt white, 0pt 0pt 6pt white;
  text-shadow: 1px 1px 2px black;
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
  box-shadow: 1pt 0pt 10pt rgba(0, 0, 0, 0.692) !important;
}
</style>
