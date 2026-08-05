import { useState } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "./EnrollOverview.css";
import "./EnrollSaturday.css";
import "./EnrollPrivate.css";

const EMPTY_FORM = {
  parentName: "",
  email: "",
  phone: "",
  childAge: "",
  format: "",
  goals: "",
};

function EnrollPrivate() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const onField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError("");
  };

  const submitInquiry = async (e) => {
    e.preventDefault();
    if (!form.parentName || !form.email || !form.phone || !form.childAge || !form.goals) {
      setError("Please fill in parent name, email, phone, child age, and learning goals.");
      return;
    }
    const payload = {
      page: "private-lessons-inquiry",
      parentName: form.parentName,
      email: form.email,
      phone: form.phone,
      childAge: form.childAge,
      format: form.format || null,
      goals: form.goals,
      submittedAt: new Date().toISOString(),
    };
    // TODO: POST payload to the existing Hello Chinese enrollment/contact endpoint.
    // await fetch("/api/enroll", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    console.log("Private lesson inquiry", payload);
    setSubmittedName(form.parentName);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="enroll-overview">
        <NavBar />
        <section className="enroll-header">
          <div className="enroll-header__watermark">谢谢</div>
          <div className="enroll-header__inner enroll-confirm">
            <div className="enroll-confirm__check">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12.5L9.5 18L20 6" stroke="#e08a7c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="enroll-header__eyebrow">Inquiry received</div>
            <h1 className="enroll-header__title">Thanks, {submittedName}.</h1>
            <p className="enroll-header__desc enroll-confirm__desc">
              Our team will follow up by email to discuss your goals and arrange a schedule that fits your family.
            </p>
            <NavLink to="/Enroll" className="btn-primary">Back to programs</NavLink>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="enroll-overview">
      <NavBar />

      {/* HEADER */}
      <section className="enroll-header">
        <div className="enroll-header__watermark">一对一</div>
        <div className="enroll-header__inner">
          <div className="enroll-back">
            <NavLink to="/" className="enroll-back__link">← Back to Programs</NavLink>
          </div>
          <span className="enroll-badge enroll-badge--private">Flexible Schedule</span>
          <h1 className="enroll-header__title">Private Chinese Lessons</h1>
          <p className="enroll-header__desc private-header__desc">
            Timing and goals vary by family, so private lessons are arranged individually — not through the Sunday
            package structure. Tell us what you're looking for and our team will follow up.
          </p>
          <div className="private-tags">
            <span className="private-tag">Available Monday–Sunday</span>
            <span className="private-tag">Online or in person</span>
            <span className="private-tag">One-on-one</span>
          </div>
        </div>
      </section>

      <div className="sat-interest">
        <form className="sat-form" onSubmit={submitInquiry}>
          <div className="private-form__head">
            <span className="private-form__zh">咨询</span>
            <h2 className="private-form__title">Request a private lesson</h2>
          </div>

          <div className="sat-form__grid">
            <label className="field field--full">
              <span className="field__label">Parent name</span>
              <input type="text" name="parentName" value={form.parentName ?? ""} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">Email</span>
              <input type="email" name="email" placeholder="parent@email.com" value={form.email ?? ""} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">Phone number</span>
              <input type="tel" name="phone" value={form.phone ?? ""} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">Child age</span>
              <input type="text" name="childAge" placeholder="e.g. 8" value={form.childAge ?? ""} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">Lesson format <span className="field__optional">(optional)</span></span>
              <select name="format" value={form.format ?? ""} onChange={onField} className="field__input">
                <option value="">No preference</option>
                <option value="Online">Online</option>
                <option value="In person">In person</option>
              </select>
            </label>
            <label className="field field--full">
              <span className="field__label">Learning goals / needs</span>
              <textarea
                name="goals"
                rows="4"
                placeholder="What would you like your child to work on? Any preferred days or times?"
                value={form.goals ?? ""}
                onChange={onField}
                className="field__input field__input--area"
              />
            </label>
          </div>

          {error && <p className="sat-form__error">{error}</p>}

          <button type="submit" className="btn-primary btn-primary--block">Send Inquiry</button>
          <p className="sat-form__note">Your inquiry goes straight to the Hello Chinese team — we'll reply by email.</p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default EnrollPrivate;
