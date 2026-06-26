import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Book from "./pages/Book";
import Contact from "./pages/Contact"
import Chat from "./pages/Chat";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/About"
          element={<About />}
        />
        <Route
          path="/Book"
          element={<Book />}
        />
        <Route
          path="/Contact"
          element={<Contact />}
        />
      <Route
        path="/Chat"
        element={<Chat />}
      />
    </Routes>
    </BrowserRouter >
  );
}

export default App;