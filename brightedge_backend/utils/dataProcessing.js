const processRawData = (rawData) => {
    let simplifiedData = {
        origin: rawData.record.key.origin,
        metrics: {}
    };

    for (let metric in rawData.record.metrics) {
        simplifiedData.metrics[metric] = {
            p75: rawData.record.metrics[metric].percentilesTimeseries.p75s,
            histogram: rawData.record.metrics[metric].histogramTimeseries
        };
    }

    if (rawData.collectionPeriods && rawData.collectionPeriods.length > 0) {
        simplifiedData.collectionPeriods = {
            start: rawData.collectionPeriods[0].firstDate,
            end: rawData.collectionPeriods[rawData.collectionPeriods.length - 1].lastDate
        };
    }

    return simplifiedData;
};

module.exports = {
    processRawData
};
