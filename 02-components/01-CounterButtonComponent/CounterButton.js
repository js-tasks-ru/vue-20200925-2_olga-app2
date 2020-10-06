export const CounterButton = {
  template: `
    <button type="button" v-on:click="addCount">
      {{ count }}
    </button>
  `,
  model: {
    prop: 'count',
    event: 'increment'
  },
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
  methods: {
    addCount() {
      this.$emit('increment', this.count + 1);
    }
  },
};
