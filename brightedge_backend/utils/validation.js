const { URL } = require('url');

const isValidUrl = (urlString) => {
    try {
        new URL(urlString);
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = {
  isValidUrl
};