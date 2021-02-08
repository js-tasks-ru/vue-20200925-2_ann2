<template>
  <AppInput
    v-bind="$attrs"
    :value="inputValue"
    :type="type"
    v-on="$listeners"
    @input.native="updateValue"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
    valueAsNumber: {
      type: Number,
      required: false,
    },
    valueAsDate: {
      type: Date,
      required: false,
    },
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
  },
  computed: {
    date() {
      if (this.valueAsNumber || (this.valueAsNumber && this.valueAsDate)) {
        return new Date(this.valueAsNumber);
      }
      if (this.valueAsDate) {
        return this.valueAsDate;
      }
      return new Date(this.value);
    },
    parseDate() {
      return {
        YY: this.date.getUTCFullYear(),
        MM: (this.date.getUTCMonth() + 1).toString().padStart(2, '0'),
        DD: this.date.getUTCDate().toString().padStart(2, '0'),
        hh: this.date.getUTCHours().toString().padStart(2, '0'),
        mm: this.date.getUTCMinutes().toString().padStart(2, '0'),
        ss: this.date.getUTCSeconds().toString().padStart(2, '0'),
      };
    },

    inputValue() {
      if (this.type === 'time') {
        return this.$attrs['step'] && this.$attrs['step'] % 60 !== 0
          ? `${this.parseDate.hh}:${this.parseDate.mm}:${this.parseDate.ss}`
          : `${this.parseDate.hh}:${this.parseDate.mm}`;
      }
      if (this.type === 'datetime-local') {
        return `${this.parseDate.YY}-${this.parseDate.MM}-${this.parseDate.DD}T${this.parseDate.hh}:${this.parseDate.mm}`;
      }
      if (this.type === 'date') {
        return `${this.parseDate.YY}-${this.parseDate.MM}-${this.parseDate.DD}`;
      } else {
        return this.value;
      }
    },
  },
  methods: {
    updateValue($event) {
      this.$emit('update:valueAsNumber', $event.target.valueAsNumber);
      this.$emit(
        'update:valueAsDate',
        this.valueAsDate
          ? $event.target.valueAsDate
          : new Date($event.target.valueAsNumber),
      );
    },
  },
};
</script>

<style scoped></style>
