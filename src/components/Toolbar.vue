<script setup>
import router from "@/routing/router.js";
import routes from "@/routing/routes.js";
import {useTheme} from 'vuetify';

const theme = useTheme();

function navigate(name) {
    router.push(name);
}
</script>

<template>
    <v-app-bar>
        <v-app-bar-nav-icon variant="text" icon="mdi-home" @click="navigate(routes.Characters)"></v-app-bar-nav-icon>
        <v-toolbar-title>Deadlock Wiki</v-toolbar-title>
        <v-btn @click="theme.cycle(['customTheme', 'lightTheme'])">Dark/Light Mode</v-btn>
    </v-app-bar>
</template>