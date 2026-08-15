// Shared enrollment business logic: levels, plan definitions, pricing, conflict
// rules and sibling discount. Used by the plan pages, the registration form and
// the review summary so the numbers can never drift apart.

// Each child's enrollment is priced independently, then the household gets
// SIBLING_DISCOUNT off for every child after the first.
export const SIBLING_DISCOUNT = 30;

export function siblingDiscountFor(childCount) {
  const n = Math.max(0, Math.floor(Number(childCount) || 0));
  return SIBLING_DISCOUNT * Math.max(0, n - 1);
}

// Component rates. Each component's package price is triggered by ITS OWN
// quantity, independently of the other components and of how many Sundays the
// family selected — there is no fixed-term commitment.
export const RATES = {
  chinese: { key: "chinese", label: "Chinese Classes", unit: "class", single: 40, tiers: [{ qty: 10, price: 360 }] },
  tutoring: { key: "tutoring", label: "Tutoring Hours", unit: "hour", single: 20, tiers: [{ qty: 10, price: 160 }, { qty: 20, price: 300 }] },
  math: { key: "math", label: "Math Classes", unit: "class", single: 40, tiers: [{ qty: 10, price: 360 }] },
};

// Cheapest way to buy `qty` units of one component: package tiers where they
// help, single units for the remainder.
export function componentPrice(kind, qty) {
  const rate = RATES[kind];
  const n = Math.max(0, Math.floor(Number(qty) || 0));
  if (!rate || n === 0) {
    return { key: kind, label: rate ? rate.label : kind, unit: rate ? rate.unit : "", qty: 0, regular: 0, price: 0, savings: 0 };
  }
  const cost = [0];
  for (let q = 1; q <= n; q++) {
    let best = cost[q - 1] + rate.single;
    rate.tiers.forEach((t) => {
      if (q >= t.qty) best = Math.min(best, cost[q - t.qty] + t.price);
    });
    cost[q] = best;
  }
  const regular = n * rate.single;
  return { key: kind, label: rate.label, unit: rate.unit, qty: n, regular, price: cost[n], savings: regular - cost[n] };
}

// Per-level class times. Tutoring runs 9:00 AM–12:00 PM and fills the hours
// either side of the child's Chinese class.
export const LEVELS = {
  "step-in": {
    key: "step-in", name: "Step-In", levelLabel: "Building Language Foundations", ages: "Recommended Ages 3–6+",
    chinese: "9:00–10:00", tutoring: ["10:00–11:00", "11:00–12:00"], math: "11:00–12:00",
    theme: "Nature & Animals",
  },
  "step-up": {
    key: "step-up", name: "Step-Up", levelLabel: "Developing Language Skills", ages: "Recommended Ages 7–10",
    chinese: "10:00–11:00", tutoring: ["9:00–10:00", "11:00–12:00"], math: "11:00–12:00",
    theme: "Restaurant & Store",
  },
  "step-beyond": {
    key: "step-beyond", name: "Step-Beyond", levelLabel: "Advancing Language Independence", ages: "Recommended Ages 10+",
    chinese: "11:00–12:00", tutoring: ["9:00–10:00", "10:00–11:00"], math: "11:00–12:00",
    theme: "Advanced Language & Projects",
  },
  // Math Enrichment is an independent Sunday course: no Chinese class, no
  // tutoring hours, so it has a single plan of its own (Plan 6).
  "math": {
    key: "math", name: "Math Enrichment", levelLabel: "Grouped by Grade & Skill Level", ages: "Recommended Ages 7–12",
    chinese: null, tutoring: [], math: "11:00–12:00",
    theme: "Foundations, Reasoning & Confidence",
  },
};

// Package totals come straight from the proposal's pricing table.
// `perSunday` is the standard weekly rate shown on the plan cards.
// `total`/`save` are the reference figures at a full 10 Sundays — display only;
// live prices always come from priceQuote().
// `order` is the position families see. The full combination leads, so the id
// (which URLs and saved drafts use) no longer matches the displayed number —
// planNumber() is the only thing that should be shown to a family.
// `regular` is the undiscounted 10-Sunday price, shown struck through.
export const PLANS = {
  1: { id: 1, order: 2, name: "Chinese Only", perSunday: 40, regular: 400, total: 360, save: 40, chinese: true, tutoringHours: 0, math: false },
  2: { id: 2, order: 3, name: "Chinese + 1 Tutoring", perSunday: 60, regular: 600, total: 520, save: 80, chinese: true, tutoringHours: 1, math: false },
  3: { id: 3, order: 4, name: "Chinese + 2 Tutoring", perSunday: 80, regular: 800, total: 660, save: 140, chinese: true, tutoringHours: 2, math: false },
  4: { id: 4, order: 5, name: "Chinese + Math", perSunday: 80, regular: 800, total: 720, save: 80, chinese: true, tutoringHours: 0, math: true },
  5: { id: 5, order: 1, name: "Chinese + Tutoring + Math", perSunday: 100, regular: 1000, total: 880, save: 120, chinese: true, tutoringHours: 1, math: true },
  6: { id: 6, order: 6, name: "Math Enrichment Only", perSunday: 40, regular: 400, total: 360, save: 40, chinese: false, tutoringHours: 0, math: true },
};

// Plans in the order families see them.
export function plansInOrder() {
  return Object.values(PLANS).sort((a, b) => a.order - b.order);
}

// The number shown next to a plan's name.
export function planNumber(planId) {
  const plan = PLANS[planId];
  return plan ? plan.order : 0;
}

// Step-Beyond Chinese and Math both run 11:00 AM–12:00 PM, so any plan that
// pairs them is invalid for that level.
export function planConflict(levelKey, planId) {
  const level = LEVELS[levelKey];
  const plan = PLANS[planId];
  if (!level || !plan) return "Unknown level or plan.";
  if (plan.chinese && plan.math && level.math === level.chinese) {
    return `${level.name} Chinese and Math Enrichment both run ${level.chinese}, so they cannot be combined.`;
  }
  return null;
}

// Same rule, but as a code + values instead of a sentence, so the UI can render
// it in the active language. planConflict() above stays as-is for truthiness
// checks and for any caller that just needs an English string.
export function planConflictInfo(levelKey, planId) {
  const level = LEVELS[levelKey];
  const plan = PLANS[planId];
  if (!level || !plan) return { code: "conflictUnknown", vars: {} };
  if (plan.chinese && plan.math && level.math === level.chinese) {
    return { code: "conflictMathClash", vars: { levelKey, time: level.chinese } };
  }
  return null;
}

export function isPlanAvailable(levelKey, planId) {
  return !planConflict(levelKey, planId);
}

// The scheduled blocks for a level + plan, in chronological order.
export function scheduleFor(levelKey, planId) {
  const level = LEVELS[levelKey];
  const plan = PLANS[planId];
  if (!level || !plan) return [];
  const blocks = [];
  if (plan.chinese && level.chinese) blocks.push({ time: level.chinese, label: "Chinese Class", labelKey: "chineseClass" });
  const hours = level.tutoring.slice(0, plan.tutoringHours);
  const usedByMath = plan.math ? level.math : null;
  hours.forEach((time) => {
    if (time !== usedByMath) blocks.push({ time, label: "Learning Support Tutoring", labelKey: "tutoring" });
  });
  if (plan.math) blocks.push({ time: level.math, label: "Math Enrichment", labelKey: "math" });
  return blocks.sort((a, b) => startMinutes(a.time) - startMinutes(b.time));
}

function startMinutes(range) {
  const [h, m] = range.split("–")[0].split(":").map(Number);
  const hour = h < 8 ? h + 12 : h; // times are 9:00–12:00, no PM ambiguity
  return hour * 60 + m;
}

// Live price for one child: quantities come from the number of Sundays the
// family selected, then each component is discounted on its own threshold.
export function priceQuote(planId, sundayCount) {
  const plan = PLANS[planId];
  if (!plan) return null;
  const sundays = Math.max(0, Math.floor(Number(sundayCount) || 0));
  const components = [];
  if (plan.chinese) components.push(componentPrice("chinese", sundays));
  if (plan.tutoringHours > 0) components.push(componentPrice("tutoring", sundays * plan.tutoringHours));
  if (plan.math) components.push(componentPrice("math", sundays));
  const regularTotal = components.reduce((s, c) => s + c.regular, 0);
  const total = components.reduce((s, c) => s + c.price, 0);
  return {
    sundays,
    perSundayRate: plan.perSunday,
    components,
    regularTotal,
    total,
    savings: regularTotal - total,
    savingsApplied: regularTotal - total > 0,
  };
}

// Household total across children, each priced from its own plan + Sundays.
export function householdQuote(entries) {
  const rows = (entries || []).map((e, i) => {
    const q = priceQuote(e.planId, e.sundayCount);
    return { index: i, planId: e.planId, sundays: e.sundayCount, subtotal: q ? q.total : 0, quote: q };
  });
  return { rows, total: rows.reduce((s, r) => s + r.subtotal, 0) };
}

// Totals never come from the URL — always recomputed here.
// `sundayCount` defaults to a full 10-Sunday term for reference pricing.
export function quote(planId, childCount, sundayCount = 10) {
  const plan = PLANS[planId];
  if (!plan) return null;
  const children = Math.max(1, Number(childCount) || 1);
  const q = priceQuote(planId, sundayCount);
  const perChild = q.total;
  return {
    children,
    sundays: q.sundays,
    components: q.components,
    perChild,
    subtotal: perChild * children,
    siblingDiscount: siblingDiscountFor(children),
    total: perChild * children - siblingDiscountFor(children),
    packageSavings: q.savings * children,
  };
}

export function planTitle(planId) {
  const plan = PLANS[planId];
  return plan ? `Plan ${plan.order} — ${plan.name}` : "";
}

// The pieces of a plan title, for UIs that need to translate the name.
export function planTitleParts(planId) {
  const plan = PLANS[planId];
  return plan ? { order: plan.order, id: plan.id } : null;
}

// ---------------------------------------------------------------------------
// Sunday scheduling
//
// The 10-Session Full-Term Package price is FIXED (see PLANS). The date picker
// is scheduling only: families choose which Sundays they attend, and one of the
// selected Sundays is held as their make-up date.
// ---------------------------------------------------------------------------

export const MIN_SESSION_DATES = 6;
export const MAX_SESSION_DATES = 12;

// The Fall 2026 term runs on these Sundays only (published calendar). Sep 6 is
// the first class date. Families may select any combination of the open dates.
export const TERMS = [
  {
    key: "fall-2026",
    label: "Fall Term 2026",
    labelKey: "fall2026",
    dates: [
      "2026-09-06", "2026-09-13", "2026-09-20", "2026-09-27",
      "2026-10-04", "2026-10-18", "2026-10-25",
      "2026-11-08", "2026-11-15", "2026-11-22",
      "2026-12-06", "2026-12-13",
    ],
  },
];

// Sundays whose groups have reached the student cap. Supplied by the backend.
export const FULL_DATES = [];

// Term Sundays that carry a badge on the date tile. These remain fully
// selectable — the note is informational only and adds no cost, since the YCT
// exam registration is already included in the normal session fee.
export const NOTED_DATES = {
  "2026-11-22": "YCT Exam Day",
};

// Same notes as translation codes — the UI renders these, NOTED_DATES stays
// English for logs and the backend.
export const NOTED_DATE_CODES = {
  "2026-11-22": "yctExamDay",
};

export function toISODate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Every published Sunday in a term, with the reason a date cannot be picked.
export function termSundays(term, today = new Date(), locale = "en-US") {
  const floor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return (term.dates || []).map((iso) => {
    const d = parseISODate(iso);
    let unavailable = null;
    let unavailableCode = null;
    if (d < floor) { unavailable = "Past date"; unavailableCode = "pastDate"; }
    else if (FULL_DATES.includes(iso)) { unavailable = "Group full"; unavailableCode = "groupFull"; }
    return {
      iso,
      date: d,
      month: d.toLocaleDateString(locale, { month: "long", year: "numeric" }),
      dayLabel: d.toLocaleDateString(locale, { month: "short", day: "numeric" }),
      note: NOTED_DATES[iso] || null,
      noteCode: NOTED_DATE_CODES[iso] || null,
      unavailable,
      unavailableCode,
    };
  });
}

export function eligibleSundays(term, today = new Date()) {
  return termSundays(term, today).filter((s) => !s.unavailable);
}

// Late in a term most Sundays have already passed, so the published minimum
// can become impossible to meet. The minimum then falls back to whatever is
// still selectable.
export function minimumDatesFor(term, today = new Date()) {
  return Math.min(MIN_SESSION_DATES, eligibleSundays(term, today).length);
}

// Sundays grouped by month, for the picker UI.
export function sundaysByMonth(term, today = new Date(), locale = "en-US") {
  const groups = [];
  termSundays(term, today, locale).forEach((s) => {
    const last = groups[groups.length - 1];
    if (last && last.month === s.month) last.dates.push(s);
    else groups.push({ month: s.month, dates: [s] });
  });
  return groups;
}

// Server-side rules, mirrored on the client. Enrollment requires a minimum of
// MIN_SESSION_DATES Sundays, up to the full term; no make-up date requirement.
export function validateDateSelection(selected, term, today = new Date()) {
  const eligible = new Set(eligibleSundays(term, today).map((s) => s.iso));
  const list = selected || [];
  if ([...new Set(list)].length !== list.length) return "Please remove duplicate dates.";
  const minimum = minimumDatesFor(term, today);
  if (list.length < minimum) {
    return minimum === 1
      ? "Please select at least 1 Sunday to enroll."
      : `Please select at least ${minimum} Sundays to enroll.`;
  }
  if (list.length > MAX_SESSION_DATES) return `Please select no more than ${MAX_SESSION_DATES} Sundays.`;
  const bad = list.find((iso) => !eligible.has(iso));
  if (bad) return "One of your dates is no longer available. Please review your selection.";
  return null;
}

// Same rules as validateDateSelection, reported as a code + values instead of a
// sentence. validateDateSelection() is unchanged and still returns English.
export function validateDateSelectionInfo(selected, term, today = new Date()) {
  const eligible = new Set(eligibleSundays(term, today).map((s) => s.iso));
  const list = selected || [];
  if ([...new Set(list)].length !== list.length) return { code: "duplicateDates", vars: {} };
  const minimum = minimumDatesFor(term, today);
  if (list.length < minimum) return { code: "tooFewDates", vars: { minimum } };
  if (list.length > MAX_SESSION_DATES) return { code: "tooManyDates", vars: { maximum: MAX_SESSION_DATES } };
  if (list.find((iso) => !eligible.has(iso))) return { code: "dateUnavailable", vars: {} };
  return null;
}

export function formatDateShort(iso, locale = "en-US") {
  return parseISODate(iso).toLocaleDateString(locale, { month: "short", day: "numeric", year: "numeric" });
}

export function formatSunday(date) {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export const LOCATION = {
  venue: "The Yard (Eastern Market)",
  street: "700 Pennsylvania Ave. SE",
  city: "Washington, DC 20003",
  timezone: "Eastern Time (ET)",
};

export const POLICY_SUMMARY =
  "You pay only for the Sundays you select, at the standard weekly rate per student. Package savings are applied automatically when a component reaches an eligible quantity — Chinese classes, Math classes, and tutoring hours each qualify independently. There is no long-term commitment. Refunds are calculated from tuition actually paid and itemized in writing.";

// ---------------------------------------------------------------------------
// Payment options
// ---------------------------------------------------------------------------

// Families may pay the full balance up front or spread it across monthly
// installments, each due on a class date: Sep 6, Oct 4, Nov 8.
//
// Two date rules apply to late enrollers:
//   1. If an installment's class date has already passed but that month still
//      has a term Sunday left, the payment moves to the next remaining Sunday
//      in the same month (e.g. Sep 6 -> Sep 13).
//   2. If a month has no remaining Sundays, that installment is dropped.
// Fewer than two remaining installments is not a plan — paymentSchedule()
// reports available: false and the UI shows the option disabled.
//
// Installments are whole dollars; any remainder is added to the first payment.
export const PAYMENT_DUE_DATES = ["2026-09-06", "2026-10-04", "2026-11-08"];

export const MIN_PLAN_INSTALLMENTS = 2;

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

// The due date actually charged for one scheduled installment, or null when the
// month has run out of Sundays.
function resolveDueDate(iso, today, term) {
  const floor = startOfDay(today);
  const due = parseISODate(iso);
  if (due >= floor) return iso;
  const month = iso.slice(0, 7);
  const next = (term && term.dates ? term.dates : [])
    .filter((d) => d.startsWith(month) && parseISODate(d) >= floor)
    .sort()[0];
  return next || null;
}

// The full monthly plan for a total, resolved against today's calendar.
export function paymentSchedule(total, today = new Date(), term = TERMS[0], locale = "en-US") {
  const amount = Math.max(0, Math.round(Number(total) || 0));
  const dates = PAYMENT_DUE_DATES
    .map((iso) => resolveDueDate(iso, today, term))
    .filter(Boolean);
  const n = dates.length;
  const base = n ? Math.floor(amount / n) : 0;
  const remainder = n ? amount - base * n : 0;
  const installments = dates.map((iso, i) => {
    const d = parseISODate(iso);
    return {
      iso,
      due: d.toLocaleDateString(locale, { month: "short", day: "numeric" }),
      label: d.toLocaleDateString(locale, { month: "long" }),
      amount: i === 0 ? base + remainder : base,
    };
  });
  return {
    installments,
    // count + month names let the UI build "2 months" and "October and November"
    // with its own grammar; the two *Label fields below stay English.
    count: n,
    monthNames: installments.map((p) => p.label),
    available: n >= MIN_PLAN_INSTALLMENTS,
    // "Payment plan — 2 months", "October and November · no fees"
    lengthLabel: n + (n === 1 ? " month" : " months"),
    monthsLabel: installments.length === 1
      ? installments[0].label
      : installments.slice(0, -1).map((p) => p.label).join(", ")
        + (installments.length === 2 ? " and " : ", and ")
        + (installments[installments.length - 1] || {}).label,
  };
}

// Back-compat: the installment rows only.
export function paymentPlan(total, today = new Date(), term = TERMS[0]) {
  return paymentSchedule(total, today, term).installments;
}

export const PAYMENT_HELP_NOTE =
  "Need more time to pay? Let our team know and we will work out a schedule that fits your family.";

export const PAYMENT_PLAN_CLOSED_NOTE =
  "The monthly plan is no longer available for this term — too few payment dates remain. Pay in full to enroll, or contact us to arrange a schedule.";

// ---------------------------------------------------------------------------
// Child privacy
// ---------------------------------------------------------------------------

export const PRIVACY_SUMMARY =
  "We collect your child's information only to place them in the right class and to reach you about their learning. We never sell or share it with anyone outside our teaching team.";

export const PRIVACY_CONSENT_LABEL =
  "I give permission for photos or video of my child taken in class to be used in Hello Chinese newsletters and social posts.";

export const PRIVACY_CONSENT_HINT =
  "Optional — leave unchecked and we will keep your child out of all photos and videos.";

// ---------------------------------------------------------------------------
// Coupon codes
// ---------------------------------------------------------------------------

export const COUPONS = {
  WELCOME10: { type: "percent", value: 10, label: "10% off", labelKey: "couponPercent10" },
  FAMILY20: { type: "flat", value: 20, label: "$20 off", labelKey: "couponFlat20" },
};

// Returns { code, type, value, label } for a valid code, or null.
export function lookupCoupon(input) {
  const code = String(input || "").trim().toUpperCase();
  if (!code) return null;
  const found = COUPONS[code];
  return found ? { code, ...found } : null;
}

// Dollar amount a coupon takes off a subtotal, never more than the subtotal.
export function couponDiscount(coupon, subtotal) {
  if (!coupon) return 0;
  const base = Math.max(0, Math.round(Number(subtotal) || 0));
  const off = coupon.type === "percent"
    ? Math.round((base * coupon.value) / 100)
    : Math.round(coupon.value);
  return Math.min(off, base);
}

export const COUPON_INVALID_MESSAGE = "That code isn't valid. Check the spelling and try again.";

// ---------------------------------------------------------------------------
// Date of birth
// ---------------------------------------------------------------------------

// Age in whole years on `today`. Returns null for a missing or unparseable date.
export function ageFromDOB(iso, today = new Date()) {
  if (!iso) return null;
  const [y, m, d] = String(iso).split("-").map(Number);
  if (!y || !m || !d) return null;
  const birth = new Date(y, m - 1, d);
  if (isNaN(birth.getTime()) || birth > today) return null;
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (beforeBirthday) age -= 1;
  return age < 0 || age > 120 ? null : age;
}
