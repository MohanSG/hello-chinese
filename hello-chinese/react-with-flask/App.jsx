import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Book from "./pages/Book";
import Contact from "./pages/Contact";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Classes" element={<Classes />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Calendar" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
