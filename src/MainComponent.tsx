import { useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/src/shared/types.js';

const MainComponent = () => {
    // example highlighted date
    const datesWithEvents = [new Date('2024-11-29T03:24:00')];

    const [selectedDate, setSelectedDate] = useState<Date | null>();

    const handleOnChange = (date: Value) => {
        setSelectedDate(date as Date);
    };

    console.log('selectedDate: ', selectedDate?.toString());

    return (
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
    );
};

export default MainComponent;
