import { DataGrid, GridColDef } from "@mui/x-data-grid";
import styles from "../css/DataGridComponent.module.css";
import { useRecoilValue } from "recoil";
import { tableDataAtom } from "../store/atoms/DataGridState";

const calculateHistogramAverage = (histogram: any) => {
  if (histogram && histogram.length > 0) {
    const values = histogram[0].densities.map((density: string) =>
      parseFloat(density)
    );
    const sum = values.reduce((acc: number, value: number) => acc + value, 0);
    return sum / values.length;
  }
  return 0; // Return 0 if data is missing
};

const generateColumns = (data: any): GridColDef[] => {
  const metricKeys = Object.keys(data.metrics);

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
    //Columns for p75
    columns.push({
      field: key,
      headerName: `${key} p75`,
      width: 150,
      sortable: true,
      type: "number", // Ensure the column type is set to number for comparison filtering
      valueGetter: (params: any) => params.row.metrics[key]?.p75[0],
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
