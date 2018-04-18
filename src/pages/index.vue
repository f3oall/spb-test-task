<template>
  <section class="calculator">
    <div class="wrap">
      <div class="expression">
        <template v-for="(f, idx) in fractions">
          <div class="fraction" :key="`f${idx}`">
            <div v-if="idx > 1" class="close" @click="remove(idx)">&times;</div>
            <square-input v-model="f.numerator" type="number" @input.native="calculate()" />
            <div class="bar"></div>
            <square-input v-model="f.denominator" type="number" @input.native="calculate()" />
          </div>
          <square-input class="sign" v-if="idx != fractions.length - 1" v-model="f.sign" type="string" :key="`s${idx}`" @input.native="calculate()" />
        </template>
        <div class=" sign ">=</div>
        <div class="fraction result ">
          <template v-if="result.numerator">
            <div class="numerator ">{{result.numerator}}</div>
            <div class="bar "></div>
            <div class="denominator ">{{result.denominator}}</div>
          </template>
          <div v-else class="zero sign">0</div>
        </div>
      </div>
      <div class="buttons ">
        <button class="btn sucess" @click="add">Add Fraction</button>
      </div>
    </div>
  </section>
</template>

<script>
import { Fraction } from 'fractional'
export default {
  data() {
    return {
      fractions: [
        {
          numerator: '',
          denominator: '',
          sign: ''
        },
        {
          numerator: '',
          denominator: ''
        }
      ],
      result: {
        numerator: '?',
        denominator: '?'
      }
    }
  },
  methods: {
    calculate(fractions = this.fractions) {
      let queue = []
      let filled = fractions.every((f, idx) => {
        if (this.isFilled(f)) {
          if (idx === fractions.length - 1) return true
          let el = {}
          if (queue.length > 0) {
            queue[queue.length - 1].nextSign = f.sign
            if ((idx + 1) % 2 === 0) {
              if (fractions.length - 1 === idx + 1) {
                el.first = this.createFraction(fractions[idx + 1])
                queue.push(el)
              }
              return true
            }
          }

          el.first = this.createFraction(f)
          el.second = this.createFraction(fractions[idx + 1])
          el.action = this.getActionBySign(f.sign)

          queue.push(el)
          return true
        }
        return false
      })
      if (filled) this.runQueue(queue)
      else this.resetResult()
    },
    runQueue(queue) {
      console.log(queue)
      let fractions = []
      queue.forEach((el, idx) => {
        let f
        if (el.second) {
          f = el.first[el.action](el.second)
        } else {
          f = el.first
        }
        if (el.nextSign) f.sign = el.nextSign
        fractions.push(f)
      })
      console.log(fractions)
      if (fractions.length === 1) this.result = fractions[0]
      else this.calculate(fractions)
    },
    getActionBySign(sign) {
      switch (sign) {
        case '+':
          return 'add'
        case '-':
          return 'subtract'
        case '*':
          return 'multiply'
        case '/':
          return 'divide'
      }
    },
    isFilled(f) {
      if (f.hasOwnProperty('sign')) {
        return f.numerator !== '' && f.denominator !== '' && f.sign
      }
      return f.numerator !== '' && f.denominator !== ''
    },
    createFraction(f) {
      return new Fraction(f.numerator, f.denominator)
    },
    add() {
      this.fractions[this.fractions.length - 1].sign = ''
      this.fractions.push({ numerator: '', denominator: '' })
      this.resetResult()
    },
    remove(idx) {
      this.fractions.splice(idx, 1)
      this.calculate()
    },
    resetResult() {
      this.result = { numerator: '?', denominator: '?' }
    }
  }
}
</script>
