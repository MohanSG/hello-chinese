import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  LEVELS, PLANS, TERMS, MIN_SESSION_DATES, minimumDatesFor, planConflictInfo, planTitle, priceQuote, scheduleFor,
  sundaysByMonth, eligibleSundays, validateDateSelectionInfo, formatDateShort,
} from "../data/enrollment";
import { readDraft, saveEnrollment, nextOpenIndex, money } from "../data/enrollmentDraft";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useLanguage } from "../i18n/LanguageContext";
import { ChineseIcon, MathIcon } from "../components/EnrollIcons";
import "./EnrollSelectDates.css";

// Step 2 of the Sunday flow: pick any combination of the term's Sundays and see
// the price update live. Each component earns its package discount on its own
// quantity, so a short schedule can still qualify.
export default function EnrollSelectDates() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const { t, locale } = useLanguage();
  const levelKey = search.get("level") || "";
  const planId = Number(search.get("plan")) || 0;
  const term = TERMS[0];

  const draft = useMemo(() => readDraft(), []);
  const childIndex = search.get("child")
    ? Math.max(0, Number(search.get("child")) - 1)
    : nextOpenIndex(draft.enrollments);
  const existing = draft.enrollments[childIndex];

  const [selected, setSelected] = useState(existing?.dates || []);
  // Warning is held as a code + values so it re-renders in the active language.
  const [warning, setWarning] = useState(null);

  const termLabel = t("enrollDates.termFall2026");
  const planLabel = (id) =>
    t("enrollDates.planTitle", { order: PLANS[id].order, name: t(`enrollData.planName.${id}`) });
  const messageFor = (info) => {
    if (!info) return "";
    if (info.code === "tooFewDates" && info.vars.minimum === 1) {
      return t("enrollValidation.tooFewDatesOne");
    }
    return t(`enrollValidation.${info.code}`, info.vars);
  };

  const known = !!LEVELS[levelKey] && !!PLANS[planId];
  const conflict = known ? planConflictInfo(levelKey, planId) : { code: "unknownSelection", vars: {} };
  if (!known || conflict) {
    const text = !known
      ? t("enrollValidation.unknownSelection")
      : t(`enrollData.${conflict.code}`, {
          ...conflict.vars,
          level: conflict.vars.levelKey ? t(`enrollData.levelName.${conflict.vars.levelKey}`) : "",
        });
    return (
      <>
        <NavBar />
        <main className="sundays sundays--empty">
          <h1>{t("enrollDates.lostPlanTitle")}</h1>
          <p>{text}</p>
          <Link className="sundays__cta" to="/enroll/sunday">{t("enrollDates.backToSunday")}</Link>
        </main>
        <Footer />
      </>
    );
  }

  const level = LEVELS[levelKey];
  const months = sundaysByMonth(term, new Date(), locale);
  const quote = priceQuote(planId, selected.length);
  const validation = validateDateSelectionInfo(selected, term);
  const minimum = minimumDatesFor(term);
  const minimumReduced = minimum < MIN_SESSION_DATES;
  const childQuery = childIndex > 0 ? `?child=${childIndex + 1}` : "";

  const levelTitle =
    t(`enrollData.levelName.${levelKey}`) +
    (levelKey !== "math" ? ` ${t("enrollPlans.titleSuffix")}` : "");

  const toggle = (iso) => {
    setWarning(null);
    setSelected((prev) => (prev.includes(iso) ? prev.filter((d) => d !== iso) : [...prev, iso].sort()));
  };

  const onContinue = (event) => {
    event.preventDefault();
    if (validation) { setWarning(validation); return; }
    // The draft keeps English names — it feeds the backend and the confirmation
    // email, which are not language-switched.
    saveEnrollment(childIndex, {
      levelKey,
      levelName: level.name,
      planId,
      planName: planTitle(planId),
      schedule: scheduleFor(levelKey, planId),
      dates: selected,
      subtotal: quote.total,
      savings: quote.savings,
      components: quote.components,
    });
    navigate(`/enroll/registration?child=${childIndex + 1}`);
  };

  const qtyUnit = (unit, qty) => {
    if (unit === "hour") return t(qty === 1 ? "enrollDates.qtyHourOne" : "enrollDates.qtyHour");
    return t(qty === 1 ? "enrollDates.qtyClassOne" : "enrollDates.qtyClass");
  };

  return (
    <>
      <NavBar />
      <main className="sundays">
      <Link className="sundays__back" to={`/enroll/${levelKey}${childQuery}`}>{t("enrollDates.backToPlans")}</Link>

      <ol className="stepper" aria-label={t("enrollDates.stepperAria")}>
        <li className="stepper__item stepper__item--done"><span className="stepper__dot">✓</span><span className="stepper__label">{t("enrollDates.stepPlan")}</span></li>
        <li className="stepper__item stepper__item--active"><span className="stepper__dot">2</span><span className="stepper__label">{t("enrollDates.stepSundays")}</span></li>
        <li className="stepper__item"><span className="stepper__dot">3</span><span className="stepper__label">{t("enrollDates.stepRegistration")}</span></li>
      </ol>

      <h1 className="sundays__title">{t("enrollDates.title")}</h1>
      <p className="sundays__lede">{t("enrollDates.lede")}</p>
      <p className="sundays__childline">
        {childIndex === 0
          ? t("enrollDates.childLineFirst")
          : t("enrollDates.childLineOther", { n: childIndex + 1 })}
      </p>

      <div className="sundays__cols">
        <div className="sundays__main">
          <section className="selected-plan">
            <span className="selected-plan__icon" aria-hidden="true">
              {levelKey === "math" ? <MathIcon size={22} /> : <ChineseIcon size={22} />}
            </span>
            <div>
              <div className="selected-plan__level">{levelTitle}</div>
              <div className="selected-plan__plan">{planLabel(planId)}</div>
              <ul className="selected-plan__blocks">
                {scheduleFor(levelKey, planId).map((b, i) => (
                  <li key={b.time + i}>
                    <span aria-hidden="true">✓</span>
                    <span className="selected-plan__time">{b.time}</span>
                    <span>· {t(`enrollData.slot.${b.labelKey}`)}</span>
                  </li>
                ))}
              </ul>
              <p className="selected-plan__note">{t("enrollDates.perStudentNote")}</p>
            </div>
          </section>

          <section className="picker">
            <div className="picker__head">
              <h2>{t("enrollDates.pickerTitle")}</h2>
              <span className="picker__counter">
                {t("enrollDates.counter", { selected: selected.length, total: term.dates.length })}
              </span>
            </div>
            <p className="picker__hint">
              {minimumReduced
                ? t(minimum === 1 ? "enrollDates.hintReducedOne" : "enrollDates.hintReduced", {
                    term: termLabel,
                    minimum,
                  })
                : t("enrollDates.hintFull", {
                    term: termLabel,
                    total: term.dates.length,
                    minimum: MIN_SESSION_DATES,
                  })}
            </p>

            <div className="picker__quick">
              <button type="button" onClick={() => { setWarning(null); setSelected(eligibleSundays(term).map((s) => s.iso)); }}>
                {t("enrollDates.selectAll")}
              </button>
              <button type="button" className="picker__clear" onClick={() => { setWarning(null); setSelected([]); }}>
                {t("enrollDates.clear")}
              </button>
            </div>

            <aside className={`bonus${selected.length >= 12 ? " bonus--on" : ""}`}>
              <span className="bonus__icon" aria-hidden="true">★</span>
              <div>
                <h3 className="bonus__title">{t("enrollDates.bonusTitle")}</h3>
                <p className="bonus__body">
                  {selected.length >= 12 ? t("enrollDates.bonusEarned") : t("enrollDates.bonusBody")}
                </p>
              </div>
            </aside>

            {months.map((group) => (
              <div className="picker__month" key={group.month}>
                <div className="picker__monthname">{group.month}</div>
                <div className="picker__days">
                  {group.dates.map((day) => {
                    const on = selected.includes(day.iso);
                    const noteText = day.noteCode ? t(`enrollValidation.${day.noteCode}`) : null;
                    const blockedText = day.unavailableCode ? t(`enrollValidation.${day.unavailableCode}`) : null;
                    return (
                      <button
                        type="button"
                        key={day.iso}
                        className={`day${on ? " day--on" : ""}${day.unavailable ? " day--off" : ""}${day.note ? " day--noted" : ""}`}
                        onClick={() => toggle(day.iso)}
                        disabled={!!day.unavailable}
                        aria-pressed={on}
                        title={blockedText || noteText || t(on ? "enrollDates.daySelected" : "enrollDates.dayAvailable")}
                      >
                        <span className="day__dot" aria-hidden="true">{on ? "✓" : ""}</span>
                        <span className="day__label">{day.dayLabel}</span>
                        {noteText ? (
                          <span className="day__badge">{noteText}</span>
                        ) : blockedText ? (
                          <span className="day__reason">{blockedText}</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <aside className="yct">
              <span className="yct__icon" aria-hidden="true">i</span>
              <div>
                <h3 className="yct__title">{t("enrollDates.yctTitle")}</h3>
                <p>{t("enrollDates.yctBody")}</p>
                <p>
                  {t("enrollDates.yctAskPre")}{" "}
                  <a href="mailto:hello.nihao.chinese@gmail.com">{t("enrollDates.yctAskLink")}</a>{" "}
                  {t("enrollDates.yctAskPost")}
                </p>
              </div>
            </aside>
          </section>

          <section className="summary">
            <div className="summary__head">
              <h2>{t("enrollDates.summaryTitle")}</h2>
              {quote.savings > 0 && <span className="summary__badge">{t("enrollDates.savingsBadge")}</span>}
            </div>

            {quote.components.map((c) => (
              <div className="summary__row" key={c.key}>
                <div>
                  <div className="summary__label">
                    {t(`enrollDates.component${c.key.charAt(0).toUpperCase()}${c.key.slice(1)}`)}
                  </div>
                  <div className="summary__meta">
                    {c.qty} {qtyUnit(c.unit, c.qty)} · {t("enrollDates.regularLine", { amount: money(c.regular) })}
                  </div>
                </div>
                <div className="summary__prices">
                  <span className="summary__price">{money(c.price)}</span>
                  {c.savings > 0 && (
                    <span className="summary__save">{t("enrollDates.save", { amount: money(c.savings) })}</span>
                  )}
                </div>
              </div>
            ))}

            <div className="summary__total">
              <span>{t("enrollDates.total")}</span>
              <span className="summary__totalamount">{money(quote.total)}</span>
            </div>
            {quote.savings > 0 && (
              <div className="summary__savings">
                {t("enrollDates.totalSavings", { amount: money(quote.savings) })}
              </div>
            )}
            <p className="summary__note">{t("enrollDates.allPerStudent")}</p>
          </section>

          {warning && <p className="sundays__warning">{messageFor(warning)}</p>}

          <a className="sundays__continue" href="#continue" onClick={onContinue}>
            {t("enrollDates.continue")}
          </a>
          <p className="sundays__alt">
            {t("enrollDates.altPre")}{" "}
            <Link to={`/enroll/${levelKey}${childQuery}`}>{t("enrollDates.altLink")}</Link>
          </p>
        </div>

        <aside className="recap">
          <div className="recap__eyebrow">{t("enrollDates.recapEyebrow")}</div>
          <div className="recap__level">{levelTitle}</div>
          <div className="recap__plan">{planLabel(planId)}</div>
          <dl className="recap__list">
            <div><dt>{t("enrollDates.recapSundays")}</dt><dd>{selected.length}</dd></div>
            <div>
              <dt>{t("enrollDates.recapRate")}</dt>
              <dd>{t("enrollDates.recapRateValue", { amount: money(PLANS[planId].perSunday) })}</dd>
            </div>
            <div><dt>{t("enrollDates.recapSavings")}</dt><dd className="recap__savings">{money(quote.savings)}</dd></div>
          </dl>
          <div className="recap__total">
            <span>{t("enrollDates.recapSubtotal")}</span>
            <span className="recap__totalamount">{money(quote.total)}</span>
          </div>
          <p className="recap__dates">
            {selected.length
              ? t("enrollDates.recapDates", {
                  dates: selected
                    .map((iso) => formatDateShort(iso, locale).replace(", 2026", "").replace("2026年", ""))
                    .join(" · "),
                })
              : t("enrollDates.recapNone")}
          </p>
        </aside>
      </div>
      </main>
      <Footer />
    </>
  );
}
