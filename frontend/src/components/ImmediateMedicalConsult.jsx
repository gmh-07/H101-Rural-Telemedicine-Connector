import React, { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { FaClock, FaUserMd, FaComments, FaPhoneAlt, FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";
import "./ImmediateMedicalConsult.css";

export default function ImmediateMedicalConsult({
  phoneNumberHref = "tel:+18008445555",
  phoneButtonText = "Call Now: 1-800-VILLAGE",
  calNamespace = "agenixsoft",
  calLink = "agenixsoft/30min",
}) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: calNamespace });
      cal("ui", { theme: "light", layout: "month_view", hideEventTypeDetails: false });
    })();
  }, [calNamespace]);

  const ease = [0.22, 1, 0.36, 1];

  return (
    <motion.section
      className="imc-wrap"
      aria-labelledby="imc-title"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -120px 0px" }}
      transition={{ duration: 0.55, ease }}
    >
      <div className="imc-container">
        <header className="imc-header">
          <h2 id="imc-title" className="imc-title">
            Need Immediate Medical Consultation?
          </h2>
          <p className="imc-subtitle">
            Connect with our licensed healthcare agents 24/7 for professional medical guidance
            and emergency support
          </p>
        </header>

        <div className="imc-grid">
          <div className="imc-left">
            <Feature
              icon={<FaClock />}
              title="24/7 Availability"
              desc="Our medical agents are available round the clock for urgent consultations"
              delay={0}
            />
            <Feature
              icon={<FaUserMd />}
              title="Licensed Professionals"
              desc="All our agents are certified healthcare professionals with extensive experience"
              delay={0.06}
            />
            <Feature
              icon={<FaComments />}
              title="Multiple Contact Options"
              desc="Reach us via phone, video call, or secure chat — whatever works best for you"
              delay={0.12}
            />
          </div>

          <motion.aside
            className="imc-card"
            aria-label="Call our medical agent"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <h3 className="imc-card-title">Call Our Medical Agent</h3>
            <p className="imc-card-subtitle">Speak directly with a healthcare professional now</p>

            <div className="imc-card-actions">
              <motion.a
                href={phoneNumberHref}
                className="imc-btn imc-btn-primary"
                whileHover={{ scale: 1.01, boxShadow: "0 8px 18px rgba(33,160,139,0.28)" }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 480, damping: 30 }}
              >
                <FaPhoneAlt aria-hidden="true" />
                <span>{phoneButtonText}</span>
              </motion.a>

              <motion.button
                type="button"
                className="imc-btn imc-btn-outline"
                data-cal-namespace={calNamespace}
                data-cal-link={calLink}
                data-cal-config='{"layout":"month_view","theme":"light"}'
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 480, damping: 30 }}
              >
                <FaVideo aria-hidden="true" />
                <span>Start Video Consultation</span>
              </motion.button>
            </div>

            <p className="imc-note">Emergency? Call 911 immediately</p>
          </motion.aside>
        </div>
      </div>
    </motion.section>
  );
}

function Feature({ icon, title, desc, delay = 0 }) {
  return (
    <motion.div
      className="imc-feature"
      initial={{ opacity: 0, y: 12, filter: "blur(2px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
    >
      <motion.div
        className="imc-icon"
        aria-hidden="true"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>
      <div>
        <h4 className="imc-ft-title">{title}</h4>
        <p className="imc-ft-desc">{desc}</p>
      </div>
    </motion.div>
  );
}
