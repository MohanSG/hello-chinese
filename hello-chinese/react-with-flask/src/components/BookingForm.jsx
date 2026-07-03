import { useState } from "react";

const inputStyle = {
  padding: "13px 15px",
  borderRadius: "10px",
  border: "1.5px solid rgba(42,35,27,.14)",
  background: "#f9f5ee",
  fontFamily: "inherit",
  fontSize: "15px",
  color: "#2a231b",
  width: "100%",
};
const labelStyle = { display: "flex", flexDirection: "column", gap: "7px" };
const labelText = { fontSize: "13px", fontWeight: 600, color: "#2a231b" };

function BookingForm({ id, num, onRemove, updateForm }) {
  const [selectedClass, setSelectedClass] = useState("");

  return (
    <div style={{ background: "#fffdf8", border: "1px solid rgba(42,35,27,.1)", borderRadius: "18px", padding: "clamp(22px,3vw,32px)", boxShadow: "0 2px 10px rgba(42,35,27,.05)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "34px", borderRadius: "10px", background: "#f6e7e1", color: "#c23a2b", fontFamily: "'Newsreader', serif", fontSize: "17px", fontWeight: 600 }}>{num}</span>
          <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "20px", margin: 0, color: "#2a231b" }}>Student details</h2>
        </div>
        <button
          type="button"
          aria-label="Remove student"
          onClick={() => onRemove(id)}
          style={{ width: "34px", height: "34px", borderRadius: "999px", border: "1px solid rgba(42,35,27,.14)", background: "#f6f1e8", color: "#6b6154", fontSize: "17px", lineHeight: 1, cursor: "pointer" }}
        >
          ×
        </button>
      </div>

      <form id="booking-form" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", margin: 0 }}>
        <label className="email-label" style={{ ...labelStyle, gridColumn: "1 / -1" }}>
          <span style={labelText}>Email</span>
          <input className="hc-input" type="email" style={inputStyle} onChange={(e) => updateForm(id, "email", e.target.value)} />
        </label>
        <label style={labelStyle}>
          <span style={labelText}>First Name</span>
          <input className="hc-input" type="text" style={inputStyle} onChange={(e) => updateForm(id, "firstName", e.target.value)} />
        </label>
        <label style={labelStyle}>
          <span style={labelText}>Last Name</span>
          <input className="hc-input" type="text" style={inputStyle} onChange={(e) => updateForm(id, "lastName", e.target.value)} />
        </label>
        <label style={labelStyle}>
          <span style={labelText}>Age</span>
          <input className="hc-input" type="number" style={inputStyle} onChange={(e) => updateForm(id, "age", e.target.value)} />
        </label>
        <label style={labelStyle}>
          <span style={labelText}>Phone Number</span>
          <input className="hc-input" type="tel" style={inputStyle} onChange={(e) => updateForm(id, "phone", e.target.value)} />
        </label>
        <label className="class-label" style={{ ...labelStyle, gridColumn: "1 / -1" }}>
          <span style={labelText}>Lesson Type</span>
          <select
            className="hc-input"
            style={inputStyle}
            defaultValue={""}
            onChange={(e) => {
              updateForm(id, "type", e.target.value);
              setSelectedClass(e.target.value);
            }}
          >
            <option disabled value="">Select Lesson Type</option>
            <option value="Chinese">Chinese Lessons</option>
            <option value="Math">Math Lessons</option>
            <option value="Chinese and Math">Chinese and Math Lessons</option>
          </select>
        </label>
        {selectedClass && (
          <label className="tutoring-label" style={{ ...labelStyle, gridColumn: "1 / -1" }}>
            <span style={labelText}>Tutoring Sessions</span>
            <select className="hc-input" style={inputStyle} defaultValue={""} onChange={(e) => updateForm(id, "sessions", e.target.value)}>
              <option value="" disabled>Select Tutoring Sessions</option>
              <option value="1">One Tutoring Session per week</option>
              <option value="2">Two Tutoring Sessions per week</option>
            </select>
          </label>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
