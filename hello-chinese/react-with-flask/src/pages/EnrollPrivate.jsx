import { useMemo, useState } from "react";
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
  childName: "",
  dob: "",
  enrolled: "",
  currentClass: "",
  lessonType: "",
  lessonLength: "",
  format: "",
  preferredTime: "",
  specificTimes: "",
  experience: "",
  goals: "",
};

const DAYS = ["Monday", "Friday", "Tuesday", "Saturday", "Wednesday", "Sunday", "Thursday", "Flexible"];

const EXPERIENCE = [
  "No prior Chinese learning experience",
  "Less than 1 year",
  "1–2 years",
  "3+ years",
];

const CURRENT_CLASSES = [
  ["Step-In Chinese (Ages 3-6+)", "Step-In Chinese (Ages 3–6+)"],
  ["Step-Up Chinese (Ages 7-10)", "Step-Up Chinese (Ages 7–10)"],
  ["Step-Beyond Chinese (Ages 10-12+)", "Step-Beyond Chinese (Ages 10–12+)"],
  ["Other / Not Sure", "Other / Not Sure"],
];

const LENGTHS = ["30 Minutes", "60 Minutes", "Not Sure - Please Recommend"];

function ageFrom(dob) {
  if (!dob) return null;
  const b = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(b.getTime())) return null;
  const now = new Date();
  let a = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a -= 1;
  return a >= 0 && a < 100 ? a : null;
}

function Step({ n, children }) {
  return (
    <div className="pstep">
      <span className="pstep__num">{n}</span>
      <h3 className="pstep__title">{children}</h3>
    </div>
  );
}

function EnrollPrivate() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [days, setDays] = useState([]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const age = useMemo(() => ageFrom(form.dob), [form.dob]);

  const onField = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
      // Leaving the group class clears the class pick that only applies to "Yes".
      ...(name === "enrolled" && value === "no" ? { currentClass: "" } : null),
    }));
    setError("");
  };

  const onDayToggle = (e) => {
    const { value, checked } = e.target;
    setDays((d) => (checked ? [...d, value] : d.filter((x) => x !== value)));
    setError("");
  };

  const submitInquiry = async (e) => {
    e.preventDefault();
    if (!form.parentName || !form.email || !form.phone || !form.childName || !form.dob) {
      setError("Please fill in parent name, email, phone, child’s name, and date of birth.");
      return;
    }
    if (!form.lessonType) {
      setError("Please choose what you are looking for from private lessons (A or B).");
      return;
    }
    if (!form.lessonLength) {
      setError("Please choose a preferred lesson length.");
      return;
    }
    const payload = {
      page: "private-lessons-inquiry",
      parentName: form.parentName,
      email: form.email,
      phone: form.phone,
      childName: form.childName,
      dob: form.dob,
      age,
      currentlyEnrolled: form.enrolled || null,
      currentClass: form.enrolled === "yes" ? form.currentClass || null : null,
      lessonType: form.lessonType,
      lessonLength: form.lessonLength,
      format: form.format || null,
      preferredDays: days,
      preferredTime: form.preferredTime || null,
      specificTimes: form.specificTimes || null,
      experience: form.experience || null,
      goals: form.goals || null,
      submittedAt: new Date().toISOString(),
    };
    // TODO: POST payload to the existing Hello Chinese enrollment/contact endpoint.
    console.log("Private lesson inquiry", payload);
    setSubmittedName(form.parentName);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="enroll-overview">
        <NavBar />
        <section className="enroll-header">
          <div className="enroll-header__inner enroll-confirm">
            <div className="enroll-confirm__check">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12.5L9.5 18L20 6" stroke="#e08a7c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="enroll-header__eyebrow">Inquiry received</div>
            <h1 className="enroll-header__title">Thanks, {submittedName}.</h1>
            <p className="enroll-header__desc enroll-confirm__desc">
              Our team will review your child's information and follow up by email to recommend the most
              appropriate lesson structure and schedule.
            </p>
            <NavLink to="/" className="btn-primary">Back to programs</NavLink>
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
        <form className="sat-form pform" onSubmit={submitInquiry}>
          <div className="pform__head">
            <span className="pform__icon" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="8" r="3" />
                <path d="M3.5 19v-1.2A4.3 4.3 0 0 1 7.8 13.5h2.4A4.3 4.3 0 0 1 14.5 17.8V19" />
                <circle cx="17" cy="8.5" r="2.4" />
                <path d="M16 13.6h1.2A3.8 3.8 0 0 1 21 17.4V19" />
              </svg>
            </span>
            <h2 className="pform__title">Private Chinese Lesson Inquiry</h2>
          </div>
          <p className="pform__sub">Flexible One-on-One Chinese Instruction</p>

          <aside className="pintro">
            <span className="pintro__icon" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6.5S10 4.8 6.2 4.8c-1 0-1.7.1-1.7.1v12.7s.7-.1 1.7-.1C10 17.5 12 19.2 12 19.2s2-1.7 5.8-1.7c1 0 1.7.1 1.7.1V4.9s-.7-.1-1.7-.1C14 4.8 12 6.5 12 6.5Z" />
                <path d="M12 6.5v12.7" />
              </svg>
            </span>
            <p>
              Our private lessons use Hello Chinese curriculum and materials and can be tailored to each child's
              learning goals. Current Hello Chinese students may also use private lessons for individualized
              reinforcement of their group-class learning.
            </p>
          </aside>

          {/* 1 — PARENT & CHILD */}
          <Step n="1">Parent &amp; Child Information</Step>
          <div className="sat-form__grid pgrid">
            <label className="field">
              <span className="field__label">Parent / Guardian Name <b className="req">*</b></span>
              <input type="text" name="parentName" value={form.parentName} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">Email <b className="req">*</b></span>
              <input type="email" name="email" placeholder="parent@email.com" value={form.email} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">Phone Number <b className="req">*</b></span>
              <input type="tel" name="phone" value={form.phone} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">Child's Name <b className="req">*</b></span>
              <input type="text" name="childName" value={form.childName} onChange={onField} className="field__input" />
            </label>
            <label className="field">
              <span className="field__label">Date of Birth <b className="req">*</b></span>
              <input type="date" name="dob" value={form.dob} onChange={onField} className="field__input" />
            </label>
            <div className="pdob">
              <span className="pdob__icon" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M9 10.5h.01M15 10.5h.01M9.2 15a3.6 3.6 0 0 0 5.6 0" />
                </svg>
              </span>
              <span>
                {age === null
                  ? "We will use the date of birth to understand your child’s age and recommend the best fit."
                  : `Your child is ${age} years old — we will use this to recommend the best fit.`}
              </span>
            </div>
          </div>

          {/* 2 — CURRENTLY ENROLLED */}
          <Step n="2">Is your child currently enrolled in a Hello Chinese group class?</Step>
          <div className="sat-form__grid pgrid">
            <div className="pradios">
              <label className="pradio">
                <input type="radio" name="enrolled" value="yes" checked={form.enrolled === "yes"} onChange={onField} />
                <span>
                  <span className="pradio__label">Yes</span>
                  <span className="pradio__desc">My child is currently enrolled in a Hello Chinese group class.</span>
                </span>
              </label>
              <label className="pradio">
                <input type="radio" name="enrolled" value="no" checked={form.enrolled === "no"} onChange={onField} />
                <span>
                  <span className="pradio__label">No</span>
                  <span className="pradio__desc">My child is not enrolled in any Hello Chinese group class.</span>
                </span>
              </label>
            </div>
            {form.enrolled === "yes" && (
              <div className="ppanel">
                <div className="ppanel__title">Which class is your child currently enrolled in?</div>
                <div className="ppanel__list">
                  {CURRENT_CLASSES.map(([value, label]) => (
                    <label className="prow" key={value}>
                      <input type="radio" name="currentClass" value={value} checked={form.currentClass === value} onChange={onField} />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3 — WHAT ARE YOU LOOKING FOR */}
          <Step n="3">What are you looking for from private lessons? <b className="req">*</b></Step>
          <div className="sat-form__grid pgrid">
            <label className="pcard pcard--a">
              <input type="radio" name="lessonType" value="Group Class Reinforcement" checked={form.lessonType === "Group Class Reinforcement"} onChange={onField} />
              <span>
                <span className="pcard__head">
                  <span className="pcard__icon" aria-hidden="true">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3.5l1.9 3.9 4.3.6-3.1 3 .8 4.3L12 13.3l-3.9 2 .8-4.3-3.1-3 4.3-.6L12 3.5Z" />
                    </svg>
                  </span>
                  <span className="pcard__title">A. Group Class Reinforcement</span>
                </span>
                <span className="pcard__desc">
                  Personalized support based on your child's current Hello Chinese group class, including review,
                  reading, writing, speaking, homework, and areas that need additional practice.
                </span>
              </span>
            </label>
            <label className="pcard pcard--b">
              <input type="radio" name="lessonType" value="Standalone One-on-One Chinese" checked={form.lessonType === "Standalone One-on-One Chinese"} onChange={onField} />
              <span>
                <span className="pcard__head">
                  <span className="pcard__icon" aria-hidden="true">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 14.5a2.5 2.5 0 0 1-2.5 2.5H9l-4 3V6.5A2.5 2.5 0 0 1 7.5 4h10A2.5 2.5 0 0 1 20 6.5v8Z" />
                    </svg>
                  </span>
                  <span className="pcard__title">B. Standalone One-on-One Chinese</span>
                </span>
                <span className="pcard__desc">
                  A fully personalized one-on-one Chinese learning program using Hello Chinese curriculum and
                  materials, designed for students who are not currently enrolled in our group classes.
                </span>
              </span>
            </label>
          </div>

          {/* 4 + 5 */}
          <div className="pcols">
            <div>
              <Step n="4">Lesson Preference</Step>
              <div className="field__label pblocklabel">Preferred Lesson Length <b className="req">*</b></div>
              <div className="pchips">
                {LENGTHS.map((v) => (
                  <label className="pchip" key={v}>
                    <input type="radio" name="lessonLength" value={v} checked={form.lessonLength === v} onChange={onField} />
                    {v === "Not Sure - Please Recommend" ? "Not Sure – Please Recommend" : v}
                  </label>
                ))}
              </div>
              <label className="field">
                <span className="field__label field__label--split">
                  <span>Preferred Format</span>
                  <span className="field__optional">(optional)</span>
                </span>
                <select name="format" value={form.format} onChange={onField} className="field__input">
                  <option value="">No Preference</option>
                  <option value="Online">Online</option>
                  <option value="In person">In person</option>
                </select>
              </label>
            </div>

            <div>
              <Step n="5">Preferred Schedule</Step>
              <div className="field__label pblocklabel">
                Preferred Days <span className="field__optional">(select all that apply)</span>
              </div>
              <div className="pdays">
                {DAYS.map((d) => (
                  <label className="prow" key={d}>
                    <input type="checkbox" value={d} checked={days.includes(d)} onChange={onDayToggle} />
                    {d}
                  </label>
                ))}
              </div>
              <label className="field">
                <span className="field__label field__label--split">
                  <span>Preferred Time</span>
                  <span className="field__optional">(optional)</span>
                </span>
                <select name="preferredTime" value={form.preferredTime} onChange={onField} className="field__input">
                  <option value="">No Preference</option>
                  <option value="Morning (before 12 PM)">Morning (before 12 PM)</option>
                  <option value="Early afternoon (12-3 PM)">Early afternoon (12–3 PM)</option>
                  <option value="Late afternoon (3-6 PM)">Late afternoon (3–6 PM)</option>
                  <option value="Evening (after 6 PM)">Evening (after 6 PM)</option>
                </select>
              </label>
              <label className="field">
                <span className="field__label field__label--split">
                  <span>Specific preferred time(s)</span>
                  <span className="field__optional">(optional)</span>
                </span>
                <input
                  type="text"
                  name="specificTimes"
                  placeholder="e.g. Tuesdays after 4:00 PM, Saturday mornings"
                  value={form.specificTimes}
                  onChange={onField}
                  className="field__input"
                />
              </label>
            </div>
          </div>

          {/* 6 + 7 */}
          <div className="pcols">
            <div>
              <Step n="6">Chinese Learning Experience</Step>
              <div className="ppanel__list">
                {EXPERIENCE.map((v) => (
                  <label className="prow" key={v}>
                    <input type="radio" name="experience" value={v} checked={form.experience === v} onChange={onField} />
                    {v}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Step n="7">
                Tell Us About Your Child's Learning Goals <span className="field__optional">(optional)</span>
              </Step>
              <textarea
                name="goals"
                rows="5"
                placeholder="Please share any specific goals, areas your child would like to strengthen, school requirements, or anything else that would help us personalize the lesson."
                value={form.goals}
                onChange={onField}
                className="field__input field__input--area pgoals"
              />
            </div>
          </div>

          {error && <p className="sat-form__error">{error}</p>}

          <button type="submit" className="psubmit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 3 10.5 13.5" />
              <path d="M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
            </svg>
            Submit Private Lesson Inquiry
          </button>

          <div className="pfoot">
            <p className="pfoot__note">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
              </svg>
              Once we receive your inquiry, our team will review your child's information and contact you to
              recommend the most appropriate lesson structure and schedule.
            </p>
            <div className="pfoot__brand">
              <img src="/assets/logo-panda.png" alt="Hello Chinese" />
              <span>
                <span className="pfoot__name">Hello Chinese</span>
                <span className="pfoot__tag">Language Learning &amp; Enrichment</span>
              </span>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default EnrollPrivate;
