<script setup>
import { ref } from "vue";
import triviaServices from "@/services/trivia.services.js";
import characterServices from "@/services/character.services.js";
import TriviaEditor from "./TriviaEditor.vue";

const headers = [
    {
        title: "Character",
        key: "characterName",
    },
    {
        title: "Trivia",
        key: "trivia.text",
    },
    {
        title: "Actions",
        key: "actions",
    },
];
const trivias = ref([]);
const listItems = ref([]);
const editedTrivia = ref(null);
const isInputDisabled = ref(false);
const isDialogVisible = ref(false);

loadTrivia();

async function loadTrivia() {
    await triviaServices.findAll().then((databaseQuotes) => {
        trivias.value = databaseQuotes;
    });

    trivias.value.forEach((trivia) => listItems.value.push({ trivia }));

    await characterServices.findAll().then((characters) => {
        listItems.value.forEach((i) => {
            const character = characters.find(
                (c) => c.id == i.trivia.characterID
            );

            if (character) i.characterName = character.name;
        });
    });
}

function create() {
    editedTrivia.value = {};
    isDialogVisible.value = true;
}

function edit(item) {
    editedTrivia.value = { ...item.trivia };
    isDialogVisible.value = true;
}

async function remove(item) {
    if (isInputDisabled.value) return;

    isInputDisabled.value = true;

    await triviaServices.delete(item.trivia.id).then(() => {
        isInputDisabled.value = false;

        let triviaIndex = trivias.value.findIndex(
            (t) => t.id == item.trivia.id
        );
        trivias.value.splice(triviaIndex, 1);

        let itemIndex = listItems.value.findIndex(
            (i) => i.trivia.id == item.trivia.id
        );
        listItems.value.splice(itemIndex, 1);
    });
}

async function save(triviaData, characterData) {
    isInputDisabled.value = true;

    await triviaServices.update(triviaData).then((response) => {
        triviaData = response;
        let index = trivias.value.findIndex((t) => t.id == triviaData.id);
        trivias.value[index] = triviaData;

        let itemIndex = listItems.value.findIndex(
            (i) => i.trivia.id == triviaData.id
        );
        const listItem = {
            trivia: triviaData,
            characterName: characterData.name,
        };

        if (itemIndex == -1) listItems.value.push(listItem);
        else listItems.value[itemIndex] = listItem;
    });

    isInputDisabled.value = false;
    closeDialog();
}

function closeDialog() {
    isDialogVisible.value = false;
}
</script>

<template>
    <v-row class="ml-4 mt-4 mr-4" justify="end">
        <v-col class="ml-1">
            <v-label
                style="font-size: 24px"
                class="text-high-emphasis"
                text="Trivia"
            ></v-label>
        </v-col>
        <v-btn
            style="align-self: center"
            color="button_primary"
            width="100px"
            @click="create()"
            >Add</v-btn
        >
    </v-row>
    <v-row justify="center">
        <v-col class="d-flex justify-center">
            <v-data-table
                :headers="headers"
                :items="listItems"
                hide-default-footer
            >
                <template v-slot:item.actions="{ item }">
                    <div class="d-flex ga-2">
                        <v-tooltip text="Edit" location="start">
                            <template
                                v-slot:activator="{ props: activatorProps }"
                            >
                                <v-icon
                                    v-bind="activatorProps"
                                    color="medium-emphasis"
                                    icon="mdi-pencil"
                                    size="small"
                                    :disabled="isInputDisabled"
                                    @click="edit(item)"
                                ></v-icon>
                            </template>
                        </v-tooltip>

                        <v-tooltip text="Delete" location="end">
                            <template
                                v-slot:activator="{ props: activatorProps }"
                            >
                                <div>
                                    <v-icon
                                        v-bind="activatorProps"
                                        color="medium-emphasis"
                                        icon="mdi-delete"
                                        size="small"
                                        :disabled="isInputDisabled"
                                        @click="remove(item)"
                                    ></v-icon>
                                </div>
                            </template>
                        </v-tooltip>
                    </div>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
    <v-dialog v-model="isDialogVisible">
        <TriviaEditor
            :trivia="editedTrivia"
            :input-disabled="isInputDisabled"
            @save="save"
            @cancel="closeDialog"
        />
    </v-dialog>
</template>
