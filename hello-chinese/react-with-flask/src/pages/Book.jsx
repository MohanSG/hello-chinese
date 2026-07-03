import { useState, useEffect } from "react";
import { apiRequest } from "../api/client";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";
import "../styles/hello-home.css";

const chip = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "9px 16px",
  borderRadius: "999px",
  background: "rgba(255,255,255,.08)",
  border: "1px solid rgba(255,255,255,.14)",
  fontSize: "13.5px",
  fontWeight: 600,
  color: "#e9e0d2",
};

const scheduleCard = { background: "#fffdf8", border: "1px solid rgba(42,35,27,.09)", borderRadius: "16px", padding: "26px" };
const cardLabel = { fontSize: "12.5px", fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "#948977", marginBottom: "10px" };
const cardValue = { fontFamily: "'Newsreader', serif", fontSize: "26px", fontWeight: 600, color: "#2a231b" };

const sectionHead = { display: "flex", alignItems: "baseline", gap: "12px", borderBottom: "2px solid rgba(194,58,43,.25)", paddingBottom: "12px", marginBottom: "24px" };
const zh = { fontFamily: "'Noto Serif SC', serif", fontSize: "20px", color: "#c23a2b", fontWeight: 600 };
const sectionTitle = { fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(24px,3vw,32px)", margin: 0, color: "#2a231b" };

function Book() {
  const Form = BookingForm;
  const [emailStatus, setEmailStatus] = useState("");
  const [formList, setFormList] = useState([
    { email: "", id: Date.now(), firstName: "", lastName: "", age: "", phone: "", type: "", sessions: "" },
  ]);

  useEffect(() => {
    console.log(emailStatus);
  }, [emailStatus]);

  const updateForm = (id, field, value) => {
    setFormList(formList.map((form) => (form.id === id ? { ...form, [field]: value } : form)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formList);
    try {
      await apiRequest("/send-test-email", {
        method: "POST",
        body: JSON.stringify({ subject: "Test subject", recipient: "mohansg12@gmail.com", msg: formList }),
      });
      setEmailStatus("Sent!");
    } catch (err) {
      setEmailStatus("Failed to send.");
    }
  };

  function AddStudent() {
    const newForm = { email: "", id: Date.now(), firstName: "", lastName: "", age: "", phone: "", type: "", sessions: "" };
    setFormList([...formList, newForm]);
  }

  function RemoveStudent(idToRemove) {
    setFormList(formList.filter((form) => form.id !== idToRemove));
  }

  return (
    <div style={{ background: "#f6f1e8", minHeight: "100vh", fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: "#2a231b" }}>
      <NavBar />

      {/* HEADER BAND */}
      <section style={{ background: "#241d16", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-90px", right: "-30px", fontFamily: "'Noto Serif SC', serif", fontSize: "330px", lineHeight: 1, color: "rgba(194,58,43,.14)", fontWeight: 700, pointerEvents: "none", userSelect: "none" }}>报名</div>
        <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto", padding: "clamp(48px,7vw,80px) clamp(20px,5vw,56px)" }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "2.4px", color: "#e08a7c", textTransform: "uppercase", marginBottom: "16px" }}>Enrollment</div>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: "clamp(38px,5.5vw,60px)", lineHeight: 1.04, letterSpacing: "-1px", margin: "0 0 18px", color: "#fff" }}>Book a class</h1>
          <p style={{ fontSize: "17.5px", lineHeight: 1.6, color: "#c9bfb0", margin: "0 0 26px", maxWidth: "560px" }}>
            Weekly Sunday classes, year-round. Add every child you're enrolling below and we'll confirm their spots by email.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <span style={chip}>Every Sunday</span>
            <span style={chip}>9:00 AM – 12:00 PM</span>
            <span style={chip}>Year-round enrollment</span>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "clamp(44px,6vw,72px) clamp(20px,5vw,56px)", display: "flex", flexDirection: "column", gap: "48px" }}>
        {/* SCHEDULE */}
        <section>
          <div style={sectionHead}>
            <span style={zh}>时间</span>
            <h2 style={sectionTitle}>Class schedule</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "18px" }}>
            <div style={scheduleCard}><div style={cardLabel}>Day</div><div style={cardValue}>Every Sunday</div></div>
            <div style={scheduleCard}><div style={cardLabel}>Time</div><div style={cardValue}>9:00 – 12:00</div></div>
            <div style={scheduleCard}><div style={cardLabel}>Format</div><div style={cardValue}>Weekly sessions</div></div>
          </div>
        </section>

        {/* SIGN UP */}
        <section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", borderBottom: "2px solid rgba(194,58,43,.25)", paddingBottom: "12px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span style={zh}>报名</span>
              <h2 style={sectionTitle}>Sign up</h2>
            </div>
            <button
              className="hc-btn-outline"
              onClick={AddStudent}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 18px", borderRadius: "11px", background: "#fffdf8", border: "1.5px solid rgba(42,35,27,.16)", color: "#2a231b", fontFamily: "inherit", fontSize: "14.5px", fontWeight: 600, cursor: "pointer" }}
            >
              + Add student
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {formList.map((form, i) => (
              <Form key={form.id} id={form.id} num={i + 1} form={form} updateForm={updateForm} onRemove={RemoveStudent} />
            ))}
          </div>

          <button
            className="hc-btn-red"
            onClick={handleSubmit}
            style={{ width: "100%", marginTop: "26px", padding: "16px", borderRadius: "12px", border: "none", background: "#c23a2b", color: "#fff", fontFamily: "inherit", fontSize: "16px", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 22px rgba(194,58,43,.3)" }}
          >
            Submit enrollment
          </button>

          {emailStatus && (
            <div
              style={{
                marginTop: "16px",
                textAlign: "center",
                fontSize: "14.5px",
                fontWeight: 600,
                color: emailStatus === "Sent!" ? "#2f7d51" : "#a02f22",
              }}
            >
              {emailStatus === "Sent!" ? "✓ Enrollment sent — we'll be in touch shortly." : "Something went wrong sending your enrollment. Please try again."}
            </div>
          )}
          {!emailStatus && (
            <p style={{ textAlign: "center", fontSize: "13.5px", color: "#948977", margin: "16px 0 0" }}>
              We'll email you within one business day to confirm class times.
            </p>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default Book;
