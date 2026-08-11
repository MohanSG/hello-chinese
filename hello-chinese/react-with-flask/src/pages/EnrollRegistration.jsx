import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { POLICY_SUMMARY, PAYMENT_HELP_NOTE, PRIVACY_SUMMARY, PRIVACY_CONSENT_LABEL, PRIVACY_CONSENT_HINT, COUPON_INVALID_MESSAGE, SIBLING_DISCOUNT, siblingDiscountFor, ageFromDOB, lookupCoupon, couponDiscount, paymentPlan, priceQuote } from "../data/enrollment";
import { readDraft, writeDraft, clearDraft, removeEnrollment, money } from "../data/enrollmentDraft";
import "./EnrollRegistration.css";

const STEPS = [
  { key: "parent", label: "Parent Info" },
  { key: "student", label: "Student Info" },
  { key: "addchild", label: "Add Child?" },
  { key: "review", label: "Review & Submit" },
];

// Steps 5-8: parent information is collected once, then each child gets its own
// student details, and the household is reviewed as a whole before submitting.
export default function EnrollRegistration({ onSubmit }) {
  const [search] = useSearchParams();
  const initial = useMemo(() => readDraft(), []);

  const [parent, setParent] = useState(initial.parent);
  const [enrollments, setEnrollments] = useState(initial.enrollments);
  const [childIndex, setChildIndex] = useState(() => {
    const wanted = Number(search.get("child")) || initial.enrollments.length || 1;
    return Math.min(Math.max(0, wanted - 1), Math.max(0, initial.enrollments.length - 1));
  });
  const parentDone = !!(initial.parent.name && initial.parent.email && initial.parent.phone);
  const [step, setStep] = useState(parentDone ? "student" : "parent");
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [payment, setPayment] = useState("full");
  const [mediaConsent, setMediaConsent] = useState(false);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const todayISO = new Date().toISOString().slice(0, 10);
  const [warning, setWarning] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const persist = (nextParent = parent, nextEnrollments = enrollments) =>
    writeDraft({ parent: nextParent, enrollments: nextEnrollments });

  const updateParent = (field) => (event) => {
    const next = { ...parent, [field]: event.target.value };
    setParent(next);
    setWarning("");
    persist(next, enrollments);
  };

  const updateStudent = (field) => (event) => {
    const value = event.target.value;
    const next = enrollments.map((e, i) =>
      i === childIndex ? { ...e, student: { ...(e.student || {}), [field]: value } } : e);
    setEnrollments(next);
    setWarning("");
    persist(parent, next);
  };

  const removeChild = (i) => {
    const label = enrollments[i]?.student?.name || `Child ${i + 1}`;
    if (!window.confirm(`Remove ${label} from this enrollment?`)) return;
    const next = removeEnrollment(i);
    setEnrollments(next);
    setChildIndex((idx) => Math.min(idx, Math.max(0, next.length - 1)));
    setWarning("");
  };

  const subtotalOf = (e) => {
    const q = priceQuote(e.planId, (e.dates || []).length);
    return q ? q.total : e.subtotal || 0;
  };
  const savingsOf = (e) => {
    const q = priceQuote(e.planId, (e.dates || []).length);
    return q ? q.savings : 0;
  };
  const householdSubtotal = enrollments.reduce((sum, e) => sum + subtotalOf(e), 0);
  const sibling = siblingDiscountFor(enrollments.length);
  const discount = couponDiscount(coupon, householdSubtotal - sibling);
  const householdTotal = householdSubtotal - sibling - discount;
  const packageSavings = enrollments.reduce((sum, e) => sum + savingsOf(e), 0);
  const householdSavings = packageSavings + sibling + discount;
  const installments = paymentPlan(householdTotal);

  const applyCoupon = () => {
    const found = lookupCoupon(couponInput);
    if (!found) { setCoupon(null); setCouponError(COUPON_INVALID_MESSAGE); return; }
    setCoupon(found);
    setCouponInput(found.code);
    setCouponError("");
  };
  const removeCoupon = () => { setCoupon(null); setCouponInput(""); setCouponError(""); };

  const savingsDetail = [
    packageSavings > 0 ? `${money(packageSavings)} package savings` : null,
    sibling > 0 ? `${money(sibling)} sibling discount` : null,
    discount > 0 && coupon ? `${money(discount)} coupon ${coupon.code}` : null,
  ].filter(Boolean).join(" · ");

  if (!enrollments.length) {
    return (
      <main className="reg reg--empty">
        <h1>Let's pick up your enrollment</h1>
        <p>We do not have a plan and Sundays on file yet. Choose a level and plan to begin.</p>
        <Link className="reg__cta" to="/enroll/sunday">Back to Sunday Programs</Link>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="reg reg--done">
        <span className="reg__tick" aria-hidden="true">✓</span>
        <h1>Registration received</h1>
        <p>
          Thank you, {parent.name.split(" ")[0] || "there"}. We have your household enrollment for{" "}
          {enrollments.length === 1 ? "1 child" : `${enrollments.length} children`} and will confirm
          placement by email. No payment is taken now.
        </p>
        <div className="reg__doneTotal">
          <span>Total due after confirmation</span>
          <strong>{money(householdTotal)}</strong>
        </div>
        <Link className="reg__cta" to="/">Back to Programs</Link>
      </main>
    );
  }

  const current = enrollments[childIndex];
  const student = current?.student || {};
  const activeIdx = STEPS.findIndex((s) => s.key === step);

  const goBack = (event) => {
    const prev = { student: "parent", addchild: "student", review: "addchild" }[step];
    if (!prev) return;
    event.preventDefault();
    setWarning("");
    setStep(prev);
  };

  const backLabel = {
    parent: "Back to Choose Your Sundays",
    student: "Back to Parent Information",
    addchild: "Back to Student Information",
    review: "Back to Add Another Child",
  }[step];

  const backTo = step === "parent" && current
    ? `/enroll/sundays?level=${current.levelKey}&plan=${current.planId}&child=${childIndex + 1}`
    : "#";

  const submit = () => {
    const missing = enrollments.find((e) => !e.student?.name || !e.student?.dob || !e.student?.grade);
    if (missing) { setWarning("One child is missing required information. Use Edit to complete it."); return; }
    if (!policyAccepted) { setWarning("Please accept the enrollment and refund policy."); return; }
    const payload = {
      type: "enrollment",
      submittedAt: new Date().toISOString(),
      parent,
      children: enrollments.map((e) => ({
        student: { ...e.student, age: ageFromDOB(e.student?.dob) },
        levelKey: e.levelKey,
        levelName: e.levelName,
        planId: e.planId,
        planName: e.planName,
        schedule: e.schedule,
        sessionDates: e.dates,
        pricing: priceQuote(e.planId, (e.dates || []).length),
      })),
      householdSubtotal,
      coupon: coupon ? { code: coupon.code, label: coupon.label, discount } : null,
      siblingDiscount: sibling,
      packageSavings,
      householdTotal,
      householdSavings,
      payment: payment === "plan"
        ? { method: "plan", installments }
        : { method: "full", amount: householdTotal },
      policyAcknowledged: true,
      privacy: { mediaConsent },
    };
    if (onSubmit) onSubmit(payload);
    clearDraft();
    setWarning("");
    setSubmitted(true);
  };

  return (
    <main className="reg">
      <Link className="reg__back" to={backTo} onClick={goBack}>← {backLabel}</Link>

      <ol className="stepper" aria-label="Registration progress">
        {STEPS.map((s, i) => (
          <li
            key={s.key}
            className={`stepper__item${i < activeIdx ? " stepper__item--done" : ""}${i === activeIdx ? " stepper__item--active" : ""}`}
          >
            <span className="stepper__dot">{i < activeIdx ? "✓" : i + 1}</span>
            <span className="stepper__label">{s.label}</span>
          </li>
        ))}
      </ol>

      {step === "parent" && (
        <>
          <h1 className="reg__title">Parent / Guardian Information</h1>
          <p className="reg__lede">Parent information is shared once and applies to every child in this registration.</p>
          <section className="card">
            <div className="field-grid">
              <label className="field">
                <span>Parent / Guardian name *</span>
                <input type="text" value={parent.name} onChange={updateParent("name")} placeholder="Enter full name" />
              </label>
              <label className="field">
                <span>Email *</span>
                <input type="email" value={parent.email} onChange={updateParent("email")} placeholder="Enter email address" />
              </label>
              <label className="field">
                <span>Phone number *</span>
                <input type="tel" value={parent.phone} onChange={updateParent("phone")} placeholder="(555) 123-4567" />
              </label>
            </div>
            <label className="field field--full">
              <span>Optional notes</span>
              <textarea rows={3} value={parent.notes} onChange={updateParent("notes")} placeholder="Anything we should know?" />
            </label>
          </section>
          {warning && <p className="reg__warning">{warning}</p>}
          <button
            type="button"
            className="reg__primary"
            onClick={() => {
              if (!parent.name.trim() || !parent.email.trim() || !parent.phone.trim()) {
                setWarning("Please add your name, email, and phone number.");
                return;
              }
              persist();
              setStep("student");
            }}
          >
            Continue to Student Information →
          </button>
        </>
      )}

      {step === "student" && (
        <>
          <h1 className="reg__title">
            Student Information{enrollments.length > 1 ? ` — Child ${childIndex + 1}` : ""}
          </h1>
          <p className="reg__lede">Tell us about the child enrolling in this plan.</p>

          <section className="plancard">
            <div className="plancard__level">{current.levelName} Chinese</div>
            <div className="plancard__plan">{current.planName}</div>
            <ul className="plancard__blocks">
              {(current.schedule || []).map((b, i) => (
                <li key={b.time + i}>
                  <span aria-hidden="true">✓</span>
                  <span className="plancard__time">{b.time}</span>
                  <span>· {b.label}</span>
                </li>
              ))}
            </ul>
            <div className="plancard__foot">
              <span>{(current.dates || []).length} Sundays selected</span>
              <strong>Subtotal {money(subtotalOf(current))}</strong>
            </div>
          </section>

          <section className="card">
            <div className="field-grid">
              <label className="field">
                <span>Child name *</span>
                <input type="text" value={student.name || ""} onChange={updateStudent("name")} placeholder="Enter child's full name" />
              </label>
              <label className="field">
                <span>Date of birth *</span>
                <input type="date" value={student.dob || ""} onChange={updateStudent("dob")} max={todayISO} aria-label="Date of birth" aria-describedby="reg-age-hint" />
                <em className="field__derived" id="reg-age-hint">
                  {ageFromDOB(student.dob) === null
                    ? "Age is calculated from the date of birth."
                    : `Age ${ageFromDOB(student.dob)}`}
                </em>
              </label>
              <label className="field">
                <span>Grade *</span>
                <input type="text" value={student.grade || ""} onChange={updateStudent("grade")} placeholder="e.g. 1st Grade" />
              </label>
              <label className="field">
                <span>School <em>(optional)</em></span>
                <input type="text" value={student.school || ""} onChange={updateStudent("school")} placeholder="Enter school name" />
              </label>
            </div>
            <label className="field field--full">
              <span>Chinese learning background <em>(optional)</em></span>
              <select value={student.background || ""} onChange={updateStudent("background")}>
                <option value="">Select background level</option>
                <option value="none">No prior Chinese</option>
                <option value="home">Spoken at home</option>
                <option value="some">Some experience</option>
                <option value="year">1+ year of classes</option>
                <option value="fluent">Reads and writes confidently</option>
              </select>
            </label>
          </section>

          {warning && <p className="reg__warning">{warning}</p>}
          <button
            type="button"
            className="reg__primary"
            onClick={() => {
              if (!student.name || !student.dob || !student.grade) {
                setWarning("Please add the child's name, date of birth, and grade.");
                return;
              }
              if (ageFromDOB(student.dob) === null) {
                setWarning("Please check the date of birth — it cannot be in the future.");
                return;
              }
              persist();
              setStep("addchild");
            }}
          >
            Continue →
          </button>
        </>
      )}

      {step === "addchild" && (
        <>
          <h1 className="reg__title">Add another child?</h1>
          <p className="reg__lede">One parent can register multiple students. Each child's enrollment is independent.</p>
          <section className="card">
            <h2 className="card__title">Would you like to enroll another child?</h2>
            <p className="card__text">
              Each additional child chooses their own level, plan, and Sundays, and receives a separate
              subtotal. You will not need to re-enter parent information.
            </p>
            <div className="choice">
              <button type="button" className="choice__no" onClick={() => setStep("review")}>No, Continue</button>
              <Link
                className="choice__yes"
                to={`/enroll/sunday?child=${enrollments.length + 1}`}
                onClick={() => persist()}
              >
                Yes, Add Another Child
              </Link>
            </div>
          </section>
          <p className="reg__hint">
            Enrolled so far: {enrollments.map((e, i) => e.student?.name || `Child ${i + 1}`).join(", ")} ·
            Household total {money(householdTotal)}
          </p>
        </>
      )}

      {step === "review" && (
        <>
          <h1 className="reg__title">Final Review &amp; Submit</h1>
          <p className="reg__lede">Check every detail below, then submit your household registration.</p>

          <section className="card">
            <div className="card__head">
              <h2 className="card__title">Parent / Guardian Information</h2>
              <button type="button" className="edit" onClick={() => setStep("parent")}>Edit</button>
            </div>
            <dl className="sumlist">
              <div><dt>Name</dt><dd>{parent.name}</dd></div>
              <div><dt>Email</dt><dd>{parent.email}</dd></div>
              <div><dt>Phone</dt><dd>{parent.phone}</dd></div>
            </dl>
          </section>

          {enrollments.map((e, i) => (
            <section className="card" key={i}>
              <div className="card__head">
                <h2 className="card__title">Child {i + 1} Enrollment Summary</h2>
                <div className="card__actions">
                  <button type="button" className="edit" onClick={() => { setChildIndex(i); setStep("student"); }}>Edit</button>
                  {enrollments.length > 1 && (
                    <button
                      type="button"
                      className="remove"
                      title="Remove this child"
                      aria-label={`Remove ${e.student?.name || `Child ${i + 1}`}`}
                      onClick={() => removeChild(i)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              <dl className="sumlist">
                <div>
                  <dt>Student</dt>
                  <dd>
                    {[e.student?.name || "Name pending", ageFromDOB(e.student?.dob) !== null && `Age ${ageFromDOB(e.student.dob)}`, e.student?.grade, e.student?.school]
                      .filter(Boolean)
                      .join(" · ")}
                  </dd>
                </div>
                <div><dt>Program</dt><dd>{e.levelName} · {e.planName}</dd></div>
                <div><dt>Schedule</dt><dd>{(e.schedule || []).map((b) => `${b.time} ${b.label}`).join(" · ")}</dd></div>
                <div><dt>Sundays</dt><dd>{(e.dates || []).length} selected</dd></div>
                <div><dt>Subtotal</dt><dd><strong>{money(subtotalOf(e))}</strong></dd></div>
              </dl>
            </section>
          ))}

          <section className="household">
            <div className="household__eyebrow">Household total</div>
            <dl className="household__list">
              {enrollments.map((e, i) => (
                <div key={i}>
                  <dt>{e.student?.name || `Child ${i + 1}`}</dt>
                  <dd>{money(subtotalOf(e))}</dd>
                </div>
              ))}
            </dl>
            <div className="coupon">
              <input
                type="text"
                className="coupon__input"
                placeholder="Coupon code"
                value={couponInput}
                onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyCoupon(); } }}
              />
              <button type="button" className="coupon__btn" onClick={applyCoupon}>Apply</button>
            </div>
            {coupon && (
              <p className="coupon__applied">
                {coupon.code} applied &mdash; {coupon.label}
                <button type="button" className="coupon__remove" onClick={removeCoupon}>Remove</button>
              </p>
            )}
            {couponError && <p className="coupon__error">{couponError}</p>}
            {(coupon || sibling > 0) && (
              <div className="household__sub">
                <span>Subtotal</span><span>{money(householdSubtotal)}</span>
              </div>
            )}
            {sibling > 0 && (
              <div className="household__sub household__sub--off">
                <span>Sibling discount ({enrollments.length} children)</span><span>&minus;{money(sibling)}</span>
              </div>
            )}
            {coupon && (
              <div className="household__sub household__sub--off">
                <span>Coupon ({coupon.code})</span><span>&minus;{money(discount)}</span>
              </div>
            )}
            <div className="household__total">
              <span>Total due</span>
              <strong>{money(householdTotal)}</strong>
            </div>
            {householdSavings > 0 && (
              <div className="savings">
                <span className="savings__amount">You save {money(householdSavings)}</span>
                <span className="savings__detail">{savingsDetail}</span>
              </div>
            )}
            <p className="household__note">
              {enrollments.length < 2
                ? `All rates are per student. Enroll a second child and the household saves ${money(SIBLING_DISCOUNT)} more.`
                : "All rates are per student. Package and sibling savings are applied automatically."}
            </p>
          </section>

          <section className="card">
            <h2 className="card__title">How would you like to pay?</h2>
            <div className="pay">
              <label className={`pay__opt${payment === "full" ? " pay__opt--on" : ""}`}>
                <input type="radio" name="payment" checked={payment === "full"} onChange={() => setPayment("full")} />
                <span className="pay__body">
                  <span className="pay__name">Pay in full</span>
                  <span className="pay__meta">One payment before the first Sunday</span>
                </span>
                <span className="pay__amount">{money(householdTotal)}</span>
              </label>
              <label className={`pay__opt${payment === "plan" ? " pay__opt--on" : ""}`}>
                <input type="radio" name="payment" checked={payment === "plan"} onChange={() => setPayment("plan")} />
                <span className="pay__body">
                  <span className="pay__name">Payment plan — 3 months</span>
                  <span className="pay__meta">September, October, and November · no fees</span>
                </span>
                <span className="pay__amount">{money(installments[1].amount)}<em>/mo</em></span>
              </label>
            </div>
            {payment === "plan" && (
              <ul className="split">
                {installments.map((p) => (
                  <li key={p.due}>
                    <span className="split__month">{p.label}</span>
                    <span className="split__due">Due {p.due}</span>
                    <strong>{money(p.amount)}</strong>
                  </li>
                ))}
              </ul>
            )}
            <p className="pay__help">{PAYMENT_HELP_NOTE}</p>
          </section>

          <section className="card">
            <h2 className="card__title">Enrollment &amp; refund policy</h2>
            <p className="card__text">{POLICY_SUMMARY}</p>
            <label className="policy">
              <input type="checkbox" checked={policyAccepted} onChange={() => { setPolicyAccepted((v) => !v); setWarning(""); }} />
              <span>I have read and accept the enrollment and refund policy. *</span>
            </label>
          </section>

          <section className="card">
            <h2 className="card__title">Your child&rsquo;s privacy</h2>
            <p className="card__text">{PRIVACY_SUMMARY}</p>
            <label className="policy">
              <input type="checkbox" checked={mediaConsent} onChange={() => setMediaConsent((v) => !v)} />
              <span>
                {PRIVACY_CONSENT_LABEL}
                <em className="policy__hint">{PRIVACY_CONSENT_HINT}</em>
              </span>
            </label>
          </section>

          {warning && <p className="reg__warning">{warning}</p>}
          <button type="button" className="reg__primary" onClick={submit}>Submit Registration</button>
          <p className="reg__hint reg__hint--center">
            No payment is taken now. We confirm placement and send payment instructions by email.
          </p>
        </>
      )}
    </main>
  );
}
