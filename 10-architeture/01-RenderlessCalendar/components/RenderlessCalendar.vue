<script>
export default {
  name: 'RenderlessCalendar',
  props: {
    customDate: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    return {
      currentDate: this.customDate,
    };
  },
  computed: {
    currentYear() {
      return this.currentDate.getFullYear();
    },
    //текущий месяц
    getLocaleMonthYear() {
      return `${this.currentDate.toLocaleString(navigator.language, {
        month: 'long',
      })} ${this.currentDate.getFullYear()}`;
    },

    //последние дни предыдущего месяца
    lastDaysMonth() {
      const arrLastMonth = [];
      const lastDays = new Date(
        this.currentYear,
        this.currentDate.getMonth(),
        0,
      ).getDate();
      if (this.getIndexWeekDayFirstDayMonth > 0) {
        for (
          let i = lastDays - this.getIndexWeekDayFirstDayMonth + 1;
          i <= lastDays;
          i++
        ) {
          arrLastMonth.push(i);
        }
      }
      return arrLastMonth;
    },

    getArrMonth() {
      //последний день текущего месяца
      const lastDayMonth = new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        0,
      ).getDate();

      const arrMonth = Array.from({ length: lastDayMonth }, (day, i) => i + 1);

      const arrMonthString = arrMonth.map((day) => {
        return new Date(
          this.currentYear,
          this.currentDate.getMonth(),
          day,
        ).toDateString();
      });

      return {
        arrMonthString,
        arrMonth,
      };
    },

    //индекс дня недели первого дня месяца
    getIndexWeekDayFirstDayMonth() {
      //local week
      return (
        (new Date(this.currentYear, this.currentDate.getMonth(), 1).getDay() +
          6) %
        7
      );
    },

    //индекс дня недели последнего дня месяца
    getIndexWeekDayLastDayMonth() {
      //local week
      return (
        (new Date(
          this.currentYear,
          this.currentDate.getMonth(),
          this.getArrMonth.arrMonth.length,
        ).getDay() +
          6) %
        7
      );
    },

    nextDaysMonth() {
      const nextDaysMonth = [];
      if (this.getIndexWeekDayLastDayMonth < 6) {
        for (let i = 1; i <= 6 - this.getIndexWeekDayLastDayMonth; i++) {
          nextDaysMonth.push(i);
        }
      }
      return nextDaysMonth;
    },

    first() {
      return new Date(this.currentYear, this.currentDate.getMonth(), 1);
    },
  },
  methods: {
    prev() {
      this.currentDate = new Date(
        this.first.setMonth(this.first.getMonth() - 1),
      );
    },
    next() {
      this.currentDate = new Date(
        this.first.setMonth(this.first.getMonth() + 1),
      );
    },
  },

  render(h) {
    return h('div', [
      this.$scopedSlots.default({
        currentYear: this.currentYear,
        getLocaleMonthYear: this.getLocaleMonthYear,
        lastDaysMonth: this.lastDaysMonth,
        getArrMonth: this.getArrMonth,
        nextDaysMonth: this.nextDaysMonth,
        prev: this.prev,
        next: this.next,
      }),
    ]);
  },
};
</script>
