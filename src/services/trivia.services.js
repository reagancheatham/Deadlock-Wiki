import apiClient from "./services.js";

const API_ROOT = "trivia";

export default {
    async create(trivia) {
        let responseTrivia = null;

        await apiClient
            .post(API_ROOT, trivia)
            .then((response) => {
                console.log(
                    `Successfully created trivia: ${JSON.stringify(response)}.`
                );

                responseTrivia = response;
            })
            .catch((err) => {
                console.error(`Error creating trivia: ${err}`);
            });

        return responseTrivia;
    },
    async update(trivia) {
        let databaseTrivia = null;

        await apiClient
            .put(API_ROOT, trivia)
            .then((response) => {
                console.log(
                    `Successfully updated trivia: ${JSON.stringify(
                        response.data
                    )}`
                );

                databaseTrivia = response.data;
            })
            .catch((err) => {
                console.error(`Error updating trivia: ${err}`);
            });

        return databaseTrivia;
    },
    async delete(id) {
        await apiClient
            .delete(`${API_ROOT}/${id}`)
            .then(() => {
                console.log("Successfully deleted trivia.");
            })
            .catch((err) => {
                console.error(`Error deleting trivia: ${err}`);
            });
    },
    async findAll() {
        let trivias = [];

        await apiClient
            .get(API_ROOT)
            .then((response) => {
                trivias = response.data;
            })
            .catch((err) => {
                console.error(`Error finding all trivias: ${err}`);
            });

        return trivias;
    },
};
