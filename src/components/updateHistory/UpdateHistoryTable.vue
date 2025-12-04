<script setup>
import { ref } from "vue";
import updateHistoryServices from "@/services/updateHistory.services.js";
import characterServices from "@/services/character.services.js";
import HistoryEditor from "./HistoryEditor.vue";

const headers = [
    {
        title: "Date",
        key: "history.date",
    },
    {
        title: "Character",
        key: "characterName",
    },
    {
        title: "Actions",
        key: "actions",
    },
];
const updateHistories = ref([]);
const listItems = ref([]);
const editedHistory = ref(null);
const isInputDisabled = ref(false);
const isDialogVisible = ref(false);

loadHistory();

async function loadHistory() {
    await updateHistoryServices.findAll().then((databaseHistory) => {
        updateHistories.value = databaseHistory;
    });

    updateHistories.value.forEach((history) => listItems.value.push({ history: history }));

    await characterServices.findAll().then((characters) => {
        listItems.value.forEach((i) => {
            const character = characters.find(
                (c) => c.id == i.history.characterID
            );

            if (character) i.characterName = character.name;
        });
    });
}

function create() {
    editedHistory.value = {};
    isDialogVisible.value = true;
}

function edit(item) {
    editedHistory.value = { ...item.history };
    isDialogVisible.value = true;
}

async function remove(item) {
    if (isInputDisabled.value) return;

    isInputDisabled.value = true;

    await updateHistoryServices.delete(item.history.id).then(() => {
        isInputDisabled.value = false;

        let historyIndex = updateHistories.value.findIndex(
            (h) => h.id == item.history.id
        );
        updateHistories.value.splice(historyIndex, 1);

        let itemIndex = listItems.value.findIndex(
            (i) => (i.history.id == item.history.id)
        );
        listItems.value.splice(itemIndex, 1);
    });
}

async function save(historyData, characterData) {
    isInputDisabled.value = true;

    await updateHistoryServices.update(historyData).then((response) => {
        historyData = response;
        let index = updateHistories.value.findIndex((h) => h.id == historyData.id);
        updateHistories.value[index] = historyData;

        let itemIndex = listItems.value.findIndex((i) => i.history.id == historyData.id);
        const listItem = { history: historyData, characterName: characterData.name };
        
        if (itemIndex == -1)
            listItems.value.push(listItem);
        else
            listItems.value[itemIndex] = listItem;
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
                text="Update History"
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
        <HistoryEditor
            :history="editedHistory"
            :input-disabled="isInputDisabled"
            @save="save"
            @cancel="closeDialog"
        />
    </v-dialog>
</template>
