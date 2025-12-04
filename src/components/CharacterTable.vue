<script setup>
import { ref } from "vue";
import characterServices from "@/services/characterServices";
import CharacterEditor from "./CharacterEditor.vue";

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
const editedCharacter = ref(null);
const isInputDisabled = ref(false);
const isDialogVisible = ref(false);

characterServices.findAll().then((databaseCharacters) => {
    characters.value = databaseCharacters;
});

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

async function save(characterData) {
    isInputDisabled.value = true;

    await characterServices.update(characterData).then(() => {
        isInputDisabled.value = false;

        let index = characters.value.findIndex((c) => c.id == characterData.id);
        characters.value[index] = characterData;

        closeDialog();
    });
}

function closeDialog() {
    isDialogVisible.value = false;
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
                            @click="edit(item)"
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
    <v-dialog v-model="isDialogVisible">
        <CharacterEditor
            :character="editedCharacter"
            :input-disabled="isInputDisabled"
            @save="save"
            @cancel="closeDialog"
        />
    </v-dialog>
</template>

<style></style>
