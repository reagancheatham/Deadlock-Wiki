<script setup>
import { ref } from "vue";
import characterServices from "@/services/character.services.js";

const props = defineProps(["quote", "inputDisabled"]);
const emits = defineEmits(["save", "cancel"]);

const isFormValid = ref(false);
const characters = ref([]);
const selectedCharacter = ref({});
const guestCharacter = ref({});

const requiredRules = [
    (value) => {
        if (value) return true;

        return "Required field.";
    },
];

const characterRules = [
    (value) => {
        if (value && value.id) return true;

        return "Required field.";
    },
];

characterServices.findAll().then((databaseCharacters) => {
    characters.value = databaseCharacters;

    selectedCharacter.value = characters.value.find(
        (c) => c.id == props.quote.characterID
    );

    guestCharacter.value = characters.value.find(
        (c) => c.id == props.quote.guestCharacterID
    );
});

function save() {
    props.quote.characterID = selectedCharacter.value?.id;
    props.quote.guestCharacterID = guestCharacter.value?.id;

    emits("save", props.quote, selectedCharacter.value, guestCharacter.value);
}

function cancel() {
    emits("cancel");
}
</script>

<template>
    <v-container width="100%">
        <v-card class="editor-card">
            <v-card-title>Edit History</v-card-title>
            <v-form v-model="isFormValid">
                <v-row class="ml-4 mr-4">
                    <v-col>
                        <v-select
                            label="Character"
                            v-model="selectedCharacter"
                            :items="characters"
                            item-title="name"
                            return-object
                            :rules="characterRules"
                        >
                        </v-select>
                        <v-select
                            label="Guest Character"
                            v-model="guestCharacter"
                            :items="characters"
                            item-title="name"
                            return-object
                            :rules="characterRules"
                        >
                        </v-select>
                        <v-text-field label="Context" v-model="quote.context">
                        </v-text-field>
                        <v-text-field
                            label="Transcript"
                            v-model="quote.transcript"
                            :rules="requiredRules"
                        >
                        </v-text-field>
                        <v-text-field label="Item" v-model="quote.item">
                        </v-text-field>
                        <v-row class="button-row mb-3 mr-1" justify="end">
                            <v-btn
                                class="mr-4"
                                color="button_primary"
                                @click="save()"
                                :disabled="inputDisabled || !isFormValid"
                                >Save</v-btn
                            >
                            <v-btn
                                color="button_secondary"
                                @click="cancel()"
                                :disabled="inputDisabled"
                                >Cancel</v-btn
                            >
                        </v-row>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
    </v-container>
</template>

<style>
.editor-card {
    padding: 16px;
}

.button-row {
    margin-top: 128px !important;
}
</style>
