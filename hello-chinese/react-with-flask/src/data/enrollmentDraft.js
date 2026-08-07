// Shared enrollment draft: one parent/guardian, one entry per child.
// Mirrors what the enrollment pages write to sessionStorage.

const KEY = "hc.enrollmentDraft";

export const emptyDraft = () => ({
  parent: { name: "", email: "", phone: "", notes: "" },
  enrollments: [],
});

export function readDraft() {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return emptyDraft();
    const d = JSON.parse(raw);
    return {
      parent: { name: "", email: "", phone: "", notes: "", ...(d.parent || {}) },
      // Drop malformed entries so a hand-edited or half-written draft cannot
      // break the review summary.
      enrollments: (d.enrollments || []).filter((e) => e && e.planId && e.levelKey),
    };
  } catch (e) {
    return emptyDraft();
  }
}

export function writeDraft(draft) {
  sessionStorage.setItem(KEY, JSON.stringify(draft));
}

export function clearDraft() {
  sessionStorage.removeItem(KEY);
}

// Never leaves a gap in the array: a missing earlier child would serialize as
// null and break the review summary.
export function saveEnrollment(childIndex, enrollment) {
  const draft = readDraft();
  const index = Math.min(childIndex, draft.enrollments.length);
  draft.enrollments[index] = { ...(draft.enrollments[index] || {}), ...enrollment };
  writeDraft(draft);
  return index;
}

// Removing a child rewrites the array so indices stay contiguous — the review
// summary and ?child= links both key off array position.
export function removeEnrollment(childIndex) {
  const draft = readDraft();
  draft.enrollments = draft.enrollments.filter((_, i) => i !== childIndex);
  writeDraft(draft);
  return draft.enrollments;
}

// With no ?child in the URL, target the first enrollment that has no student
// attached yet, so re-entering the flow never overwrites a completed child.
export function nextOpenIndex(enrollments) {
  const open = enrollments.findIndex((e) => !e || !e.student || !e.student.name);
  return open === -1 ? enrollments.length : open;
}

export const money = (n) => "$" + Number(n || 0).toLocaleString("en-US");

export const pluralUnit = (unit, n) => (n === 1 ? unit : unit === "class" ? "classes" : unit + "s");
