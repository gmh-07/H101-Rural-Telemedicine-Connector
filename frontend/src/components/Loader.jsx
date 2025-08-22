import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Loader.css"; // We'll add styles here

const Loader = ({ onFinish }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, 1000); // loader visible for 2 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="spinner"></div>
          <h1>Loading...</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
