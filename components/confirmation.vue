<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="374">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="UI" icon v-bind="attrs" v-on="on">
          <v-icon>
            mdi-send
          </v-icon>
        </v-btn>
      </template>
      <v-card class="dialog">
        <v-card-title class="text-h5">
          Confirmation
        </v-card-title>
        <v-card-text>
          <div class="text-subtitle-1 mb-4">
            <v-icon left>
              mdi-account
            </v-icon>
            {{ data.parentName }}
          </div>
          <div class="text-subtitle-1 mb-4">
            <v-icon left>
              mdi-phone
            </v-icon>
            {{ data.phoneNumber }}
          </div>
          <div class="text-subtitle-1 mb-4">
            <v-icon left>
              mdi-map-marker
            </v-icon>
            {{ data.adress }}
          </div>
          <div class="mb-4">
            <v-chip color="lime darken-4">
              <v-icon left> mdi-calendar </v-icon>{{ data.date }}</v-chip
            >
            <v-chip color="lime darken-4">
              <v-icon left> mdi-clock </v-icon>{{ data.startHour }} -
              {{ data.endHour }}</v-chip
            >
          </div>
          {{ data.details }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-2" text @click="dialog = false">
            Modifier
          </v-btn>
          <v-btn
            :loading="loading"
            color="green lighten-1"
            text
            @click="sendData()"
          >
            Poster
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { groq } from "@nuxtjs/sanity";

import createClient from "@sanity/client";

const client = createClient({
  projectId: "djx9uviv",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token:
    "sk8de6z5DrYHFWnu6NIJAHELXUQuwYiJlxwpy7VMV0Qlzuw3vCnvMGyvzI7hq4GnzJm7FSIE7q5SQtPFQccUeUcOR26ZXG929MUSR3zNA4aUliYO0DXz3c38Brd5cDvH91wcp4x2XU5OK1NjeAhaxoUSSNSYjyMgvZVY6jDqMLwUQskaWH9U" // or leave blank for unauthenticated usage
  // useCdn: true // `false` if you want to ensure fresh data
});

export default {
  props: ["data"],
  data() {
    return {
      dialog: false,
      loading: false
    };
  },
  methods: {
    sendData() {
      console.log("Send data");

      const doc = {
        _type: "bbsit",
        parentName: this.data.parentName,
        phoneNumber: this.data.phoneNumber,
        adress: this.data.adress,
        startHour: this.data.startHour,
        endHour: this.data.endHour,
        details: this.data.details,
        name: "Sanity Tandem Extraordinaire"
      };

      this.loading = true;

      console.log(doc);

      client.create(doc).then(res => {
        this.loading = false;
        console.log(`doc created ${res._id}`);
        this.$router.push({
          path: "/"
        });
      });
    }
  }
};
</script>

<style scoped>
.dialog {
  background-image: linear-gradient(
    to left top,
    #0051c9,
    #5c40b0,
    #782f95,
    #851e79,
    #88125f
  );
}
</style>
