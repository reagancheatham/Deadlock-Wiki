<script setup>
const headers = [
    {
        title: "Name",
        key: "name",
    },
    {
        title: "Actions",
        key: "actions",
    },
];

const characters = [
    {
        name: "Abrams",
    },
    {
        name: "Bebop",
    },
    {
        name: "Billy",
    },
    {
        name: "Calico",
    },
    {
        name: "The Doorman",
    },
];
</script>

<template>
    <v-data-table
        class="character-table border"
        :headers="headers"
        :items="characters"
        hide-default-footer=""
    >
        <template v-slot:item.actions="{ item }">
            <div class="d-flex ga-2">
                <v-tooltip text="Edit" location="start">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-icon
                            v-bind="activatorProps"
                            color="medium-emphasis"
                            icon="mdi-pencil"
                            size="small"
                            @click="edit(item.id)"
                        ></v-icon>
                    </template>
                </v-tooltip>

                <v-tooltip text="Delete" location="end">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-icon
                            v-bind="activatorProps"
                            color="medium-emphasis"
                            icon="mdi-delete"
                            size="small"
                            @click="remove(item.id)"
                        ></v-icon>
                    </template>
                </v-tooltip>
            </div>
        </template>
    </v-data-table>
</template>

<style></style>
