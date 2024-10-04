import Editor from "./Components/Editor";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/documents/${uuidv4()}`} replace />}
        />
        <Route path="/documents/:id" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
