import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/variables.css";
import "../styles/shared.css";
import "./Calendar.css";

// Set this to your published Google Apps Script Web App URL (see README:
// "Calendar data source" for the copy-paste script). Leave blank to show
// sample data.
const FEED_URL = "https://script.google.com/macros/s/AKfycbzfGjYYN44wM21Sbk1UKYUsF3f9ICtg5d7o36u9YDeVQ42K5pD1D9P2GWFDQIyBhQvteQ/exec";

const FALLBACK_SCHEDULE = [
  { day: "Sunday", startTime: "9:00 AM", endTime: "10:00 AM", className: "Mandarin Chinese", level: "Beginner · Ages 5–8", format: "In-person" },
  { day: "Sunday", startTime: "10:00 AM", endTime: "11:00 AM", className: "Mandarin Chinese", level: "Intermediate · Ages 9–12", format: "In-person" },
  { day: "Sunday", startTime: "11:00 AM", endTime: "12:00 PM", className: "Math", level: "K–8 · Mixed levels", format: "In-person" },
  { day: "Tuesday", startTime: "5:00 PM", endTime: "6:00 PM", className: "Mandarin Chinese", level: "Advanced · Teens", format: "Online" },
  { day: "Thursday", startTime: "5:00 PM", endTime: "6:00 PM", className: "Math", level: "Pre-algebra · Ages 11–14", format: "Online" },
];

const FALLBACK_EXCEPTIONS = [
  { start: "2026-07-04", end: "2026-07-04", note: "Closed for Independence Day" },
  { start: "2026-12-21", end: "2027-01-03", note: "Winter break — no classes" },
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad(n) { return n < 10 ? "0" + n : "" + n; }
function toISODate(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
function isMandarin(className) { return !/math/i.test(className); }

function buildMonthCells(year, month) {
  const startWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) {
    cells.push({ dateObj: new Date(year, month, i - startWeekday + 1), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ dateObj: new Date(year, month, d), inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].dateObj;
    cells.push({ dateObj: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), inMonth: false });
  }
  return cells;
}

function Calendar() {
  const [schedule, setSchedule] = useState(FEED_URL ? [] : FALLBACK_SCHEDULE);
  const [exceptions, setExceptions] = useState(FEED_URL ? [] : FALLBACK_EXCEPTIONS);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(!FEED_URL);
  const [monthOffset, setMonthOffset] = useState(0);
  const [hoverKey, setHoverKey] = useState(null);

  useEffect(() => {
    if (!FEED_URL) return;
    setLoading(true);
    setUsingFallback(false);
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.schedule)) setSchedule(data.schedule);
        if (Array.isArray(data.exceptions)) setExceptions(data.exceptions);
        setUsingFallback(false);
        setLoading(false);
      })
      .catch(() => {
        setSchedule(FALLBACK_SCHEDULE);
        setExceptions(FALLBACK_EXCEPTIONS);
        setUsingFallback(true);
        setLoading(false);
      });
  }, []);

  const today = new Date();
  const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = base.getFullYear();
  const month = base.getMonth();
  const todayISO = toISODate(today);
  const monthLabel = base.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const cells = buildMonthCells(year, month);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="calendar">
      <NavBar />

      {/* HEADER */}
      <section className="calendar-header">
        <div className="calendar-header__watermark">时间表</div>
        <div className="calendar-header__inner">
          <div className="eyebrow eyebrow--light">Class calendar</div>
          <h1 className="calendar-header__title">Monthly schedule</h1>
          <p className="calendar-header__desc">
            See exactly which classes run each day. Hover any block for time, level and format — closures are marked right on the date.
          </p>
        </div>
      </section>

      <div className="calendar-body">
        {usingFallback && (
          <div className="calendar-fallback-note">
            Showing sample data — set <code>FEED_URL</code> in Calendar.jsx to pull the real schedule from your Google Sheet.
          </div>
        )}
        {loading && <div className="calendar-fallback-note">Loading latest schedule…</div>}

        {/* MONTH NAV + LEGEND */}
        <div className="calendar-toolbar">
          <div className="calendar-nav">
            <button className="calendar-nav__btn" aria-label="Previous month" onClick={() => setMonthOffset((m) => m - 1)}>‹</button>
            <h2 className="calendar-nav__label">{monthLabel}</h2>
            <button className="calendar-nav__btn" aria-label="Next month" onClick={() => setMonthOffset((m) => m + 1)}>›</button>
          </div>
          <div className="calendar-legend">
            <div className="calendar-legend__item"><span className="calendar-legend__swatch mandarin" /><span className="calendar-legend__text">Mandarin Chinese</span></div>
            <div className="calendar-legend__item"><span className="calendar-legend__swatch math" /><span className="calendar-legend__text">Math</span></div>
            <div className="calendar-legend__item"><span className="calendar-legend__swatch closed" /><span className="calendar-legend__text">Closed</span></div>
            <span className="calendar-legend__hint">· hover a class for details</span>
          </div>
        </div>

        {/* WEEKDAY HEADER */}
        <div className="calendar-weekdays">
          {WEEKDAY_LABELS.map((wd) => <div key={wd} className="calendar-weekdays__label">{wd}</div>)}
        </div>

        {/* MONTH GRID */}
        <div className="calendar-weeks">
          {weeks.map((week, wi) => (
            <div key={wi} className="calendar-week">
              {week.map((c) => {
                const iso = toISODate(c.dateObj);
                const isToday = iso === todayISO;
                const weekdayName = DAY_NAMES[c.dateObj.getDay()];
                const closure = exceptions.find((ex) => iso >= ex.start && iso <= ex.end);
                const daySessions = closure ? [] : schedule.filter((s) => s.day === weekdayName);
                const closedKey = iso + "-closed";

                return (
                  <div key={iso} className={"calendar-cell" + (c.inMonth ? "" : " out") + (isToday ? " today" : "")}>
                    <div className={"calendar-cell__num" + (c.inMonth ? "" : " out") + (isToday ? " today" : "")}>{c.dateObj.getDate()}</div>

                    {closure && (
                      <div
                        className="calendar-closed-chip"
                        onMouseEnter={() => setHoverKey(closedKey)}
                        onMouseLeave={() => setHoverKey(null)}
                      >
                        Closed
                        {hoverKey === closedKey && (
                          <div className="calendar-tooltip">{closure.note}</div>
                        )}
                      </div>
                    )}

                    {daySessions.map((s, i) => {
                      const key = iso + "-" + i;
                      const mandarin = isMandarin(s.className);
                      return (
                        <div
                          key={key}
                          className={"calendar-session-block" + (mandarin ? " mandarin" : " math")}
                          onMouseEnter={() => setHoverKey(key)}
                          onMouseLeave={() => setHoverKey(null)}
                        >
                          <span className="calendar-session-block__label">{s.startTime} · {s.className.includes("Mandarin") ? "Mandarin" : s.className}</span>
                          {hoverKey === key && (
                            <div className="calendar-tooltip">
                              <div className="calendar-tooltip__title">{s.className}</div>
                              <div>{s.startTime} – {s.endTime}</div>
                              <div>{s.level}</div>
                              <div className="calendar-tooltip__format">{s.format}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <p className="calendar-foot">
          Schedule managed by our team and kept current — no need to call ahead. Questions? <a href="/Contact">Contact us →</a>
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Calendar;
