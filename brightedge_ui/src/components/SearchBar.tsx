import { TextareaAutosize, Button } from "@mui/material";
import axios from "axios";
import styles from "../css/Searchbar.module.css";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  tableDataAtom,
  urlErrorStateAtom,
} from "../store/atoms/DataGridState.tsx";

function Searchbar() {
  const SERVER_ENDPOINT = "http://localhost:3001/cruxdata";
  const setTableData = useSetRecoilState(tableDataAtom);
  const setUrlErrors = useSetRecoilState(urlErrorStateAtom);
  //const errors = useRecoilValue(urlErrorStateAtom);

  let textareaContent = "";

  const handleAnalyze = async () => {
    // Clearing previous state
    setUrlErrors({});
    setTableData([]);

    const urls = Array.from(
      new Set(
        textareaContent.split("\n").filter((url: string) => url.trim() !== "")
      )
    );

    const fetchData = urls.map(async (url: string) => {
      try {
        const response = await axios.get(SERVER_ENDPOINT, {
          params: {
            url: url.trim(),
          },
        });
        return response.data;
      } catch (error) {
        setUrlErrors((prevErrors) => ({
          ...prevErrors,
          [url]: "Failed to fetch data for this URL. Error :" + error,
        }));
        return null;
      }
    });

    const responses = await Promise.all(fetchData);

    const validResponses = responses.filter((res) => res !== null);

    setTableData(
      validResponses.map((res) => ({
        id: res.origin,
        ...res,
      }))
    );
  };

  return (
    <div className={styles.container}>
      <TextareaAutosize
        minRows={1}
        placeholder="Enter URLs, each on a new line..."
        className={styles.textarea}
        onChange={(e) => (textareaContent = e.target.value)}
      />

      <Button
        variant="contained"
        onClick={handleAnalyze}
        className={styles.analyzeButton}
      >
        Analyze
      </Button>
    </div>
  );
}

export default Searchbar;
