import type { Event } from './eventsApiSlice';
import { useGetEventsQuery } from './eventsApiSlice';

export const Events = () => {
    // Using a query hook automatically fetches data and returns query values
    const { data, isError, isLoading, isSuccess } = useGetEventsQuery();

    const events = data?.data as Event[];

    if (isError) {
        return (
            <div>
                <h1>There was an error!!!</h1>
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

    if (isSuccess) {
        return (
            <div>
                {events.map(({ id, eventDate, eventDescription }) => (
                    <div key={id}>
                        <div>{eventDate}</div>
                        <div>{eventDescription}</div>
                    </div>
                ))}
            </div>
        );
    }

    return null;
};
