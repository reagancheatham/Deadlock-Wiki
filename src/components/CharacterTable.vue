<script setup>
import characterServices from "@/services/characterServices";
import { ref } from "vue";

const headers = [
    {
        title: "Name",
        key: "name",
        width: "500px",
    },
    {
        title: "Actions",
        key: "actions",
    },
];

const characters = ref([]);
const isInputDisabled = ref(false);

characterServices.findAll().then((databaseCharacters) => {
    characters.value = databaseCharacters;
});

function edit(name) {
    console.log(`Edit character: ${name}.`);
}

async function remove(name) {
    if (isInputDisabled.value) return;

    isInputDisabled.value = true;
    await characterServices.delete(name).then(() => {
        isInputDisabled.value = false;

        let index = characters.value.findIndex((c) => c.name == name);
        characters.value.splice(index, 1);
    });
}
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
                            :disabled="isInputDisabled"
                            @click="edit(item.name)"
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
                            :disabled="isInputDisabled"
                            @click="remove(item.name)"
                        ></v-icon>
                    </template>
                </v-tooltip>
            </div>
        </template>
    </v-data-table>
</template>

<style></style>
