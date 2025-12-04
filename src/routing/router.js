import { createRouter, createWebHistory } from "vue-router";
import CharactersPage from "@/pages/CharactersPage.vue";
import WeaponsPage from "@/pages/WeaponsPage.vue";
import UpdateHistoryPage from "@/pages/UpdateHistoryPage.vue";
import routes from "./routes.js";
import QuotesPage from "@/pages/QuotesPage.vue";
import TriviaPage from "@/pages/TriviaPage.vue";

const router = createRouter({
    //removes the # from the url
    history: createWebHistory(),

    routes: [
        {
            path: "/",
            redirect: routes.Characters,
        },
        {
            path: routes.Characters,
            component: CharactersPage,
        },
        {
            path: routes.Weapons,
            component: WeaponsPage,
        },
        {
            path: routes.UpdateHistory,
            component: UpdateHistoryPage,
        },
        {
            path: routes.Quotes,
            component: QuotesPage,
        },
        {
            path: routes.Trivia,
            component: TriviaPage,
        },
    ],
});

export default router;
