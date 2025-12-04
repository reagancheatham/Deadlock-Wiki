<script setup>
const props = defineProps(["character", "inputDisabled"]);
const emits = defineEmits(["save", "cancel"]);

function save() {
    emits("save", props.character);
}

function cancel() {
    emits("cancel");
}
</script>

<template>
    <v-container width="80%">
        <v-card class="editor-card">
            <v-card-title>Edit Character</v-card-title>
            <v-col>
                <v-text-field
                    label="Name"
                    v-model="character.name"
                ></v-text-field>
                <v-textarea
                    label="Background"
                    v-model="character.background"
                ></v-textarea>
            </v-col>
            <v-row class="mr-3 mb-3" justify="end">
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
        </v-card>
    </v-container>
</template>

<style>
.editor-card {
    padding: 16px;
}
</style>
