<template>
  <header>
    <div class="wrap">
      <div class="brand">Fraction Calculator</div>
      <nav>
        <router-link to="/" exact>Home</router-link>
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
    display: grid;
    grid-template-columns: repeat(2, #{$grid * 15});
    justify-content: flex-end;
    a {
      text-align: center;
      padding: 0 $grid * 2;
      color: $muted-font-color;
      border-right: $border;
      &:first-child {
        border-left: $border;
      }
      &:hover {
        color: $success-color;
      }
      &.router-link-active {
        background: $success-color;
        border-color: $success-color;
        color: #fff;
      }
    }
  }
  .brand {
    font-size: $font-size-large;
  }
}
</style>
