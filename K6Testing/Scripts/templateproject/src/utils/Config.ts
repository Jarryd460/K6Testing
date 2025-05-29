import { Environment } from "./../config/Environment.js";

let environmentToRun = Environment.DEVELOPMENT; // default

if (__ENV.ENVIRONMENT_TO_RUN) {
	environmentToRun = Environment[__ENV.ENVIRONMENT_TO_RUN.toUpperCase()];
}

const ENVIRONMENT = environmentToRun;

let baseUrl = "";

if (ENVIRONMENT === Environment.LOCAL) {
	baseUrl = "https://localhost:7140";
} else {
	baseUrl = "https://" + ENVIRONMENT + ".website.com";
}

const API_BASE_URL = baseUrl;
const API_REVERSE_URL = API_BASE_URL + "/string/reverse";
const API_RETURNSTRING_URL = API_BASE_URL + "/string/returnstring";

export { API_BASE_URL, API_REVERSE_URL, API_RETURNSTRING_URL };
