import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
/*function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}*/

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    agendaItemIcons,
    agendaItemTitles,
    meetupItem: null,
  },

  mounted() {
    // Требуется получить данные митапа с API
    this.fetchMeetups();
  },
  computed: {
    //почему-то,если тут что-то есть, выводится белый экран
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()

    getDataMeetup() {
    return fetch(`${API_URL}/meetups/${MEETUP_ID}`, {method: 'GET' })
      .then(response => response.json())
    },
    async fetchMeetups() {
      this.meetupItem = await this.getDataMeetup();
    },
    getMeetupCoverLink(meetup) {
      return `${API_URL}/images/${meetup.imageId}`;
    },
    localDate(date) {
      return new Date(date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    stringDate(date) {
      return new Date(date).toISOString().substr(0, 10);
    },
  },
});
