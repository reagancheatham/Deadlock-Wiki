import apiClient from "./services.js";

const API_ROOT = "weapons";

export default {
    async create(weapon) {
        let responseweapon = null;

        await apiClient
            .post(API_ROOT, weapon)
            .then((response) => {
                console.log(
                    `Successfully created weapon: ${JSON.stringify(response)}.`
                );

                responseweapon = response;
            })
            .catch((err) => {
                console.error(`Error creating weapon: ${err}`);
            });

        return responseweapon;
    },
    async update(weapon) {
        let databaseWeapon = null;

        await apiClient
            .put(API_ROOT, weapon)
            .then((response) => {
                console.log(
                    `Successfully updated weapon: ${JSON.stringify(
                        response.data
                    )}`
                );

                databaseWeapon = response.data;
            })
            .catch((err) => {
                console.error(`Error updating weapon: ${err}`);
            });

        return databaseWeapon;
    },
    async delete(id) {
        await apiClient
            .delete(`${API_ROOT}/${id}`)
            .then(() => {
                console.log("Successfully deleted weapon.");
            })
            .catch((err) => {
                console.error(`Error deleting weapon: ${err}`);
            });
    },
    async find(characterID) {
        let responseWeapon = null;

        await apiClient
            .get(`${API_ROOT}/character/${characterID}`)
            .then((response) => {
                responseWeapon = response.data;
            })
            .catch((err) => {
                console.error(`Error finding weapon: ${err}`);
            });

        return responseWeapon;
    },
    async findAll() {
        let weapons = [];

        await apiClient
            .get(API_ROOT)
            .then((response) => {
                weapons = response.data;
            })
            .catch((err) => {
                console.error(`Error finding all weapons: ${err}`);
            });

        return weapons;
    },
};
