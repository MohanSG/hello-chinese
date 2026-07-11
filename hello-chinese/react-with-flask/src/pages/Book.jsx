import { useState } from "react";
import { apiRequest } from "../api/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BookingForm, { PRICES, TYPE_LABELS } from "../components/BookingForm";
import "../styles/variables.css";
import "../styles/shared.css";
import "./Book.css";

const COUPONS = {
  WELCOME10: { type: "percent", value: 10, label: "10% off" },
  FAMILY20: { type: "flat", value: 20, label: "$20 off" },
};

function Book() {
  const Form = BookingForm;
  const [emailStatus, setEmailStatus] = useState("");
  const [formList, setFormList] = useState([
    { email: "", id: Date.now(), firstName: "", lastName: "", age: "", phone: "", type: "", sessions: "" },
  ]);
  const [couponInput, setCouponInput] = useState("");
  const [couponApplied, setCouponApplied] = useState(null); // { code, type, value, label }
  const [couponError, setCouponError] = useState("");
  const [confirmation, setConfirmation] = useState(null); // { name, number, students, subtotal, discount, total, couponCode }

  const updateForm = (id, field, value) => {
    setFormList(formList.map((form) => (form.id === id ? { ...form, [field]: value } : form)));
  };

  function AddStudent() {
    const newForm = { email: "", id: Date.now(), firstName: "", lastName: "", age: "", phone: "", type: "", sessions: "" };
    setFormList([...formList, newForm]);
  }

  function RemoveStudent(idToRemove) {
    setFormList(formList.filter((form) => form.id !== idToRemove));
  }

  const pricedStudents = formList.filter((f) => f.type && PRICES[f.type] != null);
  const subtotal = pricedStudents.reduce((sum, f) => sum + PRICES[f.type], 0);
  let discount = 0;
  if (couponApplied) {
    discount = couponApplied.type === "percent" ? Math.round((subtotal * couponApplied.value) / 100) : couponApplied.value;
    discount = Math.min(discount, subtotal);
  }
  const total = subtotal - discount;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    const found = COUPONS[code];
    if (!found) {
      setCouponError("Invalid coupon code");
      setCouponApplied(null);
      return;
    }
    setCouponApplied({ code, ...found });
    setCouponError("");
    setCouponInput(code);
  };

  const removeCoupon = () => {
    setCouponApplied(null);
    setCouponInput("");
    setCouponError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pricedStudents.length === 0) return;
    try {
      await apiRequest("/send-test-email", {
        method: "POST",
        body: JSON.stringify({ subject: "Test subject", recipient: "mohansg12@gmail.com", msg: formList }),
      });
      setEmailStatus("Sent!");
      setConfirmation({
        name: pricedStudents[0].firstName || "there",
        number: "HC-" + Math.floor(100000 + Math.random() * 900000),
        students: pricedStudents.map((s, i) => ({
          name: s.firstName || s.lastName ? `${s.firstName} ${s.lastName}`.trim() : `Student ${i + 1}`,
          typeLabel: TYPE_LABELS[s.type],
          priceLabel: `$${PRICES[s.type]}/mo`,
        })),
        subtotal,
        discount,
        total,
        couponCode: couponApplied ? couponApplied.code : null,
      });
    } catch (err) {
      setEmailStatus("Failed to send.");
    }
  };

  const startOver = () => {
    setFormList([{ email: "", id: Date.now(), firstName: "", lastName: "", age: "", phone: "", type: "", sessions: "" }]);
    setCouponInput("");
    setCouponApplied(null);
    setCouponError("");
    setEmailStatus("");
    setConfirmation(null);
  };

  if (confirmation) {
    return (
      <div className="book">
        <NavBar />
        <section className="book-header">
          <div className="book-header__watermark">谢谢</div>
          <div className="book-header__inner book-header__inner--center">
            <div className="book-confirm__check">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path d="M4 12.5L9.5 18L20 6" stroke="#e08a7c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="eyebrow eyebrow--light">Enrollment confirmed</div>
            <h1 className="book-header__title">You're all set, {confirmation.name}.</h1>
            <p className="book-header__desc book-header__desc--center">
              A confirmation email is on its way. We'll follow up within one business day with class links and materials.
            </p>
            <div className="book-confirm__number">Confirmation # {confirmation.number}</div>
          </div>
        </section>

        <div className="book-confirm-body">
          <div className="book-summary">
            <h2 className="book-summary__title">Order summary</h2>
            <div className="book-summary__lines">
              {confirmation.students.map((s, i) => (
                <div className="book-summary__line book-summary__line--student" key={i}>
                  <div>
                    <div className="book-summary__student-name">{s.name}</div>
                    <div className="book-summary__student-type">{s.typeLabel}</div>
                  </div>
                  <div className="book-summary__student-price">{s.priceLabel}</div>
                </div>
              ))}
            </div>
            <div className="book-summary__totals">
              <div className="book-summary__row">
                <span>Subtotal</span><span>${confirmation.subtotal}/mo</span>
              </div>
              {confirmation.couponCode && (
                <div className="book-summary__row book-summary__row--discount">
                  <span>Coupon ({confirmation.couponCode})</span><span>−${confirmation.discount}/mo</span>
                </div>
              )}
              <div className="book-summary__row book-summary__row--total">
                <span>Total due monthly</span><span>${confirmation.total}/mo</span>
              </div>
            </div>
          </div>
          <div className="book-confirm__actions">
            <button className="book-add-btn" onClick={startOver}>Book another enrollment</button>
            <a href="/" className="btn-red">Return home</a>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="book">
      <NavBar />

      {/* HEADER BAND */}
      <section className="book-header">
        <div className="book-header__watermark">报名</div>
        <div className="book-header__inner">
          <div className="eyebrow eyebrow--light">Enrollment</div>
          <h1 className="book-header__title">Book a class</h1>
          <p className="book-header__desc">
            Weekly Sunday classes, year-round. Add every child you're enrolling below and we'll confirm their spots by email.
          </p>
          <div className="book-header__pills">
            <span className="pill">Every Sunday</span>
            <span className="pill">9:00 AM – 12:00 PM</span>
            <span className="pill">Year-round enrollment</span>
          </div>
        </div>
      </section>

      <div className="book-body">
        {/* SCHEDULE */}
        <section>
          <div className="book-section-head">
            <span className="book-section-head__zh">时间</span>
            <h2 className="book-section-head__title">Class schedule</h2>
          </div>
          <div className="book-schedule__grid">
            <div className="book-schedule__card"><div className="book-schedule__label">Day</div><div className="book-schedule__value">Every Sunday</div></div>
            <div className="book-schedule__card"><div className="book-schedule__label">Time</div><div className="book-schedule__value">9:00 – 12:00</div></div>
            <div className="book-schedule__card"><div className="book-schedule__label">Format</div><div className="book-schedule__value">Weekly sessions</div></div>
          </div>
        </section>

        {/* PRICING */}
        <section>
          <div className="book-section-head">
            <span className="book-section-head__zh">价格</span>
            <h2 className="book-section-head__title">Pricing</h2>
          </div>
          <div className="book-schedule__grid">
            <div className="book-schedule__card">
              <div className="book-schedule__label">Chinese Lessons</div>
              <div className="book-schedule__value">$180<span className="book-schedule__value-unit"> / mo</span></div>
            </div>
            <div className="book-schedule__card">
              <div className="book-schedule__label">Math Lessons</div>
              <div className="book-schedule__value">$160<span className="book-schedule__value-unit"> / mo</span></div>
            </div>
            <div className="book-schedule__card book-schedule__card--dark">
              <div className="book-schedule__label">Chinese + Math Combo</div>
              <div className="book-schedule__value">$300<span className="book-schedule__value-unit"> / mo</span></div>
            </div>
          </div>
        </section>

        {/* SIGN UP */}
        <section>
          <div className="book-section-head book-section-head--row">
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span className="book-section-head__zh">报名</span>
              <h2 className="book-section-head__title">Sign up</h2>
            </div>
            <button className="book-add-btn" onClick={AddStudent}>+ Add student</button>
          </div>

          <div className="book-students">
            {formList.map((form, i) => (
              <Form key={form.id} id={form.id} num={i + 1} form={form} updateForm={updateForm} onRemove={RemoveStudent} />
            ))}
          </div>

          {pricedStudents.length > 0 && (
            <div className="book-summary">
              <h3 className="book-summary__title book-summary__title--sm">Order summary</h3>
              <div className="book-summary__lines">
                {pricedStudents.map((s, i) => (
                  <div className="book-summary__row" key={s.id}>
                    <span>{(s.firstName || s.lastName) ? `${s.firstName} ${s.lastName}`.trim() : `Student ${i + 1}`} — {TYPE_LABELS[s.type]}</span>
                    <span className="book-summary__row-price">${PRICES[s.type]}/mo</span>
                  </div>
                ))}
              </div>

              <div className="book-coupon">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="book-coupon__input"
                  value={couponInput}
                  onChange={(e) => { setCouponInput(e.target.value); setCouponError(""); }}
                />
                <button type="button" className="book-coupon__btn" onClick={applyCoupon}>Apply</button>
                {couponApplied && (
                  <span className="book-coupon__applied">
                    ✓ {couponApplied.code} applied ({couponApplied.label})
                    <button type="button" className="book-coupon__remove" onClick={removeCoupon}>remove</button>
                  </span>
                )}
                {couponError && <span className="book-coupon__error">{couponError}</span>}
              </div>

              <div className="book-summary__totals">
                <div className="book-summary__row"><span>Subtotal</span><span>${subtotal}/mo</span></div>
                {couponApplied && (
                  <div className="book-summary__row book-summary__row--discount"><span>Discount</span><span>−${discount}/mo</span></div>
                )}
                <div className="book-summary__row book-summary__row--total">
                  <span>Total due monthly</span><span>${total}/mo</span>
                </div>
              </div>
            </div>
          )}

          <button className="book-submit" onClick={handleSubmit}>Submit enrollment</button>

          {emailStatus === "Failed to send." ? (
            <div className="book-status error">Something went wrong sending your enrollment. Please try again.</div>
          ) : (
            <p className="book-note">We'll email you within one business day to confirm class times.</p>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Book;
