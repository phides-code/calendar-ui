import { useContext, useState } from 'react';
import DateModal from './DateModal';
import { datesWithEvents } from '../data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateContext } from '../context/DateContext';

const MainComponent = () => {
    // store selectedDate as ISO string '2024-11-15T12:20:43.267Z'
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleOnChange = (date: Date) => {
        setSelectedDate(date.toISOString());
        openModal();
    };

    // Function to check if a date has an event
    const hasEvent = (date: Date) =>
        datesWithEvents.some((eventDate) => eventDate === date.toDateString());

    return (
        <>
            <DatePicker
                dayClassName={(date: Date) =>
                    hasEvent(date) ? 'event-day' : ''
                }
                selected={selectedDate ? new Date(selectedDate) : null}
                onChange={(date) => handleOnChange(date as Date)}
                todayButton={'Today'}
                inline
            />

            {isModalOpen && <DateModal closeModal={closeModal} />}
        </>
    );
};

export default MainComponent;
