<template>
  <calendar-view>
    <template v-slot="{ day }">
      <template v-if="meetups">
        <calendar-view-event
          v-for="meetup in meetupDays[day]"
          :key="meetup.id"
          tag="router-link"
          :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
          >{{ meetup.title }}</calendar-view-event
        >
      </template>
    </template>
  </calendar-view>
</template>

<script>
import CalendarView from './CalendarView';
import CalendarViewEvent from './CalendarViewEvent';

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    CalendarViewEvent,
    CalendarView,
  },
  computed: {
    meetupDays() {
      const meetupDay = {};
      this.meetups.map((item) => {
        const eventDay = new Date(item.date).toDateString();
        if (meetupDay[eventDay]) {
          meetupDay[eventDay].push({ title: item.title, id: item.id });
        } else {
          meetupDay[eventDay] = [{ title: item.title, id: item.id }];
        }
      });
      return meetupDay;
    },
  },
};
</script>

<style></style>
