<template>
  <div class="contactsWrapper">
    <div class="contactsComponent">
      <div v-if="show.main" class="mainSection">
        <div class="mainHeader">
          <div class="newContactBtn">
            <p @click="showForm">Add new Contact</p>
          </div>
          <div class="letterIndex">
            <div class="buffer" id="A" @click="selectLetter('A')">
              <p>A</p>
            </div>
            <div class="buffer" id="B" @click="selectLetter('B')"><p>B</p></div>
            <div class="buffer" id="C" @click="selectLetter('C')"><p>C</p></div>
            <div class="buffer" id="D" @click="selectLetter('D')"><p>D</p></div>
            <div class="buffer" id="E" @click="selectLetter('E')"><p>E</p></div>
            <!-- I have to use 'f' for the id and method parameter for some reason, as a capital 'F' will not work properly; the selectLetter's getElementById doesn't capture the capital 'F' (maybe it's a reserved letter) -->
            <div class="buffer" id="f" @click="selectLetter('F')">
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
          <div class="contactListWrapper">
            <div class="contactListHeader">
              <p>{{ CurrentLetter }}</p>
            </div>
            <div class="contactListSection">
              <div
                class="contact"
                v-for="contact in SpecificLetter"
                :key="contact._id"
              >
                <div class="contactName" @click="showDetails(contact)">
                  <p class="firstName">{{ contact.firstName }}</p>

                  <p class="lastName">{{ contact.lastName }}</p>
                </div>
                <div class="contactOptions">
                  <div class="edit">
                    <i @click="toEdit(contact)" class="fas fa-edit fa-xs"></i>
                  </div>
                  <div class="delete">
                    <i
                      @click="deleteContact(contact)"
                      class="fas fa-user-minus fa-xs"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="show.form" class="formSection">
        <contacts-form @cancel="cancel" />
      </div>
      <div v-if="show.details" class="contactDetailsSection">
        <contact-details-2
          :contactData="contact"
          :toEdit="straightToEdit"
          @back="cancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ContactsForm from '@/components/Utilities/Contacts/ContactsForm.vue';
import ContactDetails2 from '@/components/Utilities/Contacts/ContactDetails2.vue';
export default {
  name: 'ContactsComponent',
  components: {
    ContactsForm,
    ContactDetails2,
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
        current: '',
        new: '',
      },
      contact: {},
      straightToEdit: false,
    };
  },
  mounted() {
    this.$root.$on('submittedForm', (name) => {
      this.showMain();
      this.checkLetter(name);
    });
    this.$root.$on('setUpdatedContact', (contact) => {
      this.contact = contact;
    });
    this.checkHighlightAndRepopulate();
  },
  beforeDestroy() {
    this.$store.state.contacts.currentLetter = 'A';
    this.$store.state.contacts.specificLetter = [];
  },
  computed: {
    SpecificLetter() {
      return this.$store.state.contacts.specificLetter;
    },
    CurrentLetter() {
      return this.$store.state.contacts.currentLetter;
    },
  },
  methods: {
    showForm() {
      this.show.main = false;
      this.show.details = false;
      this.show.form = true;
      this.straightToEdit = false;
    },
    showMain() {
      this.show.form = false;
      this.show.details = false;
      this.show.main = true;
      this.straightToEdit = false;
    },
    showDetails(contact) {
      this.contact = contact;
      this.show.form = false;
      this.show.details = true;
      this.show.main = false;
      this.straightToEdit = false;
      this.$store.state.contacts.contact = contact;
    },
    toEdit(contact) {
      this.contact = contact;
      this.show.form = false;
      this.show.details = true;
      this.show.main = false;
      this.straightToEdit = true;
    },
    cancel() {
      this.show.form = false;
      this.show.details = false;
      this.show.main = true;
      this.straightToEdit = false;
      setTimeout(() => {
        this.checkForHighlight();
      }, 50);
    },
    // NOTE these two methods are called when the component gets mounted; i.e when a user opens the contacts tab for the first time or goes from contacts->calendar->contacts
    checkHighlightAndRepopulate() {
      this.checkForHighlight();
      this.repopulate();
    },
    checkForHighlight() {
      if (this.$store.state.contacts.currentLetter === 'F') {
        document.getElementById('f').classList.add('activeLetter');
      } else {
        document
          .getElementById(this.$store.state.contacts.currentLetter)
          .classList.add('activeLetter');
      }
    },
    repopulate() {
      this.$store.dispatch(
        'filterContacts',
        this.$store.state.contacts.currentLetter
      );
    },
    // NOTE this method is only called when a user selects a letter from the index
    selectLetter(letter) {
      // NOTE Since the getElementById wont capture an uppercase 'F', we have to manually check to see if the capital 'F' is passed in, and if it is tell the getElementById to grab the proper element (use a lowercase 'f' for the id); both for adding and removing the activeLetter class.
      if (letter === 'F') {
        document
          .getElementById(this.$store.state.contacts.currentLetter)
          .classList.remove('activeLetter');
        document.getElementById('f').classList.add('activeLetter');
        this.$store.state.contacts.currentLetter = letter;
        this.$store.dispatch('filterContacts', letter);
      } else if (letter !== 'F') {
        if (this.$store.state.contacts.currentLetter === 'F') {
          document.getElementById('f').classList.remove('activeLetter');
        } else if (this.$store.state.contacts.currentLetter !== 'F') {
          document
            .getElementById(this.$store.state.contacts.currentLetter)
            .classList.remove('activeLetter');
        }
        document.getElementById(letter).classList.add('activeLetter');
        this.$store.state.contacts.currentLetter = letter;
        this.$store.dispatch('filterContacts', letter);
      }
    },
    // NOTE this method is only called when a user creates a new contact
    checkLetter(name) {
      console.log(name[0]);
      setTimeout(async () => {
        if (name[0].toUpperCase() === 'F') {
          document
            .getElementById(this.$store.state.contacts.currentLetter)
            .classList.remove('activeLetter');
          document.getElementById('f').classList.add('activeLetter');
        } else if (name[0].toUpperCase() !== 'F') {
          if (this.$store.state.contacts.currentLetter === 'F') {
            document.getElementById('f').classList.remove('activeLetter');
          } else if (this.$store.state.contacts.currentLetter !== 'F') {
            document
              .getElementById(this.$store.state.contacts.currentLetter)
              .classList.remove('activeLetter');
          }
          document
            .getElementById(name[0].toUpperCase())
            .classList.add('activeLetter');
        }
        this.$store.state.contacts.currentLetter = name[0].toUpperCase();
        await this.$store.dispatch(
          'getContactsByUserId',
          this.$store.state.user.user._id
        );
        this.$store.dispatch('filterContacts', name[0]);
      }, 100);
    },
    deleteContact(contact) {
      this.$store.dispatch('deleteContact', contact);
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
.newContactBtn p {
  display: inline-block;
}
.newContactBtn p:hover {
  cursor: pointer;
  text-shadow: 10px 0px 20px white, 10px 0px 20px white;
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
div.contactListHeader p {
  margin-bottom: 0;
}
div.contactListSection {
  max-height: 260px;
  overflow-y: auto;
}
.contact {
  display: flex;
  justify-content: space-between;
  margin: 6px 0px;
}
.contact p {
  margin-bottom: 0;
}
.contact .contactName {
  display: flex;
  font-size: 20px;
}
.contact .contactName:hover {
  cursor: pointer;
  text-shadow: 1px 0pt 8pt white, 1px 0pt 8pt white;
}
.contactName p.firstName {
  color: rgb(231, 231, 231);
  margin-right: 7px;
  font-weight: 350;
}
.contactName p.lastName {
  font-weight: 450;
}
.contact .contactOptions {
  display: flex;
}
.contactOptions div {
  margin: 0 5px;
  cursor: pointer;
}
.contactOptions .edit:hover {
  color: rgb(10, 199, 10);
}
.contactOptions .delete:hover {
  color: red;
}
</style>
