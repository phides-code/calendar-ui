import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface DateModalProps {
    closeModal: () => void;
    selectedDate: Date;
}

const DateModal = ({ closeModal, selectedDate }: DateModalProps) =>
    ReactDOM.createPortal(
        <Wrapper onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <div>{selectedDate.toDateString()}</div>
                <div>Events:</div>
                <button onClick={closeModal}>Close</button>
            </ModalContent>
        </Wrapper>,
        document.getElementById('modal-root')! // Portal target
    );

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    position: relative;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export default DateModal;
