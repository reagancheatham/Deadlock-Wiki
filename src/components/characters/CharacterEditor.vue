<script setup>
import { ref } from "vue";
import { VDateInput } from "vuetify/lib/labs/components.js";
import characterInfoServices from "@/services/characterInfo.services.js";
import vitalityStatsServices from "@/services/vitalityStats.services.js";
import abilityServices from "@/services/ability.services.js";
import AbilityEditor from "../abilities/AbilityEditor.vue";

const props = defineProps(["character", "inputDisabled"]);
const emits = defineEmits(["save", "cancel"]);

const characterInfo = ref({});
const vitalityStats = ref({});
const abilities = ref([]);
const isFormValid = ref(false);
const isDialogVisible = ref(false);

const requiredRules = [
    (value) => {
        if (value) return true;

        return "Required field.";
    },
];

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

function saveAbility(abilityData, statsData) {
    let index = abilities.value.findIndex(abilityData.id);
    const newValue = { ability: abilityData, stats: statsData };

    if (index != -1) abilities.value[index] = newValue;
    else abilities.value.push(newValue);
}

function cancelAbility() {
    isDialogVisible.value = false;
}
</script>

<template>
    <v-container width="100%">
        <v-card class="editor-card">
            <v-card-title>Edit Character</v-card-title>
            <v-form v-model="isFormValid">
                <v-row class="ml-4 mr-4">
                    <v-col>
                        <v-text-field
                            label="Name"
                            v-model="character.name"
                            :rules="requiredRules"
                        ></v-text-field>
                        <v-textarea
                            label="Background"
                            v-model="character.background"
                            rows="11"
                            no-resize
                        ></v-textarea>
                        <v-date-input
                            label="Release Date"
                            v-model="characterInfo.releaseDate"
                            prepend-icon=""
                        >
                        </v-date-input>
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
                        <v-text-field
                            label="Health"
                            v-model="vitalityStats.health"
                        >
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
                        <v-row class="mt-1 justify-center" style="gap: 30px">
                            <v-btn size="50px" color="button_secondary"
                                >1</v-btn
                            >
                            <v-btn size="50px" color="button_secondary"
                                >2</v-btn
                            >
                            <v-btn size="50px" color="button_secondary"
                                >3</v-btn
                            >
                            <v-btn size="50px" color="button_secondary"
                                >4</v-btn
                            >
                        </v-row>
                        <v-row class="mt-4 justify-center"
                            ><v-label text="Abilities"></v-label
                        ></v-row>
                        <v-row class="mt-8 mb-3 mr-1" justify="end">
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
    <v-dialog v-model="isDialogVisible">
        <AbilityEditor />
    </v-dialog>
</template>

<style>
.editor-card {
    padding: 16px;
}
</style>
