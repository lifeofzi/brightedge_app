import { TextareaAutosize, Button } from "@mui/material";
import axios from "axios";
import styles from "../css/Searchbar.module.css";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  tableDataAtom,
  urlErrorStateAtom,
  backdropOpenStateAtom,
  textareaContentAtom,
} from "../store/atoms/AtomStates.tsx";
import { AxiosError } from "axios";
import { SERVER_ENDPOINT } from "../config/apiConfig";
import log from "loglevel";

function Searchbar() {
  const setTableData = useSetRecoilState(tableDataAtom);
  const setUrlErrors = useSetRecoilState(urlErrorStateAtom);
  const setOpen = useSetRecoilState(backdropOpenStateAtom);
  const [textareaContent, setTextareaContent] =
    useRecoilState(textareaContentAtom);

  const handleAnalyze = async () => {
    log.info("Analyzing new query.");
    setOpen(true);

    // Clearing previous state
    setUrlErrors({});
    setTableData([]);

    const urls = Array.from(
      new Set(
        textareaContent.split("\n").filter((url: string) => url.trim() !== "")
      )
    );

    log.info("URLs: %s", urls);

    const fetchData = urls.map(async (url: string) => {
      try {
        const response = await axios.get(SERVER_ENDPOINT, {
          params: {
            url: url.trim(),
          },
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        log.error("URL: %s - Error: %s", url, error);

        setUrlErrors((prevErrors) => ({
          ...prevErrors,
          [url]: axiosError,
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

    setOpen(false); // Close the backdrop after analysis
  };

  return (
    <div className={styles.container}>
      <TextareaAutosize
        minRows={1}
        placeholder="Enter URL(s), each on a new line..."
        className={styles.textarea}
        onChange={(e) => setTextareaContent(e.target.value)}
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
