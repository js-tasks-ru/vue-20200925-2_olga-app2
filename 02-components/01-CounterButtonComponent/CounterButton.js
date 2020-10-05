export const CounterButton = {
  template: `<button type="button" v-on:click="$emit('increment', addCount())">{{ count }}</button>`,
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
      return this.count + 1;
    }
  },
};
