import apiClient from "./services.js";

const API_ROOT = "quote";

export default {
    async create(quote) {
        let responseQuote = null;

        await apiClient
            .post(API_ROOT, quote)
            .then((response) => {
                console.log(
                    `Successfully created quote: ${JSON.stringify(response)}.`
                );

                responseQuote = response;
            })
            .catch((err) => {
                console.error(`Error creating quote: ${err}`);
            });

        return responseQuote;
    },
    async update(quote) {
        let databaseQuote = null;

        await apiClient
            .put(API_ROOT, quote)
            .then((response) => {
                console.log(
                    `Successfully updated quote: ${JSON.stringify(
                        response.data
                    )}`
                );

                databaseQuote = response.data;
            })
            .catch((err) => {
                console.error(`Error updating quote: ${err}`);
            });

        return databaseQuote;
    },
    async delete(id) {
        await apiClient
            .delete(`${API_ROOT}/${id}`)
            .then(() => {
                console.log("Successfully deleted quote.");
            })
            .catch((err) => {
                console.error(`Error deleting quote: ${err}`);
            });
    },
    async findAll() {
        let quotes = [];

        await apiClient
            .get(API_ROOT)
            .then((response) => {
                quotes = response.data;
            })
            .catch((err) => {
                console.error(`Error finding all quotes: ${err}`);
            });

        return quotes;
    },
};
