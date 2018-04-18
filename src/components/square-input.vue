<template>
  <input type="text" class="square-input" :value="value" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  name: 'square-input',
  props: {
    value: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '~styles/theme';

.square-input {
  width: $grid * 5;
  height: $grid * 5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 $grid;
  border: $border;
  background: $secondary-background;
}
</style>
