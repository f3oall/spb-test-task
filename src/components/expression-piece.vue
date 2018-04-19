<template>
  <div class="expression-piece" :class="{showRightBrackets, showLeftBrackets}">
    <expression-brackets v-if="showLeftBrackets" position="left" :brackets="f.brackets" @toggle="onToggleBracket" />
    <fraction-input :showClose="idx > 1" v-model="f.value" @input="$emit('update')" @remove="remove" />
    <expression-brackets v-if="showRightBrackets" position="right" :brackets="f.brackets" @toggle="onToggleBracket" />
    <square-input v-if="showSign" class="sign" v-model="f.sign" type="string" @input="$emit('update')" />
  </div>
</template>

<script>
import Fraction from '@/classes/Fraction'
export default {
  name: 'expression-piece',
  props: {
    f: {
      type: Fraction,
      required: true
    },
    idx: {
      type: Number,
      required: true
    },
    lastIdx: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      sign: ''
    }
  },
  computed: {
    showSign() {
      return this.idx !== this.lastIdx
    },
    showRightBrackets() {
      return this.f.brackets.isShowingRight(this.idx)
    },
    showLeftBrackets() {
      return this.f.brackets.isShowingLeft(this.idx, this.lastIdx)
    }
  },
  methods: {
    onToggleBracket(e) {
      this.$emit('toggleBracket', e)
    },
    remove() {
      this.$parent.fractions.fractions.splice(this.idx, 1)
    }
  }
}
</script>

<style lang="scss">
@import '~styles/theme';
.expression-piece {
  display: flex;
  align-items: center;
  position: relative;
  &:not(:first-child).showRightBrackets {
    .fraction {
      margin-left: $grid * 8;
    }
    .bracket.left {
      position: absolute;
      top: 0;
      left: $grid * 4;
    }
  }
  &:not(:last-child).showLeftBrackets {
    .fraction {
      margin-right: $grid * 8;
    }
    .bracket.right {
      position: absolute;
      right: $grid * 9;
      top: 0;
    }
  }
}
</style>
