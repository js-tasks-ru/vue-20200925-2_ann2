export const CounterButton = {
  // Шаблон потребуется отредактировать
  name: 'CounterButton',
  template: '<button type="button" @click="counter(count)">{{ count }}</button>',
  props: {
   count: {
     type: Number,
     default: 0,
   }
  },
  model: {
    event: 'increment',
    prop: 'count',
  },
  methods: {
    counter(count) {
      count++;
      this.$emit('increment', count);
    },
  },
  // Компонент должен иметь входной параметр

  // Компонент должен иметь модель

  // Шаблон лучше держать максимально простым, а логику выносить в методы
};
