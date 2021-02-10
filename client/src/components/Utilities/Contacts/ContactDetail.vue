<template>
  <div class="detailsWrapper">
    <div class="detailsRow1">
      <div class="firstName">
        <p>{{ contactData.firstName }}</p>
        <i class="fas fa-edit fa-xs"></i>
      </div>
      <div v-if="contactData.lastName" class="lastName">
        <p>{{ contactData.lastName }}</p>
        <i class="fas fa-edit fa-xs"></i>
      </div>
    </div>
    <div class="detailsRow2">
      <div v-if="contactData.phone" class="phone">
        <p>{{ contactData.phone }}</p>
        <i class="fas fa-edit fa-xs"></i>
      </div>
      <div v-if="contactData.email" class="email">
        <p>{{ contactData.email }}</p>
        <i class="fas fa-edit fa-xs"></i>
      </div>
    </div>
    <div class="detailsRow3">
      <div v-if="contactData.address" class="address">
        <p>{{ contactData.address }}</p>
        <i class="fas fa-edit fa-xs"></i>
      </div>
      <div v-if="contactData.city" class="city">
        <p>{{ contactData.city }},</p>
        <i class="fas fa-edit fa-xs"></i>
      </div>
      <div v-if="contactData.state" class="state">
        <p>{{ contactData.state }}</p>
        <i class="fas fa-edit fa-xs"></i>
      </div>
      <div v-if="contactData.city" class="zip">
        <p>{{ contactData.zip }}</p>
        <i class="fas fa-edit fa-xs"></i>
      </div>
    </div>
    <div class="detailsRow4">
      <div v-if="contactData.notes" class="notes">
        <p>{{ contactData.notes }}</p>
        <i class="fas fa-edit fa-xs"></i>
      </div>
    </div>
    <div class="detailsRow5">
      <div class="backButton">
        <button class="btn btn-secondary" type="button" @click="cancel">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactDetailComponent',
  props: ['contactData'],
  data() {
    return {
      newContact: { ...this.contactData },
    };
  },
  mounted() {},
  computed: {},
  methods: {
    cancel() {
      this.$emit('cancel');
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
  margin-left: 7px;
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
</style>
