<script setup>
import Toolbar from "./components/Toolbar.vue";
import Navbar from "./components/Navbar.vue";
import CharacterTable from "./components/characters/CharacterTable.vue";
</script>

<style>
.test {
    background-color: white;
    width: 500px;
    height: 500px;
}
</style>

<template>
    <v-sheet class="background-sheet" rounded>
        <v-layout>
            <Toolbar />
            <Navbar />
            <v-main>
                <RouterView />
            </v-main>
        </v-layout>
    </v-sheet>
</template>
