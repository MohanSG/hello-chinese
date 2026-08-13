import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Classes from "./pages/Classes";
// import Book from "./pages/Book";
// import Calendar from "./pages/Calendar";
// import CulturalExperiences from "./pages/CulturalExperiences";
// import HelloJourney from "./pages/HelloJourney";

import EnrollOverview from "./pages/EnrollOverview";
import EnrollSaturday from "./pages/EnrollSaturday";
import EnrollPrivate from "./pages/EnrollPrivate";
import EnrollSundayProgram from "./pages/EnrollSundayProgram";
import EnrollStepIn from "./pages/EnrollStepIn";
import EnrollStepUp from "./pages/EnrollStepUp";
import EnrollStepBeyond from "./pages/EnrollStepBeyond";
import EnrollMath from "./pages/EnrollMath";
import EnrollSelectDates from "./pages/EnrollSelectDates";
import EnrollRegistration from "./pages/EnrollRegistration";
import FreeTrial from "./pages/FreeTrial";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Classes" element={<Classes />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/CulturalExperiences" element={<CulturalExperiences />} />
          <Route path="/HelloJourney" element={<HelloJourney />} /> */}

          <Route path="/" element={<EnrollOverview />} />
          <Route path="/Enroll/Saturday" element={<EnrollSaturday />} />
          <Route path="/Enroll/Private" element={<EnrollPrivate />} />
          <Route path="/Enroll/Sunday" element={<EnrollSundayProgram />} />
          <Route path="/Enroll/Step-In" element={<EnrollStepIn />} />
          <Route path="/Enroll/Step-Up" element={<EnrollStepUp />} />
          <Route path="/Enroll/Math" element={<EnrollMath />} />
          <Route path="/Enroll/Step-Beyond" element={<EnrollStepBeyond />} />
          <Route path="/Enroll/Sundays" element={<EnrollSelectDates />} />
          <Route path="/Enroll/Registration" element={<EnrollRegistration />} />
          <Route path="/FreeTrial" element={<FreeTrial />} />

        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
