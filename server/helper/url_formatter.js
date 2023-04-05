const url = require('node:url');
const dotenv = require('dotenv');
dotenv.config();

//To do
const backendHostname = (process.env.NODE_ENV === 'production')
    ? process.env.PROD_BACKEND_HOST
    : process.env.DEV_BACKEND_HOST;
const { isValidHttpUrl } = require('./is_Valid_http_url');

const formatMediaURL = (input) => {
    if (!isValidHttpUrl(input)) {
        return url.parse(input).href;
    }
    return input;
}

module.exports = {
    formatMediaURL,
}