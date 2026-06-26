import { useState } from "react";
import "../styles/home.css";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What ages do you teach?",
      answer:
        "I teach children aged 5–16, from complete beginners to more advanced learners."
    },
    {
      question: "Do lessons take place online or in person?",
      answer:
        "Lessons are available online and can be tailored to suit your family's preferences and schedule."
    },
    {
      question: "Does my child need any prior experience in Mandarin?",
      answer:
        "No. I welcome complete beginners as well as students who already have some experience with Mandarin."
    },
    {
      question: "How long is each lesson?",
      answer:
        "Lessons typically last between 45 and 60 minutes, depending on your child's age and learning needs."
    },
    {
      question: "How do you track my child's progress?",
      answer:
        "Regular feedback, progress reviews, and personalised learning goals help monitor and celebrate your child's development."
    },
    {
      question: "Can lessons help with GCSE Chinese?",
      answer:
        "Yes. Lessons can support school learning and provide targeted preparation for GCSE Chinese examinations."
    },
    {
      question: "How much do lessons cost?",
      answer:
        "Pricing varies depending on lesson length and frequency. Please get in touch for more information."
    },
    {
      question: "Do you offer a trial lesson?",
      answer:
        "Yes. A trial lesson allows your child to experience the teaching style and helps determine the best learning plan."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>

              <span
                className={`faq-icon ${
                  openIndex === index ? "open" : ""
                }`}
              >
                +
              </span>
            </button>

            <div
              className={`faq-answer ${
                openIndex === index ? "open" : ""
              }`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;