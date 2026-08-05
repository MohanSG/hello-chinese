// Shared enrollment business logic: levels, plan definitions, pricing, conflict
// rules and sibling discount. Used by the plan pages, the registration form and
// the review summary so the numbers can never drift apart.

export const SIBLING_DISCOUNT = 30;

export const SINGLE_VALUES = {
  chinese: { label: "Chinese class", single: 40, unit: "session", package10: 360 },
  tutoring: { label: "Learning support tutoring", single: 20, unit: "hour", package10: 160, package20: 300 },
  math: { label: "Math Enrichment", single: 40, unit: "session", package10: 360 },
};

// Per-level class times. Tutoring runs 9:00 AM–12:00 PM and fills the hours
// either side of the child's Chinese class.
export const LEVELS = {
  "step-in": {
    key: "step-in", name: "Step-In", levelLabel: "Level 1", ages: "Ages 3–6",
    chinese: "9:00–10:00", tutoring: ["10:00–11:00", "11:00–12:00"], math: "11:00–12:00",
    theme: "Nature & Animals",
  },
  "step-up": {
    key: "step-up", name: "Step-Up", levelLabel: "Level 2", ages: "Ages 6–10",
    chinese: "10:00–11:00", tutoring: ["9:00–10:00", "11:00–12:00"], math: "11:00–12:00",
    theme: "Restaurant & Store",
  },
  "step-beyond": {
    key: "step-beyond", name: "Step-Beyond", levelLabel: "Level 3", ages: "Ages 10+",
    chinese: "11:00–12:00", tutoring: ["9:00–10:00", "10:00–11:00"], math: "11:00–12:00",
    theme: "Advanced Language & Projects",
  },
};

// Package totals come straight from the proposal's pricing table.
export const PLANS = {
  1: { id: 1, name: "Chinese Only", total: 360, save: 40, chinese: true, tutoringHours: 0, math: false },
  2: { id: 2, name: "Chinese + 1 Tutoring", total: 520, save: 80, chinese: true, tutoringHours: 1, math: false },
  3: { id: 3, name: "Chinese + 2 Tutoring", total: 660, save: 140, chinese: true, tutoringHours: 2, math: false },
  4: { id: 4, name: "Chinese + Math", total: 720, save: 80, chinese: true, tutoringHours: 0, math: true },
  5: { id: 5, name: "Chinese + Tutoring + Math", total: 880, save: 120, chinese: true, tutoringHours: 1, math: true },
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

// Totals never come from the URL — always recomputed from the plan id here.
export function quote(planId, childCount) {
  const plan = PLANS[planId];
  if (!plan) return null;
  const children = Math.max(1, Number(childCount) || 1);
  const perChild = plan.total;
  const siblings = children - 1;
  const discount = siblings * SIBLING_DISCOUNT;
  return {
    children,
    perChild,
    subtotal: perChild * children,
    siblingDiscount: discount,
    total: perChild * children - discount,
    packageSavings: plan.save * children,
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

export const MIN_SESSION_DATES = 6;
export const MAX_SESSION_DATES = 11;

// Terms the picker offers. Keep to the confirmed term plus the next one.
export const TERMS = [
  { key: "fall-2026", label: "Fall Term 2026", start: "2026-09-06", end: "2026-11-22" },
  { key: "winter-2027", label: "Winter Term 2027", start: "2027-01-10", end: "2027-03-21" },
];

// Sundays with no class (holidays, venue closures). Admin-configurable.
export const CLOSURES = ["2026-11-29", "2026-12-27", "2027-02-14"];

// Sundays whose groups have reached the 10-student cap. Supplied by the backend.
export const FULL_DATES = [];

export function toISODate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseISODate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Every Sunday in a term, with the reason a date cannot be picked (if any).
export function termSundays(term, today = new Date()) {
  const start = parseISODate(term.start);
  const end = parseISODate(term.end);
  const floor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const out = [];
  const d = new Date(start);
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
  while (d <= end) {
    const iso = toISODate(d);
    let unavailable = null;
    if (d < floor) unavailable = "Past date";
    else if (CLOSURES.includes(iso)) unavailable = "Holiday closure";
    else if (FULL_DATES.includes(iso)) unavailable = "Group full";
    out.push({
      iso,
      date: new Date(d),
      month: d.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      dayLabel: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      unavailable,
    });
    d.setDate(d.getDate() + 7);
  }
  return out;
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

// Server-side rules, mirrored on the client.
export function validateDateSelection(selected, makeupDate, term, today = new Date()) {
  const eligible = new Set(eligibleSundays(term, today).map((s) => s.iso));
  const unique = [...new Set(selected)];
  if (unique.length !== selected.length) return "Please remove duplicate dates.";
  if (selected.length < MIN_SESSION_DATES) {
    return `Please select at least ${MIN_SESSION_DATES} Sundays.`;
  }
  if (selected.length > MAX_SESSION_DATES) {
    return `Please select no more than ${MAX_SESSION_DATES} Sundays.`;
  }
  const bad = selected.find((iso) => !eligible.has(iso) || parseISODate(iso).getDay() !== 0);
  if (bad) return "One of your dates is no longer available. Please review your selection.";
  if (!makeupDate || !selected.includes(makeupDate)) {
    return "Please choose which Sunday is held as your make-up date.";
  }
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
  "The 10-Session Full-Term Package secures your child's place for the full term and its price is fixed regardless of how many Sundays you schedule. One of your selected Sundays is held as a make-up date; unused missed-class credit becomes a discount toward the next quarter. Refunds are calculated from tuition actually paid and itemized in writing.";
