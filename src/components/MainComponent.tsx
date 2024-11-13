import { useContext, useState } from 'react';
import DateModal from './DateModal';
import { datesWithEvents } from '../data';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateContext } from '../context/DateContext';

const MainComponent = () => {
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const today = new Date();

    const handleOnChange = (date: Date) => {
        setSelectedDate(date as Date);
        openModal();
    };

    // Function to check if a date has an event
    const hasEvent = (date: Date) =>
        datesWithEvents.some(
            (eventDate) => eventDate.toDateString() === date.toDateString()
        );

    return (
        <>
            <DatePicker
                dayClassName={(date: Date) =>
                    hasEvent(date) ? 'event-day' : ''
                }
                dateFormat='yyyy/MM/dd'
                selected={selectedDate}
                onChange={(date) => handleOnChange(date as Date)}
                minDate={today}
                todayButton={'Today'}
                inline
            />

            {isModalOpen && <DateModal closeModal={closeModal} />}
        </>
    );
};

export default MainComponent;
