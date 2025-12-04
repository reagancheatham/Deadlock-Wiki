import apiClient from "./services.js";

const API_ROOT = "characters/info";

export default {
    async create(info) {
        let responseInfo = null;

        await apiClient
            .post(API_ROOT, info)
            .then((response) => {
                console.log(
                    `Successfully created character info: ${JSON.stringify(
                        response
                    )}.`
                );

                responseInfo = response;
            })
            .catch((err) => {
                console.error(`Error creating character info: ${err}`);
            });

        return responseInfo;
    },
    async update(info) {
        await apiClient
            .put(API_ROOT, info)
            .then((response) => {
                console.log(
                    `Successfully updated character info: ${JSON.stringify(
                        response.data
                    )}`
                );
            })
            .catch((err) => {
                console.error(`Error updating character info: ${err}`);
            });
    },
    async delete(characterID) {
        await apiClient
            .delete(`${API_ROOT}/${characterID}`)
            .then(() => {
                console.log("Successfully deleted character info.");
            })
            .catch((err) => {
                console.error(`Error deleting character info: ${err}`);
            });
    },
    async findAll() {
        let infos = [];

        await apiClient
            .get(API_ROOT)
            .then((response) => {
                infos = response.data;
            })
            .catch((err) => {
                console.error(`Error finding all character infos: ${err}`);
            });

        return infos;
    },
    async find(characterID) {
        let responseInfo = null;

        await apiClient
            .get(`${API_ROOT}/${characterID}`)
            .then((response) => {
                responseInfo = response.data;
            })
            .catch((err) => {
                console.error(`Error finding character info: ${err}`);
            });

        return responseInfo;
    },
};
