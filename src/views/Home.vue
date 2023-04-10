<template>
  <v-container>
    <h1 class="font-weight-light text-h4 text-md-h3 text-lg-h2 my-16">Search to find an artizan</h1>
    <v-row align="center">
      <v-col cols="12" sm="5">
        <v-autocomplete :items="app.categories" v-model="search.categories" label="Search categories" variant="solo"
          prepend-inner-icon="mdi-magnify" clearable hide-details="" />
      </v-col>
      <v-col cols="12" sm="5">
        <v-autocomplete :items="app.location" v-model="search.location" label="Search location" variant="solo"
          prepend-inner-icon="mdi-magnify" clearable hide-details="" />
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn @click="search.search" :loading="search.loading" size="x-large" class="bg-indigo text-body-1" block>
          Search
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="(user, i) in search.users" :key="i" cols="12" sm="4" md="3">
        <v-card rounded="xl">
          <v-card-text class="text-center">
            <v-avatar size="150">
              <v-img
                :src="user?.avatar != undefined ? user?.avatar : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
                cover />
            </v-avatar>
          </v-card-text>

          <v-card-title class="pb-0">{{ user?.name }}</v-card-title>

          <v-list density="compact">
            <v-list-item density="compact">
              <template v-slot:prepend>
                <v-icon icon="mdi-at"></v-icon>
              </template>
              <v-list-item-title><a :href="`mailto:${user?.email}`" class="text-grey-darken-3">{{ user?.email
              }}</a></v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user?.phone" density="compact">
              <template v-slot:prepend>
                <v-icon icon="mdi-phone"></v-icon>
              </template>
              <v-list-item-title><a :href="`tel:${user?.phone}`" class="text-grey-darken-3">{{ user?.phone
              }}</a></v-list-item-title>
            </v-list-item>
          </v-list>

          <v-card-actions>
            <v-btn :to="`/${user.uid}`" block class="bg-indigo-lighten-5 text-indigo text-capitalize"
              rounded="xl">View User</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { useSearchStore } from "@/store/search";

const app = useAppStore()
const search = useSearchStore()
</script>
