<template>
  <section class="comments">
    <div class="wrap">
      <div v-for="(c, idx) in comments" :key="idx">{{c}}
        <a href="" @click.prevent="remove(c)">Remove</a>
      </div>
    </div>
  </section>
</template>

<script>
import WS from '@/classes/WebSocket'
export default {
  data() {
    return {
      comments: [
        'Тестовый коммент 1',
        'Это шедевр',
        'Это прекрасно',
        'Лучшее, что я видел',
        'Два чая этому автору'
      ],
      socket: {}
    }
  },
  created() {
    this.socket = new WS('ws://echo.websocket.org/')
  },
  methods: {
    remove(c) {
      this.socket.send(() => {
        let idx = this.comments.findIndex(comment => comment === c)
        this.comments.splice(idx, 1)
      })
    }
  }
}
</script>

<style lang="scss">
@import '~styles/theme';
.comments {
  padding: $grid * 4;
  font-size: 24px;
  color: $muted-font-color;
  .wrap > div {
    line-height: $grid * 5;
    border-bottom: $border;
    a {
      float: right;
      font-size: 16px;
      text-transform: uppercase;
      font-weight: bold;
      color: red;
      opacity: 0.5;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>
