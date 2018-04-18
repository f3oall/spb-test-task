<template>
  <section class="calculator">
    <div class="wrap">
      <div class="expression">
        <template v-for="(f, idx) in fractions">
          <div class="fraction" :key="`f${idx}`">
            <square-input v-model="f.numerator" type="number" />
            <div class="bar"></div>
            <square-input v-model="f.denominator" type="number" />
          </div>
          <square-input class="sign" v-if="idx != fractions.length - 1" v-model="f.sign" type="string" :key="`s${idx}`" />
        </template>
        <div class=" sign ">=</div>
        <div class="fraction result ">
          <div class="numerator ">{{result.numerator}}</div>
          <div class="bar "></div>
          <div class="denominator ">{{result.denominator}}</div>
        </div>
      </div>
      <div class="buttons ">
        <button class="btn sucess">Add Fraction</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fractions: [
        {
          numerator: null,
          denominator: null,
          sign: null
        },
        {
          numerator: null,
          denominator: null
        }
      ],
      result: {
        numerator: '?',
        denominator: '?'
      }
    }
  }
}
</script>
