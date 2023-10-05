import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "../css/DataGridComponent.module.css";
import { useRecoilValue } from "recoil";
import { tableDataAtom } from "../store/atoms/AtomStates";

const calculateHistogramAverage = (histogram: Histogram) => {
  if (histogram && histogram.length > 0) {
    const values = histogram[0].densities.map((density: string) =>
      parseFloat(density)
    );
    const sum = values.reduce((acc: number, value: number) => acc + value, 0);
    return sum / values.length;
  }
  return 0; // Return 0 if data is missing
};

const calculateAverageP75 = (p75Array: number[]): number => {
  // Check if the array is empty or contains non-numeric values
  if (p75Array.length === 0 || !p75Array.every(Number.isFinite)) {
    return 0; // or return another default value or null
  }
  return (
    p75Array.reduce((acc: number, value: number) => acc + value, 0) /
    p75Array.length
  );
};

const generateColumns = (data: any): GridColDef[] => {
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

function DataGridComponent() {
  const tableData = useRecoilValue(tableDataAtom);
  const columns = tableData.length > 0 ? generateColumns(tableData[0]) : [];

  return (
    tableData.length > 0 && (
      <div className={styles.dataGridContainer}>
        <DataGrid
          rows={tableData}
          columns={columns}
          checkboxSelection
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    )
  );
}

export default DataGridComponent;
