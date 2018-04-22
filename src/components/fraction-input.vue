<template>
  <div class="fraction">
    <div v-if="showClose" class="close" @click="remove()">&times;</div>
    <square-input v-model="numerator" type="number" />
    <div class="bar"></div>
    <square-input v-model="denominator" type="number" />
  </div>
</template>

<script>
import SquareInput from './square-input'
export default {
  components: { SquareInput },
  name: 'fraction-input',
  props: {
    showClose: {
      type: Boolean,
      required: true
    },
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    numerator: {
      get() {
        return this.value.numerator
      },
      set(v) {
        this.$emit('input', {
          denominator: this.value.denominator,
          numerator: v
        })
      }
    },
    denominator: {
      get() {
        return this.value.denominator
      },
      set(v) {
        this.$emit('input', { numerator: this.value.numerator, denominator: v })
      }
    }
  },
  methods: {
    remove() {
      this.$emit('remove')
    }
  }
}
</script>
