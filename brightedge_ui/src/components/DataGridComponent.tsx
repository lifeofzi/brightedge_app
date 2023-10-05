import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress, Backdrop } from "@mui/material";
import styles from "../css/DataGridComponent.module.css";
import { useRecoilValue } from "recoil";
import {
  tableDataAtom,
  backdropOpenStateAtom,
} from "../store/atoms/AtomStates";
import { generateColumns } from "../utils/GridUtils";

function DataGridComponent() {
  // Recoil state values
  const tableData = useRecoilValue(tableDataAtom);
  const backdropOpen = useRecoilValue(backdropOpenStateAtom);

  // Generate columns based on the table data
  const columns = tableData.length > 0 ? generateColumns(tableData[0]) : [];

  return (
    <>
      {/* Backdrop for loading state */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* DataGrid for displaying table data */}
      {tableData.length > 0 && (
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
            // Adding a key might help with potential re-render issues in certain scenarios
            key={tableData.length}
          />
        </div>
      )}
    </>
  );
}

export default DataGridComponent;
