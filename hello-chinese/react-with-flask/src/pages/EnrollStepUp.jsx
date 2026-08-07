import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PlanSelection from "../components/PlanSelection";
import "../styles/variables.css";

// Step-Up Chinese plan selection. All five plans, per-Sunday pricing, and any
// level/plan time conflicts come from the shared PlanSelection component.
export default function EnrollStepUp() {
  return (
    <>
      <NavBar />
      <PlanSelection levelKey="step-up" />
      <Footer />
    </>
  );
}
