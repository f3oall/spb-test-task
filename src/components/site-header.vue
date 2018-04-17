<template>
  <header>
    <div class="wrap">
      <div class="brand">Fraction Calculator</div>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/comments">Comments</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'site-header'
}
</script>

<style lang="scss">
@import '~styles/theme';
header {
  background: $secondary-background;
  border-bottom: $border;
  line-height: $header-height;
  font-weight: bold;
  .wrap {
    display: grid;
    grid-template-columns: $grid * 30 1fr;
  }
  nav {
    text-align: right;
    a {
      display: inline-block;
      padding: 0 $grid * 2;
    }
  }
  .brand {
    font-size: $font-size-large;
  }
}
</style>
