import apiClient from "./services.js";

const API_ROOT = "characters";

export default {
    async create(character) {
        let responseCharacter = null;

        await apiClient
            .post(API_ROOT, character)
            .then((response) => {
                console.log(
                    `Successfully created character: ${JSON.stringify(
                        response
                    )}.`
                );

                responseCharacter = response;
            })
            .catch((err) => {
                console.error(`Error creating character: ${err}`);
            });

        return responseCharacter;
    },
    async update(character) {
        let databaseCharacter = null;

        await apiClient
            .put(API_ROOT, character)
            .then((response) => {
                console.log(
                    `Successfully updated character: ${JSON.stringify(
                        response.data
                    )}`
                );

                databaseCharacter = response.data;
            })
            .catch((err) => {
                console.error(`Error updating character: ${err}`);
            });
        
        return databaseCharacter;
    },
    async delete(id) {
        await apiClient
            .delete(`${API_ROOT}/${id}`)
            .then(() => {
                console.log("Successfully deleted character.");
            })
            .catch((err) => {
                console.error(`Error deleting character: ${err}`);
            });
    },
    async findAll() {
        let characters = [];

        await apiClient
            .get(API_ROOT)
            .then((response) => {
                characters = response.data;
            })
            .catch((err) => {
                console.error(`Error finding all characters: ${err}`);
            });

        return characters;
    },
};
