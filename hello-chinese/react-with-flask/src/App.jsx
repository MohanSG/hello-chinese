import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";

import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Book from "./pages/Book";
import Calendar from "./pages/Calendar";
import CulturalExperiences from "./pages/CulturalExperiences";
import HelloJourney from "./pages/HelloJourney";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/CulturalExperiences" element={<CulturalExperiences />} />
          <Route path="/HelloJourney" element={<HelloJourney />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
