import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { DateContext } from '../context/DateContext';

interface CreateEventFormProps {
    setShowCreateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateEventForm = ({ setShowCreateForm }: CreateEventFormProps) => {
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const [newEventDescription, setNewEventDescription] = useState<string>('');

    const handleSubmit = () => {
        console.log('submitting new event:');

        console.log({
            date: selectedDate as Date,
            description: newEventDescription,
        });
        setShowCreateForm(false);
    };

    return (
        <div>
            <div>Create event</div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={newEventDescription}
                    onChange={(e) => setNewEventDescription(e.target.value)}
                    placeholder='Enter event description'
                />
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption='Time'
                    dateFormat='HH:mm'
                />
                <button>Save</button>
            </form>
        </div>
    );
};

export default CreateEventForm;
