<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="remove">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <form-group label="Тип">
      <dropdown-button
        title="Тип"
        class="form-control"
        :options="$options.agendaItemTypes"
        v-model="agendaLocal.type"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group class="form-group" label="Начало">
          <app-input type="time" placeholder="00:00" v-model="startTimeLocal" />
        </form-group>
      </div>
      <div class="form__col">
        <form-group class="form-group" label="Окончание">
          <app-input type="time" placeholder="00:00" v-model="endTimeLocal" />
        </form-group>
      </div>
    </div>
    <form-group
      v-for="item in fieldSpecification"
      :key="item.field"
      :label="item.title"
      class="form-group"
    >
      <component
        :is="item.component"
        v-bind="item.props"
        :class="{ 'form-control': item.component === 'dropdown-button' }"
        v-model="agendaLocal[item.field]"
      ></component>
    </form-group>
  </div>
</template>

<script>
import FormGroup from './FormGroup';
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: {
    AppInput,
    DropdownButton,
    FormGroup,
  },
  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      agendaLocal: { ...this.agendaItem },
      delta: 0,
    };
  },
  watch: {
    agendaLocal: {
      deep: true,
      handler(value) {
        this.agendaLocal = value;
        this.$emit('update:agendaItem', { ...this.agendaLocal });
      },
    },
  },
  computed: {
    fieldSpecification() {
      return this.$options.fieldSpecifications[this.agendaLocal.type];
    },

    endTimeLocal: {
      get() {
        return this.agendaLocal.endsAt;
      },
      set(value) {
        this.agendaLocal.endsAt = value;
        if (!this.delta) {
          this.calcDelta(this.agendaLocal.startsAt, this.agendaLocal.endsAt);
        }
      },
    },
    startTimeLocal: {
      get() {
        return this.agendaLocal.startsAt;
      },
      set(value) {
        if (!this.delta) {
          this.calcDelta(this.agendaLocal.startsAt, this.agendaLocal.endsAt);
        }
        this.agendaLocal.startsAt = value;
        this.addDelta(value);
      },
    },
  },
  methods: {
    remove() {
      this.$emit('remove');
    },
    calcDelta(timeStart, timeEnd) {
      let [eh, em] = timeEnd.split(':');
      let [sh, sm] = timeStart.split(':');
      [eh, em] = [+eh, +em];
      [sh, sm] = [+sh, +sm];

      let ch = 1440; //24 * 60 кол-во минут  в сутках
      this.delta = (ch + (eh - sh) * 60 + (em - sm)) % 1440; //60 минут в часе
    },
    addDelta(startTime) {
      let [sh, sm] = startTime.split(':');
      [sh, sm] = [+sh, +sm];

      const min = sh * 60 + sm; //вычислим в минутах
      const minDelta = min + this.delta; //вычислим с дельтой
      const modMin = minDelta % 60; //оставляем целые минуты
      const modH = (24 + (minDelta - modMin) / 60) % 24;
      this.agendaLocal.endsAt =
        (modH < 10 ? '0' : '') + modH + ':' + (modMin < 10 ? '0' : '') + modMin;
    },
  },
};
</script>

<style></style>
