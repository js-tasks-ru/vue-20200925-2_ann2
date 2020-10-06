import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';


export const MeetupView = {
  name: 'MeetupView',

  template: `
   <div>
        <!-- meetup cover -->
      <meetup-cover :title="meetup.title" :link="this.link"></meetup-cover>
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <!-- meetup description -->
            <meetup-description :description="meetup.description" v-if="meetup.description"></meetup-description>

            <h3>Программа</h3>
            <!-- meetup agenda -->
            <meetup-agenda :agenda="meetup.agenda"></meetup-agenda>
          </div>
          <div class="meetup__aside">
            <!-- meetup info -->
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="new Date(meetup.date)"></meetup-info>
          </div>
        </div>
      </div>
   </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupInfo,
    MeetupAgenda,
  },

  data() {
    return {
      link: '',
    }
 },
  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.getCoverLink();
  },

  methods: {
    getCoverLink() {
      this.link = getMeetupCoverLink(this.meetup);
    },
  }
};
