export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/algolia', '@nuxtjs/tailwindcss'],

  algolia: {
    apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    instantSearch: {
      theme: 'reset'
    }
  }
})