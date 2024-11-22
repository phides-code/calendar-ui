import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import CreateEventForm from './CreateEventForm';
import { DateContext } from '../context/DateContext';
import {
    selectEventsByDate,
    useDeleteEventMutation,
    useGetEventsQuery,
    type CalendarEvent,
} from '../features/events/eventsApiSlice';
import EventListItem from './EventListItem';

interface DateModalProps {
    closeModal: () => void;
}

const DateModal = ({ closeModal }: DateModalProps) => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { selectedDate } = useContext(DateContext);

    const {
        data,
        isError: queryError,
        isLoading,
        isFetching,
    } = useGetEventsQuery();
    const [, { isError: deleteError }] = useDeleteEventMutation();

    const isError = deleteError || queryError;

    if (isError) {
        return (
            <div>
                <h1>Error getting calendar events</h1>
            </div>
        );
    }

    const loading: boolean = isLoading || isFetching;

    let eventsOnThisDay = selectEventsByDate(
        data?.data as CalendarEvent[],
        selectedDate as string
    );

    const handleCreateClick = () => setShowCreateForm(true);

    const formatDateToReadableUTCString = (dateString: string) => {
        const date = new Date(dateString); // Parse the input date string
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short', // "Mon", "Tue", etc.
            month: 'short', // "Jan", "Feb", etc.
            day: '2-digit', // "01", "02", etc.
            year: 'numeric', // "2023"
            timeZone: 'UTC', // Force UTC
        };
        return date.toLocaleDateString('en-US', options);
    };

    return ReactDOM.createPortal(
        <Wrapper onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {' '}
                        <DateWrapper>
                            {formatDateToReadableUTCString(
                                selectedDate as string
                            )}
                        </DateWrapper>
                        {eventsOnThisDay.length > 0 ? (
                            <div>Events:</div>
                        ) : (
                            <div>No events on this day.</div>
                        )}
                        <ul>
                            {eventsOnThisDay.map((event) => (
                                <EventListItem key={event.id} event={event} />
                            ))}
                        </ul>
                        <ButtonAndFormWrapper>
                            {!showCreateForm && (
                                <CreateButton onClick={handleCreateClick}>
                                    Create event
                                </CreateButton>
                            )}
                            {showCreateForm && (
                                <CreateEventForm
                                    setShowCreateForm={setShowCreateForm}
                                />
                            )}
                            <CloseButton onClick={closeModal}>
                                Close
                            </CloseButton>
                        </ButtonAndFormWrapper>
                    </>
                )}
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
    padding: 1rem;
    border-radius: 8px;
    position: relative;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const DateWrapper = styled.div`
    margin-bottom: 0.4rem;
    font-weight: bold;
`;

const ButtonAndFormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const StyledButton = styled.button`
    width: 10rem;
`;

const CloseButton = styled(StyledButton)``;
const CreateButton = styled(StyledButton)``;

export default DateModal;
