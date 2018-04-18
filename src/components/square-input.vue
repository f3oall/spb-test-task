<template>
  <input type="text" class="square-input" :value="value" @input="$emit('input', $event.target.value)" @keypress="validate">
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
  },

  methods: {
    isFirstZero(charCode) {
      return this.value === '' && charCode === 48
    },
    isNumber(charCode) {
      return charCode >= 48 && charCode <= 56
    },
    isSign(charCode) {
      return [42, 43, 45, 47].includes(charCode)
    },
    validate(e) {
      if (this.type == 'number') {
        if (this.isNumber(e.charCode) && !this.isFirstZero(e.charCode))
          return true
      } else {
        if (this.isSign(e.charCode)) return true
      }
      e.preventDefault()
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
