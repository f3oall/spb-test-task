<template>
  <div id="app">
    <site-header/>
    <router-view/>
  </div>
</template>

<script>
import SiteHeader from '@/components/site-header'
export default {
  name: 'App',
  components: { SiteHeader }
}
</script>

<style lang="scss">
@import '~styles/app';
</style>
