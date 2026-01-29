import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Question from "./pages/Question";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import AskQuestion from "./pages/AskQuestion";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions/:questionId" element={<Question />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask" element={<AskQuestion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
