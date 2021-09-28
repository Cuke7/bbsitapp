<template>
  <v-app>
    <v-app-bar app color="rgb(255,255,255,0)" elevation="0">
      <v-btn
        icon
        color="UI"
        @click="hasHistory() ? $router.go(-1) : $router.push('/')"
      >
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fill-height>
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
  methods: {
    hasHistory() {
      return window.history.length > 2;
    }
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
