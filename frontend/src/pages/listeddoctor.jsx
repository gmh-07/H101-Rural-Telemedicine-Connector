import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import "./listeddoctor.css";

const doctorsData = [
  { name: "Dr. Priya Sharma", experience: 10, location: "Nagpur", profession: "Gynecologist", img: "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?semt=ais_hybrid&w=740&q=80" },
  { name: "Dr. Rahul Verma", experience: 8, location: "Mumbai", profession: "Orthologist", img: "https://img.freepik.com/free-photo/portrait-male-health-worker_23-2148980804.jpg" },
  { name: "Dr. Anjali Singh", experience: 12, location: "Pune", profession: "Cardiologist", img: "https://media.istockphoto.com/id/1346124900/photo/confident-successful-mature-doctor-at-hospital.jpg?s=612x612&w=0&k=20&c=S93n5iTDVG3_kJ9euNNUKVl9pgXTOdVQcI_oDGG-QlE=" },
  { name: "Dr. Karan Mehta", experience: 5, location: "Delhi", profession: "Dermatologist", img: "https://media.istockphoto.com/id/1346124900/photo/confident-successful-mature-doctor-at-hospital.jpg?s=612x612&w=0&k=20&c=S93n5iTDVG3_kJ9euNNUKVl9pgXTOdVQcI_oDGG-QlE=" },
  { name: "Dr. Sneha Gupta", experience: 7, location: "Bangalore", profession: "Neurologist", img: "https://media.istockphoto.com/id/1346124900/photo/confident-successful-mature-doctor-at-hospital.jpg?s=612x612&w=0&k=20&c=S93n5iTDVG3_kJ9euNNUKVl9pgXTOdVQcI_oDGG-QlE=" },
  { name: "Dr. Amit Joshi", experience: 9, location: "Chennai", profession: "Pediatrician", img: "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827774.jpg?semt=ais_hybrid&w=740&q=80" },
];

export default function listeddoctor() {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const currentDoctors = doctorsData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(doctorsData.length / cardsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="listed-container">
        <h2 className="listed-title">Nearest Doctors</h2>
        <div className="listed-cards">
          {currentDoctors.map((doc, index) => (
            <div key={index} className="listed-card">
              <img src={doc.img} alt={doc.name} className="listed-card-img" />
              <h3 className="listed-card-name">{doc.name}</h3>
              <p className="listed-card-info">Experience: {doc.experience} years</p>
              <p className="listed-card-info">Location: {doc.location}</p>
              <p className="listed-card-info">Profession: {doc.profession}</p>
            </div>
          ))}
        </div>
        <div className="listed-pagination">
          <button className="listed-btn" onClick={prevPage} disabled={currentPage === 1}>Prev</button>
          <span className="listed-page">{currentPage} / {totalPages}</span>
          <button className="listed-btn" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
