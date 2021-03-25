<template>
  <div class="generalMenuComponent">
    <div class="content">
      <div class="header">
        <div class="title">
          <h3>General</h3>
          <p>Customize how your dashboard looks.</p>
        </div>
      </div>
      <div class="customizeSectionWrapper">
        <div class="customizeSection">
          <general-customization />
          <div class="toggleShowSection">
            <div class="title"></div>
            <div class="toggleOption">Utilities</div>
            <div class="toggleOption">Weather</div>
            <div class="toggleOption">Quote</div>
            <div class="toggleOption">News</div>
            <div class="toggleOption">Calculator</div>
            <div class="toggleOption">Games</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralCustomization from '@/components/SettingsMenu/Menus/General/GeneralCustomization.vue';
export default {
  name: 'GeneralMenuComponent',
  components: {
    GeneralCustomization,
  },
};
</script>

<style scoped>
div.generalMenuComponent {
  height: 395px;
  width: 515px;
}
div.content {
  height: 385px;
  width: 505px;
  margin-left: auto;
  margin-top: 5px;
  color: white;
}
/* Header styling */
div.header {
  padding-left: 10px;
  margin-bottom: 20px;
}
div.title h3,
div.title p {
  margin-bottom: 0;
}
/* Customize Section styling */
div.customizeSectionWrapper {
  height: 308px;
  width: 505px;
  overflow-y: auto;
}
div.customizeSectionWrapper::-webkit-scrollbar {
  width: 10px;
  height: 5px;
  background-color: rgb(90, 90, 90);
}
div.customizeSectionWrapper::-webkit-scrollbar-thumb {
  background: goldenrod;
}
div.customizeSection {
  height: 308px;
  width: 485px;
}
</style>
