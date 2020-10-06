export const MeetupCover = {
  template: `<div class="meetup-cover" :style="link ? \`--bg-url: url('\${link}')\`: 'https://course-vue.javascript.ru/api/images/2'">
        <h1 class="meetup-cover__title">{{ title ? title : 'Название митапа' }}</h1>
    </div>`,

  // props
  props: {
    link: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
  /*computed: {
 //--bg-url: url('https://course-vue.javascript.ru/api/images/2')
    styleBg() {
      const url = this.link
        ? this.link
        : '';
      return { '--bg-url': `url('${url}')` };
    },
  }*/
};
