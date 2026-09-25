import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [submitted, setSubmitted] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goHome = () => {
    setPage("home");
    setSubmitted(false);
    setQuestion("");
    setAnswer("");
    setIsSubmitting(false);
  };

  // FIRESTORE FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const data = Object.fromEntries(formData.entries());

      const collectionName =
        page === "patient" ? "patient_support" : "volunteers";

      await addDoc(collection(db, collectionName), {
        ...data,
        submittedAt: new Date().toISOString(),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Firestore Error:", error);

      alert(
        "Unable to submit your form. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // GEMINI AI ASSISTANT
  const askAssistant = async () => {
    if (!question.trim()) {
      return;
    }

    setAnswer("Thinking...");

    try {
      const response = await fetch("https://jarurat-care-ai.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnswer(data.answer);
      } else {
        setAnswer(
          "Sorry, I couldn't process your question. Please try again."
        );
      }
    } catch (error) {
      console.error("AI Assistant Error:", error);

      setAnswer(
        "Unable to connect to the AI assistant. Please make sure the AI server is running."
      );
    }
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">❤</span>
          Jarurat<span>Care</span>
        </div>

        <div className="nav-links">
          <button onClick={goHome}>Home</button>
          <button onClick={() => setPage("about")}>About</button>
          <button onClick={() => setPage("assistant")}>Help</button>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <>
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow">HEALTHCARE SUPPORT</p>

              <h1>
                Compassionate support for
                <span> patients & caregivers</span>
              </h1>

              <p className="hero-text">
                Connect with Jarurat Care for support, information and
                meaningful ways to contribute to the healthcare community.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={() => setPage("patient")}
                >
                  Get Patient Support →
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => setPage("volunteer")}
                >
                  Become a Volunteer
                </button>
              </div>
            </div>

            <div className="hero-card">
              <div className="heart-circle">❤</div>

              <h3>You are not alone.</h3>

              <p>
                We're here to connect patients and caregivers with
                helpful support.
              </p>
            </div>
          </section>

          {/* SERVICES */}
          <section className="services">
            <div className="section-heading">
              <p className="eyebrow">OUR SERVICES</p>

              <h2>How can we help?</h2>

              <p>
                Choose an option below to get started.
              </p>
            </div>

            <div className="cards">

              <div
                className="service-card"
                onClick={() => setPage("patient")}
              >
                <div className="card-icon">♥</div>

                <h3>Patient Support</h3>

                <p>
                  Request support or share your concerns with our team.
                </p>

                <button>Get Support →</button>
              </div>

              <div
                className="service-card"
                onClick={() => setPage("volunteer")}
              >
                <div className="card-icon">🤝</div>

                <h3>Volunteer</h3>

                <p>
                  Join our community and contribute your skills.
                </p>

                <button>Join Us →</button>
              </div>

              <div
                className="service-card"
                onClick={() => setPage("assistant")}
              >
                <div className="card-icon">✨</div>

                <h3>AI Assistant</h3>

                <p>
                  Get quick answers to common support questions.
                </p>

                <button>Ask Assistant →</button>
              </div>

            </div>
          </section>

          {/* ABOUT */}
          <section className="about-section">
            <div>
              <p className="eyebrow">ABOUT JARURAT CARE</p>

              <h2>
                Building a supportive healthcare community
              </h2>

              <p>
                Jarurat Care works to support patients, caregivers and
                families navigating difficult healthcare journeys.
              </p>

              <button
                className="primary-btn"
                onClick={() => setPage("about")}
              >
                Learn More →
              </button>
            </div>

            <div className="about-box">

              <div>
                <strong>Support</strong>
                <span>Patient & caregiver assistance</span>
              </div>

              <div>
                <strong>Community</strong>
                <span>Volunteers working together</span>
              </div>

              <div>
                <strong>Technology</strong>
                <span>Digital tools for easier access</span>
              </div>

            </div>
          </section>
        </>
      )}

      {/* PATIENT SUPPORT */}
      {page === "patient" && (
        <section className="form-section">

          <button className="back-btn" onClick={goHome}>
            ← Back to Home
          </button>

          <div className="form-card">

            <div className="form-header">
              <div className="large-icon">♥</div>

              <p className="eyebrow">PATIENT SUPPORT</p>

              <h2>How can we help you?</h2>

              <p>
                Tell us about your support needs and our team can
                follow up with you.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit}>

                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                />

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />

                <label>Support Type</label>

                <select name="supportType" required>
                  <option value="">Select support type</option>
                  <option>Patient Support</option>
                  <option>Caregiver Support</option>
                  <option>General Information</option>
                </select>

                <label>How can we help?</label>

                <textarea
                  name="message"
                  rows="5"
                  placeholder="Tell us briefly about your concern..."
                  required
                ></textarea>

                <button
                  className="primary-btn full-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Support Request"}
                </button>

              </form>
            ) : (
              <div className="success">

                <div className="success-icon">✓</div>

                <h2>Request Submitted</h2>

                <p>
                  Thank you for reaching out. Your support request
                  has been submitted successfully.
                </p>

                <button className="primary-btn" onClick={goHome}>
                  Back to Home
                </button>

              </div>
            )}

          </div>
        </section>
      )}

      {/* VOLUNTEER */}
      {page === "volunteer" && (
        <section className="form-section">

          <button className="back-btn" onClick={goHome}>
            ← Back to Home
          </button>

          <div className="form-card">

            <div className="form-header">
              <div className="large-icon">🤝</div>

              <p className="eyebrow">VOLUNTEER WITH US</p>

              <h2>Join the community</h2>

              <p>
                Share your skills and help us make a difference.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit}>

                <label>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                />

                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />

                <label>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                />

                <label>Your Skills</label>

                <input
                  type="text"
                  name="skills"
                  placeholder="Example: Design, IT, Communication"
                  required
                />

                <label>Why would you like to volunteer?</label>

                <textarea
                  name="reason"
                  rows="5"
                  placeholder="Tell us briefly..."
                  required
                ></textarea>

                <button
                  className="primary-btn full-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Register as Volunteer"}
                </button>

              </form>
            ) : (
              <div className="success">

                <div className="success-icon">✓</div>

                <h2>Thank You!</h2>

                <p>
                  Your volunteer registration has been submitted
                  successfully.
                </p>

                <button className="primary-btn" onClick={goHome}>
                  Back to Home
                </button>

              </div>
            )}

          </div>
        </section>
      )}

      {/* AI ASSISTANT */}
      {page === "assistant" && (
        <section className="assistant-section">

          <button className="back-btn" onClick={goHome}>
            ← Back to Home
          </button>

          <div className="assistant-card">

            <div className="ai-icon">✨</div>

            <p className="eyebrow">AI-POWERED SUPPORT</p>

            <h2>How can I help you?</h2>

            <p>
              Ask a question about patient support, volunteering or
              Jarurat Care.
            </p>

            <div className="chat-input">

              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askAssistant();
                  }
                }}
                placeholder="Type your question..."
              />

              <button onClick={askAssistant}>
                Ask
              </button>

            </div>

            {answer && (
              <div className="answer">

                <strong>AI Assistant</strong>

                <p>{answer}</p>

              </div>
            )}

          </div>

        </section>
      )}

      {/* ABOUT */}
      {page === "about" && (
        <section className="about-page">

          <button className="back-btn" onClick={goHome}>
            ← Back to Home
          </button>

          <p className="eyebrow">ABOUT US</p>

          <h1>Jarurat Care</h1>

          <p>
            Jarurat Care is a patient advocacy organisation focused
            on supporting patients, caregivers and families.
          </p>

          <div className="about-box">

            <div>
              <strong>Patient Support</strong>
              <span>Helping patients and caregivers find support.</span>
            </div>

            <div>
              <strong>Community</strong>
              <span>Connecting people who want to contribute.</span>
            </div>

            <div>
              <strong>Technology</strong>
              <span>Using digital tools to improve accessibility.</span>
            </div>

          </div>

        </section>
      )}

      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          ❤ JaruratCare
        </div>

        <p>
          Supporting patients. Empowering caregivers.
        </p>

        <p className="copyright">
          © 2026 Jarurat Care Foundation
        </p>

      </footer>

    </div>
  );
}

export default App;