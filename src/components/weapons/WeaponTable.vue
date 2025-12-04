<script setup>
import { ref } from "vue";
import weaponServices from "@/services/weapon.services.js";
import characterServices from "@/services/character.services.js";
import WeaponEditor from "./WeaponEditor.vue";
import weaponStatsServices from "@/services/weaponStats.services.js";

const headers = [
    {
        title: "Weapon Name",
        key: "weapon.name",
    },
    {
        title: "Character",
        key: "characterName",
    },
    {
        title: "Actions",
        key: "actions",
    },
];
const weapons = ref([]);
const listItems = ref([]);
const editedWeapon = ref(null);
const isInputDisabled = ref(false);
const isDialogVisible = ref(false);

loadWeapons();

async function loadWeapons() {
    await weaponServices.findAll().then((databaseWeapons) => {
        weapons.value = databaseWeapons;
    });

    weapons.value.forEach((weapon) => listItems.value.push({ weapon }));

    await characterServices.findAll().then((characters) => {
        characters.forEach((c) => {
            const item = listItems.value.find(
                (i) => i.weapon.characterID == c.id
            );

            if (item) item.characterName = c.name;
        });
    });
}

function create() {
    editedWeapon.value = {};
    isDialogVisible.value = true;
}

function edit(item) {
    editedWeapon.value = { ...item.weapon };
    isDialogVisible.value = true;
}

async function remove(item) {
    if (isInputDisabled.value) return;

    isInputDisabled.value = true;

    await weaponServices.delete(item.weapon.id).then(() => {
        isInputDisabled.value = false;

        let weaponIndex = weapons.value.findIndex(
            (w) => w.id == item.weapon.id
        );
        weapons.value.splice(weaponIndex, 1);

        let itemIndex = listItems.value.findIndex(
            (i) => (i.weapon.id == item.weapon.id)
        );
        listItems.value.splice(itemIndex, 1);
    });
}

async function save(weaponData, weaponStats, characterData) {
    isInputDisabled.value = true;

    await weaponServices.update(weaponData).then((response) => {
        weaponData = response;
        let index = weapons.value.findIndex((w) => w.id == weaponData.id);
        weapons.value[index] = weaponData;

        let itemIndex = listItems.value.findIndex((i) => i.weapon.id == weaponData.id);
        const listItem = { weapon: weaponData, characterName: characterData.name };
        
        if (itemIndex == -1)
            listItems.value.push(listItem);
        else
            listItems.value[itemIndex] = listItem;
    });

    weaponStats.weaponID = weaponData.id;
    await weaponStatsServices.update(weaponStats);

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
                text="Weapons"
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
                :items="listItems"
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
        <WeaponEditor
            :weapon="editedWeapon"
            :input-disabled="isInputDisabled"
            @save="save"
            @cancel="closeDialog"
        />
    </v-dialog>
</template>
