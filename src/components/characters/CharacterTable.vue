<script setup>
import { ref } from "vue";
import characterServices from "@/services/character.services";
import CharacterEditor from "./CharacterEditor.vue";
import characterInfoServices from "@/services/characterInfo.services.js";
import vitalityStatsServices from "@/services/vitalityStats.services.js";

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
const characters = ref([]);
const editedCharacter = ref(null);
const isInputDisabled = ref(false);
const isDialogVisible = ref(false);

characterServices.findAll().then((databaseCharacters) => {
    characters.value = databaseCharacters;
});

function create() {
    editedCharacter.value = {};
    isDialogVisible.value = true;
}

function edit(character) {
    editedCharacter.value = { ...character };
    isDialogVisible.value = true;
}

async function remove(character) {
    if (isInputDisabled.value) return;

    isInputDisabled.value = true;

    await characterServices.delete(character.id).then(() => {
        isInputDisabled.value = false;

        let index = characters.value.findIndex((c) => c.id == character.id);
        characters.value.splice(index, 1);
    });
}

async function save(characterData, characterInfo, vitalityStats) {
    isInputDisabled.value = true;

    await characterServices.update(characterData).then((response) => {
        characterData = response;

        let index = characters.value.findIndex((c) => c.id == characterData.id);

        if (index === -1) characters.value.push(characterData);
        else characters.value[index] = characterData;
    });

    characterInfo.characterID = characterData.id;
    await characterInfoServices.update(characterInfo);

    vitalityStats.characterID = characterData.id;
    await vitalityStatsServices.update(vitalityStats);

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
                text="Characters"
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
                :items="characters"
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
        <CharacterEditor
            :character="editedCharacter"
            :input-disabled="isInputDisabled"
            @save="save"
            @cancel="closeDialog"
        />
    </v-dialog>
</template>
