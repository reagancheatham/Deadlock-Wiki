import apiClient from "./services.js";

const API_ROOT = "abilities/stats";

export default {
    async create(stats) {
        let responseStats = null;

        await apiClient
            .post(API_ROOT, stats)
            .then((response) => {
                console.log(
                    `Successfully created ability stats: ${JSON.stringify(response)}.`
                );

                responseStats = response;
            })
            .catch((err) => {
                console.error(`Error creating ability stats: ${err}`);
            });

        return responseStats;
    },
    async update(stats) {
        let databaseStats = null;

        await apiClient
            .put(API_ROOT, stats)
            .then((response) => {
                console.log(
                    `Successfully updated ability stats: ${JSON.stringify(
                        response.data
                    )}`
                );

                databaseStats = response.data;
            })
            .catch((err) => {
                console.error(`Error updating ability stats: ${err}`);
            });

        return databaseStats;
    },
    async delete(id) {
        await apiClient
            .delete(`${API_ROOT}/${id}`)
            .then(() => {
                console.log("Successfully deleted ability stats.");
            })
            .catch((err) => {
                console.error(`Error deleting ability stats: ${err}`);
            });
    },
    async findByAbilityID(abilityID) {
        let stats = [];

        await apiClient
            .get(`${API_ROOT}/ability/${abilityID}`)
            .then((response) => {
                stats = response.data;
            })
            .catch((err) => {
                console.error(`Error finding all ability stats: ${err}`);
            });

        return stats;
    },
    async find(id) {
        let stats = null;

        await apiClient
            .get(`${API_ROOT}/${id}`)
            .then((response) => {
                stats = response;
            })
            .catch((err) => {
                console.error(`Error finding ability stats: ${err}`);
            });

        return stats;
    },
};
