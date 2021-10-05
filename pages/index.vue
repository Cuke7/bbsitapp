<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="10">
      <v-row align="center">
        <client-only>
          <v-col cols="auto">
            <v-btn nuxt to="newBBsit" fab color="UI" :disabled="!currentUser">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6" v-if="!currentUser">
            Se connecter pour ajouter un bbsiting
          </v-col>

          <v-spacer></v-spacer>
          <v-col cols="auto" v-if="currentUser">
            Mon compte
          </v-col>
          <v-col cols="auto">
            <v-btn fab color="UI" nuxt to="/login">
              <v-icon v-if="!currentUser">mdi-login</v-icon>
              <div v-else>
                <v-avatar
                  size="57"
                  v-if="currentUser.photoURL"
                  class="text--center"
                >
                  <img v-bind:src="currentUser.photoURL" />
                </v-avatar>
                <v-icon v-else>mdi-account-circle</v-icon>
              </div>
            </v-btn>
          </v-col>
        </client-only>
      </v-row>
      <div class="pa-5">
        <v-row v-masonry>
          <v-col
            v-masonry-tile
            class="item"
            v-for="data in bbsitData"
            :key="data.id"
            cols="12"
            sm="6"
            lg="4"
          >
            <bbsit :data="data" class="my-1"></bbsit>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

import createClient from "@sanity/client";
import bbsit from "../components/bbsit.vue";

const client = createClient({
  projectId: "djx9uviv",
  dataset: "production",
  apiVersion: "2021-03-25" // use current UTC date - see "specifying API version"!
  // useCdn: true // `false` if you want to ensure fresh data
});

export default {
  components: { bbsit },
  data: () => ({
    bbsitData: "",
    test: true
  }),

  async fetch() {
    const query = groq`*[_type == "bbsit"]`;
    let arr = await client.fetch(query);
    this.bbsitData = arr.reverse();
    console.log(this.bbsitData);
  },

  computed: {
    currentUser() {
      return this.$store.state.user;
    }
  },

  mounted: function() {
    this.$nextTick(function() {});
  }
};
</script>
