<template>
  <v-app>
    <!-- <v-app-bar app>
       <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>BBsit app</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar> -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("load", function() {
        window.history.pushState({}, "");
      });

      window.addEventListener("popstate", () => {
        window.history.pushState({}, "");
      });
    });
  }
};
</script>

<style scoped>
.v-main {
  background-image: linear-gradient(
    to right top,
    #0051c9,
    #5c40b0,
    #782f95,
    #851e79,
    #88125f
  );
}
</style>
