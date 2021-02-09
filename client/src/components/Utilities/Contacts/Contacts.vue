<template>
  <div class="contactsWrapper">
    <div class="contactsComponent">
      <div v-if="show.main" class="mainSection">
        <div class="mainHeader">
          <div class="newContactBtn">
            <p @click="showForm">Add new Contact</p>
          </div>
          <div class="letterIndex">
            <div class="buffer activeLetter" id="A" @click="selectLetter('A')">
              <p>A</p>
            </div>
            <div class="buffer" id="B" @click="selectLetter('B')"><p>B</p></div>
            <div class="buffer" id="C" @click="selectLetter('C')"><p>C</p></div>
            <div class="buffer" id="D" @click="selectLetter('D')"><p>D</p></div>
            <div class="buffer" id="E" @click="selectLetter('E')"><p>E</p></div>
            <!-- I have to use 'f' for the id and method parameter for some reason, as a capital 'F' will not work properly; the selectLetter's getElementById doesn't capture the capital 'F' (maybe it's a reserved letter) -->
            <div class="buffer" id="f" @click="selectLetter('f')">
              <p>F</p>
            </div>
            <div class="buffer" id="G" @click="selectLetter('G')"><p>G</p></div>
            <div class="buffer" id="H" @click="selectLetter('H')"><p>H</p></div>
            <div class="buffer" id="I" @click="selectLetter('I')"><p>I</p></div>
            <div class="buffer" id="J" @click="selectLetter('J')"><p>J</p></div>
            <div class="buffer" id="K" @click="selectLetter('K')"><p>K</p></div>
            <div class="buffer" id="L" @click="selectLetter('L')"><p>L</p></div>
            <div class="buffer" id="M" @click="selectLetter('M')"><p>M</p></div>
            <div class="buffer" id="N" @click="selectLetter('N')"><p>N</p></div>
            <div class="buffer" id="O" @click="selectLetter('O')"><p>O</p></div>
            <div class="buffer" id="P" @click="selectLetter('P')"><p>P</p></div>
            <div class="buffer" id="Q" @click="selectLetter('Q')"><p>Q</p></div>
            <div class="buffer" id="R" @click="selectLetter('R')"><p>R</p></div>
            <div class="buffer" id="S" @click="selectLetter('S')"><p>S</p></div>
            <div class="buffer" id="T" @click="selectLetter('T')"><p>T</p></div>
            <div class="buffer" id="U" @click="selectLetter('U')"><p>U</p></div>
            <div class="buffer" id="V" @click="selectLetter('V')"><p>V</p></div>
            <div class="buffer" id="W" @click="selectLetter('W')"><p>W</p></div>
            <div class="buffer" id="X" @click="selectLetter('X')"><p>X</p></div>
            <div class="buffer" id="Y" @click="selectLetter('Y')"><p>Y</p></div>
            <div class="buffer" id="Z" @click="selectLetter('Z')">
              <p>Z</p>
            </div>
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
      letter: {
        current: 'A',
        new: '',
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
      return this.$store.state.contacts.specificLetter;
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
    selectLetter(letter) {
      console.log(letter);
      console.log(this.letter.current);
      document
        .getElementById(this.letter.current)
        .classList.remove('activeLetter');
      document.getElementById(letter).classList.add('activeLetter');
      this.letter.current = letter;
      this.$store.dispatch('filterContacts', letter);
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
div.buffer.activeLetter p {
  font-size: 15px;
  text-shadow: 1px 0pt 8pt white, 1px 0pt 8pt white, 1px 0pt 8pt white;
  /* text-shadow: 10px 0 50px red; */
}

/* Form section styling */
</style>
