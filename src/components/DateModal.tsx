import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import CreateEventForm from './CreateEventForm';
import { DateContext } from '../context/DateContext';
import type { CalendarEvent } from '../features/events/eventsApiSlice';

interface DateModalProps {
    events: CalendarEvent[];
    closeModal: () => void;
}

const DateModal = ({ closeModal, events }: DateModalProps) => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { selectedDate } = useContext(DateContext);

    const eventsOnThisDay = events.filter(
        (event: CalendarEvent) =>
            event.eventDate.substring(0, 10) === selectedDate?.substring(0, 10)
    );

    const handleCreateClick = () => setShowCreateForm(true);

    return ReactDOM.createPortal(
        <Wrapper onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <div>{selectedDate}</div>
                <div>Events:</div>
                <ul>
                    {eventsOnThisDay.map((event) => (
                        <li key={event.id}>
                            <div>{event.eventDate}</div>
                            <div>{event.eventDescription}</div>
                        </li>
                    ))}
                </ul>

                <button onClick={handleCreateClick}>Create event</button>
                {showCreateForm && (
                    <CreateEventForm setShowCreateForm={setShowCreateForm} />
                )}
                <button onClick={closeModal}>Close</button>
            </ModalContent>
        </Wrapper>,
        document.getElementById('modal-root')!
    );
};

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
