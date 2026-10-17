import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BuilderPage from "./pages/BuilderPage";
import PreviewPage from "./pages/PreviewPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div className="bg-white border-b border-gray-300 p-4 flex gap-4">
          <Link to="/" className="font-bold text-blue-500">
            Builder
          </Link>
          <Link to="/preview" className="font-bold text-blue-500">
            Preview
          </Link>
        </div>

        <Routes>
          <Route path="/" element={<BuilderPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
