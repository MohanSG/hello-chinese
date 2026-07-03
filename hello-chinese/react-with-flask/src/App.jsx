import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Book from "./pages/Book";
import About from "./pages/About"
import Classes from "./pages/Classes"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Contact" element={<Home />} />
        <Route path="/Chat" element={<Home />} />
        <Route path="/Calendar" element={<Home />} />
        <Route path="/Classes" element={<Classes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
