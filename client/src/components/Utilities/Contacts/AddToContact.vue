<template>
  <div class="optionsWrapper">
    <div class="optionsColumn1">
      <div v-if="HasProperty.lastName == false" class="option">
        <p><small>Add Last Name</small></p>
        <input
          type="text"
          ref="focusLastName"
          v-model="newContact.lastName"
          v-autowidth="{
            maxWidth: '120px',
            minWidth: '100px',
            comfortZone: 5,
          }"
        />
      </div>
      <div v-if="HasProperty.phone == false" class="option">
        <p><small>Add Phone</small></p>
        <input
          type="text"
          ref="focusPhone"
          v-model="newContact.phone"
          v-autowidth="{
            maxWidth: '120px',
            minWidth: '100px',
            comfortZone: 5,
          }"
        />
      </div>
      <div v-if="HasProperty.email == false" class="option">
        <p><small>Add Email</small></p>
        <input
          type="text"
          ref="focusEmail"
          v-model="newContact.email"
          v-autowidth="{
            maxWidth: '160px',
            minWidth: '100px',
            comfortZone: 5,
          }"
        />
      </div>
      <div v-if="HasProperty.notes == false" class="option">
        <p><small>Add Notes</small></p>
        <textarea
          id="addNotesTextArea"
          rows="3"
          v-model="newContact.notes"
        ></textarea>
      </div>
    </div>
    <div class="optionsColumn2">
      <div v-if="HasProperty.address == false" class="option">
        <p><small>Add Address</small></p>
        <input
          type="text"
          ref="focusAddress"
          v-model="newContact.address"
          v-autowidth="{
            maxWidth: '120px',
            minWidth: '100px',
            comfortZone: 5,
          }"
        />
      </div>
      <div v-if="HasProperty.city == false" class="option">
        <p><small>Add City</small></p>
        <input
          type="text"
          ref="focusCity"
          v-model="newContact.city"
          v-autowidth="{
            maxWidth: '120px',
            minWidth: '100px',
            comfortZone: 5,
          }"
        />
      </div>
      <div v-if="HasProperty.state == false" class="option">
        <p><small>Add State</small></p>
        <input
          type="text"
          ref="focusState"
          v-model="newContact.state"
          v-autowidth="{
            maxWidth: '120px',
            minWidth: '100px',
            comfortZone: 5,
          }"
        />
      </div>

      <div v-if="HasProperty.zip == false" class="option">
        <p><small>Add Zip</small></p>
        <input
          type="text"
          ref="focusZip"
          v-model="newContact.zip"
          v-autowidth="{
            maxWidth: '120px',
            minWidth: '100px',
            comfortZone: 5,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddToContactComponent',
  props: ['contactData', 'property'],
  data() {
    return {
      newContact: { ...this.contactData },
    };
  },
  mounted() {},
  computed: {
    HasProperty() {
      return this.property;
    },
  },
  methods: {},
};
</script>

<style scoped>
div.optionsWrapper {
  display: flex;
}
div.optionsColumn2 {
  margin-left: 20px;
}
div.option {
  display: flex;
}
div.option p {
  margin-bottom: 0;
  width: 80px;
  text-align: start;
}
</style>
