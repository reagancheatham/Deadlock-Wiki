import { createRouter, createWebHistory } from "vue-router";
import CharactersPage from "@/pages/CharactersPage.vue";
import WeaponsPage from "@/pages/WeaponsPage.vue";
import UpdateHistoryPage from "@/pages/UpdateHistoryPage.vue";

const router = createRouter({
    //removes the # from the url
    history: createWebHistory(),

    routes: [
        {
            path: "/",
            redirect: "/characters",
        },
        {
            path: "/characters",
            component: CharactersPage,
        },
        {
            path: "/weapons",
            component: WeaponsPage,
        },
        {
            path: "/updateHistory",
            component: UpdateHistoryPage,
        },
    ],
});

export default router;
