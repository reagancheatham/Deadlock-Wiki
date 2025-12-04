<script setup>
import { ref } from "vue";
import quoteServices from "@/services/quote.services.js";
import characterServices from "@/services/character.services.js";
import QuotesEditor from "./QuotesEditor.vue";

const headers = [
    {
        title: "Character",
        key: "characterName",
    },
    {
        title: "Guest Character",
        key: "guestCharacterName",
    },
    {
        title: "Quote",
        key: "quote.transcript",
    },
    {
        title: "Actions",
        key: "actions",
    },
];
const quotes = ref([]);
const listItems = ref([]);
const editedQuote = ref(null);
const isInputDisabled = ref(false);
const isDialogVisible = ref(false);

loadQuotes();

async function loadQuotes() {
    await quoteServices.findAll().then((databaseQuotes) => {
        quotes.value = databaseQuotes;
    });

    quotes.value.forEach((quote) => listItems.value.push({ quote }));

    await characterServices.findAll().then((characters) => {
        listItems.value.forEach((i) => {
            const character = characters.find(
                (c) => c.id == i.quote.characterID
            );

            if (character) i.characterName = character.name;

            const guestCharacter = characters.find(
                (c) => c.id == i.quote.guestCharacterID
            );

            if (guestCharacter) i.guestCharacterName = guestCharacter.name;
        });
    });
}

function create() {
    editedQuote.value = {};
    isDialogVisible.value = true;
}

function edit(item) {
    editedQuote.value = { ...item.quote };
    isDialogVisible.value = true;
}

async function remove(item) {
    if (isInputDisabled.value) return;

    isInputDisabled.value = true;

    await quoteServices.delete(item.quote.id).then(() => {
        isInputDisabled.value = false;

        let quoteIndex = quotes.value.findIndex((h) => h.id == item.quote.id);
        quotes.value.splice(quoteIndex, 1);

        let itemIndex = listItems.value.findIndex(
            (i) => i.quote.id == item.quote.id
        );
        listItems.value.splice(itemIndex, 1);
    });
}

async function save(quoteData, characterData, guestCharacterData) {
    isInputDisabled.value = true;

    await quoteServices.update(quoteData).then((response) => {
        quoteData = response;
        let index = quotes.value.findIndex((q) => q.id == quoteData.id);
        quotes.value[index] = quoteData;

        let itemIndex = listItems.value.findIndex(
            (i) => i.quote.id == quoteData.id
        );
        const listItem = {
            quote: quoteData,
            characterName: characterData.name,
            guestCharacterName: guestCharacterData.name,
        };

        if (itemIndex == -1) listItems.value.push(listItem);
        else listItems.value[itemIndex] = listItem;
    });

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
                text="Quotes"
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
        <QuotesEditor
            :quote="editedQuote"
            :input-disabled="isInputDisabled"
            @save="save"
            @cancel="closeDialog"
        />
    </v-dialog>
</template>
