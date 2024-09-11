<template>
  <v-footer color="indigo" app inset class="d-flex flex-column">
    <v-row class="text-center d-flex w-100 align-center px-4">
      <v-col>
        <strong>Get connected with us on social networks!</strong>
      </v-col>
      <v-col class="text-right">
        <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        size="small"
        variant="plain"
      ></v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
      icons: ['mdi-facebook', 'mdi-linkedin', 'mdi-instagram'],
    }),
};
</script>

<style scoped>
.v-footer {
  height: 70px;
}
</style>
