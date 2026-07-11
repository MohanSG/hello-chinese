import { useState } from "react";
import "../styles/variables.css";
import "../styles/shared.css";
import "./Contact.css";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: POST to your Flask API here, e.g. fetch('/api/contact', { method:'POST', body: new FormData(e.target) })
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__grid">
        <div>
          <div className="eyebrow">Get in touch</div>
          <h2 className="contact__title">Let's find the right class for your child.</h2>
          <p className="contact__lede">
            Tell us a little about your child and we'll reply within one business day with class options and trial times.
          </p>
          <div className="contact__info">
            {[
              ["✉", "Email", "hello@hellochinese.com"],
              ["☏", "Phone", "(800) 555-1234"],
              ["◷", "Hours", "Mon–Sat · 9am–7pm"],
            ].map(([icon, label, value]) => (
              <div key={label} className="contact__info-row">
                <span className="contact__info-icon">{icon}</span>
                <div>
                  <div className="contact__info-label">{label}</div>
                  <div className="contact__info-value">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__row">
                <label className="contact__field"><span className="contact__label">Your name</span><input required type="text" name="name" placeholder="Jane Smith" className="contact__input" /></label>
                <label className="contact__field"><span className="contact__label">Email</span><input required type="email" name="email" placeholder="jane@email.com" className="contact__input" /></label>
              </div>
              <div className="contact__row">
                <label className="contact__field"><span className="contact__label">Phone</span><input required type="tel" name="phone" placeholder="(555) 123-4567" className="contact__input" /></label>
                <label className="contact__field"><span className="contact__label">Child's age / grade</span><input required type="text" name="childAge" placeholder="e.g. 8 / 3rd grade" className="contact__input" /></label>
              </div>
              <label className="contact__field">
                <span className="contact__label">Program of interest</span>
                <select required name="program" className="contact__input" defaultValue="">
                  <option value="" disabled>Select a program…</option>
                  <option>Mandarin Chinese</option>
                  <option>Math</option>
                  <option>Math + Chinese Combo</option>
                  <option>1-on-1 tutoring</option>
                  <option>Not sure yet</option>
                </select>
              </label>
              <label className="contact__field">
                <span className="contact__label">Message</span>
                <textarea rows="4" name="message" placeholder="Tell us about your child's experience level and goals…" className="contact__input contact__input--textarea" />
              </label>
              <button type="submit" className="contact__submit">Send &amp; request a free trial</button>
            </form>
          ) : (
            <div className="contact__success">
              <div className="contact__success-check">✓</div>
              <div className="contact__success-zh">谢谢!</div>
              <h3 className="contact__success-title">Thank you — message received.</h3>
              <p className="contact__success-body">
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
