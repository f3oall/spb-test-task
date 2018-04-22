<template>
  <div class="brackets">
    <expression-bracket v-for="b in array" :bracket="b.value" :position="position" @click.native="toggle(b.idx)" :key="`b${b.idx}`" />
  </div>
</template>
<script>
import Brackets from '@/classes/Brackets'
import ExpressionBracket from './expression-bracket'
export default {
  components: { ExpressionBracket },
  name: 'expression-brackets',
  props: {
    position: {
      type: String,
      required: true
    },
    brackets: {
      type: Brackets,
      required: true
    }
  },
  computed: {
    array() {
      let res = this.brackets[this.position].map((b, idx) => {
        return {
          idx: idx,
          value: b
        }
      })
      if (this.position === 'left') res.reverse()
      return res
    }
  },
  methods: {
    toggle(idx) {
      this.$emit('toggle', {
        increment: this.brackets.toggle(this.position, idx),
        position: this.position
      })
    }
  }
}
</script>

<style lang="scss">
.brackets {
  display: flex;
}
</style>
