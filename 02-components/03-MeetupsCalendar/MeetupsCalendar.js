/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prev"></button>
          <div>{{ getLocaleMonthYear }}</div>
          <button class="rangepicker__selector-control-right" @click="next"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div class="rangepicker__cell rangepicker__cell_inactive" v-for="day in lastMonthDays">
          {{day}}
        </div>
        <div class="rangepicker__cell" v-for="day in getArrMonth.arrMonthString">
          {{new Date(day).getDate()}}
          <a class="rangepicker__event" v-for="[item, title] in getArrMonth.meetupDay[day]">
            {{title}}
          </a>
        </div>
        <div class="rangepicker__cell rangepicker__cell_inactive" v-for="day in nextMonthDays">
          {{day}}
        </div>
      </div>
    </div>
  </div>`,

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      date: new Date(),
    };
  },
  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  computed: {
    currentYear() {
      return this.date.getFullYear();
    },
    //текущий месяц
    getLocaleMonthYear() {
      return `${this.date.toLocaleString(navigator.language, {
        month: 'long',
      })} ${this.date.getFullYear()}`;
    },

    //последние дни предыдущего месяца
    lastMonthDays() {
      const arrLastMonth = [];
      const lastDays = new Date(
        this.currentYear,
        this.date.getMonth(),
        0,
      ).getDate();
      if (this.getDayWeekFirstDay > 0) {
        for (
          let i = lastDays - this.getDayWeekFirstDay + 1;
          i <= lastDays;
          i++
        ) {
          arrLastMonth.push(i);
        }
      }
      return arrLastMonth;
    },
    //массив дней месяца
    getArrMonth: function () {
      //последний день текущего месяца
      let lastDayMonth = new Date(
        this.currentYear,
        this.date.getMonth() + 1,
        0,
      ).getDate();

      const arrMonth = Array.from({ length: lastDayMonth }, (day, i) => i + 1);
      const arrMonthString = [];
      const meetupDay = {};

      arrMonth.forEach((day) => {
        day = new Date(
          this.currentYear,
          this.date.getMonth(),
          day,
        ).toDateString();
        arrMonthString.push(day);
        meetupDay[day] = this.getMeetupsArr.filter(([item]) => {
          return item === day;
        });
      });

      return {
        arrMonthString,
        arrMonth,
        meetupDay,
      };
    },

    //индекс дня недели первого дня месяца
    getDayWeekFirstDay() {
      //local week
      return (
        (new Date(this.currentYear, this.date.getMonth(), 1).getDay() + 6) % 7
      );
    },

    //индекс дня недели последнего дня месяца
    getDayWeekLastDay() {
      //local week
      return (
        (new Date(
          this.currentYear,
          this.date.getMonth(),
          this.getArrMonth.arrMonth.length,
        ).getDay() +
          6) %
        7
      );
    },

    nextMonthDays() {
      const nextDaysMonth = [];
      if (this.getDayWeekLastDay < 6) {
        for (let i = 1; i <= 6 - this.getDayWeekLastDay; i++) {
          nextDaysMonth.push(i);
        }
      }
      return nextDaysMonth;
    },

    getMeetupsArr() {
      const meetupDays = [];
      this.meetups.map((item) => {
        const meetupDay = new Date(item.date).toDateString();
        const title = item.title;
        meetupDays.push([meetupDay, title]);
      });
      return meetupDays;
    },

    first() {
      return new Date(this.currentYear, this.date.getMonth(), 1);
    },
  },
  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации

  // Методы понадобятся для переключения между месяцами
  methods: {
    prev() {
      this.date = new Date(this.first.setMonth(this.first.getMonth() - 1));
    },
    next() {
      this.date = new Date(this.first.setMonth(this.first.getMonth() + 1));
    },
  },
};
