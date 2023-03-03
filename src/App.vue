<template>
  <div>
    <h1>Vue Todo with Typescript</h1>
    <todoinput :item="todoText"></todoinput>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Todoinput from "./components/Todoinput.vue";

export default Vue.extend({
  components: { Todoinput },
  data() {
    return {
      todoText: ""
    };
  }
});
</script>

<style></style>
