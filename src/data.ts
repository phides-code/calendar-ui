export interface CalendarEvent {
    date: Date;
    description: string;
}

const getDatesWithEvents = (events: CalendarEvent[]): Date[] => {
    const uniqueDays = new Set<number>();

    events.forEach((event) => {
        const date = new Date(event.date);
        date.setHours(0, 0, 0, 0); // Set time to 00:00:00 for each date
        uniqueDays.add(date.getTime()); // Use timestamp to ensure uniqueness
    });

    return Array.from(uniqueDays).map((timestamp) => new Date(timestamp));
};

export const events: CalendarEvent[] = [
    {
        date: new Date('2024-11-29T03:30:00'),
        description: 'first event description',
    },
    {
        date: new Date('2024-11-29T10:30:00'),
        description: 'second event description',
    },
    {
        date: new Date('2024-11-27T10:30:00'),
        description: 'third event description',
    },
];

export const datesWithEvents: Date[] = getDatesWithEvents(events);
