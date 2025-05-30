import Button from "./UI/Button/Button";

const ExceptionModal = ({ text, isOpen, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="warning-modal">
      <div className="content-container">
        <p>{text}</p>
        <div className="horizontal-container" style={{gap: '10px', alignSelf:'end'}}>
          <Button onClick={onConfirm}>Ок</Button>
        </div>
      </div>
    </div>
  );
};

export default ExceptionModal;