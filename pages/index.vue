<template>
  <div>
    <h1>Fuck yeah</h1>
    <h2>{{ message }}</h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "IndexPage",
  data() {
    return {
      message: "Lets go!",
    };
  },
});
</script>
