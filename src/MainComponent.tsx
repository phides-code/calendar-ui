import { useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/src/shared/types.js';
import DateModal from './DateModal';
import { datesWithEvents } from './data';

const MainComponent = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleOnChange = (date: Value) => {
        setSelectedDate(date as Date);
        openModal();
    };

    return (
        <>
            <Calendar
                tileClassName={({ date, view }) =>
                    view === 'month' &&
                    datesWithEvents.some(
                        (d) => d.toDateString() === date.toDateString()
                    )
                        ? 'event-day' // Apply 'event-day' class to event dates
                        : null
                }
                onChange={handleOnChange}
                value={selectedDate}
            />
            {isModalOpen && (
                <DateModal
                    closeModal={closeModal}
                    selectedDate={selectedDate as Date}
                />
            )}
        </>
    );
};

export default MainComponent;
