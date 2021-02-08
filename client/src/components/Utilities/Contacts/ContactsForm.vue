<template>
  <div class="contactForm">
    <form>
      <div class="form-row">
        <div class="col-md-3 mb-1">
          <label class="left" for="validationDefault01">First name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="validationDefault01"
            placeholder="Bob"
            required
            v-model="contact.firstName"
          />
        </div>
        <div class="col-md-3 mb-1">
          <label class="left" for="validationDefault02">Last name</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="validationDefault02"
            placeholder="Smith"
            v-model="contact.lastName"
          />
        </div>
        <div class="col-md-3 mb-1">
          <label class="left" for="validationDefaultUsername">Phone #</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="validationDefaultUsername"
            placeholder="(208) 123-4567"
            aria-describedby="inputGroupPrepend2"
            v-model="contact.phone"
          />
        </div>
        <div class="col-md-5 mb-1">
          <label class="left" for="validationDefaultUsername">Email</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="validationDefaultUsername"
            placeholder="work@mail.com"
            aria-describedby="inputGroupPrepend2"
            v-model="contact.email"
          />
        </div>
        <div class="col-md-5 mb-1">
          <label class="left" for="validationDefault03">Address</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="validationDefault03"
            placeholder="123 N Julia St"
            v-model="contact.address"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-3 mb-1">
          <label class="left" for="validationDefault04">City</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="validationDefault04"
            placeholder="Springfield"
            v-model="contact.city"
          />
        </div>
        <div class="col-md-3 mb-1">
          <label class="left" for="validationDefault04">State</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="validationDefault04"
            placeholder="Idaho"
            v-model="contact.state"
          />
        </div>
        <div class="col-md-2 mb-1">
          <label class="left" for="validationDefault05">Zip</label>
          <input
            type="text"
            class="form-control form-control-sm"
            id="validationDefault05"
            placeholder="12345"
            v-model="contact.zip"
          />
        </div>
        <div id="notes" class="col-md-9 mb-3 mt-3">
          <label for="NotesTextArea">Notes</label>
          <textarea
            class="form-control form-control-sm"
            id="NotesTextArea"
            rows="3"
            placeholder="You can put any extra information or reminders here"
            v-model="contact.notes"
          ></textarea>
        </div>
      </div>

      <button class="btn btn-primary" type="button" @click="createContact">
        Submit form
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ContactsFormComponent',
  data() {
    return {
      contact: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: 0,
        notes: '',
        userId: '',
      },
    };
  },
  mounted() {},
  computed: {},
  methods: {
    createContact() {
      this.contact.userId = this.$store.state.user.user._id;
      this.$store.dispatch('createContact', this.contact);
      this.contact = {};
      this.$emit('submittedForm');
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
