import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import YouTuberDashboard from "./pages/YouTuber/Dashboard";
import UploadProject from "./pages/YouTuber/UploadProject";
import EditorDashboard from "./pages/Editor/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/youtuber">
          <Route path="dashboard" element={<YouTuberDashboard />} />
          <Route path="upload" element={<UploadProject />} />
        </Route>
        <Route path="/editor/dashboard" element={<EditorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
