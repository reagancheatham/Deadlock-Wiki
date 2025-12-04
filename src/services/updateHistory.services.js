import apiClient from "./services.js";

const API_ROOT = "updateHistory";

export default {
    async create(updateHistory) {
        let responseHistory = null;

        await apiClient
            .post(API_ROOT, updateHistory)
            .then((response) => {
                console.log(
                    `Successfully created update history: ${JSON.stringify(response)}.`
                );

                responseHistory = response;
            })
            .catch((err) => {
                console.error(`Error creating update history: ${err}`);
            });

        return responseHistory;
    },
    async update(updateHistory) {
        let databaseHistory = null;

        await apiClient
            .put(API_ROOT, updateHistory)
            .then((response) => {
                console.log(
                    `Successfully updated update history: ${JSON.stringify(
                        response.data
                    )}`
                );

                databaseHistory = response.data;
            })
            .catch((err) => {
                console.error(`Error updating update history: ${err}`);
            });

        return databaseHistory;
    },
    async delete(id) {
        await apiClient
            .delete(`${API_ROOT}/${id}`)
            .then(() => {
                console.log("Successfully deleted update history.");
            })
            .catch((err) => {
                console.error(`Error deleting update history: ${err}`);
            });
    },
    async findAll() {
        let updateHistory = [];

        await apiClient
            .get(API_ROOT)
            .then((response) => {
                updateHistory = response.data;
            })
            .catch((err) => {
                console.error(`Error finding all update history: ${err}`);
            });

        return updateHistory;
    },
};
