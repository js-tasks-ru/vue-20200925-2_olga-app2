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
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

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
    rawMeetup: null,
  },
  async mounted() {
    await this.fetchMeetup();
  },
  computed: {
    meetup() {
      if (!this.rawMeetup) {
        return this.rawMeetup;
      }

      return Object.assign({}, this.rawMeetup, {
        meetupImg: this.getMeetupImg(),
        agendaFull: this.getFullAgenda(),
        dateFormat: new Date(this.rawMeetup.date).toLocaleString('ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        dateTime: this.formatDate(new Date(this.rawMeetup.date))
      });
    },
  },
  methods: {
    async fetchMeetup() {
      let url = `${API_URL}/meetups/${MEETUP_ID}`;

      await fetch(url)
      .then(response => response.json())
      .then((result) => {
        this.rawMeetup = result;
      });
    },
    getMeetupImg() {
      return this.rawMeetup ? getMeetupCoverLink(this.rawMeetup) : null;
    },
    getFullAgenda() {
      return this.rawMeetup.agenda.map((item) => ({
        ...item,
        icon: agendaItemIcons[item.type],
        titleFromTypes: agendaItemTitles[item.type]
      }));
    },
    formatDate(date) {
      let day = date.getDate();
      if (day < 10) {
        day = '0' + day;
      }

      let month = date.getMonth() + 1;
      if (month < 10) {
        month = '0' + month;
      }

      let year = date.getFullYear();
      if (year < 10) {
        year = '0' + year;
      }

      return `${year}-${month}-${day}`;
    }
  },
});
