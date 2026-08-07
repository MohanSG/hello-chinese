import React, { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  LEVELS, PLANS, TERMS, planConflict, planTitle, priceQuote, scheduleFor,
  sundaysByMonth, eligibleSundays, validateDateSelection, formatDateShort,
} from "../data/enrollment";
import { readDraft, saveEnrollment, nextOpenIndex, money, pluralUnit } from "../data/enrollmentDraft";
import "./EnrollSelectDates.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// Step 2 of the Sunday flow: pick any combination of the term's Sundays and see
// the price update live. Each component earns its package discount on its own
// quantity, so a short schedule can still qualify.
export default function EnrollSelectDates() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const levelKey = search.get("level") || "";
  const planId = Number(search.get("plan")) || 0;
  const term = TERMS[0];

  const draft = useMemo(() => readDraft(), []);
  const childIndex = search.get("child")
    ? Math.max(0, Number(search.get("child")) - 1)
    : nextOpenIndex(draft.enrollments);
  const existing = draft.enrollments[childIndex];

  const [selected, setSelected] = useState(existing?.dates || []);
  const [warning, setWarning] = useState("");

  const known = !!LEVELS[levelKey] && !!PLANS[planId];
  const conflict = known ? planConflict(levelKey, planId) : "We could not tell which level and plan you selected.";
  if (!known || conflict) {
    return (
      <main className="sundays sundays--empty">
        <h1>We lost track of your plan</h1>
        <p>{conflict}</p>
        <Link className="sundays__cta" to="/enroll/sunday">Back to Sunday Programs</Link>
      </main>
    );
  }

  const level = LEVELS[levelKey];
  const months = sundaysByMonth(term);
  const quote = priceQuote(planId, selected.length);
  const validation = validateDateSelection(selected, term);
  const childQuery = childIndex > 0 ? `?child=${childIndex + 1}` : "";

  const toggle = (iso) => {
    setWarning("");
    setSelected((prev) => (prev.includes(iso) ? prev.filter((d) => d !== iso) : [...prev, iso].sort()));
  };

  const onContinue = (event) => {
    event.preventDefault();
    if (validation) { setWarning(validation); return; }
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

  return (
    <main className="sundays">
      <Link className="sundays__back" to={`/enroll/${levelKey}${childQuery}`}>← Back to plans</Link>

      <ol className="stepper" aria-label="Enrollment progress">
        <li className="stepper__item stepper__item--done"><span className="stepper__dot">✓</span><span className="stepper__label">Plan</span></li>
        <li className="stepper__item stepper__item--active"><span className="stepper__dot">2</span><span className="stepper__label">Sundays</span></li>
        <li className="stepper__item"><span className="stepper__dot">3</span><span className="stepper__label">Registration</span></li>
      </ol>

      <h1 className="sundays__title">Choose Your Sundays</h1>
      <p className="sundays__lede">
        Select the class dates that work best for your family. Eligible package discounts are applied automatically.
      </p>
      <p className="sundays__childline">
        {childIndex === 0
          ? "Child 1 enrollment"
          : `Child ${childIndex + 1} enrollment — this child can have a different level, plan, and schedule.`}
      </p>

      <div className="sundays__cols">
        <div className="sundays__main">
          <section className="selected-plan">
            <span className="selected-plan__icon" aria-hidden="true">中</span>
            <div>
              <div className="selected-plan__level">{level.name} Chinese</div>
              <div className="selected-plan__plan">{planTitle(planId)}</div>
              <ul className="selected-plan__blocks">
                {scheduleFor(levelKey, planId).map((b, i) => (
                  <li key={b.time + i}>
                    <span aria-hidden="true">✓</span>
                    <span className="selected-plan__time">{b.time}</span>
                    <span>· {b.label}</span>
                  </li>
                ))}
              </ul>
              <p className="selected-plan__note">Standard weekly rates shown are per student.</p>
            </div>
          </section>

          <section className="picker">
            <div className="picker__head">
              <h2>Select Your Sundays</h2>
              <span className="picker__counter">{selected.length} of {term.dates.length} Sundays selected</span>
            </div>
            <p className="picker__hint">{term.label} runs on {term.dates.length} Sundays. Pick any combination.</p>

            <div className="picker__quick">
              <button type="button" onClick={() => { setWarning(""); setSelected(eligibleSundays(term).map((s) => s.iso)); }}>
                Select all Sundays
              </button>
              <button type="button" className="picker__clear" onClick={() => { setWarning(""); setSelected([]); }}>
                Clear
              </button>
            </div>

            {months.map((group) => (
              <div className="picker__month" key={group.month}>
                <div className="picker__monthname">{group.month}</div>
                <div className="picker__days">
                  {group.dates.map((day) => {
                    const on = selected.includes(day.iso);
                    return (
                      <button
                        type="button"
                        key={day.iso}
                        className={`day${on ? " day--on" : ""}${day.unavailable ? " day--off" : ""}`}
                        onClick={() => toggle(day.iso)}
                        disabled={!!day.unavailable}
                        aria-pressed={on}
                        title={day.unavailable || (on ? "Selected" : "Available")}
                      >
                        <span className="day__dot" aria-hidden="true">{on ? "✓" : ""}</span>
                        <span className="day__label">{day.dayLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>

          <section className="summary">
            <div className="summary__head">
              <h2>Pricing Summary</h2>
              {quote.savings > 0 && <span className="summary__badge">✓ Package Savings Applied</span>}
            </div>

            {quote.components.map((c) => (
              <div className="summary__row" key={c.key}>
                <div>
                  <div className="summary__label">{c.label}</div>
                  <div className="summary__meta">
                    {c.qty} {pluralUnit(c.unit, c.qty)} · Regular: {money(c.regular)}
                  </div>
                </div>
                <div className="summary__prices">
                  <span className="summary__price">{money(c.price)}</span>
                  {c.savings > 0 && <span className="summary__save">Save {money(c.savings)}</span>}
                </div>
              </div>
            ))}

            <div className="summary__total">
              <span>Total</span>
              <span className="summary__totalamount">{money(quote.total)}</span>
            </div>
            {quote.savings > 0 && <div className="summary__savings">Total savings: {money(quote.savings)}</div>}
            <p className="summary__note">All rates shown are per student.</p>
          </section>

          {warning && <p className="sundays__warning">{warning}</p>}

          <a className="sundays__continue" href="#continue" onClick={onContinue}>
            Continue to Registration ›
          </a>
          <p className="sundays__alt">
            Need a different option? <Link to={`/enroll/${levelKey}${childQuery}`}>Back to Plans</Link>
          </p>
        </div>

        <aside className="recap">
          <div className="recap__eyebrow">Your selection</div>
          <div className="recap__level">{level.name} Chinese</div>
          <div className="recap__plan">{planTitle(planId)}</div>
          <dl className="recap__list">
            <div><dt>Sundays selected</dt><dd>{selected.length}</dd></div>
            <div><dt>Weekly rate</dt><dd>{money(PLANS[planId].perSunday)} / Sunday</dd></div>
            <div><dt>Savings</dt><dd className="recap__savings">{money(quote.savings)}</dd></div>
          </dl>
          <div className="recap__total">
            <span>Subtotal</span>
            <span className="recap__totalamount">{money(quote.total)}</span>
          </div>
          <p className="recap__dates">
            {selected.length
              ? "Selected: " + selected.map((iso) => formatDateShort(iso).replace(", 2026", "")).join(" · ")
              : "No Sundays selected yet."}
          </p>
        </aside>
      </div>
    </main>
  );
}
