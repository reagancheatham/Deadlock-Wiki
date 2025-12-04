<script setup>
import { ref } from "vue";
import abilityStatsServices from "@/services/abilityStats.services.js";

const props = defineProps(["ability", "inputDisabled"]);
const emits = defineEmits(["save", "cancel"]);

const abilityStats = ref({});
const isFormValid = ref(false);

const requiredRules = [
    (value) => {
        if (value) return true;

        return "Required field.";
    },
];

abilityStatsServices.findByAbilityID(props.ability.id).then((stats) => {
    abilityStats = stats;
});


function save() {
    emits("save", props.ability);
}

function cancel() {
    emits("cancel");
}

function saveAbility(abilityData, statsData) {
    let index = abilities.value.findIndex(abilityData.id);
    const newValue = { ability: abilityData, stats: statsData };
    
    if (index != -1)
        abilities.value[index] = newValue;
    else
        abilities.value.push(newValue);
}

function cancelAbility() {
    isDialogVisible.value = false;
}
</script>

<template>
    <v-container width="100%">
        <v-card class="editor-card">
            <v-card-title>Edit Ability</v-card-title>
            <v-form v-model="isFormValid">
                <v-row class="ml-4 mr-4">
                    <v-col>
                        <v-text-field
                            label="Name"
                            v-model="ability.name"
                            :rules="requiredRules"
                        ></v-text-field>
                    </v-col>
                    <v-col>
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
