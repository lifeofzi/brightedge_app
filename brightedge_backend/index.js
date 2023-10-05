require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const logger = require('./utils/logger');
const Metrics = require('./model/metricsEnum.js');
const app = express();
const PORT = process.env.PORT || 3001;
const { isValidUrl } = require('./utils/validation');
const { processRawData } = require('./utils/dataProcessing');
const metrics = Object.values(Metrics);

let url = "";

app.use(cors());

app.get('/cruxdata', async (req, res) => {
    url = req.query.url;
    logger.info('User is querying for - %s', url);

    // Validate the URL
    if (!isValidUrl(url)) {
        logger.error('Invalid URL provided: %s', url);
        return res.status(400).send('Invalid URL provided.');
    }

    const API_KEY = process.env.API_KEY;
    const CRUX_API_ENDPOINT = `${process.env.CRUX_API_ENDPOINT}?key=${API_KEY}`;

    try {
        const response = await axios.post(CRUX_API_ENDPOINT, {
            origin: url,
            metrics: metrics,
            formFactor: "DESKTOP"
        });

        const simplifiedData = processRawData(response.data);

        logger.info('Data for url : %s -\n%s', url, simplifiedData);
        res.json(simplifiedData);

    } catch (error) {

        if (error.response) {
            logger.error('Failed fetching data from CrUX API for: %s. \nFalied with Error: %s', url, error);
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Unexpected Error: for' + url + '. Failed with Error:'+ error );
        }

    }
});

app.listen(PORT, () => {
    logger.info('Server running on http://localhost:%s', PORT);
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
});

