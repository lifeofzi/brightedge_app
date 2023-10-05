# BrightEdgeAssigment

## Setup

### Initial Setup

1. **Clone the Repository**:

   If you haven't already, clone the BrightEdgeAssigment repository to your local machine or download the zip file and extract it.

   ```bash
   git clone https://github.com/lifeofzi/brightedge_app.git
   cd brightedge_app
   ```

   2. **Install Global Dependencies:**

   Make sure you have Node.js and npm (Node Package Manager) installed. If not, download and install them from Node.js official website.

   3. **Check installations:**

   ```bash
   node --version
   npm --version
   ```

   4. **Set Up Environment:**

   Both the frontend and backend applications might require environment-specific variables. These are typically stored in .env files. You will set these up in the respective "Deploying Backend" and "Deploying Frontend" sections.

### Deploying Backend

Before deploying the backend, ensure you have the necessary environment variables set up in a `.env` file in the `brightedge_backend` directory.

1. **Setting up the API key**:

   To get your `API_KEY`, follow the instructions provided in the [Chrome UX Report API documentation](https://developer.chrome.com/docs/crux/api/). Once you have the key, add it to your `.env` file.

   ```plaintext
   API_KEY=YOUR_API_KEY_HERE
   CRUX_API_ENDPOINT=https://chromeuxreport.googleapis.com/v1/records:queryHistoryRecord
   PORT=3001
   ```

2. **Deploying the server**:

   Navigate to the backend directory and start the server:

   ```bash
   cd brightedge_backend
   node index.js
   ```

   This will start the frontend development server, typically accessible at (http://localhost:3001)

### Deploying Frontend

Before deploying the frontend, ensure you have the necessary environment variables set up in a `.env` file in the `brightedge_ui` directory.

1. **Setting up configuration**:

   Create or modify the `.env` file in the `brightedge_ui` directory and populate it with the necessary configurations:

   ```plaintext
   VITE_HOST=http://localhost
   VITE_PORT=3001
   VITE_ENDPOINT=cruxdata
   ```

This will start the frontend development server, typically accessible at (http://localhost:5173)

2. **Navigate to the UI directory**:
   Navigate to the UI directory and start the app:

   ```bash
   cd brightedge_ui
   npm install
   npm run dev
   ```

## API Endpoints

The server provides a set of API endpoints to interact with the CrUX data and manage the metrics.

| Endpoint    | Method | Parameters                                 | Description                                                                                                 | Usage Example                           |
| ----------- | ------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `/cruxdata` | `GET`  | `url`: Target URL for CrUX data retrieval. | Fetches and processes the raw CrUX data for the given URL, focusing on metrics like FCP, LCP, FID, and CLS. | `GET /cruxdata?url=https://example.com` |
| `/metrics`  | `GET`  | None                                       | Provides the mapping of metric names to their respective short names.                                       | `GET /metrics`                          |

### Server Setup

The server uses environment variables for configuration, which can be set in a `.env` file. The key environment variables include:

- `API_KEY`: The key obtained from the Chrome UX Report API.
- `CRUX_API_ENDPOINT`: The base endpoint for the Chrome UX Report API.
- `PORT`: The port on which the server runs, defaulting to 3001 if not specified.

The server is set up to handle global unhandled promise rejections and uncaught exceptions, logging them for further analysis and action.

## Web Performance Metrics Summary

### Key Metrics:

1. **Cumulative Layout Shift (CLS)**:

   - Quantifies visual stability.
   - High CLS indicates visual instability.

2. **First Contentful Paint (FCP)**:

   - Time from page start to first content render.
   - Important for perceived load speed.

3. **First Input Delay (FID)**:

   - Time from user interaction to browser response.
   - High FID indicates unresponsiveness.

4. **Largest Contentful Paint (LCP)**:

   - Render time of largest content since page load.
   - Reflects when main content is visible.

5. **Experimental Time to First Byte (TTFB)**:
   - Time for the first byte from the server.
   - Indicates server response times.

### Aggregated Metrics:

- **p75 Metric**: Represents 75th percentile value.
- **Histogram Metric**: Represents distribution of a dataset.

### What we are using for Table Display:

- **FCP and LCP** for load performance.
- **FID** for responsiveness.
- **CLS** for visual stability.

## Future Scope

### Enhancements and New Features:

1. **Backend Configurable Metrics**:
   In the future, we aim to provide an API for the backend server which allows dynamic configuration of metrics. This will enable users to choose and modify the metrics they want to retrieve without having to make code changes.

2. **Rich UI Components**:
   The integration of modern components, such as charts, will enhance data visualization capabilities. Users will benefit from viewing metrics trends over time, making the data more interpretable and actionable.

3. **User Accounts**:
   Implementation of a user authentication system will allow users to sign up and log in. With this system in place, users can save templates specifying which URLs they wish to query. This will streamline repeated tasks and offer a more personalized experience.

4. **Data Export Functionality**:
   Users should have the flexibility to export the metrics data to different file formats, enabling further analysis or sharing with other platforms and tools.