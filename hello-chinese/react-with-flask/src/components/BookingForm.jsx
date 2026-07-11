import { useState } from "react";
import "../styles/variables.css";
import "./BookingForm.css";

export const PRICES = { Chinese: 180, Math: 160, "Chinese and Math": 300 };
export const TYPE_LABELS = {
  Chinese: "Chinese Lessons",
  Math: "Math Lessons",
  "Chinese and Math": "Chinese + Math Combo",
};

function BookingForm({ id, num, onRemove, updateForm }) {
  const [selectedClass, setSelectedClass] = useState("");
  const price = PRICES[selectedClass];

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
            <option disabled value="">Select Lesson Type</option>
            <option value="Chinese">Chinese Lessons — $180/mo</option>
            <option value="Math">Math Lessons — $160/mo</option>
            <option value="Chinese and Math">Chinese and Math Lessons — $300/mo</option>
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
        {price != null && (
          <div className="booking-form__price booking-form__field--wide">
            Monthly price: <span>${price}/mo</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default BookingForm;
