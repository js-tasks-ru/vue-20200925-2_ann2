import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div id="app" v-if="meetup">
                <meetup-view :meetup="meetup"></meetup-view>
             </div>`,
  components: {
    MeetupView,
  },

  // data
  data() {
    return {
      meetup: null,
      //meetupLink: '',
    }
  },

  // mounted
  mounted() {
    this.getMeetup();
  },
  // methods
  methods: {
    async getMeetup() {
      console.log(await fetchMeetup(MEETUP_ID));
      this.meetup = await fetchMeetup(MEETUP_ID);
    },
  }
};
