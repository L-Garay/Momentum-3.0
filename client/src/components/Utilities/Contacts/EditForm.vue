<template>
  <div class="contactForm">
    <form>
      <div class="form-row">
        <div class="col-md-3 mb-1">
          <label class="left" for="firstName">First name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="firstName"
            required
            v-model="editedContact.firstName"
          />
        </div>
        <div class="col-md-3 mb-1">
          <label class="left" for="lastName">Last name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="lastName"
            v-model="editedContact.lastName"
          />
        </div>
        <div class="col-md-3 mb-1">
          <label class="left" for="phone">Phone #</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="phone"
            aria-describedby="inputGroupPrepend2"
            v-model="editedContact.phone"
          />
        </div>
        <div class="col-md-5 mb-1">
          <label class="left" for="email">Email</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="email"
            aria-describedby="inputGroupPrepend2"
            v-model="editedContact.email"
          />
        </div>
        <div class="col-md-5 mb-1">
          <label class="left" for="address">Address</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="address"
            v-model="editedContact.address"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-3 mb-1">
          <label class="left" for="city">City</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="city"
            v-model="editedContact.city"
          />
        </div>
        <div class="col-md-3 mb-1">
          <label class="left" for="state">State</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="state"
            v-model="editedContact.state"
          />
        </div>
        <div class="col-md-2 mb-1">
          <label class="left" for="zip">Zip</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="zip"
            v-model="editedContact.zip"
          />
        </div>
        <div id="notes" class="col-md-9 mb-3 mt-3">
          <label for="notesTextArea">Notes</label>
          <textarea
            class="form-control form-control-sm"
            id="notesTextArea"
            rows="3"
            v-model="editedContact.notes"
          ></textarea>
        </div>
      </div>

      <button class="btn btn-secondary" type="button">
        Cancel
      </button>
      <button class="btn btn-primary" type="button">
        Submit form
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EditFormComponent',
  props: ['contactData'],
  data() {
    return {
      originalContact: this.contactData,
      editedContact: {},
    };
  },
  mounted() {
    this.populateForm();
  },
  computed: {},
  methods: {
    populateForm() {
      document.getElementById('firstName').value = this.contactData.firstName;
      if (typeof this.contactData.lastName === 'undefined') {
        document.getElementById('lastName').placeholder = 'Smith';
      } else {
        document.getElementById('lastName').value = this.contactData.lastName;
      }
      if (typeof this.contactData.phone === 'undefined') {
        document.getElementById('phone').placeholder = '(208) 123-4567';
      } else {
        document.getElementById('phone').value = this.contactData.phone;
      }
      if (typeof this.contactData.email === 'undefined') {
        document.getElementById('email').placeholder = 'work@mail.com';
      } else {
        document.getElementById('email').value = this.contactData.email;
      }
      if (typeof this.contactData.address === 'undefined') {
        document.getElementById('address').placeholder = '123 N Capital St';
      } else {
        document.getElementById('address').value = this.contactData.address;
      }
      if (typeof this.contactData.city === 'undefined') {
        document.getElementById('city').placeholder = 'Springfield';
      } else {
        document.getElementById('city').value = this.contactData.city;
      }
      if (typeof this.contactData.state === 'undefined') {
        document.getElementById('state').placeholder = 'Idaho';
      } else {
        document.getElementById('state').value = this.contactData.state;
      }
      if (typeof this.contactData.zip === 'undefined') {
        document.getElementById('zip').placeholder = '87654';
      } else {
        document.getElementById('zip').value = this.contactData.zip;
      }
      if (typeof this.contactData.notes === 'undefined') {
        document.getElementById('notesTextArea').placeholder =
          'Put any notes here';
      } else {
        document.getElementById('notesTextArea').value = this.contactData.notes;
      }
    },
    cancel() {
      this.$emit('cancel');
    },
    editContact() {
      this.contact.edited.userId = this.contactData.userId;
      this.contact.edited._id = this.contactData._id;
      this.$store.dispatch('editContact', this.contact.edited);
    },
  },
};
</script>

<style scoped>
label {
  margin-bottom: 2px;
}
label.left {
  float: left;
}
div#notes {
  margin: auto;
}
textarea {
  resize: none;
}
</style>
