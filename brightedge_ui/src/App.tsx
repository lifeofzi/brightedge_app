import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Appbar from "./components/AppBar.tsx";
import Searchbar from "./components/SearchBar.tsx";
import DataGridComponent from "./components/DataGridComponent.tsx";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <RecoilRoot>
        <Router>
          <Appbar></Appbar>
          <Routes>
            <Route
              path={"/"}
              element={
                <>
                  <Searchbar></Searchbar>
                  <DataGridComponent />
                </>
              }
            ></Route>
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
