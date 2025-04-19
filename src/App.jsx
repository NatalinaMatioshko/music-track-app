import { BrowserRouter, Route, Routes } from "react-router-dom";
import TracksPage from "./pages/TracksPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tracks" element={<TracksPage />} />
        <Route path="*" element={<TracksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
