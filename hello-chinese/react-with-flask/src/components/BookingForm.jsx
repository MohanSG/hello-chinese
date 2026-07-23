import { useState } from "react";
import "../styles/variables.css";
import "./BookingForm.css";

export const PRICES = { "Step-In": 40, "Step-Up": 40, "Step-Beyond": 40, Tutoring: 20, "Math Enrichment": 40, "Private Chinese": 40 };
export const PRICE_UNITS = { Tutoring: "hour" };
export function unitFor(type) { return PRICE_UNITS[type] || "session"; }
export const TYPE_LABELS = {
  "Step-In": "Step-In",
  "Step-Up": "Step-Up",
  "Step-Beyond": "Step-Beyond",
  Tutoring: "Tutoring",
  "Math Enrichment": "Math Enrichment",
  "Private Chinese": "Private Chinese Lessons",
};
export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const MONTH_NAMES_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const DOW_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function formatDateKey(d) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export function formatDateShort(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${MONTH_NAMES_SHORT[m - 1]} ${d}`;
}
function buildMonths(selectedDates) {
  const selectedSet = new Set(selectedDates || []);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const months = [];
  for (let m = 0; m < 3; m++) {
    const first = new Date(today.getFullYear(), today.getMonth() + m, 1);
    const year = first.getFullYear(), monthIdx = first.getMonth();
    const label = `${MONTH_NAMES[monthIdx]} ${year}`;
    const firstDow = first.getDay();
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push({ key: `b${i}`, day: null });
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, monthIdx, day);
      const dateStr = formatDateKey(dateObj);
      cells.push({ key: dateStr, day, dateStr, isPast: dateObj < today, selected: selectedSet.has(dateStr) });
    }
    while (cells.length % 7 !== 0) cells.push({ key: `e${cells.length}`, day: null });
    months.push({ label, cells });
  }
  return months;
}

function BookingForm({ id, num, onRemove, updateForm }) {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const price = PRICES[selectedClass];
  const months = buildMonths(selectedDates);

  const toggleDate = (dateStr) => {
    const next = selectedDates.includes(dateStr) ? selectedDates.filter((d) => d !== dateStr) : [...selectedDates, dateStr];
    setSelectedDates(next);
    updateForm(id, "selectedDates", next);
  };
  const clearDates = () => {
    setSelectedDates([]);
    updateForm(id, "selectedDates", []);
  };

  return (
    <div className="booking-form">
      <div className="booking-form__head">
        <div className="booking-form__head-left">
          <span className="booking-form__num">{num}</span>
          <h2 className="booking-form__title">Student details</h2>
        </div>
        <button type="button" aria-label="Remove student" onClick={() => onRemove(id)} className="booking-form__remove">×</button>
      </div>

      <form id="booking-form" className="booking-form__grid">
        <label className="booking-form__field booking-form__field--wide">
          <span className="booking-form__label">Email</span>
          <input type="email" className="booking-form__input" onChange={(e) => updateForm(id, "email", e.target.value)} />
        </label>
        <label className="booking-form__field">
          <span className="booking-form__label">First Name</span>
          <input type="text" className="booking-form__input" onChange={(e) => updateForm(id, "firstName", e.target.value)} />
        </label>
        <label className="booking-form__field">
          <span className="booking-form__label">Last Name</span>
          <input type="text" className="booking-form__input" onChange={(e) => updateForm(id, "lastName", e.target.value)} />
        </label>
        <label className="booking-form__field">
          <span className="booking-form__label">Age</span>
          <input type="number" className="booking-form__input" onChange={(e) => updateForm(id, "age", e.target.value)} />
        </label>
        <label className="booking-form__field">
          <span className="booking-form__label">Phone Number</span>
          <input type="tel" className="booking-form__input" onChange={(e) => updateForm(id, "phone", e.target.value)} />
        </label>
        <label className="booking-form__field booking-form__field--wide">
          <span className="booking-form__label">Lesson Type</span>
          <select
            className="booking-form__input"
            defaultValue={""}
            onChange={(e) => {
              updateForm(id, "type", e.target.value);
              setSelectedClass(e.target.value);
            }}
          >
            <option disabled value="">Select a program</option>
            <option value="Step-In">Step-In (ages 3–6) — $40/session</option>
            <option value="Step-Up">Step-Up (ages 6–10) — $40/session</option>
            <option value="Step-Beyond">Step-Beyond (ages 10+) — $40/session</option>
            <option value="Tutoring">Tutoring — $20/hour</option>
            <option value="Math Enrichment">Math Enrichment — $40/session</option>
            <option value="Private Chinese">Private Chinese Lessons — from $40/session</option>
          </select>
        </label>
        {selectedClass && (
          <label className="booking-form__field booking-form__field--wide">
            <span className="booking-form__label">Tutoring Sessions</span>
            <select className="booking-form__input" defaultValue={""} onChange={(e) => updateForm(id, "sessions", e.target.value)}>
              <option value="" disabled>Select Tutoring Sessions</option>
              <option value="1">One Tutoring Session per week</option>
              <option value="2">Two Tutoring Sessions per week</option>
            </select>
          </label>
        )}
        <div className="booking-form__field booking-form__field--wide">
          <div className="booking-form__days-head">
            <span className="booking-form__label">Preferred dates to attend <span className="booking-form__label-note">(select any dates in the next 3 months)</span></span>
            <div className="booking-form__days-head-right">
              <span className="booking-form__days-count">{selectedDates.length} date{selectedDates.length === 1 ? "" : "s"} selected</span>
              {selectedDates.length > 0 && (
                <button type="button" className="booking-form__clear-dates" onClick={clearDates}>clear</button>
              )}
            </div>
          </div>
          <div className="booking-form__calendars">
            {months.map((month, mi) => (
              <div className="booking-form__calendar" key={mi}>
                <div className="booking-form__calendar-label">{month.label}</div>
                <div className="booking-form__calendar-dow">
                  {DOW_LABELS.map((d, di) => (
                    <div className="booking-form__calendar-dow-cell" key={di}>{d}</div>
                  ))}
                </div>
                <div className="booking-form__calendar-grid">
                  {month.cells.map((cell) => (
                    <button
                      type="button"
                      key={cell.key}
                      disabled={cell.day == null || cell.isPast}
                      className={`booking-form__calendar-cell${cell.day == null || cell.isPast ? " booking-form__calendar-cell--empty" : ""}${cell.selected ? " booking-form__calendar-cell--selected" : ""}`}
                      onClick={cell.day != null && !cell.isPast ? () => toggleDate(cell.dateStr) : undefined}
                    >
                      {cell.day || ""}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {price != null && (
          <div className="booking-form__price booking-form__field--wide">
            Price: <span>${price}/{unitFor(selectedClass)}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
