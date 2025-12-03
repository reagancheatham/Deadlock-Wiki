import axios from "axios";

let baseURL = "";

if (import.meta.env.MODE === "development")
    baseURL = "http://localhost/deadlock-wiki/";
else baseURL = "/deadlock-wiki/";

const apiClient = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Origin": "*",
        crossDomain: true,
    },
    transformRequest: (data, _headers) => {
        if (data === null)
            data = {};

        return JSON.stringify(data);
    },
    transformResponse: (data) => {
        data = JSON.parse(data);

        return data;
    },
});

export default apiClient;
