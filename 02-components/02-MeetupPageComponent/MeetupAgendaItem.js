import {agendaItemIcons, agendaItemTitles} from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="agendaItem.type ? \`/assets/icons/icon-\${agendaItemIcons[agendaItem.type]}.svg\` : '' " />
      </div>
      <div class="meetup-agenda__item-col">{{agendaItem.startsAt}} - {{agendaItem.endsAt}}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{agendaItem.title ? agendaItem.title : agendaItemTitles[agendaItem.type]}}</h5>
        <template v-if="agendaItem.description">
          <p>
            <span>{{agendaItem.speaker}}</span>
            <span class="meetup-agenda__dot"></span>
            <span class="meetup-agenda__lang">{{agendaItem.language}}</span>
          </p>
          <p>{{agendaItem.description}}</p>
        </template>
      </div>
    </div>`,

  // props
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      agendaItemTitles,
      agendaItemIcons,
    }
  },

  // Возможно, тут потребуется computed
  /*computed: {
    getUrlIcon(type) {
      console.log(`/assets/icons/icon-${agendaItemIcons[agendaItem.type]}.svg`);
      return `/assets/icons/icon-${agendaItemIcons[type]}.svg`;
    }
  }*/
};
