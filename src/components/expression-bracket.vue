<template>
  <div class="bracket" :class="{active: bracket, [position]: true}">{{character}}</div>
</template>
<script>
export default {
  name: 'expression-bracket',
  props: {
    position: {
      type: String,
      required: true
    },
    bracket: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    character() {
      return this.position === 'left' ? '(' : ')'
    }
  }
}
</script>

<style lang="scss">
@import '~styles/theme';
.bracket {
  width: $grid * 4;
  color: $disabled-font-color;
  cursor: pointer;
  opacity: 0;
  font-size: 90px;
  margin-top: -$grid;
  position: relative;

  &.active,
  &:hover {
    opacity: 1;
  }
  &.active {
    color: $secondary-font-color;
  }
}
</style>
