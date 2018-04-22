<template>
  <section class="calculator">
    <div class="wrap">
      <div class="expression">
        <template v-for="(f, idx) in fractions.fractions">
          <expression-piece :f="f" :idx="idx" :lastIdx="fractions.length - 1" :key="idx" @toggleBracket="onToggleBracket" @update="compute()" />
        </template>
        <div class="sign">=</div>
        <div class="fraction result ">
          <template v-if="fractions.result.numerator">
            <div class="numerator ">{{fractions.result.numerator}}</div>
            <div class="bar "></div>
            <div class="denominator ">{{fractions.result.denominator}}</div>
          </template>
          <div v-else class="zero sign">0</div>
        </div>
      </div>
      <div v-if="error" class="error">{{error}}</div>
      <div class="buttons ">
        <button class="btn sucess" @click="add()">Add Fraction</button>
      </div>
    </div>
  </section>
</template>

<script>
import Fractions from '@/classes/Fractions'
import ExpressionPiece from '@/components/expression-piece'
export default {
  components: { ExpressionPiece },
  data() {
    return {
      fractions: null,
      error: ''
    }
  },
  created() {
    let lsItem = localStorage.getItem('fractions')
    if (lsItem === null) {
      let defaultArr = new Fractions()
      defaultArr.add()
      defaultArr.add()
      this.fractions = defaultArr
    } else {
      this.fractions = JSON.parse(lsItem)
    }
  },
  methods: {
    onToggleBracket(e) {
      this.fractions.bracketsAmount[e.position] += e.increment
      if (!this.fractions.hasUnmatchedBrackets) {
        this.error = ''
        return this.compute()
      }
      this.error = 'Please, close all unmatched brackets'
    },
    compute() {
      if (!this.error) this.fractions.compute()
    },
    add() {
      this.fractions.add()
    }
  }
}
</script>

<style lang="scss">
@import '~styles/app';
</style>
