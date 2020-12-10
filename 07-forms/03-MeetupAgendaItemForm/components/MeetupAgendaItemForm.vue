<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="remove">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="agendaLocal.type">
        <option v-for="item in types" :key="item.value" :value="item.value">
          {{ item.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            id="startTime"
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="startTimeLocal"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            id="endTime"
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="endTimeLocal"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{ title }}</label>
      <input class="form-control" v-model="agendaLocal.title" />
    </div>
    <div class="form-group" v-if="showTalk">
      <label class="form-label">Докладчик</label>
      <input class="form-control" v-model="agendaLocal.speaker" />
    </div>
    <div class="form-group" v-if="showOther">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="agendaLocal.description"
      ></textarea>
    </div>

    <div class="form-group" v-if="showTalk">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="agendaLocal.language">
        <option v-for="item in lang" :key="item.value">{{ item.text }}</option>
      </select>
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      agendaLocal: { ...this.agendaItem },
      talk: false,
      other: false,
      otherType: true,
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
    types() {
      return getAgendaItemTypes();
    },
    lang() {
      return getTalkLanguages();
    },
    title() {
      if (this.agendaLocal.type === 'talk') {
        return 'Тема';
      } else if (this.agendaLocal.type === 'other') {
        return 'Заголовок';
      } else {
        return 'Нестандартный текст (необязательно)';
      }
    },

    showTalk() {
      return this.agendaLocal.type === 'talk';
    },
    showOther() {
      return (
        this.agendaLocal.type === 'talk' || this.agendaLocal.type === 'other'
      );
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
