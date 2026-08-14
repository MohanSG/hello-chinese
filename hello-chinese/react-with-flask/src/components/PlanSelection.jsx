import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { LEVELS, PLANS, plansInOrder, planConflictInfo, scheduleFor } from "../data/enrollment";
import { money } from "../data/enrollmentDraft";
import { useLanguage } from "../i18n/LanguageContext";
import { ChineseIcon } from "./EnrollIcons";
import "./PlanSelection.css";

// One plan page for every Chinese level. The level's own times drive the
// schedule strip, and a level/plan time conflict disables the plan.
// All copy comes from i18n/translations.js — enrollPlans for page chrome,
// enrollData for level and plan names shared with the data layer.
export default function PlanSelection({ levelKey: levelKeyProp }) {
  const params = useParams();
  const [search] = useSearchParams();
  const { t, tList } = useLanguage();
  const levelKey = levelKeyProp || params.levelKey;
  const level = LEVELS[levelKey];
  const childNo = Number(search.get("child")) || 1;

  if (!level) {
    return (
      <main className="plans plans--empty">
        <h1>{t("enrollPlans.notFoundTitle")}</h1>
        <Link className="plans__cta" to="/enroll/sunday">{t("enrollPlans.notFoundCta")}</Link>
      </main>
    );
  }

  // Conflict comes back as a code + values so it can render in either language.
  const conflictText = (info) =>
    info
      ? t(`enrollData.${info.code}`, {
          ...info.vars,
          level: info.vars.levelKey ? t(`enrollData.levelName.${info.vars.levelKey}`) : "",
        })
      : null;

  const mathTime = planConflictInfo(levelKey, 4) ? null : level.math;
  const slots = [
    { kind: "chinese", time: level.chinese, labelKey: "chineseClass" },
    ...level.tutoring
      .filter((tm) => tm !== mathTime)
      .map((tm) => ({ kind: "tutoring", time: tm, labelKey: "optionalTutoring" })),
    ...(mathTime ? [{ kind: "math", time: mathTime, labelKey: "optionalMath" }] : []),
  ].sort((a, b) => startMinutes(a.time) - startMinutes(b.time));

  const childQuery = childNo > 1 ? `&child=${childNo}` : "";
  const backHref = childNo > 1 ? `/enroll/sunday?child=${childNo}` : "/enroll/sunday";

  return (
    <main className="plans">
      <header className="plans__header">
        <Link className="plans__back" to={backHref}>{t("enrollPlans.backToSunday")}</Link>
        {childNo > 1 && (
          <div className="plans__childbanner">
            <span className="plans__childnum">{childNo}</span>
            {t("enrollPlans.childBanner", { n: childNo })}
          </div>
        )}
        <h1 className="plans__title">
          {t(`enrollData.levelName.${levelKey}`)}
          {levelKey !== "math" ? ` ${t("enrollPlans.titleSuffix")}` : ""}
        </h1>
        <p className="plans__subtitle">
          <strong>{t(`enrollData.levelLabel.${levelKey}`)}</strong> ·{" "}
          {t("enrollPlans.classTimeLine", { time: level.chinese })}
        </p>
      </header>

      <section className="plans__strip" aria-label={t("enrollPlans.scheduleAria")}>
        <div className="plans__striptitle">{t("enrollPlans.scheduleTitle")}</div>
        <div className="plans__slots">
          {slots.map((s, i) => (
            <React.Fragment key={s.time + s.labelKey}>
              {i > 0 && <span className="plans__slotdiv" aria-hidden="true" />}
              <div className={`plans__slot plans__slot--${s.kind}`}>
                <span className="plans__sloticon" aria-hidden="true">{ICON[s.kind]}</span>
                <span>
                  <span className="plans__slottime">{s.time}</span>
                  <span className="plans__slotlabel">{t(`enrollData.slot.${s.labelKey}`)}</span>
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="plans__pricing">
        <div>
          <div className="plans__pricingtitle">{t("enrollPlans.pricingTitle")}</div>
          <ul className="plans__pricinglist">
            <li>
              <strong>{t("enrollPlans.pricingFlexibleLabel")}</strong> — {t("enrollPlans.pricingFlexible")}
            </li>
            <li>
              <strong>{t("enrollPlans.pricingPerStudentLabel")}</strong> — {t("enrollPlans.pricingPerStudent")}
            </li>
            <li>
              <strong>{t("enrollPlans.pricingSavingsLabel")}</strong> — {t("enrollPlans.pricingSavings")}
            </li>
          </ul>
        </div>
      </section>

      <div className="plans__sectionhead">
        <h2>{t("enrollPlans.chooseTitle")}</h2>
        <span>{t("enrollPlans.chooseCount")}</span>
      </div>

      <div className="plans__grid">
        {plansInOrder()
          .filter((plan) => (levelKey === "math" ? !plan.chinese : plan.chinese))
          .map((plan) => ({ plan, conflict: planConflictInfo(levelKey, plan.id) }))
          .sort((a, b) => Number(!!a.conflict) - Number(!!b.conflict))
          .map(({ plan, conflict }) => {
          const planNo = plan.order;
          const blocks = conflict
            ? [
                { time: level.chinese, labelKey: "chineseClass" },
                { time: level.math, labelKey: "math" },
              ]
            : scheduleFor(levelKey, plan.id);
          return (
            <article
              key={plan.id}
              className={[
                "plan",
                plan.id === 5 ? "plan--wide" : "",
                conflict ? "plan--off" : "",
                plan.id === 5 && !conflict ? "plan--popular" : "",
              ].filter(Boolean).join(" ")}
            >
              {plan.id === 5 && !conflict && <span className="plan__ribbon">{t("enrollPlans.mostPopular")}</span>}
              {conflict && (
                <span className="plan__ribbon plan__ribbon--off">{t("enrollPlans.unavailableRibbon")}</span>
              )}
              <div className="plan__body">
                <div className="plan__main">
                  <span className="plan__num">{planNo}</span>
                  <div>
                    <h3 className="plan__name">{planNo}. {t(`enrollData.planName.${plan.id}`)}</h3>
                    <ul className="plan__blocks">
                      {blocks.map((b, i) => (
                        <li key={b.time + i}>
                          <span className="plan__check" aria-hidden="true">✓</span>
                          <span className="plan__time">{b.time}</span>
                          <span>· {t(`enrollData.slot.${b.labelKey}`)}</span>
                        </li>
                      ))}
                    </ul>
                    {conflict ? (
                      <p className="plan__note">{conflictText(conflict)}</p>
                    ) : (
                      <div className="plan__deal">
                        <span className="plan__dealsave">
                          {t("enrollPlans.save", { amount: money(plan.save) })}
                        </span>
                        <span className="plan__dealline">
                          <s>{money(plan.regular)}</s> {money(plan.total)} &mdash; {packageLine(plan, t)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="plan__price">
                  <div className="plan__rate">
                    <span className="plan__rateamount">{money(plan.perSunday)}</span>
                    <span className="plan__rateunit">{t("enrollPlans.perSunday")}</span>
                  </div>
                  <div className="plan__ratelabel">{t("enrollPlans.rateLabel")}</div>
                  {conflict ? (
                    <span className="plan__cta plan__cta--off">{t("enrollPlans.unavailable")}</span>
                  ) : (
                    <Link
                      className="plan__cta"
                      to={`/enroll/sundays?level=${levelKey}&plan=${plan.id}${childQuery}`}
                    >
                      {t("enrollPlans.selectPlan")}
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="plans__foot">{t("enrollPlans.foot")}</p>
      <p className="plans__srhint">
        {t("enrollPlans.srHint", { plan: t("enrollData.planName.5") })}
      </p>
    </main>
  );
}

function packageLine(plan, t) {
  const parts = [`10 ${t("enrollData.unit.chinese")}`];
  if (plan.tutoringHours > 0) parts.push(`${plan.tutoringHours * 10} ${t("enrollData.unit.tutoring")}`);
  if (plan.math) parts.push(`10 ${t("enrollData.unit.math")}`);
  return parts.join(" + ");
}

function startMinutes(range) {
  const [h, m] = range.split("–")[0].split(":").map(Number);
  return (h < 8 ? h + 12 : h) * 60 + m;
}

const ICON = {
  chinese: <ChineseIcon size={20} />,
  tutoring: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8.5" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.5" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 19c0-2.9 2.5-4.6 5.5-4.6s5.5 1.7 5.5 4.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16.5 14.6c2.3.2 4 1.7 4 4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  math: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4.5" y="3" width="15" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="7" y="5.6" width="10" height="3.4" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="9" cy="13" r="1" fill="currentColor" />
      <circle cx="12" cy="13" r="1" fill="currentColor" />
      <circle cx="15" cy="13" r="1" fill="currentColor" />
      <circle cx="9" cy="17" r="1" fill="currentColor" />
      <circle cx="12" cy="17" r="1" fill="currentColor" />
      <circle cx="15" cy="17" r="1" fill="currentColor" />
    </svg>
  ),
};
