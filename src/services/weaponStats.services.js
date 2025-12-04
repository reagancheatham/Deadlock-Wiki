import apiClient from "./services.js";

const API_ROOT = "weapons/stats";

export default {
    async create(stats) {
        let responseStats = null;

        await apiClient
            .post(API_ROOT, stats)
            .then((response) => {
                console.log(
                    `Successfully created weapon stats: ${JSON.stringify(
                        response
                    )}.`
                );

                responseStats = response;
            })
            .catch((err) => {
                console.error(`Error creating weapon stats: ${err}`);
            });

        return responseStats;
    },
    async update(stats) {
        await apiClient
            .put(API_ROOT, stats)
            .then((response) => {
                console.log(
                    `Successfully updated weapon stats: ${JSON.stringify(
                        response.data
                    )}`
                );
            })
            .catch((err) => {
                console.error(`Error updating weapon stats: ${err}`);
            });
    },
    async delete(id) {
        await apiClient
            .delete(`${API_ROOT}/${id}`)
            .then(() => {
                console.log("Successfully deleted weapon stats.");
            })
            .catch((err) => {
                console.error(`Error deleting weapon stats: ${err}`);
            });
    },
    async findByWeaponID(weaponID) {
        let weaponStats = null;

        await apiClient
            .get(`${API_ROOT}/weapon/${weaponID}`)
            .then((response) => {
                console.log(
                    `Successfully found weapon stats: ${JSON.stringify(
                        response.data
                    )}.`
                );

                weaponStats = response.data;
            })
            .catch((err) => {
                console.error(`Error finding weapon stats: ${err}`);
            });

        return weaponStats;
    },
    async findAll() {
        let weapons = [];

        await apiClient
            .get(API_ROOT)
            .then((response) => {
                weapons = response.data;
            })
            .catch((err) => {
                console.error(`Error finding all weapon stats: ${err}`);
            });

        return weapons;
    },
};
