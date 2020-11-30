<template>
  <form class="form meetup-form" @submit.prevent="submit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input class="form-control" v-model="meetup_.title" />
        </div>
        <div class="form-group">
          <label class="form-label">Дата</label>
          <input class="form-control" type="date" v-model="meetup_.date" />
        </div>
        <div class="form-group">
          <label class="form-label">Место</label>
          <input class="form-control" v-model="meetup_.place" />
        </div>
        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="meetup_.description"
          ></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Изображение</label>
          <image-uploader v-model="meetup_.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        class="mb-3"
        v-for="(agendaItem, idx) in meetup_.agenda"
        :key="agendaItem.id"
        :agenda-item="agendaItem"
        @update:agendaItem="updateAgendaItem(idx, $event)"
        @remove="removeAgendaItem(idx)"
      />
      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          class="button button_secondary button_block"
          type="button"
          @click="cancel"
          data-test="cancel"
        >
          Отмена
        </button>
        <button
          class="button button_primary button_block"
          type="submit"
          data-test="submit"
        >
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm';
import ImageUploader from './ImageUploader';

function buildAgendaItem() {
  return {
    id: Math.random(),
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}
function deepClone(a) {
  return JSON.parse(JSON.stringify(a));
}
export default {
  name: 'MeetupForm',

  components: {
    ImageUploader,
    MeetupAgendaItemForm,
  },
  data() {
    return {
      meetup_: deepClone(this.meetup),
    };
  },
  props: {
    meetup: {
      type: Object,
      required: true,
    },
    submitText: {
      type: String,
    },
  },

  methods: {
    submit() {
      this.$emit('submit', deepClone(this.meetup_));
    },
    addAgendaItem() {
      const newItem = buildAgendaItem();
      if (this.meetup_.agenda.length) {
        const lastItem = this.meetup_.agenda[this.meetup_.agenda.length - 1];
        this.meetup_.agenda.push({ ...newItem, startsAt: lastItem.endsAt });
      } else {
        this.meetup_.agenda.push(newItem);
      }
      this.$emit('update:meetup_', deepClone(this.meetup_));
    },
    updateAgendaItem(idx, newItem) {
      this.meetup_.agenda.splice(idx, 1, newItem);
    },
    removeAgendaItem(idx) {
      this.meetup_.agenda.splice(idx, 1);
      //this.$emit('update:meetup_', deepClone(this.meetup_));
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
