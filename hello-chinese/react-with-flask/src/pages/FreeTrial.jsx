import { useState } from "react";
import { NavLink } from "react-router-dom";
import { apiRequest } from "../api/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "./FreeTrial.css";

/* Fall 2026 trial schedule — one Sunday per family.
   `blocked` marks a date that stays visible but is not selectable. */
export const TRIAL_DATES = [
  {
    month: "September 2026",
    days: [
      { key: "2026-09-06", label: "Sep 6" },
      { key: "2026-09-13", label: "Sep 13" },
      { key: "2026-09-20", label: "Sep 20" },
      { key: "2026-09-27", label: "Sep 27" },
    ],
  },
  {
    month: "October 2026",
    days: [
      { key: "2026-10-04", label: "Oct 4" },
      { key: "2026-10-18", label: "Oct 18" },
      { key: "2026-10-25", label: "Oct 25" },
    ],
  },
  {
    month: "November 2026",
    days: [
      { key: "2026-11-08", label: "Nov 8" },
      { key: "2026-11-15", label: "Nov 15" },
      { key: "2026-11-22", label: "Nov 22", blocked: "YCT Test" },
    ],
  },
  {
    month: "December 2026",
    days: [
      { key: "2026-12-06", label: "Dec 6" },
      { key: "2026-12-13", label: "Dec 13" },
    ],
  },
];

const EXPERIENCE_OPTIONS = [
  { value: "none", label: "No prior Chinese learning experience" },
  { value: "lt1", label: "Less than 1 year" },
  { value: "1-2", label: "1–2 years" },
  { value: "3+", label: "3+ years" },
];

const PREF_LABELS = {
  chinese: "Chinese Class Trial",
  tutoring: "Chinese Class + Tutoring Trial",
};

const EMPTY = {
  parentName: "", parentPhone: "", parentEmail: "",
  childName: "", childAge: "", experience: "",
  preference: "chinese", math: "", date: "", notes: "",
};

function FreeTrial() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError("");
  };
  const pick = (field, value) => () => {
    setForm((f) => ({ ...f, [field]: value }));
    setError("");
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = (key) => new Date(key + "T00:00:00") < today;

  const dateLabel = (() => {
    for (const m of TRIAL_DATES) {
      const hit = m.days.find((d) => d.key === form.date);
      if (hit) return `${hit.label}, ${m.month.split(" ")[1]}`;
    }
    return "";
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.parentName.trim() || !form.parentPhone.trim() || !form.parentEmail.trim())
      return setError("Please complete the parent / guardian fields.");
    if (!form.childName.trim() || !form.childAge.trim() || !form.experience)
      return setError("Please complete your child's information.");
    if (!form.date) return setError("Please select one trial date.");

    const payload = {
      type: "free-trial",
      parent: { name: form.parentName, phone: form.parentPhone, email: form.parentEmail },
      child: { name: form.childName, age: form.childAge, experience: form.experience },
      trialPreference: PREF_LABELS[form.preference],
      mathInterest: form.math === "yes" ? "Yes" : form.math === "no" ? "No" : "Not answered",
      trialDate: form.date,
      trialDateLabel: dateLabel,
      notes: form.notes,
    };

    setSending(true);
    try {
      await apiRequest("/send-test-email", {
        method: "POST",
        body: JSON.stringify({
          subject: "Free trial request",
          recipient: form.parentEmail,
          msg: payload,
        }),
      });
      setConfirmation({
        name: form.parentName.trim().split(" ")[0] || "there",
        date: dateLabel,
        child: form.childName + (form.childAge ? `, age ${form.childAge}` : ""),
        pref: payload.trialPreference,
        math: payload.mathInterest,
      });
      setError("");
    } catch (err) {
      setError("Something went wrong sending your request. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const startOver = () => {
    setForm(EMPTY);
    setConfirmation(null);
    setError("");
  };

  return (
    <div className="trial-page">
      <NavBar />

      <div className="trial-shell">
          <div className="trial-back">
            <NavLink to="/" className="trial-back__link">
              <span aria-hidden="true">←</span> Back to Programs
            </NavLink>
          </div>

          <div className="trial-banner">
            <div className="trial-banner__watermark" aria-hidden="true">试</div>
            <div className="trial-banner__inner">
              <h1 className="trial-banner__title">New to Hello Chinese?</h1>
              <p className="trial-banner__desc">
                Experience a class, meet our teachers,<br />and find the right level for your child.
              </p>
            </div>
          </div>

          {confirmation ? (
            <div className="trial-confirm">
              <div className="trial-confirm__check" aria-hidden="true">✓</div>
              <h2 className="trial-confirm__title">Request received, {confirmation.name}.</h2>
              <p className="trial-confirm__desc">
                Our team will contact you promptly to confirm and schedule the trial class on{" "}
                <strong>{confirmation.date}</strong>.
              </p>
              <div className="trial-confirm__summary">
                <div><strong>Child:</strong> {confirmation.child}</div>
                <div><strong>Trial:</strong> {confirmation.pref}</div>
                <div><strong>Math interest:</strong> {confirmation.math}</div>
              </div>
              <div className="trial-confirm__actions">
                <button type="button" className="trial-ghost-btn" onClick={startOver}>
                  Submit another request
                </button>
                <NavLink to="/" className="trial-ghost-btn">Return home</NavLink>
              </div>
            </div>
          ) : (
            <form className="trial-form" onSubmit={handleSubmit} noValidate>
              {/* 1 — PARENT */}
              <section className="trial-section">
                <header className="trial-section__head">
                  <span className="trial-section__num">1</span>
                  <h2 className="trial-section__title">Parent / Guardian Information</h2>
                </header>
                <div className="trial-grid trial-grid--3">
                  <label className="trial-field">
                    <span>Parent / Guardian Name <em>*</em></span>
                    <input value={form.parentName} onChange={set("parentName")} placeholder="Enter full name" />
                  </label>
                  <label className="trial-field">
                    <span>Phone Number <em>*</em></span>
                    <input value={form.parentPhone} onChange={set("parentPhone")} placeholder="(555) 123-4567" />
                  </label>
                  <label className="trial-field">
                    <span>Email Address <em>*</em></span>
                    <input type="email" value={form.parentEmail} onChange={set("parentEmail")} placeholder="name@example.com" />
                  </label>
                </div>
              </section>

              <div className="trial-cols">
                <div className="trial-cols__left">
                  {/* 2 — CHILD */}
                  <section className="trial-section">
                    <header className="trial-section__head">
                      <span className="trial-section__num">2</span>
                      <h2 className="trial-section__title">Child Information</h2>
                    </header>
                    <div className="trial-grid trial-grid--child">
                      <label className="trial-field">
                        <span>Child's Name <em>*</em></span>
                        <input value={form.childName} onChange={set("childName")} placeholder="Enter child's name" />
                      </label>
                      <label className="trial-field">
                        <span>Child's Age <em>*</em></span>
                        <input value={form.childAge} onChange={set("childAge")} placeholder="Enter age" />
                      </label>
                    </div>
                    <label className="trial-field">
                      <span>Chinese Learning Experience <em>*</em></span>
                      <select value={form.experience} onChange={set("experience")}>
                        <option value="">Select an option</option>
                        {EXPERIENCE_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </label>
                  </section>

                  {/* 3 — TRIAL PREFERENCE */}
                  <section className="trial-section">
                    <header className="trial-section__head">
                      <span className="trial-section__num">3</span>
                      <h2 className="trial-section__title">Trial Class Preference</h2>
                    </header>
                    <div className="trial-question">What class would you like your child to try? <em>*</em></div>
                    <div className="trial-grid trial-grid--2">
                      {Object.entries(PREF_LABELS).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          className={`trial-option ${form.preference === value ? "is-active" : ""}`}
                          onClick={pick("preference", value)}
                          aria-pressed={form.preference === value}
                        >
                          <span className="trial-option__dot" aria-hidden="true" />
                          {label}
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* 4 — MATH INTEREST */}
                  <section className="trial-section">
                    <header className="trial-section__head">
                      <span className="trial-section__num">4</span>
                      <h2 className="trial-section__title">Math Interest</h2>
                    </header>
                    <div className="trial-question">Are you also interested in Math Enrichment for your child?</div>
                    <div className="trial-grid trial-grid--2">
                      {["yes", "no"].map((v) => (
                        <button
                          key={v}
                          type="button"
                          className={`trial-option ${form.math === v ? "is-active" : ""}`}
                          onClick={pick("math", v)}
                          aria-pressed={form.math === v}
                        >
                          <span className="trial-option__dot" aria-hidden="true" />
                          {v === "yes" ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                    <p className="trial-note">
                      Math classes aren't directly bookable — our team follows up based on your child's information to
                      determine whether a math class may be a good fit.
                    </p>
                  </section>
                </div>

                {/* 5 — TRIAL DATE */}
                <section className="trial-section trial-section--dates">
                  <header className="trial-section__head trial-section__head--split">
                    <div className="trial-section__head-left">
                      <span className="trial-section__num">5</span>
                      <h2 className="trial-section__title">Select Your Trial Date</h2>
                    </div>
                    <span className="trial-datecount">{form.date ? 1 : 0} of 1 trial date selected</span>
                  </header>
                  <p className="trial-note trial-note--top">Please select one Sunday for your child's trial class.</p>

                  {TRIAL_DATES.map((m) => (
                    <div className="trial-month" key={m.month}>
                      <div className="trial-month__label">{m.month}</div>
                      <div className="trial-month__grid">
                        {m.days.map((d) => {
                          const past = isPast(d.key);
                          const disabled = !!d.blocked || past;
                          const selected = form.date === d.key;
                          return (
                            <button
                              key={d.key}
                              type="button"
                              disabled={disabled}
                              onClick={pick("date", d.key)}
                              className={`trial-date ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}`}
                              aria-pressed={selected}
                            >
                              <span className="trial-date__dot" aria-hidden="true" />
                              <span className="trial-date__text">
                                <span className="trial-date__label">{d.label}</span>
                                {(d.blocked || past) && (
                                  <span className="trial-date__note">{d.blocked || "Unavailable"}</span>
                                )}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  <p className="trial-legend">
                    Past, full, completed, or blocked dates are automatically disabled.
                  </p>
                </section>
              </div>

              {/* 6 — NOTES */}
              <section className="trial-section">
                <header className="trial-section__head">
                  <span className="trial-section__num">6</span>
                  <h2 className="trial-section__title">Additional Notes</h2>
                </header>
                <div className="trial-question">Anything you would like us to know?</div>
                <textarea
                  className="trial-textarea"
                  rows={3}
                  maxLength={500}
                  value={form.notes}
                  onChange={set("notes")}
                  placeholder="Share your child's goals, learning needs, or anything else you would like us to know."
                />
                <div className="trial-counter">{form.notes.length}/500</div>
              </section>

              <div className="trial-callout">
                <span className="trial-callout__icon" aria-hidden="true">🗓</span>
                <p>
                  Once we receive your information, our team will contact you promptly to confirm and schedule a trial
                  class based on your selected date.
                </p>
              </div>

              {error && <div className="trial-error">{error}</div>}

              <button type="submit" className="trial-submit" disabled={sending}>
                {sending ? "Sending…" : "Submit Trial Request"}
              </button>
            </form>
          )}
      </div>

      <Footer />
    </div>
  );
}

export default FreeTrial;
