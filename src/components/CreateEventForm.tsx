import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { DateContext } from '../context/DateContext';
import {
    useGetEventsQuery,
    usePostEventMutation,
} from '../features/events/eventsApiSlice';
import styled from 'styled-components';

interface CreateEventFormProps {
    setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEventForm = ({ setShowCreateForm }: CreateEventFormProps) => {
    const { selectedDate } = useContext(DateContext);
    const [newEventDescription, setNewEventDescription] = useState<string>('');
    const [newEventDate, setNewEventDate] = useState<Date | null>(
        new Date(selectedDate as string)
    );

    const [postEvent, { isLoading, isError }] = usePostEventMutation();
    const { refetch } = useGetEventsQuery();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const offset: number =
            (newEventDate?.getTimezoneOffset() as number) / 60;

        const correctedDate: string = new Date(
            newEventDate?.setHours(newEventDate.getHours() - offset) as number
        ).toISOString();

        console.log('submitting new event:');
        console.log({
            eventDate: correctedDate,
            eventDescription: newEventDescription,
        });

        try {
            await postEvent({
                eventDate: correctedDate,
                eventDescription: newEventDescription,
            }).unwrap();
            refetch();
            setNewEventDate(null);
            setNewEventDescription('');
            setShowCreateForm(false);
        } catch (err) {
            console.error('Failed to post event:', err);
        }
    };

    const handleOnChange = (date: Date) => {
        setNewEventDate(date);
    };

    return (
        <Wrapper>
            <div>Create event</div>
            <StyledForm onSubmit={handleSubmit}>
                <div>
                    <input
                        type='text'
                        value={newEventDescription}
                        onChange={(e) => setNewEventDescription(e.target.value)}
                        placeholder='Enter event description'
                    />
                </div>
                <div>
                    <DatePicker
                        selected={newEventDate}
                        onChange={(date: Date | null) =>
                            handleOnChange(date as Date)
                        }
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption='Time'
                        dateFormat='HH:mm'
                    />
                </div>
                <div>
                    <StyledButton>Save</StyledButton>
                </div>
            </StyledForm>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledButton = styled.button`
    width: 10rem;
`;

export default CreateEventForm;
