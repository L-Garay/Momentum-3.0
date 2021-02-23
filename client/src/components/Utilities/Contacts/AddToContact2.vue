<template>
  <div class="addToContactWrapper">
    <div class="addToContactBody">
      <div class="lastNameInput" v-show="HasProperty.lastName == false">
        <div class="label">
          <p>Last Name:</p>
        </div>
        <input
          type="text"
          class="input"
          v-if="contactInfo.hasConfirmed.lastName == false"
          v-model="contactInfo.newContact.lastName"
          v-on:keyup.enter="finishAdding('lastName')"
        />
        <div class="addedData" v-else>
          <p>{{ contactInfo.newContact.lastName }}</p>
        </div>
      </div>
      <div class="phoneInput" v-show="HasProperty.phone == false">
        <div class="label">
          <p>Phone:</p>
        </div>
        <input
          type="text"
          class="input"
          v-if="contactInfo.hasConfirmed.phone == false"
          v-model="contactInfo.newContact.phone"
          v-on:keyup.enter="finishAdding('phone')"
        />
        <div class="addedData" v-else>
          <p>{{ contactInfo.newContact.phone }}</p>
        </div>
      </div>
      <div class="emailInput" v-show="HasProperty.email == false">
        <div class="label">
          <p>Email:</p>
        </div>
        <input
          type="text"
          class="input"
          v-if="contactInfo.hasConfirmed.email == false"
          v-model="contactInfo.newContact.email"
          v-on:keyup.enter="finishAdding('email')"
        />
        <div class="addedData" v-else>
          <p>{{ contactInfo.newContact.email }}</p>
        </div>
      </div>
      <div class="addressInput" v-show="HasProperty.address == false">
        <div class="label">
          <p>Address:</p>
        </div>
        <input
          type="text"
          class="input"
          v-if="contactInfo.hasConfirmed.address == false"
          v-model="contactInfo.newContact.address"
          v-on:keyup.enter="finishAdding('address')"
        />
        <div class="addedData" v-else>
          <p>{{ contactInfo.newContact.address }}</p>
        </div>
      </div>
      <div class="companyInput" v-show="HasProperty.company == false">
        <div class="label">
          <p>Company:</p>
        </div>
        <input
          type="text"
          class="input"
          v-if="contactInfo.hasConfirmed.company == false"
          v-model="contactInfo.newContact.company"
          v-on:keyup.enter="finishAdding('company')"
        />
        <div class="addedData" v-else>
          <p>{{ contactInfo.newContact.company }}</p>
        </div>
      </div>
      <div class="birthdateInput" v-show="HasProperty.birthdate == false">
        <div class="label">
          <p>Birthdate:</p>
        </div>
        <input
          type="text"
          class="input"
          v-if="contactInfo.hasConfirmed.birthdate == false"
          v-model="contactInfo.newContact.birthdate"
          v-on:keyup.enter="finishAdding('birthdate')"
        />
        <div class="addedData" v-else>
          <p>{{ contactInfo.newContact.birthdate }}</p>
        </div>
      </div>
      <div class="notesInput" v-show="HasProperty.notes == false">
        <div class="label">
          <p>Notes:</p>
        </div>
        <input
          type="text"
          class="input"
          v-if="contactInfo.hasConfirmed.notes == false"
          v-model="contactInfo.newContact.notes"
          v-on:keyup.enter="finishAdding('notes')"
        />
        <div class="addedData" v-else>
          <p>{{ contactInfo.newContact.notes }}</p>
        </div>
      </div>
    </div>
    <div class="addToContactFooter">
      <div class="buttons">
        <div class="cancelBtn">
          <button @click="cancelAdd">Cancel</button>
        </div>
        <div class="confirmBtn">
          <button @click="confirmAdditions">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueInputAutoWidth from 'vue-input-autowidth';
import Vue from 'vue';
Vue.use(VueInputAutoWidth);
export default {
  name: 'AddToContact2',
  props: ['propertyData', 'contactData'],
  components: {},
  data() {
    return {
      contactInfo: {
        newContact: { ...this.contactData },
        hasConfirmed: {
          lastName: false,
          phone: false,
          email: false,
          address: false,
          birthdate: false,
          company: false,
          notes: false,
        },
      },
    };
  },
  mounted() {},
  computed: {
    HasProperty() {
      return this.propertyData;
    },
  },
  methods: {
    cancelAdd() {
      this.$emit('cancelAdd');
    },
    finishAdding(field) {
      switch (field) {
        case 'lastName':
          this.contactInfo.hasConfirmed.lastName = true;
          break;
        case 'phone':
          this.contactInfo.hasConfirmed.phone = true;
          break;
        case 'email':
          this.contactInfo.hasConfirmed.email = true;
          break;
        case 'address':
          this.contactInfo.hasConfirmed.address = true;
          break;
        case 'company':
          this.contactInfo.hasConfirmed.company = true;
          break;
        case 'birthdate':
          this.contactInfo.hasConfirmed.birthdate = true;
          break;
        case 'notes':
          this.contactInfo.hasConfirmed.notes = true;
          break;

        default:
          this.editContact = false;
          break;
      }
    },
    confirmAdditions() {
      this.$emit('confirmAdditions', this.contactInfo);
    },
  },
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
div.addToContactWrapper {
  height: 250px;
  width: 300px;
  background-color: rgb(236, 236, 236);
  color: black;
  position: absolute;
  bottom: 20%;
  left: 20%;
}
div.addToContactBody {
  height: 217px;
  padding-top: 5px;
}
div.addToContactBody div {
  display: flex;
  margin-bottom: 5px;
}

div.addToContactBody div.label {
  width: 65px;
  margin-bottom: 0;
  align-items: center;
}
div.label p {
  font-size: 12px;
  padding-left: 5px;
}
input {
  margin-left: 7px;
  height: 25px;
  width: 200px;
  font-size: 14px;
  background-color: transparent;
  border: none;
  border-bottom: 1pt solid black;
}
div.addToContactFooter {
  height: 33px;
}
div.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  font-size: 12px;
}
div.buttons button {
  margin: 0 3px;
}
</style>
