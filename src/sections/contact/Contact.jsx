import "./contact.css";
import "magic.css/dist/magic.min.css";
import { useLanguage } from "../../theme/LanguageContext";
import { useState, useRef } from "react";
import useVisibility from "../../hooks/useVisibility";
import emailjs from "emailjs-com";
import React from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const Contact = () => {
  const { language } = useLanguage();
  const myRef = useRef();
  const isVisible = useVisibility(myRef);

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const goToTop = () => {
    console.log("clicked");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_1ke57ce", // Replace with your service ID from EmailJS
        "template_zrerjkw", // Replace with your template ID from EmailJS
        {
          to_name: "Nick", // Replace with the recipient's name or dynamic value
          subject: formData.subject,
          message: formData.message, // message will be the message from the form
          reply_to: formData.email, // Optional: reply-to email from the sender
        },
        "78CM3jHVxqrSQ8s3i" // Replace with your user ID from EmailJS
      )
      .then(
        (result) => {
          setStatus(
            language === "en"
              ? "Message sent successfully, talk to you soon!"
              : "Message envoyé avec succès, à bientôt !"
          );
          setFormData({
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          console.log(error.text);
          setStatus("There was an error sending the message.");
        }
      );
  };

  return (
    <section id="contact" ref={myRef}>
      <div
        className={`contact_container ${
          isVisible ? "magictime slideRightReturn" : "none"
        }`}
      >
        <h2 className={`${isVisible ? "magictime slideRightReturn" : "none"}`}>
          {language === "en"
            ? "Ready to join your project today"
            : "Prêt à rejoindre votre projet"}
        </h2>
        <p className={`${isVisible ? "magictime slideUpReturn" : "none"}`}>
          {language === "en" ? "Get in Touch" : "Contactez-moi"}
        </p>
        <form onSubmit={handleSubmit} className="form__group">
          <div className="form__group field hover-this">
            <input
              className={`form__field ${
                isVisible ? "magictime slideUpReturn" : "none"
              }`}
              placeholder={language === "fr" ? "Votre courriel" : "Your email"}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="email"
              className={`form__label ${
                isVisible ? "magictime slideUpReturn" : "none"
              }`}
            >
              {" "}
              {language === "fr" ? "Votre courriel" : "Your email"}
            </label>
          </div>
          <div className="form__group field">
            <input
              className={`form__field ${
                isVisible ? "magictime slideUpReturn" : "none"
              }`}
              placeholder={language === "fr" ? "Compagnie" : "Company"}
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="subject"
              className={`form__label ${
                isVisible ? "magictime slideUpReturn" : "none"
              }`}
            >
              {" "}
              {language === "fr" ? "Compagnie" : "Company"}
            </label>
          </div>
          <div className="form__group field">
            <textarea
              className={`form__field ${
                isVisible ? "magictime slideUpReturn" : "none"
              }`}
              placeholder="Message"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
            <label
              htmlFor="message"
              className={`form__label ${
                isVisible ? "magictime slideUpReturn" : "none"
              }`}
            >
              Message
            </label>
          </div>
          <div className="social-icons">
            <button
              className={`email-btn ${
                isVisible ? "magictime slideRightReturn" : "none"
              }`}
              type="submit"
            >
              <span className="">
                {language === "en" ? "Send email" : "Envoyer courriel"}
              </span>
            </button>
          </div>
        </form>
        {status && <span className="status_msg">{status}</span>}
      </div>{" "}
      <div className="up__arrow hover-this" onClick={goToTop}>
        <MdKeyboardDoubleArrowUp />
      </div>
    </section>
  );
};

export default Contact;
