export const CounterButton = {
  // Шаблон потребуется отредактировать
  name: 'CounterButton',
  template: '<button type="button" @click="counter">{{ count }}</button>',
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
    counter() {
      this.$emit('increment', this.count + 1);
    },
  },
  // Компонент должен иметь входной параметр

  // Компонент должен иметь модель

  // Шаблон лучше держать максимально простым, а логику выносить в методы
};
