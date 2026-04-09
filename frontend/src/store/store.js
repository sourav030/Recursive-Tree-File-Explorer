import { defineStore } from 'pinia'

export const usePeniStore = defineStore('peni', {
  state: () => ({
    data: null
  }),

  actions: {
    setData(payload) {
      this.data = payload
    }
  }
})