<template>
  <v-card
    :loading="loading"
    class="mx-auto"
    max-width="374"
    color="rgb(255, 255, 255, 0.1)"
  >
    <!-- <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template> -->

    <!-- <v-card-title>{{ data.parentName }}</v-card-title> -->

    <v-card-text>
      <div class="text-subtitle-1 mb-4">
        <v-icon left>
          mdi-account
        </v-icon>
        {{ data.parentName }}
      </div>
      <div class="text-subtitle-1 mb-4">
        <v-icon left>
          mdi-map-marker
        </v-icon>
        {{ data.adress }}
      </div>
      <div class="text-subtitle-1 mb-6">
        <v-icon left>
          mdi-phone
        </v-icon>
        {{ data.phoneNumber }}
      </div>
      {{ data.details }}
    </v-card-text>
    <v-card-text class="pt-0">
      <v-chip color="lime darken-4">
        <v-icon left> mdi-calendar </v-icon>{{ data.date }}</v-chip
      >
      <v-chip color="lime darken-4">
        <v-icon left> mdi-clock </v-icon>{{ data.startHour }} -
        {{ data.endHour }}</v-chip
      >
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-row align="center" justify="space-between">
        <v-col cols="auto" class="text-caption">
          {{ this.data.postedAt }} par {{ this.data.postedBy }}
        </v-col>
        <v-col cols="auto">
          <v-btn icon class="text-caption" @click="share(data._id)">
            <v-icon>
              mdi-share-variant
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["data"],
  data: () => ({
    loading: false,
    show: false
  }),
  methods: {
    share(id) {
      if (navigator.share) {
        navigator
          .share({
            title: "BBsitApp",
            text: "Partager le bbsitting",
            url: window.location.href + id
          })
          .then(() => console.log("Shared!"))
          .catch(error => console.log("Error sharing", error));
      }
    }
  }
};
</script>
