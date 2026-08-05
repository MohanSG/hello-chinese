import { useEffect, useMemo, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  LEVELS, PLANS, LOCATION, POLICY_SUMMARY, TERMS, MIN_SESSION_DATES, MAX_SESSION_DATES,
  planConflict, planTitle, quote, scheduleFor, sundaysByMonth, eligibleSundays,
  validateDateSelection, formatDateShort,
} from "../data/enrollment";
import "../styles/variables.css";
import "./EnrollReview.css";

const DRAFT_KEY = "hc.enrollmentDraft";
const EMPTY_CHILD = { name: "", age: "", grade: "", experience: "", goals: "" };

const EXPERIENCE_OPTIONS = [
  ["none", "No prior Mandarin"],
  ["home", "Spoken at home"],
  ["beginner", "Some classes, beginner"],
  ["intermediate", "1+ year of classes"],
  ["fluent", "Reads and writes confidently"],
];

function readDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function EnrollReview() {
  const [params] = useSearchParams();
  const levelKey = params.get("level") || "";
  const planId = Number(params.get("plan")) || 0;

  const draft = useMemo(readDraft, []);
  const [parent, setParent] = useState(draft?.parent || { name: "", email: "", phone: "" });
  const [termKey, setTermKey] = useState(draft?.termKey || TERMS[0].key);
  const [selectedDates, setSelectedDates] = useState(draft?.selectedDates || []);
  const [makeupDate, setMakeupDate] = useState(draft?.makeupDate || "");
  const [children, setChildren] = useState(draft?.children?.length ? draft.children : [{ ...EMPTY_CHILD }]);
  const [policyAccepted, setPolicyAccepted] = useState(!!draft?.policyAccepted);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ parent, termKey, selectedDates, makeupDate, children, policyAccepted }));
    } catch (e) { /* storage unavailable */ }
  }, [parent, termKey, selectedDates, makeupDate, children, policyAccepted]);

  const known = !!LEVELS[levelKey] && !!PLANS[planId];
  const conflict = known ? planConflict(levelKey, planId) : "We could not tell which level and plan you selected.";
  const level = known ? LEVELS[levelKey] : null;
  const schedule = known && !conflict ? scheduleFor(levelKey, planId) : [];
  const q = known && !conflict ? quote(planId, children.length) : null;
  const term = TERMS.find((t) => t.key === termKey) || TERMS[0];
  const months = useMemo(() => sundaysByMonth(term), [term]);
  const enoughDates = selectedDates.length >= MIN_SESSION_DATES;

  // The last Sunday chosen defaults to the make-up date; the parent can move it.
  const toggleDate = (iso) => {
    const isSelected = selectedDates.includes(iso);
    if (!isSelected && selectedDates.length >= MAX_SESSION_DATES) {
      return setError(`You can schedule up to ${MAX_SESSION_DATES} Sundays.`);
    }
    const next = isSelected ? selectedDates.filter((d) => d !== iso) : [...selectedDates, iso].sort();
    setSelectedDates(next);
    setMakeupDate((prev) => (next.includes(prev) && prev ? prev : next[next.length - 1] || ""));
    setError("");
  };

  const selectFirstTen = () => {
    // 10 class Sundays plus the reserved make-up date.
    const first = eligibleSundays(term).slice(0, MAX_SESSION_DATES).map((s) => s.iso);
    setSelectedDates(first);
    setMakeupDate(first[first.length - 1] || "");
    setError("");
  };

  const clearDates = () => { setSelectedDates([]); setMakeupDate(""); };

  const chipClass = (day) => {
    if (day.unavailable) return "review-chip review-chip--off";
    if (makeupDate === day.iso) return "review-chip review-chip--makeup";
    if (selectedDates.includes(day.iso)) return "review-chip review-chip--on";
    return "review-chip";
  };

  const setChildField = (index, field) => (e) =>
    setChildren((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: e.target.value } : c)));

  const handleSubmit = () => {
    if (!parent.name.trim() || !parent.email.trim() || !parent.phone.trim()) {
      return setError("Please add your name, email, and phone number.");
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(parent.email.trim())) {
      return setError("Please enter a valid email address.");
    }
    const dateError = validateDateSelection(selectedDates, makeupDate, term);
    if (dateError) return setError(dateError);
    if (children.some((c) => !c.name.trim() || !c.age.trim() || !c.experience)) {
      return setError("Each child needs a name, age, and Mandarin experience level.");
    }
    if (!policyAccepted) return setError("Please accept the enrollment, make-up, and refund policy.");

    // Totals are recomputed from the plan id — never read from the URL.
    const payload = {
      type: "enrollment",
      level: levelKey,
      levelName: level.name,
      planId,
      planName: planTitle(planId),
      packageName: "10-Session Full-Term Package",
      schedule,
      term: { key: term.key, label: term.label },
      // All selected Sundays; one is held in reserve as the make-up date.
      sessionDates: selectedDates.filter((d) => d !== makeupDate),
      makeupDate,
      allSelectedDates: selectedDates,
      timezone: LOCATION.timezone,
      location: LOCATION,
      parent,
      children,
      pricing: quote(planId, children.length),
      policyAcknowledged: true,
      submittedAt: new Date().toISOString(),
    };
    console.log("ENROLLMENT PAYLOAD", payload);
    // await apiRequest("/api/enrollment", { method: "POST", body: payload });
    try { sessionStorage.removeItem(DRAFT_KEY); } catch (e) { /* ignore */ }
    setError("");
    setSubmitted(payload);
  };

  if (!known || conflict) {
    return (
      <div className="review-page">
        <NavBar />
        <section className="review-empty">
          <div className="review-empty__eyebrow">Selection needed</div>
          <h1 className="review-empty__title">Choose a plan to continue</h1>
          <p className="review-empty__desc">{conflict}</p>
          <NavLink to="/Enroll/Sunday" className="review-btn">Back to Sunday Programs</NavLink>
        </section>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    const p = submitted;
    return (
      <div className="review-page">
        <NavBar />
        <section className="review-confirm">
          <div className="review-confirm__head">
            <span className="review-confirm__tick">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12.5L9.5 18L20 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="review-confirm__eyebrow">Registration received</span>
          </div>
          <h1 className="review-confirm__title">Thank you, {p.parent.name.trim().split(" ")[0]}.</h1>
          <p className="review-confirm__desc">
            We've received your enrollment request. Our team reviews placement and confirms your child's group by email, usually within two business days.
          </p>

          <div className="review-card">
            <div className="review-card__title">Enrollment summary</div>
            <dl className="review-rows">
              <div className="review-row"><dt>Program</dt><dd className="review-row__strong">{p.levelName} · {p.planName}</dd></div>
              <div className="review-row"><dt>Package</dt><dd>10-Session Full-Term Package</dd></div>
              <div className="review-row"><dt>Term</dt><dd>{p.term.label}</dd></div>
              <div className="review-row"><dt>Class Sundays</dt><dd>{p.sessionDates.map(formatDateShort).join(" · ")}</dd></div>
              <div className="review-row"><dt>Make-up date</dt><dd>{formatDateShort(p.makeupDate)} (held in reserve)</dd></div>
              <div className="review-row"><dt>Times</dt><dd>{p.schedule.map((b) => `${b.time} ${b.label}`).join(" · ")} · {p.timezone}</dd></div>
              <div className="review-row"><dt>Location</dt><dd>{LOCATION.venue}, {LOCATION.street}, {LOCATION.city}</dd></div>
              <div className="review-row"><dt>Children</dt><dd>{p.children.map((c) => c.name.trim()).filter(Boolean).join(", ")}</dd></div>
              <div className="review-row"><dt>Total due</dt><dd className="review-row__total">${p.pricing.total}</dd></div>
            </dl>
          </div>

          <p className="review-fineprint">
            Need to reschedule or cancel? Reply to the confirmation email or call (800) 555-1234 at least 48 hours before the first session. Make-up dates and credit follow the enrollment policy you acknowledged.
          </p>
          <NavLink to="/Enroll" className="review-btn">Back to programs</NavLink>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="review-page">
      <NavBar />

      <section className="review-head">
        <NavLink to={`/Enroll/${level.name}`} className="review-head__back">← Back to {level.name} plans</NavLink>
        <h1 className="review-head__title">Complete your registration</h1>
        <p className="review-head__desc">Check your program selection, tell us about your child, and confirm the enrollment policy.</p>
      </section>

      <section className="review-body">
        <div className="review-cols">
          <div className="review-form">

            <div className="review-card">
              <div className="review-card__title">Parent or guardian</div>
              <p className="review-card__note">We use this to confirm placement, schedule, and payment details.</p>
              <div className="review-grid">
                <label className="review-field">
                  <span className="review-field__label">Full name *</span>
                  <input type="text" value={parent.name} placeholder="Jane Smith" onChange={(e) => setParent({ ...parent, name: e.target.value })} />
                </label>
                <label className="review-field">
                  <span className="review-field__label">Email *</span>
                  <input type="email" value={parent.email} placeholder="parent@email.com" onChange={(e) => setParent({ ...parent, email: e.target.value })} />
                </label>
                <label className="review-field">
                  <span className="review-field__label">Phone *</span>
                  <input type="tel" value={parent.phone} placeholder="(202) 555-0134" onChange={(e) => setParent({ ...parent, phone: e.target.value })} />
                </label>
                <label className="review-field">
                  <span className="review-field__label">Term *</span>
                  <select value={termKey} onChange={(e) => { setTermKey(e.target.value); clearDates(); }}>
                    {TERMS.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
                  </select>
                </label>
              </div>
            </div>

            <div className="review-card">
              <div className="review-card__head">
                <div className="review-card__title">Choose your Sundays</div>
                <div className={"review-counter" + (enoughDates ? " review-counter--ok" : "")}>
                  {enoughDates
                    ? `${selectedDates.length - 1} class Sundays + 1 make-up · ${selectedDates.length} of ${MAX_SESSION_DATES} selected`
                    : `${selectedDates.length} selected · ${MIN_SESSION_DATES} minimum`}
                </div>
              </div>
              <p className="review-card__note">
                Select {MIN_SESSION_DATES}–{MAX_SESSION_DATES} Sundays for {term.label}. One of them is held as your make-up date. The package price is fixed and does not change with the number of Sundays you schedule.
              </p>

              <div className="review-chip-actions">
                <button type="button" className="review-chip-action" onClick={selectFirstTen}>Select 10 classes + make-up</button>
                <button type="button" className="review-chip-action review-chip-action--clear" onClick={clearDates}>Clear</button>
              </div>

              <div className="review-months">
                {months.map((group) => (
                  <div key={group.month}>
                    <div className="review-month__label">{group.month}</div>
                    <div className="review-month__chips">
                      {group.dates.map((day) => (
                        <button
                          type="button"
                          key={day.iso}
                          className={chipClass(day)}
                          disabled={!!day.unavailable}
                          title={day.unavailable || (selectedDates.includes(day.iso) ? "Selected — click to remove" : "Click to select")}
                          onClick={() => toggleDate(day.iso)}
                        >
                          <span className="review-chip__date">{day.dayLabel}</span>
                          {makeupDate === day.iso && <span className="review-chip__tag">· Make-up</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {enoughDates && (
                <div className="review-makeup">
                  <div className="review-field__label">Make-up date</div>
                  <p className="review-card__note">This Sunday is held in reserve for a missed class. Pick a different one if you prefer.</p>
                  <select value={makeupDate} onChange={(e) => setMakeupDate(e.target.value)}>
                    {selectedDates.map((iso) => <option key={iso} value={iso}>{formatDateShort(iso)}</option>)}
                  </select>
                </div>
              )}
            </div>

            {children.map((child, i) => (
              <div className="review-card" key={i}>
                <div className="review-card__head">
                  <div className="review-card__title">{i === 0 ? "Child's details" : `Additional child ${i + 1}`}</div>
                  {i > 0 && (
                    <button type="button" className="review-remove" onClick={() => setChildren((prev) => prev.filter((_, j) => j !== i))}>Remove</button>
                  )}
                </div>
                <p className="review-card__note">
                  {i === 0
                    ? "Placement is based on age and Mandarin proficiency — we confirm the group after review."
                    : "Each additional child receives $30 off the 10-Session Full-Term Package."}
                </p>
                <div className="review-grid">
                  <label className="review-field">
                    <span className="review-field__label">Child's name *</span>
                    <input type="text" value={child.name} placeholder="Emily Smith" onChange={setChildField(i, "name")} />
                  </label>
                  <label className="review-field">
                    <span className="review-field__label">Age *</span>
                    <input type="text" value={child.age} placeholder="5" onChange={setChildField(i, "age")} />
                  </label>
                  <label className="review-field">
                    <span className="review-field__label">Grade</span>
                    <input type="text" value={child.grade} placeholder="Kindergarten" onChange={setChildField(i, "grade")} />
                  </label>
                  <label className="review-field">
                    <span className="review-field__label">Mandarin experience *</span>
                    <select value={child.experience} onChange={setChildField(i, "experience")}>
                      <option value="">Select one</option>
                      {EXPERIENCE_OPTIONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </label>
                </div>
                <label className="review-field review-field--full">
                  <span className="review-field__label">Learning goals or anything we should know</span>
                  <textarea rows="3" value={child.goals} placeholder="Confidence speaking with grandparents, reading readiness, extra math support…" onChange={setChildField(i, "goals")} />
                </label>
              </div>
            ))}

            <button type="button" className="review-add" onClick={() => setChildren((prev) => [...prev, { ...EMPTY_CHILD }])}>
              + Add another child (−$30 per additional child)
            </button>

            <div className="review-card">
              <div className="review-card__title">Enrollment, make-up &amp; refund policy</div>
              <p className="review-policy">{POLICY_SUMMARY}</p>
              <label className="review-check">
                <input type="checkbox" checked={policyAccepted} onChange={(e) => setPolicyAccepted(e.target.checked)} />
                <span>I have read and accept the enrollment, make-up, and refund policy. *</span>
              </label>
            </div>

            {error && <p className="review-error">{error}</p>}

            <button type="button" className="review-submit" onClick={handleSubmit}>Submit registration</button>
            <p className="review-submit-note">No payment is taken now. We confirm placement and send payment instructions by email.</p>
          </div>

          <aside className="review-summary">
            <div className="review-summary__label">Your selection</div>
            <div className="review-summary__level">{level.name}</div>
            <div className="review-summary__plan">{planTitle(planId)}</div>
            <div className="review-summary__meta">{level.ages} · {level.levelLabel}</div>

            <div className="review-summary__schedule">
              {schedule.map((b, i) => (
                <span className="review-summary__block" key={i}>
                  <span className="review-summary__tick">✓</span>
                  <span className="review-summary__time">{b.time}</span>· {b.label}
                </span>
              ))}
            </div>

            <div className="review-summary__lines">
              <div className="review-summary__line"><span>Package per child</span><span className="review-summary__val">${q.perChild}</span></div>
              <div className="review-summary__line"><span>Children</span><span className="review-summary__val">{children.length}</span></div>
              <div className="review-summary__line"><span>Sundays</span><span className={"review-summary__val" + (enoughDates ? " review-summary__val--green" : "")}>
                {enoughDates ? `${selectedDates.length - 1} class Sundays + 1 make-up` : `${selectedDates.length} of ${MIN_SESSION_DATES} minimum selected`}
              </span></div>
              {q.siblingDiscount > 0 && (
                <div className="review-summary__line"><span>Sibling discount</span><span className="review-summary__val review-summary__val--green">−${q.siblingDiscount}</span></div>
              )}
            </div>

            <div className="review-summary__total">
              <span className="review-summary__total-label">Total due</span>
              <span className="review-summary__total-val">${q.total}</span>
            </div>
            <div className="review-summary__save">You save ${q.packageSavings} vs. single sessions</div>
            <div className="review-summary__fine">
              Sundays at {LOCATION.venue}, {LOCATION.street}. All times {LOCATION.timezone}. Maximum 10 students with 2 teachers per group.
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default EnrollReview;
