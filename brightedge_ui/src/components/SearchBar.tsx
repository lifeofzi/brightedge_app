import { TextareaAutosize, Button } from "@mui/material";
import axios from "axios";
import styles from "./Searchbar.module.css";
import { useSetRecoilState } from "recoil";
import { tableDataAtom } from "../store/atoms/DataGridState.tsx";

function Searchbar() {
  const SERVER_ENDPOINT = "http://localhost:3001/cruxdata";
  const setTableData = useSetRecoilState(tableDataAtom);

  let textareaContent = "";

  const handleAnalyze = () => {
    const urls = Array.from(
      new Set(
        textareaContent.split("\n").filter((url: string) => url.trim() !== "")
      )
    );

    const fetchData = urls.map((url: string) => {
      return axios.get(SERVER_ENDPOINT, {
        params: {
          url: url.trim(),
        },
      });
    });

    Promise.all(fetchData).then((responses) => {
      setTableData(
        responses.map((res) => {
          // Convert p75 values to numbers
          Object.keys(res.data.metrics).forEach((key) => {
            res.data.metrics[key].p75 = res.data.metrics[key].p75.map(Number);
          });
          return { id: res.data.origin, ...res.data };
        })
      );
    });
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
