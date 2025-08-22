import React, { useState } from "react";
import { FaCrown } from "react-icons/fa";
import "./Leaderboard.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollVelocity from "@/components/scrollvelocity";
import CircularGallery from "@/components/circulargallery";
import Blogs from "@/components/blogs";

// Doctors data
const doctors = [
  {
    name: "Dr. Abhishek Wankar",
    specialty: "Gastroenterologist",
    score: 98,
    reward: "$100",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjB3_JqCLoYM_U3HSKIXIqPDLw_CuxIZFyAA&s",
    description:
      "Specialist in digestive system disorders and liver care. Dr. Deshmukh has over 15 years of experience in treating complex gastrointestinal conditions, performing endoscopic procedures, and managing liver diseases. He is known for his patient-centric approach, detailed diagnosis, and advanced treatment methods.",
    link: "https://www.maxhealthcare.in/doctor/dr-abhishek-wankar", // <-- JustDial link
  },
  {
    name: "Dr. Abhijit Babanrao Deshmukh",
    specialty: "Neurologist",
    score: 95,
    reward: "$80",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZTDzuiz8fA4Suzw7eJbkNts2wMe6wMSLwFw&s",
    description:
      "Expert in brain, spine, and nervous system disorders. Dr. Wankar has treated thousands of patients suffering from migraines, epilepsy, stroke, Parkinson’s disease, and neuromuscular conditions. He is actively involved in research and emphasizes combining modern treatments with lifestyle management for long-term recovery.",
    link: "https://www.justdial.com/Nagpur/Dr-Abhijit-B-Deshmukh-VIVEKA-HOSPITALS-Subhash-Nagar/0712PX712-X712-140207223032-E7U9_BZDET",
  },
  {
    name: "Dr. Amol Shankar Dongre",
    specialty: "Oncologist",
    score: 92,
    reward: "$40",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktDGjAsJiVdpsX1RbnCak7ImN0kkmOHak5g&s",
    description:
      "Specialist in cancer diagnosis, chemotherapy, and advanced oncological treatments. Dr. Dongre has over a decade of experience managing different types of cancers and providing holistic care that includes counseling and long-term follow-ups. His compassionate approach and evidence-based treatments make him highly trusted among patients.",
    link: "https://www.justdial.com/Nagpur/Dr-Amol-Dongre",
  },
  {
    name: "Dr. Aniruddha Sonegaonkar",
    specialty: "Orthopaedic",
    score: 89,
    reward: "$30",
    img: "https://threebestrated.in/images/DrVasudeoRidhorkarMSDNBMChDNBMNAMSKingswayHospitals-Nagpur-MH.jpeg",
    description:
      "Orthopaedic surgeon specializing in joint replacement, fractures, spine injuries, and sports medicine. Dr. Sonegaonkar has successfully performed numerous surgeries and rehabilitation programs. His expertise ensures patients regain mobility, strength, and confidence with minimal recovery time.",
    link: "https://www.justdial.com/Nagpur/Dr-Aniruddha-Sonegaonkar",
  },
  {
    name: "Dr. Nitin Tiwari",
    specialty: "Cardiologist",
    score: 87,
    reward: "$20",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0-cpGLmQVKiX14y7ehoBZy1jv4mzte3Spw&s",
    description:
      "Heart specialist focusing on preventive cardiology, heart failure management, and interventional procedures such as angioplasty and stent placement. Dr. Tiwari is known for educating patients about heart health, managing high-risk cases, and saving lives with timely cardiac interventions.",
    link: "https://www.justdial.com/Nagpur/Dr-Nitin-Tiwari",
  },
];

const Leaderboard = () => {
  const podium = doctors.slice(0, 3);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <>
      <Navbar />
      {/* <ScrollVelocity
        texts={["FitBuddy", "Track your Fitness"]}
        velocity={100}
        className="custom-scroll-text"
      /> */}

      {/* <div style={{ height: "650px", position: "relative" }}>
        <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} />
      </div> */}

      <h4 className="leaderboard-h4">
        *This leaderboard is updated at the end of every month and the Best
        Doctor receives the prizes
      </h4>

      <div className="leaderboard-container">
        {/* Podium */}
        <div className="podium">
          {/* 2nd Place */}
          <div className="podium-slot second">
            <img src={podium[1].img} alt={podium[1].name} className="avatar" />
            <div className="podium-box silver">
              <p className="place">2nd</p>
              <p>{podium[1].score} pts</p>
              <p>{podium[1].reward}</p>
            </div>
            <p className="name">{podium[1].name}</p>
          </div>

          {/* 1st Place */}
          <div className="podium-slot first">
            <img
              src={podium[0].img}
              alt={podium[0].name}
              className="avatar big"
            />
            <div className="podium-box gold">
              <FaCrown className="crown" />
              <p className="place">1st</p>
              <p>{podium[0].score} pts</p>
              <p>{podium[0].reward}</p>
            </div>
            <p className="name">{podium[0].name}</p>
          </div>

          {/* 3rd Place */}
          <div className="podium-slot third">
            <img src={podium[2].img} alt={podium[2].name} className="avatar" />
            <div className="podium-box bronze">
              <p className="place">3rd</p>
              <p>{podium[2].score} pts</p>
              <p>{podium[2].reward}</p>
            </div>
            <p className="name">{podium[2].name}</p>
          </div>
        </div>

        {/* Winner Message */}
        <div className="winner-msg">
          🎉 {podium[0].name} wins the main prize ({podium[0].reward})!
        </div>

        {/* Leaderboard Table */}
        <div className="table-wrapper">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Place</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Score</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, idx) => (
                <tr
                  key={idx}
                  className="clickable-row"
                  onClick={() => setSelectedDoctor(doc)}
                >
                  <td>{idx + 1}</td>
                  <td>
                    <div className="table-user">
                      <img
                        src={doc.img}
                        alt={doc.name}
                        className="table-avatar"
                      />
                      {doc.name}
                    </div>
                  </td>
                  <td>{doc.specialty}</td>
                  <td>{doc.score}</td>
                  <td>{doc.reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Doctor Modal */}
      {selectedDoctor && (
        <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedDoctor.img}
              alt={selectedDoctor.name}
              className="modal-avatar"
            />
            <h2>{selectedDoctor.name}</h2>
            <p className="modal-specialty">{selectedDoctor.specialty}</p>
            <p className="modal-desc">{selectedDoctor.description}</p>

            {/* <div className="modal-buttons">
              <button className="book-btn">Book Now</button>
              <button className="learn-btn">Learn More</button>
            </div> */}

            <div className="modal-buttons">
              <button
                className="book-btn"
                onClick={() =>
                  window.open("https://cal.com/agenixsoft.in/30min", "_blank")
                }
              >
                Book Now
              </button>
              <button
                className="learn-btn"
                onClick={() => window.open(selectedDoctor.link, "_blank")}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      <Blogs/>

      <Footer />
    </>
  );
};

export default Leaderboard;
