import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    rtl: true,
    theme: {
        themes: {
          light: {
            primary: colors.green.darken4,
            secondary: colors.green,
            accent: colors.orange,
          },
        },
      },
});
