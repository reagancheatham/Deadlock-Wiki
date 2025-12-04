<script setup>
import characterInfoServices from "@/services/characterInfoServices.js";
import { ref } from "vue";

const props = defineProps(["character", "inputDisabled"]);
const emits = defineEmits(["save", "cancel"]);

const characterInfo = ref({});

characterInfoServices.find(props.character.id).then((info) => {
    console.log(`Found character info: ${JSON.stringify(info)}`);
    characterInfo.value = info;
});

function save() {
    emits("save", props.character, characterInfo.value);
}

function cancel() {
    emits("cancel");
}
</script>

<template>
    <v-container width="80%">
        <v-card class="editor-card">
            <v-card-title>Edit Character</v-card-title>
            <v-row class="ml-4 mr-4">
                <v-col>
                    <v-text-field
                        label="Name"
                        v-model="character.name"
                    ></v-text-field>
                    <v-textarea
                        label="Background"
                        v-model="character.background"
                        rows="12"
                    ></v-textarea>
                </v-col>
                <v-col class="d-flex flex-column">
                    <v-text-field
                        class="flex-grow-0"
                        label="Release Date"
                        v-model="characterInfo.releaseDate"
                    >
                    </v-text-field>
                    <v-text-field
                        class="flex-grow-0"
                        label="Voice Actor"
                        v-model="characterInfo.voiceActor"
                    >
                    </v-text-field>
                    <v-text-field
                        class="flex-grow-0"
                        label="Code Names"
                        v-model="characterInfo.codeNames"
                    >
                    </v-text-field>
                    <v-row class="button-row mb-3 mr-1" justify="end">
                        <v-btn
                            class="mr-4"
                            color="button_primary"
                            @click="save()"
                            :disabled="inputDisabled"
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
