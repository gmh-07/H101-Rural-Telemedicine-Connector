import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // <-- import this
import "./listeddoctor.css";

export default function ListedDoctor() {
  const location = useLocation(); // <-- get location object
  const doctorsData = location.state?.doctorList || []; // <-- fallback to empty array

  console.log("apna data", doctorsData);

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
              {/* <img  src={doc.img} alt={doc.name} className="listed-card-img" /> */}
              <h3 className="listed-card-name">{doc.name}</h3>
              <p className="listed-card-info">Experience: {doc.yoe} years</p>
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
