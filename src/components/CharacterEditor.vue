<script setup>
import characterInfoServices from "@/services/characterInfo.services.js";
import vitalityStatsServices from "@/services/vitalityStats.services.js";
import { ref } from "vue";

const props = defineProps(["character", "inputDisabled"]);
const emits = defineEmits(["save", "cancel"]);

const characterInfo = ref({});
const vitalityStats = ref({});

characterInfoServices.find(props.character.id).then((info) => {
    console.log(`Found character info: ${JSON.stringify(info)}.`);
    characterInfo.value = info;
});

vitalityStatsServices.find(props.character.id).then((stats) => {
    console.log(`Found vitality stats: ${JSON.stringify(stats)}.`);
    vitalityStats.value = stats;
});

function save() {
    emits("save", props.character, characterInfo.value, vitalityStats.value);
}

function cancel() {
    emits("cancel");
}
</script>

<template>
    <v-container width="100%">
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
                        rows="11"
                        no-resize
                    ></v-textarea>
                    <v-text-field
                        label="Release Date"
                        v-model="characterInfo.releaseDate"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Voice Actor"
                        v-model="characterInfo.voiceActor"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Code Names"
                        v-model="characterInfo.codeNames"
                    >
                    </v-text-field>
                </v-col>
                <v-col>
                    <v-container height="78px"></v-container>
                    <v-text-field label="Health" v-model="vitalityStats.health">
                    </v-text-field>
                    <v-text-field
                        label="Health Regen"
                        v-model="vitalityStats.healthRegen"
                        suffix="hp/s"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Move Speed"
                        v-model="vitalityStats.moveSpeed"
                        suffix="m/s"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Dash Speed"
                        v-model="vitalityStats.dashSpeed"
                        suffix="s"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Stamina"
                        v-model="vitalityStats.stamina"
                    >
                    </v-text-field>
                    <v-text-field
                        label="Stamina Cooldown"
                        v-model="vitalityStats.staminaCooldown"
                        suffix="s"
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
