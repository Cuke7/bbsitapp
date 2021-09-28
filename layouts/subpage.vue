<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt></Nuxt>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "subpage",
  data: () => ({
    //
  }),
  methods: {
    share() {
      if (navigator.share) {
        navigator
          .share({
            title: "Quotidie",
            text: "",
            url: window.location.href
          })
          .then(() => console.log("Shared!"))
          .catch(error => console.log("Error sharing", error));
      }
    },

    hasHistory() {
      return window.history.length > 2;
    }
  }
};
</script>

<style scoped>
.v-main {
  background-image: linear-gradient(
    to right bottom,
    #0051c9,
    #5c40b0,
    #782f95,
    #851e79,
    #88125f
  );
}
</style>
