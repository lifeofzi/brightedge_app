// Load environment variables from a `.env` file
require('dotenv').config();

// External dependencies
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Internal dependencies
const logger = require('./utils/logger');
const { Metrics, metricShortNameMapping } = require('./model/metricsEnum.js');
const { isValidUrl } = require('./utils/validation');
const { processRawData } = require('./utils/dataProcessing');

const app = express();
const PORT = process.env.PORT || 3001;
const metrics = Object.values(Metrics);

// Enable Cross-Origin Resource Sharing
app.use(cors());

/**
 * Endpoint to fetch data from the CrUX API for a given URL.
 * It validates the URL, fetches the data, and then processes the raw data 
 * to generate a simplified version of it.
 */
app.get('/cruxdata', async (req, res) => {
    const url = req.query.url;
    
    logger.info('User is querying for - %s', url);

    // Validate the input URL
    if (!isValidUrl(url)) {
        logger.error('Invalid URL provided: %s', url);
        return res.status(400).send('Invalid URL provided.');
    }

    const API_KEY = process.env.API_KEY;
    const CRUX_API_ENDPOINT = `${process.env.CRUX_API_ENDPOINT}?key=${API_KEY}`;

    //for our use case we will only focus on FCP, LCP, FID & CLS
    const metricsToQuery = [ Metrics.FIRST_CONTENTFUL_PAINT, 
                             Metrics.LARGEST_CONTENTFUL_PAINT, 
                             Metrics.FIRST_INPUT_DELAY, 
                             Metrics.CUMULATIVE_LAYOUT_SHIFT];
   
    logger.info('Metrics queried - %s', metricsToQuery.map(metricFullName => {
        return metricShortNameMapping[metricFullName]; // Convert each string to uppercase
    }));

    try {
        const response = await axios.post(CRUX_API_ENDPOINT, {
            origin: url,
            metrics: metrics,
            formFactor: "DESKTOP"
        });

        // Process the raw data from the CrUX API
        const simplifiedData = processRawData(response.data);

        logger.info('Processed Data for url : %s -\n%s', url, simplifiedData);

        res.json(simplifiedData);

    } catch (error) {
        if (error.response) {
            logger.error('Failed fetching data from CrUX API for: %s. \nFalied with Error: %s', url, error);
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Unexpected Error:'+ error);
        }
    }
});

/**
 * Endpoint to fetch the mapping of metric names to their short names.
 */
app.get('/metrics', async (req, res) => {
    logger.info('User is querying for metrics.');
    res.json(metricShortNameMapping);
});

// Start the server
app.listen(PORT, () => {
    logger.info('Server running on http://localhost:%s', PORT);
});

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
});