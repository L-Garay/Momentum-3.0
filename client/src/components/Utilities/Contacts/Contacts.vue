<template>
  <div class="contactsWrapper">
    <div class="contactsComponent">
      <div v-if="show.main" class="mainSection">
        <div class="mainHeader">
          <div class="newContactBtn">
            <p @click="showForm">Add new Contact</p>
          </div>
          <div class="letterIndex">
            <div class="buffer"><p>A</p></div>
            <div class="buffer"><p>B</p></div>
            <div class="buffer"><p>C</p></div>
            <div class="buffer"><p>D</p></div>
            <div class="buffer"><p>E</p></div>
            <div class="buffer"><p>F</p></div>
            <div class="buffer"><p>G</p></div>
            <div class="buffer"><p>H</p></div>
            <div class="buffer"><p>I</p></div>
            <div class="buffer"><p>J</p></div>
            <div class="buffer"><p>K</p></div>
            <div class="buffer"><p>L</p></div>
            <div class="buffer"><p>M</p></div>
            <div class="buffer"><p>N</p></div>
            <div class="buffer"><p>O</p></div>
            <div class="buffer"><p>P</p></div>
            <div class="buffer"><p>Q</p></div>
            <div class="buffer"><p>R</p></div>
            <div class="buffer"><p>S</p></div>
            <div class="buffer"><p>T</p></div>
            <div class="buffer"><p>U</p></div>
            <div class="buffer"><p>V</p></div>
            <div class="buffer"><p>W</p></div>
            <div class="buffer"><p>X</p></div>
            <div class="buffer"><p>Y</p></div>
            <div class="buffer"><p>Z</p></div>
          </div>
        </div>
        <div class="mainBody">
          {{ SpecificLetter }}
        </div>
      </div>
      <div v-if="show.form" class="formSection">
        <contacts-form @submittedForm="showMain" />
      </div>
      <div v-if="show.details" class="contactDetailsSection">
        <contact-detail />
      </div>
    </div>
  </div>
</template>

<script>
import ContactsForm from '@/components/Utilities/Contacts/ContactsForm.vue';
import ContactDetail from '@/components/Utilities/Contacts/ContactDetail.vue';
export default {
  name: 'ContactsComponent',
  components: {
    ContactsForm,
    ContactDetail,
  },
  props: [],
  data() {
    return {
      show: {
        main: true,
        form: false,
        details: false,
      },
    };
  },
  mounted() {
    this.$store.dispatch(
      'getContactsByUserId',
      this.$store.state.user.user._id
    );
  },
  computed: {
    SpecificLetter() {
      return this.$store.state.contacts.all;
    },
  },
  methods: {
    showForm() {
      this.show.main = false;
      this.show.details = false;
      this.show.form = true;
    },
    showMain() {
      this.show.form = false;
      this.show.details = false;
      this.show.main = true;
    },
  },
};
</script>

<style scoped>
.contactsWrapper {
  text-align: center;
  text-align: -webkit-center;
  margin-top: 12px;
}
.contactsComponent {
  background-color: transparent;
  width: 475px;
  height: 355px;
}
.mainHeader {
}
.newContactBtn p {
  display: inline-block;
}
.newContactBtn p:hover {
  cursor: pointer;
  text-shadow: 10px 0px 20px white;
}
.letterIndex {
  display: flex;
  justify-content: center;
  border-bottom: 1pt solid white;
}
.letterIndex p {
  font-size: 13px;
  padding: 2px 5px;
  margin-bottom: 5px;
}
.letterIndex p:hover {
  cursor: pointer;
  font-size: 15px;
}
.buffer {
  height: 26px;
  width: 20px;
}

/* Form section styling */
</style>
