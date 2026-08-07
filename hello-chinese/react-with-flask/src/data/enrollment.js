// Shared enrollment business logic: levels, plan definitions, pricing, conflict
// rules and sibling discount. Used by the plan pages, the registration form and
// the review summary so the numbers can never drift apart.

// Sibling discounts are no longer applied: each child's enrollment is priced
// independently and the household total is the sum of the child subtotals.
export const SIBLING_DISCOUNT = 0;

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
};

// Package totals come straight from the proposal's pricing table.
// `perSunday` is the standard weekly rate shown on the plan cards.
// `total`/`save` are the reference figures at a full 10 Sundays — display only;
// live prices always come from priceQuote().
export const PLANS = {
  1: { id: 1, name: "Chinese Only", perSunday: 40, total: 360, save: 40, chinese: true, tutoringHours: 0, math: false },
  2: { id: 2, name: "Chinese + 1 Tutoring", perSunday: 60, total: 520, save: 80, chinese: true, tutoringHours: 1, math: false },
  3: { id: 3, name: "Chinese + 2 Tutoring", perSunday: 80, total: 660, save: 140, chinese: true, tutoringHours: 2, math: false },
  4: { id: 4, name: "Chinese + Math", perSunday: 80, total: 720, save: 80, chinese: true, tutoringHours: 0, math: true },
  5: { id: 5, name: "Chinese + Tutoring + Math", perSunday: 100, total: 880, save: 120, chinese: true, tutoringHours: 1, math: true },
};

// Step-Beyond Chinese and Math both run 11:00 AM–12:00 PM, so any plan that
// pairs them is invalid for that level.
export function planConflict(levelKey, planId) {
  const level = LEVELS[levelKey];
  const plan = PLANS[planId];
  if (!level || !plan) return "Unknown level or plan.";
  if (plan.math && level.math === level.chinese) {
    return `${level.name} Chinese and Math Enrichment both run ${level.chinese}, so they cannot be combined.`;
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
  const blocks = [{ time: level.chinese, label: "Chinese Class" }];
  const hours = level.tutoring.slice(0, plan.tutoringHours);
  const usedByMath = plan.math ? level.math : null;
  hours.forEach((time) => {
    if (time !== usedByMath) blocks.push({ time, label: "Learning Support Tutoring" });
  });
  if (plan.math) blocks.push({ time: level.math, label: "Math Enrichment" });
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
    siblingDiscount: 0,
    total: perChild * children,
    packageSavings: q.savings * children,
  };
}

export function planTitle(planId) {
  const plan = PLANS[planId];
  return plan ? `Plan ${plan.id} — ${plan.name}` : "";
}

// ---------------------------------------------------------------------------
// Sunday scheduling
//
// The 10-Session Full-Term Package price is FIXED (see PLANS). The date picker
// is scheduling only: families choose which Sundays they attend, and one of the
// selected Sundays is held as their make-up date.
// ---------------------------------------------------------------------------

export const MIN_SESSION_DATES = 1;
export const MAX_SESSION_DATES = 11;

// The Fall 2026 term runs on these 11 Sundays only (published calendar).
// Families may select any combination of them.
export const TERMS = [
  {
    key: "fall-2026",
    label: "Fall Term 2026",
    dates: [
      "2026-09-13", "2026-09-20", "2026-09-27",
      "2026-10-04", "2026-10-18", "2026-10-25",
      "2026-11-08", "2026-11-15", "2026-11-22",
      "2026-12-06", "2026-12-13",
    ],
  },
];

// Sundays whose groups have reached the student cap. Supplied by the backend.
export const FULL_DATES = [];

export function toISODate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Every published Sunday in a term, with the reason a date cannot be picked.
export function termSundays(term, today = new Date()) {
  const floor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return (term.dates || []).map((iso) => {
    const d = parseISODate(iso);
    let unavailable = null;
    if (d < floor) unavailable = "Past date";
    else if (FULL_DATES.includes(iso)) unavailable = "Group full";
    return {
      iso,
      date: d,
      month: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      dayLabel: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      unavailable,
    };
  });
}

export function eligibleSundays(term, today = new Date()) {
  return termSundays(term, today).filter((s) => !s.unavailable);
}

// Sundays grouped by month, for the picker UI.
export function sundaysByMonth(term, today = new Date()) {
  const groups = [];
  termSundays(term, today).forEach((s) => {
    const last = groups[groups.length - 1];
    if (last && last.month === s.month) last.dates.push(s);
    else groups.push({ month: s.month, dates: [s] });
  });
  return groups;
}

// Server-side rules, mirrored on the client. Any combination of the published
// Sundays is valid; there is no make-up date requirement.
export function validateDateSelection(selected, term, today = new Date()) {
  const eligible = new Set(eligibleSundays(term, today).map((s) => s.iso));
  const list = selected || [];
  if ([...new Set(list)].length !== list.length) return "Please remove duplicate dates.";
  if (list.length < MIN_SESSION_DATES) return "Please select at least one Sunday.";
  if (list.length > MAX_SESSION_DATES) return `Please select no more than ${MAX_SESSION_DATES} Sundays.`;
  const bad = list.find((iso) => !eligible.has(iso));
  if (bad) return "One of your dates is no longer available. Please review your selection.";
  return null;
}

export function formatDateShort(iso) {
  return parseISODate(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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
