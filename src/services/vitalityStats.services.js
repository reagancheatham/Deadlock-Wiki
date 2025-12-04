import apiClient from "./services.js";

const API_ROOT = "characters/vitality";

export default {
    async create(stats) {
        let responseInfo = null;

        await apiClient
            .post(API_ROOT, stats)
            .then((response) => {
                console.log(
                    `Successfully created vitality stats: ${JSON.stringify(
                        response
                    )}.`
                );

                responseInfo = response;
            })
            .catch((err) => {
                console.error(`Error creating vitality stats: ${err}`);
            });

        return responseInfo;
    },
    async update(stats) {
        await apiClient
            .put(API_ROOT, stats)
            .then((response) => {
                console.log(
                    `Successfully updated vitality stats: ${JSON.stringify(
                        response.data
                    )}`
                );
            })
            .catch((err) => {
                console.error(`Error updating vitality stats: ${err}`);
            });
    },
    async delete(characterID) {
        await apiClient
            .delete(`${API_ROOT}/${characterID}`)
            .then(() => {
                console.log("Successfully deleted vitality stats.");
            })
            .catch((err) => {
                console.error(`Error deleting vitality stats: ${err}`);
            });
    },
    async find(characterID) {
        let responseInfo = null;

        await apiClient
            .get(`${API_ROOT}/${characterID}`)
            .then((response) => {
                responseInfo = response.data;
            })
            .catch((err) => {
                console.error(`Error finding vitality stats: ${err}`);
            });

        return responseInfo;
    },
};
