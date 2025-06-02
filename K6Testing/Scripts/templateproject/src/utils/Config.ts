import { Environment } from "./../config/Environment.js";

let environmentToRun = Environment.DEVELOPMENT; // default

if (__ENV.ENVIRONMENT_TO_RUN) {
	switch (__ENV.ENVIRONMENT_TO_RUN.toUpperCase()) {
		case "DEVELOPMENT":
			environmentToRun = Environment.DEVELOPMENT;
			break;
		case "LOCAL":
			environmentToRun = Environment.LOCAL;
			break;
		case "PRODUCTION":
			environmentToRun = Environment.PRODUCTION;
			break;
		case "STAGING":
			environmentToRun = Environment.STAGING;
			break;
		default:
			throw Error(`${__ENV.ENVIRONMENT_TO_RUN} environment not supported`);
	}
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

export { API_BASE_URL, API_RETURNSTRING_URL, API_REVERSE_URL };
