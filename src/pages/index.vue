<template>
  <section class="calculator">
    <div class="wrap">
      <div class="expression">
        <template v-for="(f, idx) in fractions.fractions">
          <div class="fraction" :key="`f${idx}`">
            <div v-if="idx !== fractions.length - 1 && !f.bracketRight" class="bracket left" :class="{active: f.brackets.left}" @click="toggleBracket('(', idx)">(</div>
            <div v-if="idx > 1" class="close" @click="remove(idx)">&times;</div>
            <square-input v-model="f.value.numerator" type="number" @input.native="compute()" />
            <div class="bar"></div>
            <square-input v-model="f.value.denominator" type="number" @input.native="compute()" />
            <div v-if="idx !== 0 && !f.brackets.left" class="bracket right" :class="{active: f.brackets.right}" @click="toggleBracket(')', idx)">)</div>
          </div>
          <square-input class="sign" v-if="idx != fractions.length - 1 " v-model="f.sign" type="string" :key="`s${idx}`" @input.native="compute()" />
        </template>
        <div class=" sign ">=</div>
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
export default {
  data() {
    return {
      fractionsBuffer: null,
      error: ''
    }
  },
  computed: {
    fractions: {
      get() {
        if (this.fractionsBuffer) return this.fractionsBuffer
        let lsItem = localStorage.getItem('fractions')
        if (lsItem === null) {
          let defaultArr = new Fractions()
          defaultArr.add()
          defaultArr.add()
          console.log(defaultArr)
          return defaultArr
        }
        return JSON.parse(lsItem)
      },
      set(v) {
        this.fractionsBuffer = v
        console.log(this.fractions)
        localStorage.setItem('fractions', JSON.stringify(v))
      }
    }
  },

  methods: {
    toggleBracket(bracket, idx) {
      this.error = this.fractions.toggleBracket(bracket, idx)
    },
    compute() {
      this.fractions.compute()
      console.log(this.fractions.result)
    },
    add() {
      this.fractions.add()
    },
    remove(idx) {
      this.fractions.remove(idx)
    }
  }
}
</script>
