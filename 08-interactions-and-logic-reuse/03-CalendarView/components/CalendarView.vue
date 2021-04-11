<template>
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button
            class="rangepicker__selector-control-left"
            @click="prev"
          ></button>
          <div>{{ getLocaleMonthYear }}</div>
          <button
            class="rangepicker__selector-control-right"
            @click="next"
          ></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          class="rangepicker__cell rangepicker__cell_inactive"
          v-for="day in lastMonthDays"
          :key="day"
        >
          {{ day }}
        </div>
        <div
          class="rangepicker__cell"
          v-for="day in getArrMonth.arrMonthString"
          :key="day"
        >
          {{ new Date(day).getDate() }}
          <slot :day="day"></slot>
        </div>
        <div
          class="rangepicker__cell rangepicker__cell_inactive"
          v-for="day in nextMonthDays"
          :key="day"
        >
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarView',

  data() {
    return {
      date: new Date(),
    };
  },
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

    getArrMonth: function () {
      //последний день текущего месяца
      let lastDayMonth = new Date(
        this.currentYear,
        this.date.getMonth() + 1,
        0,
      ).getDate();

      const arrMonth = Array.from({ length: lastDayMonth }, (day, i) => i + 1);
      const arrMonthString = [];

      arrMonth.forEach((day) => {
        day = new Date(
          this.currentYear,
          this.date.getMonth(),
          day,
        ).toDateString();
        arrMonthString.push(day);
      });

      return {
        arrMonthString,
        arrMonth,
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

    first() {
      return new Date(this.currentYear, this.date.getMonth(), 1);
    },
  },
  methods: {
    prev() {
      this.date = new Date(this.first.setMonth(this.first.getMonth() - 1));
    },
    next() {
      this.date = new Date(this.first.setMonth(this.first.getMonth() + 1));
    },
  },
};
</script>

<style scoped>
.rangepicker {
  position: relative;
  margin: 32px 0 0;
}

.rangepicker__selector {
  display: flex;
  background-color: var(--white);
  flex-direction: row;
  justify-content: space-between;
  flex: 1 0 100%;
}

.rangepicker__calendar {
  flex-grow: 1;
}

.rangepicker__month-indicator {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.rangepicker__selector-controls {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}
.rangepicker__selector-controls button {
  border: none;
  padding: 0;
}

.rangepicker__selector-control-left,
.rangepicker__selector-control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('../assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.rangepicker__selector-control-left:hover,
.rangepicker__selector-control-right:hover {
  opacity: 0.8;
}

.rangepicker__selector-control-right {
  transform: rotate(180deg);
}

.rangepicker__date-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

/* Dates */
.rangepicker__date-grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.rangepicker__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.rangepicker__cell.rangepicker__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .rangepicker__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .rangepicker__date-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .rangepicker__cell {
    height: 144px;
  }

  .rangepicker__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
