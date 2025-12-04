<template>
    <v-navigation-drawer expand-on-hover permanent rail>
        <v-list>
            <v-list-item
                prepend-icon="mdi-account"
                title="Characters"
                value="characters"
            ></v-list-item>
            <v-list-item
                prepend-icon="mdi-sword"
                title="Weapons"
                value="weapons"
            ></v-list-item>
            <v-list-item
                prepend-icon="mdi-clipboard-text-clock-outline"
                title="Update History"
                value="updateHistory"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
