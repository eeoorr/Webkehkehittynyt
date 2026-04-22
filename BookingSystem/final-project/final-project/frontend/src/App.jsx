import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import FormPage from "./pages/FormPage.jsx";
import SavedDataPage from "./pages/SavedDataPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/saved" element={<SavedDataPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;