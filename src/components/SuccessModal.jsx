import { useEffect, useState } from "react";

const SuccessModal = ({ text, isVisible }) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!visible) return null;

  return (
    <div className="success-modal">
      <div className="content-container">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default SuccessModal;