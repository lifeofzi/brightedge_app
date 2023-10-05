import { DataGrid } from "@mui/x-data-grid";
import styles from "../css/DataGridComponent.module.css";
import { useRecoilValue } from "recoil";
import { tableDataAtom } from "../store/atoms/AtomStates";
import { generateColumns } from "../utils/GridUtils";

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
