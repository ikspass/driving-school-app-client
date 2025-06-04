import Button from "./UI/Button/Button";

const WarningModal = ({ text, isOpen, onConfirm, onCancel, style }) => {
  if (!isOpen) return null;

  return (
    <div className="warning-modal" style={style}>
      <div className="filter-container">
        <p className="normal-text">{text}</p>
        <div className="horizontal-container" style={{gap: '10px', alignSelf:'end'}}>
          <Button  onClick={onConfirm}>Подтвердить</Button>
          <Button className='outline' onClick={onCancel}>Отмена</Button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;