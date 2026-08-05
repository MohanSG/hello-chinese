import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";

import Home from "./pages/Home";
// import About from "./pages/About";
import Classes from "./pages/Classes";
import Book from "./pages/Book";
import Calendar from "./pages/Calendar";
// import CulturalExperiences from "./pages/CulturalExperiences";
// import HelloJourney from "./pages/HelloJourney";
import EnrollOverview from "./pages/EnrollOverview";
import EnrollSaturday from "./pages/EnrollSaturday";
import EnrollSunday from "./pages/EnrollSunday";
import EnrollPrivate from "./pages/EnrollPrivate";
import EnrollStepIn from "./pages/EnrollStepIn";
import EnrollReview from "./pages/EnrollReview";
function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<EnrollOverview />} />
          <Route path="/Enroll/Saturday" element={<EnrollSaturday />} />
          <Route path="/Enroll/Sunday" element={<EnrollSunday />} />
          <Route path="/Enroll/Private" element={<EnrollPrivate />} />
          <Route path="/Enroll/Step-In" element={<EnrollStepIn />} />
          <Route path="/Enroll/Review" element={<EnrollReview />} />
          
          {/* <Route path="/About" element={<About />} /> */}
          {/* <Route path="/Classes" element={<Classes />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Calendar" element={<Calendar />} /> */}
          {/* <Route path="/CulturalExperiences" element={<CulturalExperiences />} />
          <Route path="/HelloJourney" element={<HelloJourney />} /> */}
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
