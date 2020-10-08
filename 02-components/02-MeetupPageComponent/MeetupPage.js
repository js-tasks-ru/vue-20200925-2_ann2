import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div id="app">
                <meetup-view :meetup="meetup"></meetup-view>
             </div>`,
  components: {
    MeetupView,
  },

  // data
  data() {
    return {
      meetup: null,
    }
  },

  // mounted
  mounted() {
    this.getMeetup();
  },
  // methods
  methods: {
    async getMeetup() {
      this.meetup = await fetchMeetup(MEETUP_ID);
    },
  }
};
