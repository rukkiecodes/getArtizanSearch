// Utilities
import { db } from '@/plugins/firebase'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
    state: () => ({
        categories: '',
        location: '',
        loading: false,
        users: []
    }),

    actions: {
        async search() {
            const snapshot = await getDocs(query(collection(db, 'artizans'), where('specialisation', '==', this.categories), where('stateOfResidence', '==', this.location)))

            this.users = []
            snapshot.forEach(doc => {
                this.users.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
        },
    }
})
