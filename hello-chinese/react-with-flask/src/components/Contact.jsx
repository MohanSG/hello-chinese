import { useState } from "react";

const inputStyle = {
  padding: "13px 15px",
  borderRadius: "10px",
  border: "1.5px solid rgba(42,35,27,.14)",
  background: "#fffdf8",
  fontFamily: "inherit",
  fontSize: "15px",
  color: "#2a231b",
};
const labelText = { fontSize: "13px", fontWeight: 600, color: "#2a231b" };
const field = { display: "flex", flexDirection: "column", gap: "7px" };

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST to your Flask API here, e.g. fetch('/api/contact', { method:'POST', body: new FormData(e.target) })
    setSubmitted(true);
  };

  return (
    <section id="contact" style={{ background: "#fffdf8", fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "clamp(64px,9vw,110px) clamp(20px,5vw,56px)", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "clamp(40px,6vw,72px)" }}>
        <div>
          <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "2.4px", color: "#c23a2b", textTransform: "uppercase", marginBottom: "16px" }}>Get in touch</div>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(30px,4vw,44px)", lineHeight: 1.12, letterSpacing: "-.6px", margin: "0 0 20px", color: "#2a231b" }}>
            Let's find the right class for your child.
          </h2>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#5b5348", margin: "0 0 34px" }}>
            Tell us a little about your child and we'll reply within one business day with class options and trial times.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {[
              ["✉", "Email", "hello@hellochinese.com"],
              ["☏", "Phone", "(800) 555-1234"],
              ["◷", "Hours", "Mon–Sat · 9am–7pm"],
            ].map(([icon, label, value]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ flex: "none", width: "48px", height: "48px", borderRadius: "12px", background: "#f6e7e1", color: "#c23a2b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{icon}</span>
                <div>
                  <div style={{ fontSize: "13px", color: "#948977", fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: "16px", color: "#2a231b", fontWeight: 600 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ background: "#f6f1e8", border: "1px solid rgba(42,35,27,.08)", borderRadius: "20px", padding: "clamp(24px,3vw,36px)", display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <label style={field}><span style={labelText}>Your name</span><input className="hc-input" required type="text" name="name" placeholder="Jane Smith" style={inputStyle} /></label>
                <label style={field}><span style={labelText}>Email</span><input className="hc-input" required type="email" name="email" placeholder="jane@email.com" style={inputStyle} /></label>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <label style={field}><span style={labelText}>Phone</span><input className="hc-input" required type="tel" name="phone" placeholder="(555) 123-4567" style={inputStyle} /></label>
                <label style={field}><span style={labelText}>Child's age / grade</span><input className="hc-input" required type="text" name="childAge" placeholder="e.g. 8 / 3rd grade" style={inputStyle} /></label>
              </div>
              <label style={field}>
                <span style={labelText}>Program of interest</span>
                <select className="hc-input" required name="program" style={inputStyle} defaultValue="">
                  <option value="" disabled>Select a program…</option>
                  <option>Mandarin Chinese</option>
                  <option>Math</option>
                  <option>Math + Chinese Combo</option>
                  <option>1-on-1 tutoring</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label style={field}>
                <span style={labelText}>Message</span>
                <textarea className="hc-input" rows="4" name="message" placeholder="Tell us about your child's experience level and goals…" style={{ ...inputStyle, resize: "vertical" }} />
              </label>
              <button type="submit" className="hc-btn-red" style={{ padding: "15px", borderRadius: "12px", border: "none", background: "#c23a2b", color: "#fff", fontFamily: "inherit", fontSize: "16px", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 22px rgba(194,58,43,.3)" }}>
                Send &amp; request a free trial
              </button>
            </form>
          ) : (
            <div style={{ background: "#f6f1e8", border: "1px solid rgba(42,35,27,.08)", borderRadius: "20px", padding: "56px 36px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", minHeight: "420px", justifyContent: "center" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "999px", background: "#c23a2b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "34px", boxShadow: "0 10px 26px rgba(194,58,43,.32)" }}>✓</div>
              <div style={{ fontFamily: "'Noto Serif SC', serif", fontSize: "30px", fontWeight: 600, color: "#c23a2b" }}>谢谢!</div>
              <h3 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "26px", margin: 0, color: "#2a231b" }}>Thank you — message received.</h3>
              <p style={{ fontSize: "16px", lineHeight: 1.6, color: "#5b5348", margin: 0, maxWidth: "340px" }}>
                We'll be in touch within one business day with class options and trial times for your child.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
