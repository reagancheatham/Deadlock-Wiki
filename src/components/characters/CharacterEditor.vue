<script setup>
import { ref } from "vue";
import { VDateInput } from "vuetify/lib/labs/components.js";
import characterServices from "@/services/character.services.js";
import abilityServices from "@/services/ability.services.js";
import AbilityEditor from "../abilities/AbilityEditor.vue";

const props = defineProps(["character", "inputDisabled"]);
const emits = defineEmits(["save", "cancel"]);

const characterInfo = ref({});
const vitalityStats = ref({});
const abilities = ref([]);
const editedAbility = ref({});
const isFormValid = ref(false);
const isDialogVisible = ref(false);

const requiredRules = [
    (value) => {
        if (value) return true;

        return "Required field.";
    },
];

characterServices.getGameplayData(props.character.id).then((response) => {
    characterInfo.value = response.CharacterInfo;
    vitalityStats.value = response.VitalityStat;
});

abilityServices
    .findAllForCharacter(props.character.id)
    .then((databaseAbilities) => {
        databaseAbilities.forEach((ability) => {
            abilities.value[ability.slot - 1] = { ability };
        });
    });

function save() {
    emits(
        "save",
        props.character,
        characterInfo.value,
        vitalityStats.value,
        abilities.value
    );
}

function cancel() {
    emits("cancel");
}

function selectAbility(slot) {
    if (abilities.value.length >= slot && abilities.value[slot - 1])
        editedAbility.value = { ...abilities.value[slot - 1].ability };
    else editedAbility.value = { slot };

    isDialogVisible.value = true;
}

function saveAbility(abilityData, statsData) {
    const newValue = { ability: abilityData, stats: statsData };

    abilities.value[abilityData.slot - 1] = newValue;

    isDialogVisible.value = false;
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
                            density="compact"
                            label="Name"
                            v-model="character.name"
                            :rules="requiredRules"
                        ></v-text-field>
                        <v-textarea
                            density="compact"
                            label="Background"
                            v-model="character.background"
                            rows="11"
                            no-resize
                        ></v-textarea>
                        <v-date-input
                            density="compact"
                            label="Release Date"
                            v-model="characterInfo.releaseDate"
                            prepend-icon=""
                        >
                        </v-date-input>
                        <v-text-field
                            density="compact"
                            label="Voice Actor"
                            v-model="characterInfo.voiceActor"
                        >
                        </v-text-field>
                        <v-text-field
                            density="compact"
                            label="Code Names"
                            v-model="characterInfo.codeNames"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            density="compact"
                            label="Health"
                            v-model="vitalityStats.health"
                        >
                        </v-text-field>
                        <v-text-field
                            density="compact"
                            label="Health Regen"
                            v-model="vitalityStats.healthRegen"
                            suffix="hp/s"
                        >
                        </v-text-field>
                        <v-text-field
                            density="compact"
                            label="Move Speed"
                            v-model="vitalityStats.moveSpeed"
                            suffix="m/s"
                        >
                        </v-text-field>
                        <v-text-field
                            density="compact"
                            label="Dash Speed"
                            v-model="vitalityStats.dashSpeed"
                            suffix="s"
                        >
                        </v-text-field>
                        <v-text-field
                            density="compact"
                            label="Stamina"
                            v-model="vitalityStats.stamina"
                        >
                        </v-text-field>
                        <v-text-field
                            density="compact"
                            label="Stamina Cooldown"
                            v-model="vitalityStats.staminaCooldown"
                            suffix="s"
                        >
                        </v-text-field>
                        <v-row class="mt-1 justify-center" style="gap: 30px">
                            <v-btn
                                size="40px"
                                color="button_secondary"
                                @click="selectAbility(1)"
                                >1</v-btn
                            >
                            <v-btn
                                size="40px"
                                color="button_secondary"
                                @click="selectAbility(2)"
                                >2</v-btn
                            >
                            <v-btn
                                size="40px"
                                color="button_secondary"
                                @click="selectAbility(3)"
                                >3</v-btn
                            >
                            <v-btn
                                size="40px"
                                color="button_secondary"
                                @click="selectAbility(4)"
                                >4</v-btn
                            >
                        </v-row>
                        <v-row class="mt-4 justify-center"
                            ><v-label text="Abilities"></v-label
                        ></v-row>
                        <v-row class="mt-12 mb-3 mr-12" justify="end">
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
        <AbilityEditor
            :ability="editedAbility"
            @save="saveAbility"
            @cancel="cancelAbility"
        />
    </v-dialog>
</template>

<style>
.editor-card {
    padding: 16px;
}
</style>
