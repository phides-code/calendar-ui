import styled from 'styled-components';
import {
    useDeleteEventMutation,
    type CalendarEvent,
} from '../features/events/eventsApiSlice';

interface EventListItemProps {
    event: CalendarEvent;
}

const EventListItem = ({ event }: EventListItemProps) => {
    const [deleteEvent, { isLoading: isDeleteLoading }] =
        useDeleteEventMutation();

    const handleDeleteEvent = async (id: string) => {
        try {
            await deleteEvent(id).unwrap();
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };

    const formatToHourMinutes = (dateString: string): string => {
        const date = new Date(dateString); // Parse the input string

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }

        // Format time to "HH:mm"
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Use 24-hour format
            timeZone: 'UTC', // Ensure UTC timezone
        });
    };

    return (
        <li>
            <Wrapper>
                <EventTime>{formatToHourMinutes(event.eventDate)}</EventTime>
                <DescriptionWrapper>
                    <div>{event.eventDescription}</div>
                    <button
                        onClick={() => handleDeleteEvent(event.id)}
                        disabled={isDeleteLoading}
                    >
                        Delete
                    </button>
                </DescriptionWrapper>
            </Wrapper>
        </li>
    );
};

const Wrapper = styled.div`
    display: flex;
`;

const DescriptionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;

const EventTime = styled.div`
    margin-right: 0.5rem;
`;
export default EventListItem;
