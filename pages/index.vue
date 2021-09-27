<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="10">
      <v-row justify="space-between" align="center">
        <v-col cols="auto" class="ma-4">
          <v-btn nuxt to="newBBsit" fab color="UI">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="auto" class="ma-4">
          <v-btn fab color="UI">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-masonry>
        <v-col
          v-masonry-tile
          class="item py-0"
          v-for="data in bbsitData"
          :key="data.id"
          cols="12"
          sm="6"
          lg="4"
        >
          <bbsit :data="data"></bbsit>
        </v-col>
      </v-row>
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
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token:
    "sk8de6z5DrYHFWnu6NIJAHELXUQuwYiJlxwpy7VMV0Qlzuw3vCnvMGyvzI7hq4GnzJm7FSIE7q5SQtPFQccUeUcOR26ZXG929MUSR3zNA4aUliYO0DXz3c38Brd5cDvH91wcp4x2XU5OK1NjeAhaxoUSSNSYjyMgvZVY6jDqMLwUQskaWH9U" // or leave blank for unauthenticated usage
  // useCdn: true // `false` if you want to ensure fresh data
});

export default {
  components: { bbsit },
  data: () => ({
    bbsitData: ""
  }),

  async fetch() {
    const query = groq`*[_type == "bbsit"]`;
    let arr = await client.fetch(query);
    this.bbsitData = arr.reverse();
    console.log(this.bbsitData);
  },

  mounted: function() {
    this.$nextTick(function() {});
  }
};
</script>
