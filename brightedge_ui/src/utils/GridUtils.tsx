import { GridColDef } from "@mui/x-data-grid";
import { calculateHistogramAverage, calculateAverageP75 } from "./MetricUtils";

export const generateColumns = (data: any): GridColDef[] => {
  const metricKeys = Object.keys(data.metrics).sort();

  const columns: GridColDef[] = [
    {
      field: "origin",
      headerName: "URL",
      width: 200,
      sortable: true,
      renderCell: (params) => (
        <a
          href={params.value as string}
          target="_blank"
          rel="noopener noreferrer"
        >
          {params.value}
        </a>
      ),
    },
  ];

  metricKeys.forEach((key) => {
    columns.push({
      field: key,
      headerName: `${key} p75`,
      width: 200,
      sortable: true,
      type: "number", // Ensure the column type is set to number for comparison filtering
      valueGetter: (params: any) => {
        const p75Array = params.row.metrics[key]?.p75 || [];
        return calculateAverageP75(p75Array);
      },
    });

    // Columns for Histogram
    columns.push({
      field: `${key} Histogram`,
      headerName: `${key} Histogram Avg`,
      width: 200,
      sortable: true,
      type: "number",
      valueGetter: (params: any) => {
        const histogram = params.row.metrics[key]?.histogram;
        return calculateHistogramAverage(histogram);
      },
    });
  });

  return columns;
};
