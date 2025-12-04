import apiClient from "./services.js";

const API_ROOT = "abilities";

export default {
    async create(ability) {
        let responseAbility = null;

        await apiClient
            .post(API_ROOT, ability)
            .then((response) => {
                console.log(
                    `Successfully created ability: ${JSON.stringify(response)}.`
                );

                responseAbility = response;
            })
            .catch((err) => {
                console.error(`Error creating ability: ${err}`);
            });

        return responseAbility;
    },
    async update(ability) {
        let databaseAbility = null;

        await apiClient
            .put(API_ROOT, ability)
            .then((response) => {
                console.log(
                    `Successfully updated ability: ${JSON.stringify(
                        response.data
                    )}`
                );

                databaseAbility = response.data;
            })
            .catch((err) => {
                console.error(`Error updating ability: ${err}`);
            });

        return databaseAbility;
    },
    async delete(id) {
        await apiClient
            .delete(`${API_ROOT}/${id}`)
            .then(() => {
                console.log("Successfully deleted ability.");
            })
            .catch((err) => {
                console.error(`Error deleting ability: ${err}`);
            });
    },
    async findAllForCharacter(characterID) {
        let abilities = [];

        await apiClient
            .get(`${API_ROOT}/character/${characterID}`)
            .then((response) => {
                abilities = response.data;
            })
            .catch((err) => {
                console.error(`Error finding all abilities: ${err}`);
            });

        return abilities;
    },
    async find(id) {
        let ability = null;

        await apiClient
            .get(`${API_ROOT}/${id}`)
            .then((response) => {
                ability = response;
            })
            .catch((err) => {
                console.error(`Error finding ability: ${err}`);
            });

        return ability;
    },
};
