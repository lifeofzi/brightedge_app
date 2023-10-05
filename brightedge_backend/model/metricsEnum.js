const Metrics = {
    CUMULATIVE_LAYOUT_SHIFT : "cumulative_layout_shift",
    FIRST_CONTENTFUL_PAINT : "first_contentful_paint",
    FIRST_INPUT_DELAY : "first_input_delay",
    INTERACTION_TO_NEXT_PAINT : "interaction_to_next_paint",
    LARGEST_CONTENTFUL_PAINT : "largest_contentful_paint",
    EXPERIMENTAL_TIME_TO_FIRST_BYTE : "experimental_time_to_first_byte"
}


const metricShortNameMapping = {
    [Metrics.CUMULATIVE_LAYOUT_SHIFT]: "CLS",
    [Metrics.FIRST_CONTENTFUL_PAINT]: "FCP",
    [Metrics.FIRST_INPUT_DELAY]: "FID",
    [Metrics.INTERACTION_TO_NEXT_PAINT]: "INP",
    [Metrics.LARGEST_CONTENTFUL_PAINT]: "LCP",
    [Metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE]: "TTFB",
};

module.exports = { Metrics, metricShortNameMapping };