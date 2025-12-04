<script setup>
import { ref } from "vue";
import weaponStatsServices from "@/services/weaponStats.services.js";
import characterServices from "@/services/character.services.js";

const props = defineProps(["weapon", "inputDisabled"]);
const emits = defineEmits(["save", "cancel"]);

const weaponStats = ref({});
const isFormValid = ref(false);
const characters = ref([]);
const selectedCharacter = ref({});

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
    }
]

weaponStatsServices.findByWeaponID(props.weapon.id).then((info) => {
    console.log(`Found weapon stats: ${JSON.stringify(info)}.`);
    weaponStats.value = info;
});

characterServices.findAll().then((databaseCharacters) => {
    characters.value = databaseCharacters;

    selectedCharacter.value = characters.value.find(
        (c) => c.id == props.weapon.characterID
    );
});

function save() {
    props.weapon.characterID = selectedCharacter.value?.id;

    emits("save", props.weapon, weaponStats.value, selectedCharacter.value);
}

function cancel() {
    emits("cancel");
}
</script>

<template>
    <v-container width="100%">
        <v-card class="editor-card">
            <v-card-title>Edit Weapon</v-card-title>
            <v-form v-model="isFormValid">
                <v-row class="ml-4 mr-4">
                    <v-col>
                        <v-text-field
                            label="Name"
                            v-model="weapon.name"
                            :rules="requiredRules"
                        ></v-text-field>
                        <v-select
                            v-model="selectedCharacter"
                            :items="characters"
                            item-title="name"
                            return-object
                            :rules="characterRules"
                        >
                        </v-select>
                        <v-text-field label="DPS" v-model="weaponStats.dps">
                        </v-text-field>
                        <v-text-field
                            label="Bullet Damage"
                            v-model="weaponStats.bulletDamage"
                        >
                        </v-text-field>
                        <v-text-field label="Ammo" v-model="weaponStats.ammo">
                        </v-text-field>
                        <v-text-field
                            label="Reload Time"
                            v-model="weaponStats.reloadTime"
                            suffix="s"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Bullet Velocity"
                            v-model="weaponStats.bulletVelocity"
                            suffix="m/s"
                        >
                        </v-text-field>
                        <v-text-field
                            label="Light Melee"
                            v-model="weaponStats.lightMelee"
                        >
                        </v-text-field>
                        <v-text-field
                            label="Heavy Melee"
                            v-model="weaponStats.heavyMelee"
                        >
                        </v-text-field>
                        <v-text-field
                            label="Falloff Min"
                            v-model="weaponStats.fallOffMin"
                            suffix="m"
                        >
                        </v-text-field>
                        <v-text-field
                            label="Fallof Max"
                            v-model="weaponStats.fallOffMax"
                            suffix="m"
                        >
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
