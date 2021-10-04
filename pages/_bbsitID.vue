<template>
  <h1>{{ this.bbsitID }}</h1>
</template>

<script>
export default {
  async asyncData({ params }) {
    const bbsitID = params.bbsitID; // When calling /abc the slug will be "abc"
    return { bbsitID };
  }
};
</script>
