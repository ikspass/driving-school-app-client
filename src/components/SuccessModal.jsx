import { useEffect, useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const SuccessModal = observer(({ message }) => {
  const {modalStore} = useContext(Context);

  useEffect(() => {
    if (modalStore.isOpen) {
      const timer = setTimeout(() => {
        modalStore.setIsOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [modalStore.isOpen]);

    return (
        <div className={`success-modal ${modalStore.isOpen ? 'slide-in' : 'slide-out'}`}>
            <div className="content-container">
                <p>{message}</p>
            </div>
        </div>
    );
})

export default SuccessModal;