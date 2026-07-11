import { useState } from "react";
import "../styles/variables.css";
import "../styles/shared.css";
import "./Faq.css";

const FAQS = [
  { q: "What ages do you teach?", a: "We teach children and teens aged 5 to 17, from complete beginners to advanced heritage speakers. Classes are grouped by both age and level." },
  { q: "Are classes online or in person?", a: "Both. Most families choose live online classes, and in-person options are available in select cities. You can mix and match as your schedule changes." },
  { q: "Does my child need prior Mandarin experience?", a: "Not at all. We welcome complete beginners as well as kids who already speak some Mandarin at home. A quick placement chat helps us find the right class." },
  { q: "How big are the classes?", a: "Every group class caps at 6 students, so teachers know each child by name and can give real, personal attention." },
  { q: "How does the free trial work?", a: "Book a free 30-minute trial lesson with no commitment. Your child meets a teacher, tries a real class, and you decide from there — no pressure." },
  { q: "Can I pause or switch programs?", a: "Yes. Billing is monthly with no long-term contract. You can pause, switch between Chinese and Math, or upgrade to the combo anytime." },
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
