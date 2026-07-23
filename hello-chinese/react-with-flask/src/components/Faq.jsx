import { useState } from "react";
import "../styles/variables.css";
import "../styles/shared.css";
import "./Faq.css";

const FAQS = [
  { q: "What ages do you teach?", a: "We teach children ages 3 to 12 — from Step-In (3–6) through Step-Beyond (10+) — plus Tutoring, Math Enrichment, and Private Chinese Lessons for a range of ages. Classes are grouped by age and level." },
  { q: "Are classes online or in person?", a: "Step-In, Step-Up, Step-Beyond, Tutoring, and Math Enrichment meet in person at The Yard (Eastern Market). Private Chinese Lessons are available online or in person." },
  { q: "Does my child need prior Mandarin experience?", a: "Not at all. We welcome complete beginners as well as kids who already speak some Mandarin at home. A quick placement chat helps us find the right class." },
  { q: "How big are the classes?", a: "Every group caps at 10 students with 2 teachers, so kids get real, personal attention." },
  { q: "How does the free trial work?", a: "Book a free 30-minute trial lesson with no commitment. Your child meets a teacher, tries a real class, and you decide from there — no pressure." },
  { q: "Can I pause or switch programs?", a: "Yes. Sessions are billed per term with no long-term contract — you can switch between Step-In, Step-Up, Step-Beyond, Tutoring, Math Enrichment, or Private Chinese Lessons anytime." },
];

function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq">
      <div className="faq__container">
        <div className="faq__head">
          <div className="eyebrow">FAQ</div>
          <h2 className="section-title">Questions parents ask</h2>
        </div>
        <div className="faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="faq__item">
                <button className="faq__question" onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="faq__q-text">{f.q}</span>
                  <span className={"faq__sign" + (isOpen ? " open" : "")}>+</span>
                </button>
                <div className={"faq__answer" + (isOpen ? " open" : "")}>
                  <p className="faq__answer-text">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
