<template>
  <main-header/>
  <contact-form/>
  <router-view/>
</template>

<script>
// @ is an alias to /src
import MainHeader from '@/components/MainHeader.vue'
import ContactForm from '@/components/ContactForm.vue'

export default {
  name: 'HomeView',
  components: {
    MainHeader,
    ContactForm
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
