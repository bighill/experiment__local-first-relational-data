import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {
    // implement node event listeners here
    // },
    baseUrl: 'http://10.0.0.150:5173/',
  },
})
