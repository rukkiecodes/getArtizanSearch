<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="4">
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
                        <v-list-item v-if="user?.gender" density="compact">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-gender-male-female"></v-icon>
                            </template>
                            <v-list-item-title>{{ user.gender }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="user?.stateOfResidence" density="compact">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-map-marker-outline"></v-icon>
                            </template>
                            <v-list-item-title>{{ user.stateOfResidence }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-if="user?.LGA" density="compact">
                            <template v-slot:prepend>
                                <v-icon icon="mdi-map-marker-outline"></v-icon>
                            </template>
                            <v-list-item-title>{{ user.LGA }}</v-list-item-title>
                        </v-list-item>
                    </v-list>

                    <v-card-actions>
                        <v-btn @click="bookArtizan" block class="bg-indigo-lighten-4 text-capitalize text-indigo"
                            rounded="xl">Book
                            Artizan</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="8">
                <v-card rounded="xl">
                    <v-toolbar color="transparent" class="mt-5">
                        <v-toolbar-title>Artizan History</v-toolbar-title>
                    </v-toolbar>

                    <v-card-text>
                        <v-table class="rounded-xl" v-if="history.length >= 1">
                            <thead>
                                <tr>
                                    <th class="text-left"> Time </th>
                                    <th class="text-left"> Date </th>
                                    <th class="text-left"> Status </th>
                                </tr>
                            </thead>
                            <tbody>
                                <v-hover v-for="history in history?.slice(0, 50)" :key="history.id">
                                    <template v-slot:default="{ isHovering, props }">
                                        <tr v-bind="props" :class="isHovering ? 'bg-indigo-lighten-5' : undefined"
                                            style="cursor: pointer;">
                                            <td class="text-grey-darken-2 text-caption font-weight-bold">{{ history?.time }}
                                            </td>
                                            <td class="text-grey-darken-2 text-caption font-weight-bold">{{ history?.date }}
                                            </td>
                                            <td>
                                                <v-chip
                                                    :color="history?.status === 'pending' ? 'amber' : history?.status === 'approved' ? 'indigo' : history?.status === 'declined' ? 'red' : 'green'">
                                                    <span class="font-weight-bold text-caption">{{ history?.status }}</span>
                                                </v-chip>
                                            </td>
                                        </tr>
                                    </template>
                                </v-hover>
                            </tbody>
                        </v-table>
                        <v-sheet v-else class="d-flex justify-center align-center" height="200" rounded="xl">
                            <span>You do not have a job yet</span>
                        </v-sheet>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { db } from '@/plugins/firebase'
import { collection, doc, onSnapshot } from '@firebase/firestore'

export default {
    data: () => ({
        user: null,
        history: []
    }),

    mounted() {
        this.getUser()
        this.getHistory()
    },

    methods: {
        getUser() {
            const unsub = onSnapshot(doc(db, 'artizans', this.$route.params.id), (doc) => {
                this.user = doc.data()
            })
            return unsub
        },

        async getHistory() {
            const unsub = onSnapshot(collection(db, 'artizans', this.$route.params.id, 'history'), (querySnapshot) => {
                this.history = []

                querySnapshot.forEach((doc) => {
                    this.history.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
            })

            return unsub
        },

        async bookArtizan() {
            window.open('https://user.getartizan.com')
            localStorage.setArtizan = this.$route.params.id
        }
    }
}
</script>