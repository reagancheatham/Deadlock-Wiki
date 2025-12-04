<script setup>
import router from "@/routing/router.js";
import routes from "@/routing/routes.js";

function navigate(name) {
    router.push(name);
}
</script>

<template>
    <v-app-bar>
        <v-app-bar-nav-icon variant="text" icon="mdi-home" @click="navigate(routes.Characters)"></v-app-bar-nav-icon>
        <v-toolbar-title>Deadlock Wiki</v-toolbar-title>
    </v-app-bar>
</template>