import {
  TextareaAutosize,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
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

function Searchbar() {
  const SERVER_ENDPOINT = `${import.meta.env.VITE_HOST}:${
    import.meta.env.VITE_PORT
  }/${import.meta.env.VITE_ENDPOINT}`;

  const setTableData = useSetRecoilState(tableDataAtom);
  const setUrlErrors = useSetRecoilState(urlErrorStateAtom);
  const [open, setOpen] = useRecoilState(backdropOpenStateAtom);
  const [textareaContent, setTextareaContent] =
    useRecoilState(textareaContentAtom);

  const handleAnalyze = async () => {
    console.log("analyzing new query");
    setOpen(true);

    // Clearing previous state
    setUrlErrors({});
    setTableData([]);

    const urls = Array.from(
      new Set(
        textareaContent.split("\n").filter((url: string) => url.trim() !== "")
      )
    );

    console.log("urls : " + urls);

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
        placeholder="Enter URLs, each on a new line..."
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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Searchbar;
