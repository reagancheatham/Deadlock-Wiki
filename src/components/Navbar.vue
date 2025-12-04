<script setup>
import router from "@/routing/router.js";
import routes from "@/routing/routes.js";

function navigate(name) {
    router.push(name);
}
</script>

<template>
    <v-navigation-drawer permanent>
        <v-list>
            <v-list-item
                prepend-icon="mdi-account"
                title="Characters"
                @click="navigate(routes.Characters)"
            ></v-list-item>
            <v-list-item
                prepend-icon="mdi-sword"
                title="Weapons"
                @click="navigate(routes.Weapons)"
            ></v-list-item>
            <v-list-item
                prepend-icon="mdi-clipboard-text-clock-outline"
                title="Update History"
                @click="navigate(routes.UpdateHistory)"
            ></v-list-item>
            <v-list-item
                prepend-icon="mdi-format-quote-close-outline"
                title="Quotes"
                @click="navigate(routes.Quotes)"
            >
            </v-list-item>
            <v-list-item
                prepend-icon="mdi-lightbulb-question"
                title="Trivia"
                @click="navigate(routes.Trivia)"
            >
            </v-list-item>
            <v-list-item
                prepend-icon="mdi-wheelchair-accessibility"
                title="Stupid Clanker"
                @click="navigate(routes.Clanker)"
            >

            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
