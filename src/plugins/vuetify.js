import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import colors from "vuetify/util/colors";

const customTheme = {
    dark: true,
    colors: {
        primary: colors.orange.darken1,
    },
};

export default createVuetify({
    components,
    directives,
    icons: {
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: "customTheme",
        themes: {
            customTheme,
        },
    },
});
