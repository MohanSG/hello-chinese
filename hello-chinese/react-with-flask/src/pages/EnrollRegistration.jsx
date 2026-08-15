import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  PLANS,
  SIBLING_DISCOUNT,
  siblingDiscountFor,
  ageFromDOB,
  lookupCoupon,
  couponDiscount,
  paymentSchedule,
  priceQuote,
} from "../data/enrollment";
import {
  readDraft,
  writeDraft,
  clearDraft,
  removeEnrollment,
  money,
} from "../data/enrollmentDraft";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import LegalModal from "../components/LegalModal";
import { LEGAL_VERSION } from "../data/legal";
import { apiRequest } from "../api/client";
import { useLanguage } from "../i18n/LanguageContext";
import "./EnrollRegistration.css";

// Copy lives in i18n/translations.js under enrollReg. Steps carry only a key.
const STEPS = [
  { key: "parent", labelKey: "stepParent" },
  { key: "student", labelKey: "stepStudent" },
  { key: "addchild", labelKey: "stepAddChild" },
  { key: "review", labelKey: "stepReview" },
];

// Steps 5-8: parent information is collected once, then each child gets its own
// student details, and the household is reviewed as a whole before submitting.
export default function EnrollRegistration({ onSubmit }) {
  const [search] = useSearchParams();
  const { t, lang, locale } = useLanguage();
  const initial = useMemo(() => readDraft(), []);

  const [parent, setParent] = useState(initial.parent);
  const [enrollments, setEnrollments] = useState(initial.enrollments);
  const [childIndex, setChildIndex] = useState(() => {
    const wanted =
      Number(search.get("child")) || initial.enrollments.length || 1;
    return Math.min(
      Math.max(0, wanted - 1),
      Math.max(0, initial.enrollments.length - 1),
    );
  });
  const parentDone = !!(
    initial.parent.name &&
    initial.parent.email &&
    initial.parent.phone
  );
  const [step, setStep] = useState(parentDone ? "student" : "parent");
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [payment, setPayment] = useState("full");
  const [mediaConsent, setMediaConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  // null when closed, otherwise the tab the parent asked for.
  const [legalTab, setLegalTab] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState(null);
  // Warnings and the coupon error are held as { code, vars } so they re-render
  // in the active language if a parent switches mid-form.
  const [couponError, setCouponError] = useState(null);
  const todayISO = new Date().toISOString().slice(0, 10);
  const [warning, setWarning] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  // True while the send is in flight, so the button can lock itself.
  const [sending, setSending] = useState(false);

  const msg = (info) => (info ? t(`enrollReg.${info.code}`, info.vars) : "");
  const childLabel = (e, i) =>
    e?.student?.name || t("enrollReg.childFallback", { n: i + 1 });
  const joinMonths = (names) => {
    if (!names || !names.length) return "";
    if (lang === "zh") return names.join("、");
    if (names.length === 1) return names[0];
    return (
      names.slice(0, -1).join(", ") +
      (names.length === 2 ? " and " : ", and ") +
      names[names.length - 1]
    );
  };

  const persist = (nextParent = parent, nextEnrollments = enrollments) =>
    writeDraft({ parent: nextParent, enrollments: nextEnrollments });

  const updateParent = (field) => (event) => {
    const next = { ...parent, [field]: event.target.value };
    setParent(next);
    setWarning(null);
    persist(next, enrollments);
  };

  const updateStudent = (field) => (event) => {
    const value = event.target.value;
    const next = enrollments.map((e, i) =>
      i === childIndex
        ? { ...e, student: { ...(e.student || {}), [field]: value } }
        : e,
    );
    setEnrollments(next);
    setWarning(null);
    persist(parent, next);
  };

  const removeChild = (i) => {
    const label = childLabel(enrollments[i], i);
    if (!window.confirm(t("enrollReg.removeConfirm", { name: label }))) return;
    const next = removeEnrollment(i);
    setEnrollments(next);
    setChildIndex((idx) => Math.min(idx, Math.max(0, next.length - 1)));
    setWarning(null);
  };

  const subtotalOf = (e) => {
    const q = priceQuote(e.planId, (e.dates || []).length);
    return q ? q.total : e.subtotal || 0;
  };
  const savingsOf = (e) => {
    const q = priceQuote(e.planId, (e.dates || []).length);
    return q ? q.savings : 0;
  };
  const householdSubtotal = enrollments.reduce(
    (sum, e) => sum + subtotalOf(e),
    0,
  );
  const sibling = siblingDiscountFor(enrollments.length);
  const discount = couponDiscount(coupon, householdSubtotal - sibling);
  const householdTotal = householdSubtotal - sibling - discount;
  const packageSavings = enrollments.reduce((sum, e) => sum + savingsOf(e), 0);
  const householdSavings = packageSavings + sibling + discount;
  const schedule = paymentSchedule(
    householdTotal,
    new Date(),
    undefined,
    locale,
  );
  const installments = schedule.installments;
  const planClosed = !schedule.available;
  // A closed plan falls back to paying in full.
  const payMethod = planClosed ? "full" : payment;
  const monthsLabel = joinMonths(schedule.monthNames);
  const lengthLabel = t(
    schedule.count === 1 ? "enrollReg.payMonthsOne" : "enrollReg.payMonthsMany",
    {
      n: schedule.count,
    },
  );

  const applyCoupon = () => {
    const found = lookupCoupon(couponInput);
    if (!found) {
      setCoupon(null);
      setCouponError({ code: "couponInvalid", vars: {} });
      return;
    }
    setCoupon(found);
    setCouponInput(found.code);
    setCouponError(null);
  };
  const removeCoupon = () => {
    setCoupon(null);
    setCouponInput("");
    setCouponError(null);
  };

  const savingsDetail = [
    packageSavings > 0
      ? t("enrollReg.savePackage", { amount: money(packageSavings) })
      : null,
    sibling > 0 ? t("enrollReg.saveSibling", { amount: money(sibling) }) : null,
    discount > 0 && coupon
      ? t("enrollReg.saveCoupon", {
          amount: money(discount),
          code: coupon.code,
        })
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  if (!enrollments.length) {
    return (
      <>
        <NavBar />
        <main className="reg reg--empty">
          <h1>{t("enrollReg.emptyTitle")}</h1>
          <p>{t("enrollReg.emptyDesc")}</p>
          <Link className="reg__cta" to="/enroll/sunday">
            {t("enrollReg.emptyCta")}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  if (submitted) {
    const childCount =
      enrollments.length === 1
        ? t("enrollReg.childCountOne")
        : t("enrollReg.childCountMany", { n: enrollments.length });
    return (
      <>
        <NavBar />
        <main className="reg reg--done">
          <span className="reg__tick" aria-hidden="true">
            ✓
          </span>
          <h1>{t("enrollReg.doneTitle")}</h1>
          <p>
            {t("enrollReg.doneBody", {
              name: parent.name.split(" ")[0] || t("enrollReg.doneThere"),
              children: childCount,
            })}
          </p>
          <div className="reg__doneTotal">
            <span>{t("enrollReg.doneTotalLabel")}</span>
            <strong>{money(householdTotal)}</strong>
          </div>
          <Link className="reg__cta" to="/">
            {t("enrollReg.doneCta")}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const current = enrollments[childIndex];
  const student = current?.student || {};
  const activeIdx = STEPS.findIndex((s) => s.key === step);

  const goBack = (event) => {
    const prev = { student: "parent", addchild: "student", review: "addchild" }[
      step
    ];
    if (!prev) return;
    event.preventDefault();
    setWarning(null);
    setStep(prev);
  };

  const backLabel = t(
    {
      parent: "enrollReg.backToSundays",
      student: "enrollReg.backToParent",
      addchild: "enrollReg.backToStudent",
      review: "enrollReg.backToAddChild",
    }[step],
  );

  const backTo =
    step === "parent" && current
      ? `/enroll/sundays?level=${current.levelKey}&plan=${current.planId}&child=${childIndex + 1}`
      : "#";

  const submit = async (e) => {
    const missing = enrollments.find(
      (e) => !e.student?.name || !e.student?.dob || !e.student?.grade,
    );
    if (missing) {
      setWarning({ code: "warnMissingChild", vars: {} });
      return;
    }
    if (!policyAccepted) {
      setWarning({ code: "warnPolicy", vars: {} });
      return;
    }
    if (!termsAccepted) {
      setWarning({ code: "warnTerms", vars: {} });
      return;
    }
    const payload = {
      type: "enrollment",
      submittedAt: new Date().toISOString(),
      // Recorded so the confirmation email can be sent in the language the
      // family actually enrolled in.
      language: lang,
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
      coupon: coupon
        ? { code: coupon.code, label: coupon.label, discount }
        : null,
      siblingDiscount: sibling,
      packageSavings,
      householdTotal,
      householdSavings,
      payment:
        payMethod === "plan"
          ? { method: "plan", installments }
          : { method: "full", amount: householdTotal },
      policyAcknowledged: true,
      // Which version of the published document the family agreed to.
      termsAccepted: true,
      termsVersion: LEGAL_VERSION,
      privacy: { mediaConsent },
    };
    // The draft is only cleared once the send succeeds, so a failed submit
    // leaves the family's answers intact and they can retry.
    setSending(true);
    try {
      await apiRequest("/sunday-registration-email", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (err) {
      setWarning({ code: "warnSend", vars: {} });
      setSending(false);
      return;
    }
    setSending(false);
    if (onSubmit) onSubmit(payload);
    clearDraft();
    setWarning(null);
    setSubmitted(true);
  };

  return (
    <>
      <NavBar />
      <main className="reg">
        <Link className="reg__back" to={backTo} onClick={goBack}>
          ← {backLabel}
        </Link>

        <ol className="stepper" aria-label={t("enrollReg.stepperAria")}>
          {STEPS.map((s, i) => (
            <li
              key={s.key}
              className={`stepper__item${i < activeIdx ? " stepper__item--done" : ""}${i === activeIdx ? " stepper__item--active" : ""}`}
            >
              <span className="stepper__dot">
                {i < activeIdx ? "✓" : i + 1}
              </span>
              <span className="stepper__label">
                {t(`enrollReg.${s.labelKey}`)}
              </span>
            </li>
          ))}
        </ol>

        {step === "parent" && (
          <>
            <h1 className="reg__title">{t("enrollReg.parentTitle")}</h1>
            <p className="reg__lede">{t("enrollReg.parentLede")}</p>
            <section className="card">
              <div className="field-grid">
                <label className="field">
                  <span>{t("enrollReg.parentName")}</span>
                  <input
                    type="text"
                    value={parent.name}
                    onChange={updateParent("name")}
                    placeholder={t("enrollReg.parentNamePlaceholder")}
                  />
                </label>
                <label className="field">
                  <span>{t("enrollReg.parentEmail")}</span>
                  <input
                    type="email"
                    value={parent.email}
                    onChange={updateParent("email")}
                    placeholder={t("enrollReg.parentEmailPlaceholder")}
                  />
                </label>
                <label className="field">
                  <span>{t("enrollReg.parentPhone")}</span>
                  <input
                    type="tel"
                    value={parent.phone}
                    onChange={updateParent("phone")}
                    placeholder={t("enrollReg.parentPhonePlaceholder")}
                  />
                </label>
              </div>
              <label className="field field--full">
                <span>{t("enrollReg.parentNotes")}</span>
                <textarea
                  rows={3}
                  value={parent.notes}
                  onChange={updateParent("notes")}
                  placeholder={t("enrollReg.parentNotesPlaceholder")}
                />
              </label>
            </section>
            <section className="card">
              <h2 className="card__title">{t("enrollReg.termsTitle")}</h2>
              <p className="card__text">{t("enrollReg.termsLede")}</p>
              <label className="policy">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => {
                    setTermsAccepted((v) => !v);
                    setWarning(null);
                  }}
                />
                <span>
                  {t("enrollReg.termsAgreePre")}{" "}
                  <button
                    type="button"
                    className="policy__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setLegalTab("terms");
                    }}
                  >
                    {t("legal.termsTab")}
                  </button>{" "}
                  {t("enrollReg.termsAgreeMid")}{" "}
                  <button
                    type="button"
                    className="policy__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setLegalTab("privacy");
                    }}
                  >
                    {t("legal.privacyTab")}
                  </button>
                  {t("enrollReg.termsAgreePost")}
                </span>
              </label>
            </section>

            {warning && <p className="reg__warning">{msg(warning)}</p>}
            <button
              type="button"
              className="reg__primary"
              onClick={() => {
                if (
                  !parent.name.trim() ||
                  !parent.email.trim() ||
                  !parent.phone.trim()
                ) {
                  setWarning({ code: "warnParentFields", vars: {} });
                  return;
                }
                persist();
                setStep("student");
              }}
            >
              {t("enrollReg.parentContinue")}
            </button>
          </>
        )}

        {step === "student" && (
          <>
            <h1 className="reg__title">
              {enrollments.length > 1
                ? t("enrollReg.studentTitleChild", { n: childIndex + 1 })
                : t("enrollReg.studentTitle")}
            </h1>
            <p className="reg__lede">{t("enrollReg.studentLede")}</p>

            <section className="plancard">
              <div className="plancard__level">
                {t(`enrollData.levelName.${current.levelKey}`)}
                {current.levelKey !== "math"
                  ? ` ${t("enrollPlans.titleSuffix")}`
                  : ""}
              </div>
              <div className="plancard__plan">
                {t("enrollDates.planTitle", {
                  order: PLANS[current.planId]
                    ? PLANS[current.planId].order
                    : current.planId,
                  name: t(`enrollData.planName.${current.planId}`),
                })}
              </div>
              <ul className="plancard__blocks">
                {(current.schedule || []).map((b, i) => (
                  <li key={b.time + i}>
                    <span aria-hidden="true">✓</span>
                    <span className="plancard__time">{b.time}</span>
                    <span>
                      ·{" "}
                      {b.labelKey
                        ? t(`enrollData.slot.${b.labelKey}`)
                        : b.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="plancard__foot">
                <span>
                  {t("enrollReg.sundaysSelected", {
                    n: (current.dates || []).length,
                  })}
                </span>
                <strong>
                  {t("enrollReg.subtotalLabel", {
                    amount: money(subtotalOf(current)),
                  })}
                </strong>
              </div>
            </section>

            <section className="card">
              <div className="field-grid">
                <label className="field">
                  <span>{t("enrollReg.childName")}</span>
                  <input
                    type="text"
                    value={student.name || ""}
                    onChange={updateStudent("name")}
                    placeholder={t("enrollReg.childNamePlaceholder")}
                  />
                </label>
                <label className="field">
                  <span>{t("enrollReg.dob")}</span>
                  <input
                    type="date"
                    value={student.dob || ""}
                    onChange={updateStudent("dob")}
                    max={todayISO}
                    aria-label={t("enrollReg.dob")}
                    aria-describedby="reg-age-hint"
                  />
                  <em className="field__derived" id="reg-age-hint">
                    {ageFromDOB(student.dob) === null
                      ? t("enrollReg.dobHint")
                      : t("enrollReg.ageValue", {
                          age: ageFromDOB(student.dob),
                        })}
                  </em>
                </label>
                <label className="field">
                  <span>{t("enrollReg.grade")}</span>
                  <input
                    type="text"
                    value={student.grade || ""}
                    onChange={updateStudent("grade")}
                    placeholder={t("enrollReg.gradePlaceholder")}
                  />
                </label>
                <label className="field">
                  <span>
                    {t("enrollReg.school")} <em>{t("enrollReg.optional")}</em>
                  </span>
                  <input
                    type="text"
                    value={student.school || ""}
                    onChange={updateStudent("school")}
                    placeholder={t("enrollReg.schoolPlaceholder")}
                  />
                </label>
              </div>
              <label className="field field--full">
                <span>
                  {t("enrollReg.background")} <em>{t("enrollReg.optional")}</em>
                </span>
                <select
                  value={student.background || ""}
                  onChange={updateStudent("background")}
                >
                  <option value="">{t("enrollReg.backgroundSelect")}</option>
                  <option value="none">{t("enrollReg.backgroundNone")}</option>
                  <option value="home">{t("enrollReg.backgroundHome")}</option>
                  <option value="some">{t("enrollReg.backgroundSome")}</option>
                  <option value="year">{t("enrollReg.backgroundYear")}</option>
                  <option value="fluent">
                    {t("enrollReg.backgroundFluent")}
                  </option>
                </select>
              </label>
            </section>

            <section className="card">
              <h2 className="card__title">{t("enrollReg.termsTitle")}</h2>
              <p className="card__text">{t("enrollReg.termsLede")}</p>
              <label className="policy">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => {
                    setTermsAccepted((v) => !v);
                    setWarning(null);
                  }}
                />
                <span>
                  {t("enrollReg.termsAgreePre")}{" "}
                  <button
                    type="button"
                    className="policy__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setLegalTab("terms");
                    }}
                  >
                    {t("legal.termsTab")}
                  </button>{" "}
                  {t("enrollReg.termsAgreeMid")}{" "}
                  <button
                    type="button"
                    className="policy__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setLegalTab("privacy");
                    }}
                  >
                    {t("legal.privacyTab")}
                  </button>
                  {t("enrollReg.termsAgreePost")}
                </span>
              </label>
            </section>

            {warning && <p className="reg__warning">{msg(warning)}</p>}
            <button
              type="button"
              className="reg__primary"
              onClick={() => {
                if (!student.name || !student.dob || !student.grade) {
                  setWarning({ code: "warnStudentFields", vars: {} });
                  return;
                }
                if (ageFromDOB(student.dob) === null) {
                  setWarning({ code: "warnDob", vars: {} });
                  return;
                }
                persist();
                setStep("addchild");
              }}
            >
              {t("enrollReg.continue")}
            </button>
          </>
        )}

        {step === "addchild" && (
          <>
            <h1 className="reg__title">{t("enrollReg.addChildTitle")}</h1>
            <p className="reg__lede">{t("enrollReg.addChildLede")}</p>
            <section className="card">
              <h2 className="card__title">{t("enrollReg.addChildQuestion")}</h2>
              <p className="card__text">{t("enrollReg.addChildText")}</p>
              <div className="choice">
                <button
                  type="button"
                  className="choice__no"
                  onClick={() => setStep("review")}
                >
                  {t("enrollReg.addChildNo")}
                </button>
                <Link
                  className="choice__yes"
                  to={`/enroll/sunday?child=${enrollments.length + 1}`}
                  onClick={() => persist()}
                >
                  {t("enrollReg.addChildYes")}
                </Link>
              </div>
            </section>
            <p className="reg__hint">
              {t("enrollReg.enrolledSoFar", {
                names: enrollments.map((e, i) => childLabel(e, i)).join(", "),
                amount: money(householdTotal),
              })}
            </p>
          </>
        )}

        {step === "review" && (
          <>
            <h1 className="reg__title">{t("enrollReg.reviewTitle")}</h1>
            <p className="reg__lede">{t("enrollReg.reviewLede")}</p>

            <section className="card">
              <div className="card__head">
                <h2 className="card__title">{t("enrollReg.parentTitle")}</h2>
                <button
                  type="button"
                  className="edit"
                  onClick={() => setStep("parent")}
                >
                  {t("enrollReg.edit")}
                </button>
              </div>
              <dl className="sumlist">
                <div>
                  <dt>{t("enrollReg.fieldName")}</dt>
                  <dd>{parent.name}</dd>
                </div>
                <div>
                  <dt>{t("enrollReg.fieldEmail")}</dt>
                  <dd>{parent.email}</dd>
                </div>
                <div>
                  <dt>{t("enrollReg.fieldPhone")}</dt>
                  <dd>{parent.phone}</dd>
                </div>
              </dl>
            </section>

            {enrollments.map((e, i) => (
              <section className="card" key={i}>
                <div className="card__head">
                  <h2 className="card__title">
                    {t("enrollReg.childSummary", { n: i + 1 })}
                  </h2>
                  <div className="card__actions">
                    <button
                      type="button"
                      className="edit"
                      onClick={() => {
                        setChildIndex(i);
                        setStep("student");
                      }}
                    >
                      {t("enrollReg.edit")}
                    </button>
                    {enrollments.length > 1 && (
                      <button
                        type="button"
                        className="remove"
                        title={t("enrollReg.removeTitle")}
                        aria-label={t("enrollReg.removeAria", {
                          name: childLabel(e, i),
                        })}
                        onClick={() => removeChild(i)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
                <dl className="sumlist">
                  <div>
                    <dt>{t("enrollReg.fieldStudent")}</dt>
                    <dd>
                      {[
                        e.student?.name || t("enrollReg.namePending"),
                        ageFromDOB(e.student?.dob) !== null &&
                          t("enrollReg.ageValue", {
                            age: ageFromDOB(e.student.dob),
                          }),
                        e.student?.grade,
                        e.student?.school,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </dd>
                  </div>
                  <div>
                    <dt>{t("enrollReg.fieldProgram")}</dt>
                    <dd>
                      {t(`enrollData.levelName.${e.levelKey}`)} ·{" "}
                      {t(`enrollData.planName.${e.planId}`)}
                    </dd>
                  </div>
                  <div>
                    <dt>{t("enrollReg.fieldSchedule")}</dt>
                    <dd>
                      {(e.schedule || [])
                        .map(
                          (b) =>
                            `${b.time} ${b.labelKey ? t(`enrollData.slot.${b.labelKey}`) : b.label}`,
                        )
                        .join(" · ")}
                    </dd>
                  </div>
                  <div>
                    <dt>{t("enrollReg.fieldSundays")}</dt>
                    <dd>
                      {t("enrollReg.countSelected", {
                        n: (e.dates || []).length,
                      })}
                    </dd>
                  </div>
                  <div>
                    <dt>{t("enrollReg.fieldSubtotal")}</dt>
                    <dd>
                      <strong>{money(subtotalOf(e))}</strong>
                    </dd>
                  </div>
                </dl>
              </section>
            ))}

            <section className="household">
              <div className="household__eyebrow">
                {t("enrollReg.householdEyebrow")}
              </div>
              <dl className="household__list">
                {enrollments.map((e, i) => (
                  <div key={i}>
                    <dt>{childLabel(e, i)}</dt>
                    <dd>{money(subtotalOf(e))}</dd>
                  </div>
                ))}
              </dl>
              <div className="coupon">
                <input
                  type="text"
                  className="coupon__input"
                  placeholder={t("enrollReg.couponPlaceholder")}
                  value={couponInput}
                  onChange={(ev) => {
                    setCouponInput(ev.target.value);
                    setCouponError(null);
                  }}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter") {
                      ev.preventDefault();
                      applyCoupon();
                    }
                  }}
                />
                <button
                  type="button"
                  className="coupon__btn"
                  onClick={applyCoupon}
                >
                  {t("enrollReg.couponApply")}
                </button>
              </div>
              {coupon && (
                <p className="coupon__applied">
                  {t("enrollReg.couponAppliedLine", {
                    code: coupon.code,
                    label: coupon.labelKey
                      ? t(`enrollReg.${coupon.labelKey}`)
                      : coupon.label,
                  })}
                  <button
                    type="button"
                    className="coupon__remove"
                    onClick={removeCoupon}
                  >
                    {t("enrollReg.couponRemove")}
                  </button>
                </p>
              )}
              {couponError && (
                <p className="coupon__error">{msg(couponError)}</p>
              )}
              {(coupon || sibling > 0) && (
                <div className="household__sub">
                  <span>{t("enrollReg.subtotal")}</span>
                  <span>{money(householdSubtotal)}</span>
                </div>
              )}
              {sibling > 0 && (
                <div className="household__sub household__sub--off">
                  <span>
                    {t("enrollReg.siblingDiscount", { n: enrollments.length })}
                  </span>
                  <span>&minus;{money(sibling)}</span>
                </div>
              )}
              {coupon && (
                <div className="household__sub household__sub--off">
                  <span>{t("enrollReg.couponRow", { code: coupon.code })}</span>
                  <span>&minus;{money(discount)}</span>
                </div>
              )}
              <div className="household__total">
                <span>{t("enrollReg.totalDue")}</span>
                <strong>{money(householdTotal)}</strong>
              </div>
              {householdSavings > 0 && (
                <div className="savings">
                  <span className="savings__amount">
                    {t("enrollReg.youSave", {
                      amount: money(householdSavings),
                    })}
                  </span>
                  <span className="savings__detail">{savingsDetail}</span>
                </div>
              )}
              <p className="household__note">
                {enrollments.length < 2
                  ? t("enrollReg.householdNoteOne", {
                      amount: money(SIBLING_DISCOUNT),
                    })
                  : t("enrollReg.householdNoteMany")}
              </p>
            </section>

            <section className="card">
              <h2 className="card__title">{t("enrollReg.payTitle")}</h2>
              <div className="pay">
                <label
                  className={`pay__opt${payMethod === "full" ? " pay__opt--on" : ""}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payMethod === "full"}
                    onChange={() => setPayment("full")}
                  />
                  <span className="pay__body">
                    <span className="pay__name">{t("enrollReg.payFull")}</span>
                    <span className="pay__meta">
                      {t("enrollReg.payFullMeta")}
                    </span>
                  </span>
                  <span className="pay__amount">{money(householdTotal)}</span>
                </label>
                <label
                  className={`pay__opt${payMethod === "plan" ? " pay__opt--on" : ""}${planClosed ? " pay__opt--off" : ""}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payMethod === "plan"}
                    disabled={planClosed}
                    onChange={() => setPayment("plan")}
                  />
                  <span className="pay__body">
                    <span className="pay__name">
                      {planClosed
                        ? t("enrollReg.payPlanUnavailable")
                        : t("enrollReg.payPlan", { months: lengthLabel })}
                    </span>
                    <span className="pay__meta">
                      {planClosed
                        ? t("enrollReg.payPlanClosedMeta")
                        : t("enrollReg.payPlanMeta", { months: monthsLabel })}
                    </span>
                  </span>
                  <span className="pay__amount">
                    {money(
                      installments.length
                        ? installments[installments.length - 1].amount
                        : 0,
                    )}
                    <em>{t("enrollReg.perMonth")}</em>
                  </span>
                </label>
              </div>
              {payMethod === "plan" && (
                <ul className="split">
                  {installments.map((p) => (
                    <li key={p.iso}>
                      <span className="split__month">{p.label}</span>
                      <span className="split__due">
                        {t("enrollReg.dueOn", { date: p.due })}
                      </span>
                      <strong>{money(p.amount)}</strong>
                    </li>
                  ))}
                </ul>
              )}
              <p className="pay__help">
                {planClosed
                  ? t("enrollReg.payClosedNote")
                  : t("enrollReg.payHelp")}
              </p>
            </section>

            <section className="card">
              <h2 className="card__title">{t("enrollReg.policyTitle")}</h2>
              <p className="card__text">{t("enrollReg.policySummary")}</p>
              <p className="card__text">{t("enrollReg.policyMakeupFirst")}</p>
              <p className="card__text card__text--tight">
                {t("enrollReg.policyMakeupChoose")}
              </p>
              <ul className="policy-list">
                <li>
                  <strong>{t("enrollReg.policyCreditLabel")}</strong> —{" "}
                  {t("enrollReg.policyCreditDesc")}
                </li>
                <li>
                  <strong>{t("enrollReg.policyRefundLabel")}</strong> —{" "}
                  {t("enrollReg.policyRefundDesc")}
                </li>
              </ul>
              <label className="policy">
                <input
                  type="checkbox"
                  checked={policyAccepted}
                  onChange={() => {
                    setPolicyAccepted((v) => !v);
                    setWarning(null);
                  }}
                />
                <span>{t("enrollReg.policyAccept")}</span>
              </label>
            </section>

            <section className="card">
              <h2 className="card__title">{t("enrollReg.privacyTitle")}</h2>
              <p className="card__text">{t("enrollReg.privacySummary")}</p>
              <label className="policy">
                <input
                  type="checkbox"
                  checked={mediaConsent}
                  onChange={() => setMediaConsent((v) => !v)}
                />
                <span>
                  {t("enrollReg.privacyConsent")}
                  <em className="policy__hint">{t("enrollReg.privacyHint")}</em>
                </span>
              </label>
            </section>

            <section className="card">
              <h2 className="card__title">{t("enrollReg.termsTitle")}</h2>
              <p className="card__text">{t("enrollReg.termsLede")}</p>
              <label className="policy">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => {
                    setTermsAccepted((v) => !v);
                    setWarning(null);
                  }}
                />
                <span>
                  {t("enrollReg.termsAgreePre")}{" "}
                  <button
                    type="button"
                    className="policy__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setLegalTab("terms");
                    }}
                  >
                    {t("legal.termsTab")}
                  </button>{" "}
                  {t("enrollReg.termsAgreeMid")}{" "}
                  <button
                    type="button"
                    className="policy__link"
                    onClick={(e) => {
                      e.preventDefault();
                      setLegalTab("privacy");
                    }}
                  >
                    {t("legal.privacyTab")}
                  </button>
                  {t("enrollReg.termsAgreePost")}
                </span>
              </label>
            </section>

            {warning && <p className="reg__warning">{msg(warning)}</p>}
            <button
              type="button"
              className="reg__primary"
              onClick={submit}
              disabled={sending}
            >
              {sending && <span className="btn-spinner" aria-hidden="true" />}
              {sending ? t("enrollReg.sending") : t("enrollReg.submit")}
            </button>
            <p className="reg__hint reg__hint--center">
              {t("enrollReg.submitNote")}
            </p>
          </>
        )}
      </main>
      {legalTab && (
        <LegalModal
          initialTab={legalTab}
          onClose={() => setLegalTab(null)}
          onAgree={() => {
            setTermsAccepted(true);
            setWarning(null);
            setLegalTab(null);
          }}
        />
      )}
      <Footer />
    </>
  );
}
