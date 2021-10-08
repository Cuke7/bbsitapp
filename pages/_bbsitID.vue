<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-row justify="space-between" align="center">
        <v-col cols="auto" class="ma-4">
          <v-btn icon color="UI" @click="$router.push('/')">
            <v-icon>
              mdi-arrow-left
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-card-text>
        <v-row align="center" justify="start" class="my-6">
          <v-col cols="auto">
            <v-icon left>
              mdi-account
            </v-icon>
          </v-col>
          <v-col class="text-subtitle-1" cols="auto">
            {{ bbsitData.parentName }}
          </v-col>
        </v-row>

        <v-row align="center" justify="start" class="my-6">
          <v-col cols="auto">
            <v-icon left>
              mdi-map-marker
            </v-icon>
          </v-col>
          <v-col class="text-subtitle-1" cols="auto">
            {{ bbsitData.adress }}
          </v-col>
        </v-row>

        <v-row align="center" justify="start" class="my-6">
          <v-col cols="auto">
            <v-icon left>
              mdi-phone
            </v-icon>
          </v-col>
          <v-col class="text-subtitle-1" cols="auto">
            {{ bbsitData.phoneNumber }}
          </v-col>
        </v-row>

        {{ bbsitData.details }}
      </v-card-text>
      <v-card-text class="pt-0">
        <v-row align="center" justify="space-around">
          <v-col cols="auto">
            <v-chip color="lime darken-4">
              <v-icon left> mdi-calendar</v-icon>
              {{ bbsitData.date }}
            </v-chip>
          </v-col>
          <v-col cols="auto">
            <v-chip color="lime darken-4" class="mx-6">
              <v-icon left> mdi-clock </v-icon>
              {{ bbsitData.startHour }} -
              {{ bbsitData.endHour }}
            </v-chip></v-col
          >
        </v-row>
      </v-card-text>
      <v-card-text class="mt-12">
        <v-row align="center" justify="space-between">
          <v-spacer></v-spacer>
          <v-col cols="auto" class="text-caption">
            {{ this.bbsitData.postedAt }} par {{ this.bbsitData.postedBy }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

import createClient from "@sanity/client";

const client = createClient({
  projectId: "djx9uviv",
  dataset: "production",
  apiVersion: "2021-03-25" // use current UTC date - see "specifying API version"!
  // useCdn: true // `false` if you want to ensure fresh data
});

export default {
  async asyncData({ params }) {
    const bbsitID = params.bbsitID; // When calling /abc the slug will be "abc"
    const query = '*[_type == "bbsit" && _id == $id]';
    const params2 = { id: bbsitID };
    let bbsitData = await client.fetch(query, params2);

    return { bbsitData: bbsitData[0] };
  },
  data: () => ({
    //
  }),
  methods: {
    hasHistory() {
      return window.history.length > 2;
    }
  }
};
</script>
