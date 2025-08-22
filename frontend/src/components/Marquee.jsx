import "./Marquee.css";

const Marquee = () => {
  return (
    <div className="marquee-container">
      {/* Top line → moves right */}
      <div className="marquee marquee-right">
        <div className="marquee-track">
          <span>Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ </span>
          <span>Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+</span>
        </div>
      </div>

      {/* Bottom line → moves left */}
      <div className="marquee marquee-left">
        <div className="marquee-track">
          <span>Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ </span>
          <span>Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ Healthcare+ </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
