import { useState } from "react";

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
    <section style={{ background: "#f6f1e8", fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "840px", margin: "0 auto", padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "2.4px", color: "#c23a2b", textTransform: "uppercase", marginBottom: "16px" }}>FAQ</div>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(30px,4vw,44px)", lineHeight: 1.12, letterSpacing: "-.6px", margin: 0, color: "#2a231b" }}>
            Questions parents ask
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ background: "#fffdf8", border: "1px solid rgba(42,35,27,.08)", borderRadius: "14px", overflow: "hidden" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "22px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "16.5px", fontWeight: 600, color: "#2a231b" }}>{f.q}</span>
                  <span style={{ flex: "none", fontFamily: "'Newsreader', serif", fontSize: "26px", lineHeight: 1, color: "#c23a2b", transition: "transform .3s ease", transform: `rotate(${isOpen ? "45deg" : "0deg"})` }}>+</span>
                </button>
                <div style={{ overflow: "hidden", transition: "max-height .4s ease, opacity .35s ease", maxHeight: isOpen ? "260px" : "0", opacity: isOpen ? 1 : 0 }}>
                  <p style={{ margin: 0, padding: "0 24px 22px", fontSize: "15px", lineHeight: 1.65, color: "#6b6154" }}>{f.a}</p>
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
