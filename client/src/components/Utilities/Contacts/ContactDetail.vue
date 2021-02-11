<template>
  <div v-if="editContact == false" class="detailsWrapper">
    <div class="detailsRow1">
      <div class="firstNameWrapper">
        <div v-if="hasConfirmed == false" class="firstName">
          <p>{{ contactData.firstName }}</p>
        </div>
        <div v-else class="confirmed">
          <p>{{ newContact.firstName }}</p>
        </div>
      </div>
      <div class="lastNameWrapper">
        <div
          v-if="contactData.lastName && hasConfirmed == false"
          class="lastName"
        >
          <p>{{ contactData.lastName }}</p>
        </div>
        <div v-else-if="hasConfirmed == true" class="confirmed">
          <p>{{ newContact.lastName }}</p>
        </div>
      </div>
    </div>
    <div class="detailsRow2">
      <div class="phoneWrapper">
        <div v-if="contactData.phone && hasConfirmed == false" class="phone">
          <p>{{ contactData.phone }}</p>
        </div>
        <div v-else-if="hasConfirmed == true" class="confirmed">
          <p>{{ newContact.phone }}</p>
        </div>
      </div>
      <div class="emailWrapper">
        <div v-if="contactData.email && hasConfirmed == false" class="email">
          <p>{{ contactData.email }}</p>
        </div>
        <div v-else-if="hasConfirmed == true" class="confirmed">
          <p>{{ newContact.email }}</p>
        </div>
      </div>
    </div>
    <div class="detailsRow3">
      <div class="addressWrapper">
        <div
          v-if="contactData.address && hasConfirmed == false"
          class="address"
        >
          <p>{{ contactData.address }}</p>
        </div>
        <div v-else-if="hasConfirmed == true" class="confirmed">
          <p>{{ newContact.address }}</p>
        </div>
      </div>
      <div class="cityWrapper">
        <div v-if="contactData.city && hasConfirmed == false" class="city">
          <p>{{ contactData.city }},</p>
        </div>
        <div v-else-if="hasConfirmed == true" class="confirmed">
          <p>{{ newContact.city }}</p>
        </div>
      </div>
      <div class="stateWrapper">
        <div v-if="contactData.state && hasConfirmed == false" class="state">
          <p>{{ contactData.state }}</p>
        </div>
        <div v-else-if="hasConfirmed == true" class="confirmed">
          <p>{{ newContact.state }}</p>
        </div>
      </div>
      <div class="zipWrapper">
        <div v-if="contactData.city && hasConfirmed == false" class="zip">
          <p>({{ contactData.zip }})</p>
        </div>
        <div v-else-if="hasConfirmed == true" class="confirmed">
          <p>{{ newContact.zip }}</p>
        </div>
      </div>
    </div>
    <div class="detailsRow4">
      <div class="notesWrapper">
        <div v-if="contactData.notes && hasConfirmed == false" class="notes">
          <p>{{ contactData.notes }}</p>
        </div>
        <div v-else-if="hasConfirmed == true" class="confirmed">
          <p>{{ newContact.notes }}</p>
        </div>
      </div>
    </div>
    <div class="detailsRow5">
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
  <edit-contact
    v-else
    :contactData="newContact"
    @stopEditing="stopEditing"
    @hasConfirmed="confirmed"
    @newContact="setNewContact"
  />
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
import EditContact from '@/components/Utilities/Contacts/EditContact.vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'ContactDetailComponent',
  props: ['contactData'],
  components: {
    EditContact,
  },
  data() {
    return {
      newContact: { ...this.contactData },
      editContact: false,
      hasConfirmed: false,
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
    },
    stopEditing() {
      this.editContact = false;
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
div.detailsRow1 {
  display: flex;
  font-size: 36px;
}
div.detailsRow1 div.lastName {
  margin-left: 7px;
}
div.firstName,
div.lastName,
div.phone,
div.email,
div.address,
div.city,
div.state,
div.zip,
div.notes {
  display: flex;
}
div.firstName i,
div.lastName i {
  font-size: 12px;
}
div.phone i,
div.email i {
  font-size: 10px;
}
div.address i,
div.city i,
div.state i,
div.zip i {
  font-size: 9px;
}
div.notes i {
  font-size: 6px;
}

div.detailsRow2 {
  display: flex;
  font-size: 26px;
}
div.detailsRow2 div.email {
  margin-left: 45px;
}

div.detailsRow3 {
  display: flex;
  font-size: 21px;
}
div.detailsRow3 div.city,
div.detailsRow3 div.state,
div.detailsRow3 div.zip {
  margin-left: 5px;
}

div.detailsRow5 {
  display: flex;
  justify-content: center;
}
</style>
