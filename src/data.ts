export interface CalendarEvent {
    id: string;
    eventDate: string;
    eventDescription: string;
}

const getDatesWithEvents = (events: CalendarEvent[]): string[] => {
    const eventDays = new Set<string>();

    events.forEach((event) => {
        const day = new Date(event.eventDate).toDateString();
        eventDays.add(day);
    });

    return Array.from(eventDays);
};

export const events: CalendarEvent[] = [
    {
        id: '001',
        eventDate: '2024-11-02T15:04:05.000Z',
        eventDescription: 'first event description',
    },
    {
        id: '002',
        eventDate: '2024-11-20T19:04:05.000Z',
        eventDescription: 'second event description',
    },
    {
        id: '003',
        eventDate: '2024-11-20T15:04:05.000Z',
        eventDescription: 'third event description',
    },
];

export const datesWithEvents: string[] = getDatesWithEvents(events);
