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

const minRules = [
    (value) => {
        if (value && value >= 0) return true;

        return "Must be greater than 0.";
    },
];

if (props.ability.id) {
    abilityStatsServices.findByAbilityID(props.ability.id).then((stats) => {
        abilityStats.value = stats;
    });
}

function save() {
    emits("save", props.ability, abilityStats.value);
}

function cancel() {
    emits("cancel");
}
</script>

<template>
    <v-container width="100%">
        <v-card class="editor-card">
            <v-card-title>Edit Ability {{ ability.slot }}</v-card-title>
            <v-form v-model="isFormValid">
                <v-row class="ml-4 mr-4">
                    <v-col>
                        <v-text-field
                            label="Name"
                            v-model="ability.name"
                            :rules="requiredRules"
                        ></v-text-field>
                        <v-text-field
                            label="Description"
                            v-model="ability.description"
                        >
                        </v-text-field>
                        <v-text-field
                            label="Range"
                            v-model="abilityStats.range"
                            :rules="minRules"
                            suffix="m"
                        >
                        </v-text-field>
                        <v-text-field
                            label="Duration"
                            v-model="abilityStats.duration"
                            :rules="minRules"
                            suffix="s"
                        >
                        </v-text-field>
                        <v-text-field
                            label="Cooldown"
                            v-model="abilityStats.cooldown"
                            :rules="minRules"
                            suffix="s"
                        >
                        </v-text-field>
                        <v-row
                            class="ability-button-row mt-1 mb-4 mr-1"
                            justify="end"
                        >
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
</style>
