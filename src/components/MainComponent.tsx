import { useContext, useState } from 'react';
import DateModal from './DateModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateContext } from '../context/DateContext';
import {
    useGetEventsQuery,
    type CalendarEvent,
} from '../features/events/eventsApiSlice';

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

    const { data, isError, isLoading } = useGetEventsQuery();

    if (isError) {
        return (
            <div>
                <h1>Error getting calendar events</h1>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    const events = data?.data as CalendarEvent[];

    const getDatesWithEvents = (events: CalendarEvent[]): string[] => {
        const eventDays = new Set<string>();

        events.forEach((event) => {
            const day = new Date(event.eventDate).toDateString();
            eventDays.add(day);
        });

        return Array.from(eventDays);
    };

    const datesWithEvents: string[] = getDatesWithEvents(events);

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

            {isModalOpen && (
                <DateModal events={events} closeModal={closeModal} />
            )}
        </>
    );
};

export default MainComponent;
